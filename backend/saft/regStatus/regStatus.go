package regStatus

import (
	"time"
	_ "time/tzdata"  // fallback if OS does not have timezone DB
)

const (
	// the exact string that is accepted for new submissions
	// must in practice be synced with frontend's PUBLIC_SEMESTER env var
	AcceptedSemester = "WS2627"

	readableIsoFormat = "2006-01-02 15:04:05" // without timezone & with space
	deadlineTimezoneName = "Europe/Berlin"

	// change these dates here to control the SAFT registration form

	// regOpen == "" -> Before state until afterwards
	registrationOpenIso = ""
	// only honored with regOpen set & afterwards not passed
	registrationDeadlineIso = "2026-04-29 00:00:00"
	// should be end date of SAFT (or 1 day before) -> direct late submissions to email until then
	afterwardsDeadlineIso = "2026-11-16 00:00:00"
)

var (
	deadlineTimezone     *time.Location
	RegistrationOpen     time.Time
	RegistrationDeadline time.Time
	AfterwardsDeadline   time.Time
)

func init() {
	var err error
	deadlineTimezone, err = time.LoadLocation(deadlineTimezoneName)
	if err != nil {
		panic(err)
	}
	// parsing does not induce a lot of work as it happens on launch
	RegistrationOpen = parseDeadlineOrZero(registrationOpenIso)
	RegistrationDeadline = parseDeadline(registrationDeadlineIso)
	AfterwardsDeadline = parseDeadline(afterwardsDeadlineIso)
}

// parses deadline; returns zero time.Time if iso is empty (i.e. unset/not opened)
func parseDeadlineOrZero(iso string) time.Time {
	if iso == "" {
		return time.Time{}
	}
	return parseDeadline(iso)
}

func parseDeadline(iso string) time.Time {
	var parsed time.Time
	var err error
	parsed, err = time.ParseInLocation(readableIsoFormat, iso, deadlineTimezone)
	if err != nil {
		panic(err)
	}
	return parsed
}



type RegistrationStatus int

// WARNING: keep in sync with frontend/src/lib/saftRegistrationApi.ts as used in API!
// hint: iota starts at 0 & increments for every entry afterwards
const (
	// before status was fetched or if any other issue occurs
	Unknown RegistrationStatus = iota
	// fetching status was impossible (& present error to user)
	Failed
	// registration is not opened yet (but event is still upcoming)
	Before
	// registration is normally open
	Open
	// registration is closed (but still before event, i.e. maybe show "contact us" hint)
	Closed
	// event ended (i.e. makes no sense to show "contact us" hint anymore)
	Afterwards
)



func AcceptSubmission(receivedSemester string) bool {
	status := Determine(nil)
	return status == Open && AcceptedSemester == receivedSemester
}

// the JSON dict how the frontend expects it
func ApiStatus() map[string]interface{} {
	status := Determine(nil)
	return map[string]interface{} {
		"open": status == Open,
		"status": status,
		"acceptedSemester": AcceptedSemester,
		"registrationDeadline": RegistrationDeadline.Format(time.RFC3339),
		"afterwardsDeadline": AfterwardsDeadline.Format(time.RFC3339),
	}
}

func Determine(atTime *time.Time) RegistrationStatus {
	var now time.Time
	if atTime == nil {
		now = time.Now().UTC()
	} else {
		now = *atTime
	}
	// resilient check order (see comments above)
	if now.After(AfterwardsDeadline) {
		return Afterwards
	} else if RegistrationOpen.IsZero() {
		return Before
	} else if now.After(RegistrationDeadline) {
		return Closed
	} else if now.Before(RegistrationOpen) {
		return Before
	} else {
		// most protected state, because largest consequences
		return Open
	}
}
