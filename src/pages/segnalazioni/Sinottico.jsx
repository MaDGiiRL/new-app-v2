import React from "react";
import PageShell from "../../components/_PageShell";
import { Home, MapPin, Phone, FolderOpen, List, PictureInPicture2, Building2, Info } from "lucide-react";

function cn(...c) {
  return c.filter(Boolean).join(" ");
}

function Card({ className, ...p }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800/70 dark:bg-slate-900/60",
        className
      )}
      {...p}
    />
  );
}

function Section({ title, href, children, className }) {
  return (
    <Card className={cn("content-box-large", className)}>
      <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <h3 className="panel-title text-base font-semibold text-slate-800 dark:text-slate-100">
          {href ? (
            <a href={href} className="hover:underline">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
      </div>
      <div className="panel-body p-4">{children}</div>
    </Card>
  );
}

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800/40">
          <tr>
            {head.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-medium text-slate-700 dark:text-slate-200">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="border-t border-slate-200 dark:border-slate-700">
              {r.map((c, ci) => (
                <td key={ci} className="px-3 py-2 align-top">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Sinottico() {
  // Dati mock per le tabelle (replica della struttura PHP)
  const province = ["BL", "PD", "RO", "TV", "VE", "VI", "VR"];

  const salaOpHead = [
    "Stato",
    ...province.map((p) => (
      <a key={p} href={`stato_sala_op.php?provincia=${province.indexOf(p) + 1}`} className="text-blue-600 hover:underline">
        {p}
      </a>
    )),
  ];

  const salaOpRows = [
    [
      <a href="stato_sala_op.php?stato=chiusa&provincia=0" className="text-blue-600 hover:underline">chiusa</a>,
      <a href="stato_sala_op.php?stato=chiusa&provincia=1">54</a>,
      <a href="stato_sala_op.php?stato=chiusa&provincia=2">96</a>,
      <a href="stato_sala_op.php?stato=chiusa&provincia=3">46</a>,
      <a href="stato_sala_op.php?stato=chiusa&provincia=4">72</a>,
      <a href="stato_sala_op.php?stato=chiusa&provincia=5">28</a>,
      <a href="stato_sala_op.php?stato=chiusa&provincia=6">108</a>,
      <a href="stato_sala_op.php?stato=chiusa&provincia=7">98</a>,
    ],
    [
      <a href="stato_sala_op.php?stato=aperta orario diurno&provincia=0" className="text-blue-600 hover:underline">aperta orario diurno</a>,
      <a href="stato_sala_op.php?stato=aperta orario diurno&provincia=1">2</a>,
      <a href="stato_sala_op.php?stato=aperta orario diurno&provincia=2">2</a>,
      <a href="stato_sala_op.php?stato=aperta orario diurno&provincia=3">2</a>,
      <a href="stato_sala_op.php?stato=aperta orario diurno&provincia=4">5</a>,
      <a href="stato_sala_op.php?stato=aperta orario diurno&provincia=5">1</a>,
      <a href="stato_sala_op.php?stato=aperta orario diurno&provincia=6">3</a>,
      <a href="stato_sala_op.php?stato=aperta orario diurno&provincia=7"></a>,
    ],
    [
      <a href="stato_sala_op.php?stato=aperta h24&provincia=0" className="text-blue-600 hover:underline">aperta h24</a>,
      <a href="stato_sala_op.php?stato=aperta h24&provincia=1">4</a>,
      <a href="stato_sala_op.php?stato=aperta h24&provincia=2">3</a>,
      <a href="stato_sala_op.php?stato=aperta h24&provincia=3">2</a>,
      <a href="stato_sala_op.php?stato=aperta h24&provincia=4">17</a>,
      <a href="stato_sala_op.php?stato=aperta h24&provincia=5">15</a>,
      <a href="stato_sala_op.php?stato=aperta h24&provincia=6">2</a>,
      <a href="stato_sala_op.php?stato=aperta h24&provincia=7"></a>,
    ],
  ];

  const vvfHead = ["Interventi", ...province];
  const vvfRows = [["numero interventi", ...province.map(() => "")]];

  const eventiHead = [
    "Stato",
    ...province.map((p) => (
      <a key={p} href={`eventi.php?provincia=${province.indexOf(p) + 1}`} className="text-blue-600 hover:underline">
        {p}
      </a>
    )),
  ];
  const eventiRows = [
    [
      <a href="eventi.php?evento_segnalato=Allagamento&provincia=0" className="text-blue-600 hover:underline">Allagamento</a>,
      "",
      <a href="eventi.php?evento_segnalato=Allagamento&provincia=2">1</a>,
      <a href="eventi.php?evento_segnalato=Allagamento&provincia=3">3</a>,
      "",
      <a href="eventi.php?evento_segnalato=Allagamento&provincia=5">3</a>,
      "",
      "",
    ],
  ];

  const volontHead = [
    "Stato",
    ...province.map((p) => (
      <a key={p} href={`volontari_provincia.php?provincia=${province.indexOf(p) + 1}`} className="text-blue-600 hover:underline">
        {p}
      </a>
    )),
  ];
  const volontRows = [
    [
      <a href="volontari_provincia.php?stato=Attivate&provincia=0" className="text-blue-600 hover:underline">Attivate</a>,
      <a href="volontari_provincia.php?stato=Attivate&provincia=1">2</a>,
      <a href="volontari_provincia.php?stato=Attivate&provincia=2">3</a>,
      <a href="volontari_provincia.php?stato=Attivate&provincia=3">16</a>,
      <a href="volontari_provincia.php?stato=Attivate&provincia=4">11</a>,
      <a href="volontari_provincia.php?stato=Attivate&provincia=5">7</a>,
      <a href="volontari_provincia.php?stato=Attivate&provincia=6">12</a>,
      <a href="volontari_provincia.php?stato=Attivate&provincia=7">2</a>,
    ],
  ];

  const capHead = ["Stato", ...province.map((p) => (
    <a key={p} href={`stato_sala_op.php?provincia=${province.indexOf(p) + 1}`} className="text-blue-600 hover:underline">
      {p}
    </a>
  ))];
  const capRows = [[]];

  return (
    <PageShell title="Sinottico">
      {/* RIGA 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Situazione COC + mappa */}
        <Section title={<a href="tab_riassuntiva.php" className="hover:underline">Situazione Centri Operativi Comunali</a>}>
          <Table head={salaOpHead} rows={salaOpRows} />
          <iframe
            src="https://gestionale.supportopcveneto.it/segnalazioni/mappa_sale_operative.php"
            width="100%"
            height="280"
            scrolling="no"
            title="Mappa stato COC"
            className="mt-3 rounded-lg border border-slate-200 dark:border-slate-700"
          />
        </Section>

        {/* Interventi VVF + mappa */}
        <Section title={<a href="tab_riassuntiva.php" className="hover:underline">Interventi VVF di interesse</a>}>
          <Table head={vvfHead} rows={vvfRows} />
          <iframe
            src="https://gestionale.supportopcveneto.it/segnalazioni/mappa_interventi_vvf.php"
            width="100%"
            height="280"
            scrolling="no"
            title="Mappa Interventi VVF"
            className="mt-3 rounded-lg border border-slate-200 dark:border-slate-700"
          />
        </Section>
      </div>

      {/* RIGA 2 */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Eventi segnalati + mappa */}
        <Section title={<a href="eventi.php?" className="hover:underline">Eventi segnalati</a>}>
          <Table head={eventiHead} rows={eventiRows} />
          <iframe
            src="https://gestionale.supportopcveneto.it/segnalazioni/mappa_eventi.php"
            width="100%"
            height="280"
            scrolling="no"
            title="Mappa Eventi"
            className="mt-3 rounded-lg border border-slate-200 dark:border-slate-700"
          />
        </Section>

        {/* Squadre volontariato + mappa */}
        <Section title={<a href="volontari_provincia.php" className="hover:underline">Squadre volontariato attivate</a>}>
          <Table head={volontHead} rows={volontRows} />
          <iframe
            src="https://gestionale.supportopcveneto.it/segnalazioni/mappa_zone_attivita.php"
            width="100%"
            height="280"
            scrolling="no"
            title="Mappa attività organizzazioni"
            className="mt-3 rounded-lg border border-slate-200 dark:border-slate-700"
          />
        </Section>
      </div>

      {/* RIGA 3 */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Cluster CAP VVF + mappa */}
        <Section title={<a href="tab_riassuntiva.php" className="hover:underline">Cluster CAP VVF</a>}>
          <Table head={capHead} rows={capRows} />
          <iframe
            src="https://gestionale.supportopcveneto.it/segnalazioni/mappa_cap_vvf.php"
            width="100%"
            height="280"
            scrolling="no"
            title="Mappa cluster CAP VVF"
            className="mt-3 rounded-lg border border-slate-200 dark:border-slate-700"
          />
        </Section>

        {/* Presenza volontari (giallo <10, verde >=10) + mappa */}
        <Section title={<a href="tab_riassuntiva.php" className="hover:underline">Presenza volontari (giallo &lt; 10 vol, verde ≥ 10 vol)</a>}>
          <iframe
            src="https://gestionale.supportopcveneto.it/segnalazioni/mappa_zone_accreditamento.php"
            width="100%"
            height="280"
            scrolling="no"
            title="Mappa presenza volontari"
            className="rounded-lg border border-slate-200 dark:border-slate-700"
          />
        </Section>
      </div>
    </PageShell>
  );
}