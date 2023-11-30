import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
    const date = parseISO(dateStr);

    const formattedDate = format(date, "dd 'de' MMMM 'a las' hh:mm:ss a", { locale: es });

    return formattedDate;
}

export const getRelativeTime = (dateStr: string, lang: string) => {
    const date = new Date(dateStr);
    const timeMs = date.getTime();

    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

    const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];

    const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];

    const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));

    const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
    return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
};
