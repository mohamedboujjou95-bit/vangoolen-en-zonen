import type {
  GildeService,
  GildeTarief,
  Review,
  FaqItem,
  GildeBelofte,
  Stat,
  NavItem,
  OpeningHour,
} from "@/types";

// ─── Navigation ────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "Diensten",       href: "/diensten" },
  { label: "Tarieven",       href: "/#tarieven" },
  { label: "Word Partner",   href: "/partners" },
  { label: "Contact",        href: "/contact" },
];

export const PHONE_NUMBER     = "020 – 123 45 67";
export const PHONE_HREF        = "tel:+31201234567";
export const EMAIL             = "gilde@vangoolen.nl";
export const EMERGENCY_LABEL   = "24/7 Spoed";

// ─── Gildetarieven (exact from bedrijfsplan p.2) ────────────────
export const GILDE_TARIEVEN: GildeTarief[] = [
  {
    service:        "Lekkage Opsporen & Dichten",
    serviceId:      "lekkage",
    vastTarief:     149,
    vervolgtarief:  35,
    unit:           "incl. eerste 30 min.",
  },
  {
    service:        "Acute Rioolverstopping",
    serviceId:      "verstopping",
    vastTarief:     165,
    vervolgtarief:  35,
    unit:           "incl. eerste 30 min.",
  },
  {
    service:        "Cv-Ketel Storingsdiagnose",
    serviceId:      "cv-storing",
    vastTarief:     155,
    vervolgtarief:  35,
    unit:           "incl. eerste 30 min.",
  },
];

// ─── Services ──────────────────────────────────────────────────
export const SERVICES: GildeService[] = [
  {
    id:          "lekkage",
    title:       "Lekkage & Wateroverlast",
    subtitle:    "Opsporen en direct dichten",
    description:
      "Een lekkage kan binnen minuten tot ernstige waterschade leiden. Onze gilde-loodgieters traceren de bron met professionele lekdetectie en herstellen leidingbreuken definitief — bij het eerste bezoek.",
    iconName:    "Droplets",
    basePrice:   149,
    continuationRate: 35,
    responseTime:"< 2 uur",
    features: [
      "Lekdetectie met professionele apparatuur",
      "Directe afsluiting watertoevoer",
      "Definitief herstel leidingbreuk",
      "Schriftelijk rapport met garantie",
    ],
    slug: "lekkage",
  },
  {
    id:          "verstopping",
    title:       "Riool & Afvoerverstopping",
    subtitle:    "Ontstopping met gestandaardiseerde apparatuur",
    description:
      "Verstopte riolen, toiletten of afvoeren zijn vervelend en kunnen escaleren. Met gestandaardiseerde hogedruk-sproeiapparatuur lossen onze vaklui 95% van alle verstoppingen direct op.",
    iconName:    "Waves",
    basePrice:   165,
    continuationRate: 35,
    responseTime:"< 2 uur",
    features: [
      "Hogedruk-spoelapparatuur",
      "Camera-inspectie bij complexe gevallen",
      "Vette verstoppingen en wortelingroei",
      "Preventief advies achteraf",
    ],
    slug: "verstopping",
  },
  {
    id:          "cv-storing",
    title:       "Cv-Ketel & Verwarming",
    subtitle:    "Acute storing-diagnose en herstel",
    description:
      "Geen verwarming of warm water is onacceptabel, zeker in de winter. Onze gilde-loodgieters diagnosticeren elke storing en repareren of vervangen appendages direct vanuit de volledig uitgeruste bedrijfsbus.",
    iconName:    "Flame",
    basePrice:   155,
    continuationRate: 35,
    responseTime:"< 2 uur",
    features: [
      "Storing-uitlezing alle merken ketels",
      "Vervanging onderdelen uit vlootvoorraad",
      "Bijvullen cv-installatie",
      "Keuring en onderhoudsadvies",
    ],
    slug: "cv-storing",
  },
];

// ─── Drie Gilde Beloften (from bedrijfsplan) ───────────────────
export const GILDE_BELOFTEN: GildeBelofte[] = [
  {
    number:      "I",
    title:       "Altijd Binnen 2 Uur",
    description: "Onze dichtstbijzijnde gilde-loodgieter is binnen twee uur aan uw deur, ook in het weekend en op feestdagen.",
    iconName:    "Clock",
  },
  {
    number:      "II",
    title:       "Vooraf Vaste Prijs",
    description: "U weet exact wat u betaalt vóórdat wij beginnen. Vaste gildetarieven, geen verborgen toeslagen, geen verrassingen achteraf.",
    iconName:    "ShieldCheck",
  },
  {
    number:      "III",
    title:       "Erkende Vakmannen",
    description: "Elk lid van ons gilde is gecertificeerd, beëdigd en gecontroleerd. Alleen de beste vaklui dragen de naam Van Goolen.",
    iconName:    "Award",
  },
];

// ─── Stats ─────────────────────────────────────────────────────
export const STATS: Stat[] = [
  { value: "4.900+", label: "Klussen voltooid",      icon: "CheckCircle" },
  { value: "97%",    label: "First Time Fix Rate",    icon: "Wrench" },
  { value: "< 75",   label: "Minuten gem. reactietijd", icon: "Clock" },
  { value: "4.8 / 5",label: "Klantbeoordeling",      icon: "Star" },
];

