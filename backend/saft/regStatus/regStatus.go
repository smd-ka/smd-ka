package regStatus

import (
	"time"
	_ "time/tzdata"  // fallback if OS does not have timezone DB
)

const (
	// the exact string that is accepted for new submissions
	// must in practice be synced with frontend's PUBLIC_SEMESTER env var
	AcceptedSemester = "SS26"

	readableIsoFormat = "2006-01-02 15:04:05" // without timezone & with space
	deadlineTimezoneName = "Europe/Berlin"

	// change these dates here to unlock the SAFT registration formular
	registrationDeadlineIso = "2026-04-29 00:00:00"
	afterwardsDeadlineIso = "2026-05-03 00:00:00"
)

var (
	deadlineTimezone *time.Location
	RegistrationDeadline time.Time
	AfterwardsDeadline time.Time
)

func init() {
	var err error
	deadlineTimezone, err = time.LoadLocation(deadlineTimezoneName)
	if err != nil {
		panic(err)
	}
	// parsing does not induce a lot of work as it happens on launch
	RegistrationDeadline = parseDeadline(registrationDeadlineIso)
	AfterwardsDeadline = parseDeadline(afterwardsDeadlineIso)
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
	if now.Before(RegistrationDeadline) {
		return Open
	} else if now.Before(AfterwardsDeadline) {
		return Closed
	} else {
		return Afterwards
	}
}
