import { writable } from 'svelte/store';

export const headerImageHeight = writable<number>(0);

export const calendarEvents = writable<any[]>([]);
