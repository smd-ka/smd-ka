package regStatus

import (
	"time"
	_ "time/tzdata"  // fallback if OS does not have timezone DB
)

var (
	deadlineTimezone *time.Location
	RegistrationDeadline time.Time
	AfterwardsDeadline time.Time
)

func init() {
	var err error
	deadlineTimezone, err = time.LoadLocation("Europe/Berlin")
	if err != nil {
		panic(err)
	}
	// change these dates here to unlock the SAFT registration formular
	RegistrationDeadline = time.Date(2026, time.April, 28, 23, 59, 0, 0, deadlineTimezone)
	AfterwardsDeadline = time.Date(2026, time.May, 03, 0, 0, 0, 0, deadlineTimezone)
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



func AcceptSubmission() bool {
	status := Determine(nil)
	return status == Open
}

// the JSON dict how the frontend expects it
func ApiStatus() map[string]interface{} {
	status := Determine(nil)
	return map[string]interface{} {
		"open": status == Open,
		"status": status,
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
