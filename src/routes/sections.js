import {
    Shield, Database, BookOpenCheck, Search, Phone, Siren, Truck, Wrench,
    FileSpreadsheet, Map as MapIcon, BookMarked, Users, ClipboardList, Activity, BadgeCheck,
    Building2, Syringe, Factory, IdCard, GraduationCap, Flame, Wallet2, Waves,
    CreditCard, LineChart, Mountain, UserCog, FileChartColumnIncreasing,
    PhoneCall, Landmark, MapPinned, BarChart3
} from "lucide-react";

const rawTitles = [
    "GESTIONE ALBO ORGANIZZAZIONI",
    "CONSULTAZIONE ALBO ORGANIZZAZIONI",
    "GESTIONE PIANI COMUNALI",
    "CALL",
    "ATTIVAZIONI 2.0",
    "GESTIONE MEZZI E ATTREZZATURE",
    "MANUTENZIONE DEL SITO",
    "SCHEDE SINTETICHE COMUNALI",
    "RUBRICA TELEFONICA",
    "RICERCA ATTIVAZIONI",
    "SEGNALAZIONI",
    "BOLLO AUTO",
    "RISCHIO VALANGHE",
    "PRESENZA VOLONTARI",
    "GESTIONE SQUADRE OPERATIVE",
    "PERCEZIONE SISMICA",
    "ACCREDITAMENTO SMART GESTIONE EMERGENZE",
    "SCHEDA ENTE",
    "DIGHE",
    "GESTIONE EMERGENZE",
    "CENSIMENTO VACCINI GESTIONE ACCREDITAMENTI",
    "ACCREDITAMENTI",
    "DESTIONE ODV",
    "STATISCHE ACCEDITAMENTI",
    "PERCEZIONE SISMICA",
    "ACCREDITAMENTO SMART",
    "AZIENDE A RISCHIO INCIDENTE RILEVANTE",
    "ANAGRAFICA VOLONTARI",
    "GESTIONE FORMAZIONE",
    "AIB SINTETICO",
    "GESTIONE RIMBORSI",
    "PUNTI DI MONITORAGGIO",
    "SPESE RIPRISTICO OCDPC 1029/2023",
    "ACCREDITAMENTO VVF",
    "STATISTICHE",
    "SPESE RIPRISTINO"
];

const baseSlug = (s) =>
    s.toLowerCase()
        .replaceAll("à", "a").replaceAll("è", "e").replaceAll("é", "e").replaceAll("ì", "i").replaceAll("ò", "o").replaceAll("ù", "u")
        .replace(/[^\w\s-\.]/g, "")
        .replaceAll(".", "") // rimuove eventuali punti (es. 2.0)
        .trim()
        .replace(/\s+/g, "-");

// converte "GESTIONE ALBO ORGANIZZAZIONI" → "Gestione albo organizzazioni"
const toSentenceCase = (str) => {
    if (!str) return "";
    const lower = str.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
};

const ensureUniqueSlugs = (titles) => {
    const seen = new Map();
    return titles.map((title) => {
        let slug = baseSlug(title);
        if (seen.has(slug)) {
            const count = seen.get(slug) + 1;
            seen.set(slug, count);
            slug = `${slug}-${count}`;
        } else {
            seen.set(slug, 1);
        }
        return { title: toSentenceCase(title), slug };
    });
};

export const sections = ensureUniqueSlugs(rawTitles);

const iconMap = new Map([
    ["gestione-albo-organizzazioni", Database],
    ["consultazione-albo-organizzazioni", BookOpenCheck],
    ["gestione-piani-comunali", MapIcon],
    ["call", PhoneCall],
    ["attivazioni-20", Siren],
    ["gestione-mezzi-e-attrezzature", Truck],
    ["manutenzione-del-sito", Wrench],
    ["schede-sintetiche-comunali", BookMarked],
    ["rubrica-telefonica", Phone],
    ["ricerca-attivazioni", Search],
    ["segnalazioni", Landmark],
    ["bollo-auto", CreditCard],
    ["rischio-valanghe", Mountain],
    ["presenza-volontari", Users],
    ["gestione-squadre-operative", UserCog],
    ["percezione-sismica", Activity],
    ["accreditamento-smart-gestione-emergenze", BadgeCheck],
    ["scheda-ente", FileSpreadsheet],
    ["dighe", Waves],
    ["gestione-emergenze", Shield],
    ["censimento-vaccini-gestione-accreditamenti", Syringe],
    ["accreditamenti", IdCard],
    ["destione-odv", ClipboardList],
    ["statische-acceditamenti", BarChart3],
    ["accreditamento-smart", BadgeCheck],
    ["aziende-a-rischio-incidente-rilevante", Factory],
    ["anagrafica-volontari", Users],
    ["gestione-formazione", GraduationCap],
    ["aib-sintetico", Flame],
    ["gestione-rimborsi", Wallet2],
    ["punti-di-monitoraggio", MapPinned],
    ["spese-ripristico-ocdpc-10292023", FileChartColumnIncreasing],
    ["accreditamento-vvf", Building2],
    ["statistiche", LineChart],
    ["spese-ripristino", Wallet2],
]);

export const getIconFor = (slug) => iconMap.get(slug) || Shield;