// ─── Reviews ───────────────────────────────────────────────────
export const REVIEWS: Review[] = [
  {
    id:      "1",
    author:  "Marianne van der Berg",
    location:"Amsterdam-Zuid",
    rating:  5,
    text:    "Na middernacht een gesprongen leiding onder de keuken. Binnen 55 minuten was er een vriendelijke loodgieter aan de deur. Alles definitief gerepareerd, vaste prijs zoals beloofd. Indrukwekkend.",
    service: "Lekkage & Wateroverlast",
    date:    "maart 2024",
  },
  {
    id:      "2",
    author:  "Peter Hoogenbosch",
    location:"Utrecht Centrum",
    rating:  5,
    text:    "Cv-ketel kapot op een vrijdagavond in december. Van Goolen & Zonen had hem binnen het uur gerepareerd. De monteur legde rustig uit wat er mis was en wat het kostte. Zo werkt het dus.",
    service: "Cv-Ketel Storing",
    date:    "december 2023",
  },
  {
    id:      "3",
    author:  "Yolanda Smits",
    location:"Rotterdam Noord",
    rating:  5,
    text:    "Toilet verstopt op zondag middag. Ik verwachtte gedoe, maar het was gewoon geregeld in 35 minuten. Het gilde-certificaat op de bus geeft gelijk vertrouwen. Aanrader.",
    service: "Rioolverstopping",
    date:    "februari 2024",
  },
  {
    id:      "4",
    author:  "Klaas-Jan Fontein",
    location:"Den Haag Centrum",
    rating:  5,
    text:    "Eindelijk een loodgieter die gewoon zegt wat het kost voordat hij begint. Helder, snel en netjes. De bus stond binnen een uur voor de deur. Dit is hoe het hoort.",
    service: "Lekkage & Wateroverlast",
    date:    "april 2024",
  },
  {
    id:      "5",
    author:  "Ingrid de Boer",
    location:"Haarlem",
    rating:  5,
    text:    "Professioneel van begin tot eind. Nette monteur, duidelijke communicatie, netjes achtergelaten. Het verschil met de vorige spoedloodgieter (die ik nooit meer bel) is dag en nacht.",
    service: "Cv-Ketel Storing",
    date:    "januari 2024",
  },
];

// ─── FAQ ───────────────────────────────────────────────────────
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "1",
    question: "Wat zijn uw gildetarieven en zijn er extra kosten?",
    answer:
      "Onze tarieven zijn vooraf volledig transparant: Lekkage € 149,–, Verstopping € 165,–, Cv-storing € 155,– — allemaal inclusief de eerste 30 minuten arbeid. Na 30 minuten geldt € 35,– per 15 minuten. Er zijn géén voorrijkosten, géén nachttoeslagen en géén verborgen kosten. U betaalt exact wat wij vooraf communiceren.",
  },
  {
    id: "2",
    question: "Hoe snel bent u bij mij?",
    answer:
      "Onze gemiddelde reactietijd is 75 minuten, maar wij garanderen altijd aankomst binnen 2 uur. Ons dispatch-systeem wijst automatisch de dichtstbijzijnde vrije gilde-loodgieter toe. Bij de postcode-check in ons boekingsformulier ziet u direct de actuele beschikbaarheid in uw regio.",
  },
  {
    id: "3",
    question: "Werken jullie ook 's nachts, in het weekend en op feestdagen?",
    answer:
      "Ja, absolute. Van Goolen & Zonen is 365 dagen per jaar, 24 uur per dag beschikbaar. Een waterlekkage stopt niet voor feestdagen en wij ook niet. Er zijn géén extra toeslagen voor avond-, nacht- of weekendwerk.",
  },
  {
    id: "4",
    question: "Zijn jullie loodgieters gecertificeerd?",
    answer:
      "Alle gilde-loodgieters zijn gecertificeerd met een erkend vakdiploma, gescreend op communicatieve vaardigheden en beëdigd als gilde-partner. Zij werken uitsluitend met hoogwaardig materieel. Ons Gilde-Keurmerk staat garant voor vakmanschap.",
  },
  {
    id: "5",
    question: "Hoe wordt er afgerekend?",
    answer:
      "Direct na afronding van de klus rekent u af aan de deur via een mobiel pinapparaat of QR-code betaling. Er is geen factuur achteraf en geen onzekerheid over het bedrag — u ziet de eindrekening vóór u akkoord gaat.",
  },
  {
    id: "6",
    question: "In welke gebieden zijn jullie actief?",
    answer:
      "Wij bedienen momenteel de Randstad en grote steden: Amsterdam, Rotterdam, Den Haag, Utrecht, Haarlem, Leiden, Delft, Zoetermeer en de omliggende gemeenten. Voer uw postcode in via ons boekingsformulier voor directe bevestiging van beschikbaarheid in uw gebied.",
  },
  {
    id: "7",
    question: "Wat als het probleem bij het eerste bezoek niet opgelost wordt?",
    answer:
      "Dankzij onze volledig gestandardiseerde en rijkelijk uitgeruste bedrijfsbussen lossen wij 97% van alle acute problemen direct op. Mocht een zeer uitzonderlijk geval toch meer werk vereisen, overleggen wij dit vooraf met u en plannen wij een vervolg-afspraak zonder extra voorrijkosten.",
  },
];

// ─── Opening Hours ─────────────────────────────────────────────
export const OPENING_HOURS: OpeningHour[] = [
  { day: "Maandag – Vrijdag", hours: "24 uur per dag" },
  { day: "Zaterdag",           hours: "24 uur per dag" },
  { day: "Zondag",             hours: "24 uur per dag" },
  { day: "Feestdagen",         hours: "24 uur per dag" },
];

// ─── Service area postcodes (simplified) ──────────────────────
export const SERVICE_AREA_PREFIXES = [
  // Amsterdam
  "10","11","12","13","14","15","16","17","18","19",
  // Rotterdam
  "20","21","22","23","24","25","26","27","28","29","30","31","32",
  // Den Haag
  "25","26","27",
  // Utrecht
  "34","35","36","37",
  // Haarlem
  "20","21",
  // Leiden
  "23",
  // Delft
  "26",
];
