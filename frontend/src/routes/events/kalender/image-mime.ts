/**
 * Small utilities to extract a file suffix and map it to a common image MIME type.
 * The lookup is optimized by building a mapping (object) from extensions -> mime at module init.
 */

type ImageMimeEntry = { exts: string[]; mime: string };

/** Configure common image MIME types here (add/remove as required) */
export const imageMimeConfig: ImageMimeEntry[] = [
    { exts: ['png'], mime: 'image/png' },
    { exts: ['jpg', 'jpeg', 'jpe'], mime: 'image/jpeg' },
    { exts: ['gif'], mime: 'image/gif' },
    { exts: ['webp'], mime: 'image/webp' },
    { exts: ['avif'], mime: 'image/avif' },
    { exts: ['svg'], mime: 'image/svg+xml' },
    { exts: ['bmp'], mime: 'image/bmp' },
    { exts: ['tif', 'tiff'], mime: 'image/tiff' },
    { exts: ['ico', 'cur'], mime: 'image/x-icon' }
];

/**
 * Build a fast lookup map from extension -> mime type.
 * Uses a plain object with no prototype to avoid accidental collisions.
 */
function buildImageMimeMap(config: ImageMimeEntry[]) {
    const map: Record<string, string> = Object.create(null);
    for (const entry of config) {
        for (const e of entry.exts) {
            map[e.toLowerCase()] = entry.mime;
        }
    }
    return map;
}

/** The fast lookup map used by getImageMimeType */
export const imageMimeMap = buildImageMimeMap(imageMimeConfig);

/**
 * Extracts the file suffix (extension) from a filename or URL.
 * - Strips query string and fragment.
 * - Returns the extension in lower-case (without the dot), or null if none.
 */
export function getFileSuffix(name: string): string | null {
    if (!name) return null;
    // remove query string and fragment
    const base = name.split(/[?#]/, 1)[0];
    const lastDot = base.lastIndexOf('.');
    if (lastDot <= 0 || lastDot === base.length - 1) return null; // no extension or hidden file like ".env"
    return base.slice(lastDot + 1).toLowerCase();
}

/**
 * Determine the image MIME type for a given filename/URL or a plain extension.
 * Uses the pre-built imageMimeMap for O(1) lookup.
 *
 * Accepts either:
 *  - a full filename or URL: "photo.JPG", "https://.../img.png?size=large"
 *  - or a raw extension: "jpg" or ".jpg"
 *
 * Returns the MIME string (e.g. "image/png") or null if not in the configured list.
 */
export function getImageMimeType(input: string): string | null {
    if (!input) return null;

    // if input starts with a dot, strip it
    const maybeExt = input.startsWith('.') ? input.slice(1) : input;
    // if it contains path/query/fragment, extract suffix; otherwise treat as extension
    const looksLikeName = /[\/.?#]/.test(maybeExt);
    const ext = looksLikeName ? getFileSuffix(maybeExt) : maybeExt.toLowerCase();

    if (!ext) return null;
    return imageMimeMap[ext] ?? null;
}

/* Example usage:

import { getFileSuffix, getImageMimeType, imageMimeMap } from './image-mime';

console.log(getFileSuffix('photo.jpeg')); // "jpeg"
console.log(getFileSuffix('https://example.com/a/b/c.png?x=1#foo')); // "png"
console.log(getFileSuffix('.env')); // null

console.log(getImageMimeType('avatar.PNG')); // "image/png"
console.log(getImageMimeType('.jpg')); // "image/jpeg"
console.log(getImageMimeType('unknown.ext')); // null

// You can inspect the built map:
console.log(imageMimeMap); // { png: 'image/png', jpg: 'image/jpeg', ... }

*/
