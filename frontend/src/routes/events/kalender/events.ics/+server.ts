import type { RequestHandler } from './$types';
import { pb } from '$lib/pocketbase';
import { _imgSrc } from '../+page';
import { getImageMimeType } from '../image-mime';

const BASE_URL = 'https://smd-karlsruhe.de';

// DO NOT CHANGE THESE VALUES
// changing THESE may confuse calendar clients
const IMPLEMENTATION_DOMAIN = 'smd-karlsruhe.de';
const IMPLEMENTATION_ID = '20251017-implementation';

type RecordLike = {
    collectionId: string;
    collectionName: string;
    id: string;
    title?: string;
    title_en?: string;
    description?: string;
    description_en?: string;
    image: string;
    /** ISO-ish string (without "T" between date & time) */
    start_date_time: string;
    /** ISO-ish string (without "T" between date & time) */
    end_date_time?: string;
    location?: string;
    location_url?: string;
    speaker?: string;
    /** ISO-ish string (without "T" between date & time) */
    created: string;
    /** ISO-ish string (without "T" between date & time) */
    updated: string;
    category: string;
    [k: string]: any;
};

async function retrieveEvents(): Promise<RecordLike[]> {
    return await pb.collection('calendar').getFullList({
        sort: '+start_date_time',
        filter: `category!='german_bible_study'`
    });
}

function pad(num: number, size: number = 2): string {
    return String(num).padStart(size, '0');
}

function formatICSDate(d: Date): string {
    // RFC 5545: YYYYMMDDTHHMMSSZ (for UTC)
    return (
        d.getUTCFullYear().toString() +
        pad(d.getUTCMonth() + 1) +
        pad(d.getUTCDate()) +
        'T' +
        pad(d.getUTCHours()) +
        pad(d.getUTCMinutes()) +
        pad(d.getUTCSeconds()) +
        'Z'
    );
}

function escapeICSText(text: string): string {
    if (!text) return '';
    // RFC 5545: escape backslashes, semicolons, commas and newlines
    return text
        .trim()
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\r\n/g, '\\n')
        .replace(/\n/g, '\\n');
}

function foldICSLine(line: string, maxLen: number = 75): string[] {
    // RFC 5545: fold long lines by inserting CRLF + single space on continuations
    const out: string[] = [];
    let i = 0;
    while (i < line.length) {
        const chunk = line.slice(i, i + maxLen);
        out.push(chunk);
        i += maxLen;
    }
    if (out.length <= 1) return out;
    return [out[0], ...out.slice(1).map((l) => ' ' + l)];
}

type OptionalValue = string | null | undefined;
type DictValues = {
    [key: string]: OptionalValue;
};

function stringProperty(property: string, value: string): string {
    return `${property}:${escapeICSText(value)}`;
}

function optionalProperty(property: string, value: OptionalValue): string[] {
    return value ? [stringProperty(property, value)] : [];
}

function dateProperty(property: string, value: string): string {
    const dt = new Date(value);
    if (isNaN(dt.getTime())) throw new Error(`could not parse datetime value for property ${property}: ${value}`);
    return `${property}:${formatICSDate(dt)}`;
}

function languageProperty(
    property: string,
    values: DictValues,
    default_value: OptionalValue = undefined,
): string[] {
    const ret: string[] = [];
    for (const [lang, val] of Object.entries(values))
        if (val)
            ret.push(`${property};LANGUAGE=${lang}:${escapeICSText(val.trim())}`);
    ret.reverse()
    if (ret.length <= 0 && default_value)
        ret.push(stringProperty(property, default_value));
    return ret;
}

function renderDescription(description: OptionalValue, properties: DictValues): string {
    const descSections: string[] = [];
    if (description) descSections.push(description);
    const descProps: string[] = [];
    for (const [name, val] of Object.entries(properties))
        if (val)
            descProps.push(`${name}: ${val.trim()}`);
    if (descProps.length <= 0) descSections.push(descProps.join('\n'));
    return descSections.join('\n\n');
}

