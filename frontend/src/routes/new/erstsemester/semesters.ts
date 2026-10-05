import dayjs from 'dayjs';

/**
 * (values usable for sorting)
 */
export enum SemesterKind {
	Summer = 'SS',
	Winter = 'WS'
}

/**
 * texts per semester kind;
 * to be filled in Svelte files due to language dependency
 */
export interface SemesterKindTexts {
	breakName: string;
	semesterNoun: string;
	planningMonths: string;
}

/** key of semester, format: "<year>-<SemesterKind>", e.g. "2026-WS" */
type SemesterKey = `${number}-${SemesterKind}`;

interface DehydratedSemester {
	/** as ISO string: "YYYY-MM-DD" */
	lectureStart: string;
	/** as ISO string: "YYYY-MM-DD" */
	lectureEnd: string;
}

/**
 * semester data available to frontend
 */
export interface Semester {
	key: SemesterKey;
	/** WS 2026/27 → 2026; SS 2027 → 2027 */
	start_year: number;
	kind: SemesterKind;
	lectureStart: Date;
	lectureEnd: Date;
}

/**
 * Semester data for KIT
 *
 * Source: https://www.sle.kit.edu/imstudium/termine-fristen.php
 */
const KIT_SEMESTER: Record<SemesterKey, DehydratedSemester> = {
	'2025-WS': {
		lectureStart: '2025-10-13',
		lectureEnd: '2026-02-14',
	},
	'2026-SS': {
		lectureStart: '2026-04-20',
		lectureEnd: '2026-08-01',
	},
	'2026-WS': {
		lectureStart: '2026-10-26',
		lectureEnd: '2027-02-20',
	},
	'2027-SS': {
		lectureStart: '2027-04-19',
		lectureEnd: '2027-07-31',
	},
	'2027-WS': {
		lectureStart: '2027-10-25',
		lectureEnd: '2028-02-19',
	},
	'2028-SS': {
		lectureStart: '2028-04-18',
		lectureEnd: '2028-07-29',
	}
};

/**
 * sorted list of all semester keys
 */
const SEMESTER_KEYS = (Object.keys(KIT_SEMESTER) as SemesterKey[]).sort();

/**
 * looks up a semester by its key
 */
export function lookupSemester(key: SemesterKey): Semester {
	const [yearStr, kind] = key.split('-') as [string, SemesterKind];
	const data = KIT_SEMESTER[key];
	return {
		key,
		start_year: Number(yearStr),
		kind,
		lectureStart: dayjs(data.lectureStart).toDate(),
		lectureEnd: dayjs(data.lectureEnd).toDate(),
	};
}

/**
 * Returns current semester, from perspective of lecture end date.
 */
export function currentSemester(now: Date): Semester {
	for (const key of SEMESTER_KEYS) {
		const s = lookupSemester(key);
		const end = dayjs(s.lectureEnd).endOf('day');
		if (dayjs(now).isBefore(end)) return s;
	}
	return lookupSemester(SEMESTER_KEYS[SEMESTER_KEYS.length - 1]);
}
