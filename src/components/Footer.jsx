import { useState } from "react";

export default function Footer() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <footer className="mt-16 border-t border-slate-200 dark:border-slate-800">
                <div className="container py-6 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-center sm:text-left">
                        © All rights reserved. Regione del Veneto Direzione Protezione Civile e Polizia Locale - Ufficio Pianificazione.
                    </p>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setOpen(true)}
                            className="underline hover:text-sky-600 dark:hover:text-sky-400 transition"
                        >
                            Informativa Privacy
                        </button>
                        <p className="text-center sm:text-right">
                            Developed with 🤍 by{" "}
                            <strong>
                                <a href="https://www.instagram.com/madgiirl99/" target="_blank" rel="noreferrer">
                                    MaDGiiRL
                                </a>
                            </strong>
                        </p>
                    </div>
                </div>
            </footer>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-slate-900 max-w-3xl w-full rounded-xl shadow-lg overflow-y-auto max-h-[90vh] p-6 relative">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                        >
                            ✕
                        </button>
                        <h2 className="text-lg font-bold mb-4">
                            Informativa privacy ai sensi dell’art. 13 del Regolamento (UE) 2016/679
                        </h2>

                        <div className="space-y-4 text-sm leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
                            <p>
                                Ai sensi e per gli effetti dell’art. 13 del Regolamento (UE) 2016/679 - relativo alla protezione
                                delle persone fisiche con riguardo al trattamento dei dati personali – ed in conformità alla normativa di riferimento nonché base giuridica del trattamento (Codice della Protezione civile, D. Lgs n. 1/2018, L.R. 13/2022 “Disciplina delle attività di protezione civile”).
                            </p>
                            <p>
                                La informiamo che i dati personali (nome, cognome, email, ecc.) da Lei conferiti – in qualità di operatore volontario della Protezione Civile o di referente di organizzazione di volontariato – saranno trattati secondo i principi di correttezza, liceità, trasparenza nonché nel rispetto della normativa applicabile – nazionale ed europea – in materia di tutela e protezione dei dati personali, per le finalità istituzionali di competenza della Direzione Protezione Civile, Sicurezza e Polizia Locale come previste dal D. Lgs. 1/2018, dalla L.R. 13/2022 e dai vigenti regolamenti regionali in materia.
                            </p>

                            <p>
                                <strong>Titolare del trattamento:</strong> Regione del Veneto / Giunta Regionale, con sede a Palazzo Balbi - Dorsoduro, 3901, 30123 – Venezia.
                            </p>
                            <p>
                                <strong>Delegato al trattamento:</strong> Direttore della Direzione Protezione Civile, Sicurezza e Polizia Locale, ai sensi della DGR n. 596 del 08.05.2018. <br />
                                Email:{" "}
                                <a href="mailto:protezionecivilepolizialocale@regione.veneto.it" className="underline text-sky-600 dark:text-sky-400">
                                    protezionecivilepolizialocale@regione.veneto.it
                                </a>{" "}
                                – PEC:{" "}
                                <a href="mailto:protezionecivilepolizialocale@pec.veneto.it" className="underline text-sky-600 dark:text-sky-400">
                                    protezionecivilepolizialocale@pec.veneto.it
                                </a>
                            </p>
                            <p>
                                <strong>Responsabile della Protezione dei dati / Data Protection Officer:</strong> Palazzo Sceriman, Cannaregio, 168, 30121 – Venezia. <br />
                                Email:{" "}
                                <a href="mailto:dpo@regione.veneto.it" className="underline text-sky-600 dark:text-sky-400">
                                    dpo@regione.veneto.it
                                </a>{" "}
                                – PEC:{" "}
                                <a href="mailto:dpo@pec.regione.veneto.it" className="underline text-sky-600 dark:text-sky-400">
                                    dpo@pec.regione.veneto.it
                                </a>
                            </p>

                            <h3 className="font-semibold mt-4">Natura dei dati trattati e finalità del trattamento</h3>
                            <p>I dati personali (nome, cognome, email, ecc.) saranno trattati al solo fine di consentire ad ogni socio volontario di:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    prestare il proprio servizio in qualità di operativo e consentire contestualmente – in relazione a domande di partecipazione a bandi, avvisi finalizzati all’ottenimento di contributi o rimborsi di cui agli artt.39 e 40 D. Lgs n. 1/2018 – all’Organizzazione di volontariato la concessione dei contributi di protezione civile di cui alle citate disposizioni normative.
                                </li>
                                <li>
                                    essere utilizzati altresì nell’ambito di accordi istituzionali con altre Autorità e componenti del servizio nazionale di protezione civile e funzionali allo svolgimento, da parte del conferente, dell’attività di volontario di protezione civile.
                                </li>
                            </ul>

                            <h3 className="font-semibold mt-4">Base giuridica del trattamento</h3>
                            <p>
                                La base giuridica del trattamento dei dati personali forniti, per le predette finalità, è costituita dal Suo consenso manifestato all’atto del conferimento dei dati stessi, nonché dalle disposizioni di legge e regolamentari relative al servizio nazionale di protezione civile.
                            </p>

                            <h3 className="font-semibold mt-4">Facoltatività del conferimento dei dati e conseguenze del rifiuto</h3>
                            <p>
                                Il conferimento dei dati personali non è obbligatorio: tuttavia il mancato, parziale o inesatto conferimento degli stessi comporterà l’impossibilità di utilizzare i predetti dati per le sopra indicate finalità.
                            </p>

                            <h3 className="font-semibold mt-4">Periodo di conservazione dei dati</h3>
                            <p>
                                I dati personali saranno conservati per un periodo di tempo non superiore al raggiungimento della summenzionata finalità, salvo che la legge e/o la normativa di settore preveda un diverso periodo di conservazione degli stessi.
                            </p>

                            <h3 className="font-semibold mt-4">Comunicazione dei dati</h3>
                            <p>
                                I dati personali (ovvero i dati riguardanti i volontari della protezione civile) potranno essere comunicati alle Autorità e ai Componenti del servizio Nazionale di Protezione Civile ove funzionali alle attività istituzionali della Direzione Protezione Civile, Sicurezza e Polizia Locale e allo svolgimento, da parte del conferente, dell’attività di volontario di protezione civile.
                            </p>
                            <p>I dati non saranno trasferiti all’estero.</p>

                            <h3 className="font-semibold mt-4">Modalità del trattamento dei dati</h3>
                            <p>
                                Il trattamento dei dati personali conferiti sarà effettuato sia con l’ausilio di strumenti informatici - idonei a garantire la sicurezza e la riservatezza dei dati trattati – che senza l’ausilio di detti strumenti (trattamento cartaceo).
                            </p>
                            <p>
                                Il predetto trattamento, inoltre, in ottemperanza alla normativa applicabile in materia di protezione e tutela dei dati personali, è svolto da soggetti/addetti appositamente autorizzati ed ai quali sono state fornite le opportune istruzioni operative in materia di tutela dei dati personali.
                            </p>

                            <h3 className="font-semibold mt-4">Diritti degli interessati</h3>
                            <p>
                                Relativamente al trattamento dei dati personali, l’interessato potrà esercitare, in qualsiasi momento, i diritti previsti dagli artt. 15 e ss. del Regolamento (UE) 2016/679. Fra questi, ed in conformità con quanto previsto dalla normativa europea, la cancellazione dei dati - che potrà essere chiesta in qualsiasi momento - così come anche la revoca del consenso, senza pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca.
                            </p>
                            <p>
                                Per l’esercizio dei propri diritti l’interessato (utilizzando il modulo pubblicato sul sito del Garante per la protezione dei dati personali all’indirizzo:{" "}
                                <a href="https://www.garanteprivacy.it" className="underline text-sky-600 dark:text-sky-400">
                                    https://www.garanteprivacy.it
                                </a>
                                ) potrà inoltrare le relative richieste al Titolare del trattamento (anche per il tramite del Responsabile della protezione dei dati “RDP” o – dall’acronimo inglese – “DPO”).
                            </p>
                            <p>
                                L’interessato - qualora ritenga che nel trattamento dei dati personali si sia verificata una violazione a quanto previsto dal Regolamento (UE) 2016/679 - ha il diritto di proporre reclamo al Garante per la protezione dei dati personali (con sede in Roma Piazza Venezia, 11 – 00187), come previsto dall’art. 77 del citato Regolamento, seguendo le procedure e le indicazioni pubblicate sul sito ufficiale dell’Autorità:{" "}
                                <a href="https://www.garanteprivacy.it" className="underline text-sky-600 dark:text-sky-400">
                                    www.garanteprivacy.it
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