/**
 * Return only the VEVENT lines for the given record.
 */
function recordToVeventLines(record: RecordLike): string[] {
    let imageSrc = _imgSrc(record.image, record.id, record.collectionId, record.collectionName, record.category);
    if (imageSrc.startsWith("/")) imageSrc = `${BASE_URL}${imageSrc}`;

    const rawLines: string[] = [
        'BEGIN:VEVENT',
        // == RFC 5545 (https://datatracker.ietf.org/doc/html/rfc5545)
        // 3.8.1. Descriptive Component Properties
        ...optionalProperty("CATEGORIES", record.category),
        ...languageProperty("DESCRIPTION", {
            de: renderDescription(record.description, {
                Speaker: record.speaker,
                "Link zum Standort": record.location_url,
            }),
            en: renderDescription(record.description_en, {
                Speaker: record.speaker,
                "Link to Location": record.location_url,
            }),
        }),
        ...optionalProperty("LOCATION", record.location || record.location_url),
        ...languageProperty("SUMMARY", { de: record.title, en: record.title_en }, `Event ${record.id}`),
        // 3.8.2. Date and Time Component Properties
        dateProperty("DTSTART", record.start_date_time),
        dateProperty("DTEND", record.end_date_time || record.start_date_time),
        // 3.8.4. Relationship Component Properties
        stringProperty("URL", `${BASE_URL}/events/kalender/${record.id}`),
        stringProperty("UID", `${IMPLEMENTATION_ID}/${record.collectionId}/${record.id}@${IMPLEMENTATION_DOMAIN}`),
        // 3.8.7. Change Management Component Properties
        dateProperty("CREATED", record.created),
        dateProperty("DTSTAMP", record.updated),
        dateProperty("LAST-MODIFIED", record.updated),
        // == RFC 7986 (https://datatracker.ietf.org/doc/html/rfc7986)
        `IMAGE:VALUE=URI;DISPLAY=BADGE;FMTTYPE=${getImageMimeType(record.image)}:${imageSrc}`,
        // == RFC 9073 (https://datatracker.ietf.org/doc/html/rfc9073)
        // ===
        'END:VEVENT',
    ];

    // Fold lines and return as array
    const folded: string[] = [];
    for (const rl of rawLines) {
        folded.push(...foldICSLine(rl));
    }

    return folded;
}

export const GET: RequestHandler = async () => {
    const icsLines = [
        'BEGIN:VCALENDAR',
        // == RFC 5545 (https://datatracker.ietf.org/doc/html/rfc5545)
        'CALSCALE:GREGORIAN',
        stringProperty("PRODID", `-//${IMPLEMENTATION_DOMAIN}//${IMPLEMENTATION_ID}//DE`),
        'VERSION:2.0',
        // == RFC 7986 (https://datatracker.ietf.org/doc/html/rfc7986)
        ...languageProperty("NAME", { de: "SMD-KA Kalender", en: "SMD-KA Calendar" }),
        `REFRESH-INTERVAL;VALUE=DURATION:PT4H`,  // same as Cache-Control
        // https://learn.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-oxcical/1da58449-b97e-46bd-b018-a1ce576f3e6d
        // (this is older & some clients may only understand this one)
        stringProperty("X-WR-CALNAME", "SMD-KA Calendar"),
    ];
    const eventRecords = await retrieveEvents();
    for (const record of eventRecords) {
        icsLines.push(...recordToVeventLines(record))
    }
    icsLines.push(
        'END:VCALENDAR',
        '',  // end file with line ending
    )
    const ics = icsLines.join('\r\n');

    return new Response(ics, {
        headers: {
            'Content-Type': 'text/calendar; charset=utf-8',
            // inline usually prevents a forced download dialog in some browsers; keep file name for clients that inspect it
            'Content-Disposition': 'inline; filename="calendar.ics"',
            // optionally allow caching; adjust as needed
            'Cache-Control': 'public, max-age=14400'  // PT4H, same as REFRESH-INTERVAL
        }
    });
};
