"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProveukeModal } from "./ProveukeModal";
import { OptimizedImage } from "./ui/optimized-image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowRight, Calendar, MapPin, Clock, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

interface FirstTrainingGuideProps {
  id?: string;
}

type DisciplineFilter = "all" | "bjj" | "muaythai" | "ct" | "kids";

export function FirstTrainingGuide({ id = "forste-trening" }: FirstTrainingGuideProps) {
  const { t, locale } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<DisciplineFilter>("all");

  const disciplines = [
    {
      key: "bjj" as const,
      anchorId: "bjj",
      num: "01",
      title: "Brasiliansk Jiu-Jitsu (BJJ)",
      subtitle:
        locale === "en"
          ? "Gi & No-Gi · Ground fighting, technique & self-defense"
          : locale === "pl"
          ? "Gi & No-Gi · Walka w parterze, technika i samoobrona"
          : locale === "uk"
          ? "Gi & No-Gi · Боротьба в партері, техніка та самооборона"
          : "Gi & No-Gi · Bakkekamp, teknikk & selvforsvar",
      room:
        locale === "en"
          ? "Room 1 & Room 2 (Mats)"
          : locale === "pl"
          ? "Sala 1 i Sala 2 (Mata)"
          : locale === "uk"
          ? "Зал 1 та Зал 2 (Татамі)"
          : "Sal 1 & Sal 2 (Matter)",
      image: "/images/club/group-class.jpg",
      accentBorder: "border-l-4 border-l-indigo-500",
      badgeClass: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
      modalDiscipline: "BJJ (Brasiliansk Jiu-Jitsu)",
      modalCategory: "Voksen / Ungdom (fra 14 år)",
      items: [
        {
          step: "01",
          label:
            locale === "en"
              ? "Footwear"
              : locale === "pl"
              ? "Obuwie"
              : locale === "uk"
              ? "Взуття"
              : "Skotøy",
          headline:
            locale === "en"
              ? "Barefoot on the mat"
              : locale === "pl"
              ? "Boso na macie"
              : locale === "uk"
              ? "Босоніж на татамі"
              : "Barbent på matta",
          detail:
            locale === "en"
              ? "All training on the mats is barefoot. Bring flip-flops/sandals for walking between the locker room and the mat edge."
              : locale === "pl"
              ? "Na macie trenujemy wyłącznie boso. Weź klapki na przejście z szatni do brzegu maty."
              : locale === "uk"
              ? "На татамі тренуємося босоніж. Візьміть капці для переходу з роздягальні до краю татамі."
              : "All trening på mattene skjer barbent. Ta gjerne med slippers eller innesandaler til å gå mellom garderoben og mattekanten.",
        },
        {
          step: "02",
          label:
            locale === "en"
              ? "Clothing & Loaner Gi"
              : locale === "pl"
              ? "Strój i kimono (Gi)"
              : locale === "uk"
              ? "Одяг та кімоно (Gi)"
              : "Klær & Låne-Gi",
          headline:
            locale === "en"
              ? "Workout clothes without zippers or pockets"
              : locale === "pl"
              ? "Odzież bez zamków i kieszeni"
              : locale === "uk"
              ? "Одяг без блискавок і кишень"
              : "Treningstøy uten glidelås eller lommer",
          detail:
            locale === "en"
              ? "Wear a fitted t-shirt (or rashguard) and shorts/tights without zippers or pockets so fingers and toes don't get caught. Need a Gi (uniform)? You borrow one for free at the club."
              : locale === "pl"
              ? "Załóż przylegającą koszulkę (lub rashguard) i spodenki/legginsy bez zamków i kieszeni. Nie masz Gi (kimona)? Wypożyczysz je za darmo w klubie."
              : locale === "uk"
              ? "Одягніть футболку (або рашгард) та шорти/легінси без блискавок і кишень. Немає кімоно (Gi)? Ви можете безкоштовно взяти його в клубі."
              : "Bruk tettsittende t-skjorte (eller rashguard) og shorts/tights uten glidelåser eller lommer slik at fingre og tær ikke hekter seg fast. På Gi-timer låner du drakt gratis i klubben.",
        },
        {
          step: "03",
          label:
            locale === "en"
              ? "Hygiene & Preparation"
              : locale === "pl"
              ? "Higiena i przygotowanie"
              : locale === "uk"
              ? "Гігієна та підготовка"
              : "Hygiene & Forberedelse",
          headline:
            locale === "en"
              ? "Trimmed nails & water bottle"
              : locale === "pl"
              ? "Krótkie paznokcie i butelka wody"
              : locale === "uk"
              ? "Короткі нігті та пляшка води"
              : "Kortklippede negler & vannflaske",
          detail:
            locale === "en"
              ? "Because BJJ involves close grappling, finger- and toenails must be trimmed short, and jewelry/piercings must be removed or taped before stepping onto the mat."
              : locale === "pl"
              ? "W BJJ ćwiczymy w bliskim kontakcie — paznokcie u rąk i stóp muszą być krótko obcięte, a biżuteria zdjęta przed wejściem na matę."
              : locale === "uk"
              ? "Оскільки БЖЖ передбачає близький контакт, нігті на руках і ногах мають бути коротко підстрижені, а прикраси зняті перед виходом на татамі."
              : "Siden BJJ er tett bakkekamp, må finger- og tånegler være kortklippede og smykker/klokker tas av før du går på matta. Ta med egen vannflaske.",
        },
      ],
    },
    {
      key: "muaythai" as const,
      anchorId: "muay-thai",
      num: "02",
      title: "Muay Thai (Thaiboksing)",
      subtitle:
        locale === "en"
          ? "Stand-up striking · Pads, bag work & conditioning"
          : locale === "pl"
          ? "Boks tajski · Tarczowanie, technika i kondycja"
          : locale === "uk"
          ? "Тайський бокс · Робота на лапах, техніка та кондиція"
          : "Stående kampsport · Puter, sekk, teknikk & kondisjon",
      room:
        locale === "en"
          ? "Room 1 (Main Mat)"
          : locale === "pl"
          ? "Sala 1 (Mata główna)"
          : locale === "uk"
          ? "Зал 1 (Головний татамі)"
          : "Sal 1 (Hovedmatte)",
      image: "/images/club/sparring-action.jpg",
      accentBorder: "border-l-4 border-l-rose-500",
      badgeClass: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      modalDiscipline: "Muay Thai / Thaiboksing",
      modalCategory: "Voksen / Ungdom (fra 14 år)",
      items: [
        {
          step: "01",
          label:
            locale === "en"
              ? "Footwear"
              : locale === "pl"
              ? "Obuwie"
              : locale === "uk"
              ? "Взуття"
              : "Skotøy",
          headline:
            locale === "en"
              ? "Barefoot on the mat"
              : locale === "pl"
              ? "Boso na macie"
              : locale === "uk"
              ? "Босоніж на татамі"
              : "Barbent på matta",
          detail:
            locale === "en"
              ? "In Muay Thai we always train barefoot on the mats to protect training partners when kicking and moving."
              : locale === "pl"
              ? "W Muay Thai zawsze trenujemy boso na macie, aby chronić partnerów podczas kopnięć."
              : locale === "uk"
              ? "У Муай Тай ми завжди тренуємося босоніж на татамі для безпеки під час ударів ногами."
              : "I Muay Thai trener vi alltid barbent på matta av hensyn til spark, fotarbeid og treningspartnere.",
        },
        {
          step: "02",
          label:
            locale === "en"
              ? "Clothing & Free Loaner Gear"
              : locale === "pl"
              ? "Strój i darmowy sprzęt"
              : locale === "uk"
              ? "Одяг та безкоштовне спорядження"
              : "Klær & Gratis Låneutstyr",
          headline:
            locale === "en"
              ? "Boxing gloves & shin guards loaned free"
              : locale === "pl"
              ? "Rękawice i ochraniacze piszczeli za darmo"
              : locale === "uk"
              ? "Боксерські рукавички та щитки безкоштовно"
              : "Boksehansker og leggbeskyttere lånes gratis",
          detail:
            locale === "en"
              ? "Wear a comfortable t-shirt and shorts that allow free movement for kicks. Bring a water bottle — we have boxing gloves and shin guards ready for you to borrow."
              : locale === "pl"
              ? "Załóż luźną koszulkę i spodenki zapewniające swobodę kopnięć. Rękawice bokserskie i ochraniacze piszczeli wypożyczysz na miejscu za darmo."
              : locale === "uk"
              ? "Одягніть зручну футболку та шорти, що не сковують рухів для ударів ногами. Рукавички та щитки на гомілки видаються в клубі безкоштовно."
              : "Møt i vanlig t-skjorte og shorts med god bevegelsesfrihet for spark, samt vannflaske. Boksehansker og leggbeskyttere låner du gratis i klubben hele prøveperioden.",
        },
        {
          step: "03",
          label:
            locale === "en"
              ? "How the Session Works"
              : locale === "pl"
              ? "Jak wygląda trening"
              : locale === "uk"
              ? "Як проходить тренування"
              : "Slik foregår timen",
          headline:
            locale === "en"
              ? "Technique on pads — no forced sparring"
              : locale === "pl"
              ? "Technika na tarczach — zero przymusowego sparingu"
              : locale === "uk"
              ? "Техніка на лапах — жодного примусового спарингу"
              : "Teknikk på puter — ingen tvungen sparring",
          detail:
            locale === "en"
              ? "Beginner sessions focus on basic footwork, combinations on Thai pads/heavy bags, and controlled partner drills. You do not need a mouthguard for your first weeks."
              : locale === "pl"
              ? "Zajęcia dla początkujących skupiają się na pracy nóg, kombinacjach na tarczach/workach i kontrolowanych ćwiczeniach w parach. Ochraniacz na zęby nie jest potrzebny na start."
              : locale === "uk"
              ? "Тренування для початківців зосереджені на роботі ніг, комбінаціях на лапах/мішках та контрольованих вправах у парах. Капа на перших тижнях не потрібна."
              : "Nybegynnertreningen fokuserer på fotarbeid, slag/spark på puter og sekk, og kontrollerte partnerøvelser. Du trenger ikke tannbeskytter eller håndbind til prøveperioden.",
        },
      ],
    },
    {
      key: "ct" as const,
      anchorId: "crosstrening",
      num: "03",
      title:
        locale === "en"
          ? "Cross Training (CT) & Yoga"
          : locale === "pl"
          ? "Crosstrening (CT) i Yoga"
          : locale === "uk"
          ? "Крос-тренінг (CT) та Йога"
          : "Crosstrening (CT) & Yoga",
      subtitle:
        locale === "en"
          ? "Functional strength, conditioning & Yinsaya Yoga"
          : locale === "pl"
          ? "Siła funkcjonalna, wydolność i Yinsaya Yoga"
          : locale === "uk"
          ? "Функціональна сила, витривалість та Yinsaya Yoga"
          : "Funksjonell styrke, intervaller & Yinsaya Yoga",
      room:
        locale === "en"
          ? "Dedicated CT & Yoga Room"
          : locale === "pl"
          ? "Dedykowana sala CT / Jogi"
          : locale === "uk"
          ? "Окремий зал CT та Йоги"
          : "Egen CT- og yogasal",
      image: "/PXL_20260211_163724399.jpg",
      accentBorder: "border-l-4 border-l-emerald-500",
      badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      modalDiscipline: "Crosstrening (CT)",
      modalCategory: "Voksen / Ungdom (fra 14 år)",
      items: [
        {
          step: "01",
          label:
            locale === "en"
              ? "Footwear"
              : locale === "pl"
              ? "Obuwie"
              : locale === "uk"
              ? "Взуття"
              : "Skotøy",
          headline:
            locale === "en"
              ? "Clean indoor shoes on CT (Barefoot on Yoga)"
              : locale === "pl"
              ? "Czyste buty halowe na CT (Boso na Jodze)"
              : locale === "uk"
              ? "Чисте змінне взуття на CT (Босоніж на Йозі)"
              : "Rene innesko på CT (Barbent på Yoga)",
          detail:
            locale === "en"
              ? "For Cross Training (CT), clean indoor training shoes that have not been worn outside are required. For Yinsaya Yoga, we train barefoot."
              : locale === "pl"
              ? "Na Crosstreningu (CT) wymagane są czyste buty halowe (nieużywane na zewnątrz). Na zajęciach Yinsaya Yoga ćwiczymy boso."
              : locale === "uk"
              ? "На крос-тренінгу (CT) обов'язкове чисте змінне взуття для залу. На заняттях Yinsaya Yoga тренуємося босоніж."
              : "På Crosstrening (CT) er det påkrevd med rene innesko som ikke har blitt brukt utendørs. På Yinsaya Yoga trener vi barbent.",
        },
        {
          step: "02",
          label:
            locale === "en"
              ? "Clothing & Equipment"
              : locale === "pl"
              ? "Strój i sprzęt"
              : locale === "uk"
              ? "Одяг та інвентар"
              : "Klær & Utstyr",
          headline:
            locale === "en"
              ? "Normal gym clothes, towel & water bottle"
              : locale === "pl"
              ? "Zwykły strój sportowy, ręcznik i woda"
              : locale === "uk"
              ? "Звичайний спортивний одяг, рушник і вода"
              : "Vanlig treningstøy, håndkle & vannflaske",
          detail:
            locale === "en"
              ? "All kettlebells, weights, and yoga mats are available in the CT/Yoga room. Feel free to bring your own yoga mat if you prefer."
              : locale === "pl"
              ? "Wszystkie kettlebelle, ciężary i maty do jogi są dostępne na sali. Jeśli wolisz, możesz też zabrać własną matę do jogi."
              : locale === "uk"
              ? "Усі гирі, гантелі та килимки для йоги є в залі. За бажанням можете взяти власний килимок."
              : "Alle kettlebells, vekter og yogamatter ligger klare i salen. Ta gjerne med et lite svetthåndkle til CT, eller egen yogamatte om du foretrekker det.",
        },
        {
          step: "03",
          label:
            locale === "en"
              ? "Fitness Level"
              : locale === "pl"
              ? "Poziom zaawansowania"
              : locale === "uk"
              ? "Рівень підготовки"
              : "Fysisk nivå",
          headline:
            locale === "en"
              ? "Scaled to your level — no prior fitness required"
              : locale === "pl"
              ? "Dopasowane do Ciebie — bez wymogów kondycyjnych"
              : locale === "uk"
              ? "Адаптовано під ваш рівень — без вимог до форми"
              : "Tilpasses ditt utgangspunkt",
          detail:
            locale === "en"
              ? "Every workout is station- or time-based so you control the weights and pace yourself alongside the instructor."
              : locale === "pl"
              ? "Każdy trening opiera się na stacjach lub interwałach czasowych, dzięki czemu sam kontrolujesz ciężar i tempo pod okiem instruktora."
              : locale === "uk"
              ? "Кожне тренування побудоване за станціями або інтервалами, тож ви самі регулюєте вагу й темп під наглядом тренера."
              : "Øktene er lagt opp med stasjoner og tidsintervaller slik at du selv styrer vekt og tempo under veiledning av instruktør.",
        },
      ],
    },
    {
      key: "kids" as const,
      anchorId: "barn",
      num: "04",
      title:
        locale === "en"
          ? "Kids & Youth Classes (6–13 yrs)"
          : locale === "pl"
          ? "Grupy dziecięce (6–13 lat)"
          : locale === "uk"
          ? "Дитячі групи (6–13 років)"
          : "Barnepartier (6–9 år & 10–13 år)",
      subtitle:
        locale === "en"
          ? "BJJ & Muay Thai for children · Safe mastery & play"
          : locale === "pl"
          ? "BJJ i Muay Thai dla dzieci · Bezpieczny rozwój i zabawa"
          : locale === "uk"
          ? "БЖЖ та Муай Тай для дітей · Безпечний розвиток та гра"
          : "BJJ & Muay Thai for barn · Trygg mestring, lek & respekt",
      room:
        locale === "en"
          ? "Room 1 & Room 2 + Parents Lounge"
          : locale === "pl"
          ? "Sala 1 i 2 + Strefa dla rodziców"
          : locale === "uk"
          ? "Зал 1 і 2 + Зона для батьків"
          : "Sal 1 & Sal 2 + Peisestue for foreldre",
      image: "/images/club/happy-kids.jpg",
      accentBorder: "border-l-4 border-l-primary",
      badgeClass: "bg-primary/15 text-primary border-primary/30",
      modalDiscipline: "BJJ (Brasiliansk Jiu-Jitsu)",
      modalCategory: "Barneparti 1 (6-9 år)",
      items: [
        {
          step: "01",
          label:
            locale === "en"
              ? "Footwear"
              : locale === "pl"
              ? "Obuwie"
              : locale === "uk"
              ? "Взуття"
              : "Skotøy",
          headline:
            locale === "en"
              ? "Barefoot on the mat"
              : locale === "pl"
              ? "Boso na macie"
              : locale === "uk"
              ? "Босоніж на татамі"
              : "Barbent på matta",
          detail:
            locale === "en"
              ? "Outdoor shoes are parked at the entrance. Children train barefoot on our padded mats."
              : locale === "pl"
              ? "Buty zewnętrzne zostawiamy przy wejściu. Dzieci ćwiczą boso na miękkich matach."
              : locale === "uk"
              ? "Вуличне взуття залишаємо біля входу. Діти тренуються босоніж на м'яких татамі."
              : "Utesko settes i gangen ved inngangen. Barna trener barbent inne på de polstrede kampsportmattene.",
        },
        {
          step: "02",
          label:
            locale === "en"
              ? "Clothing & Gear"
              : locale === "pl"
              ? "Strój i sprzęt"
              : locale === "uk"
              ? "Одяг та спорядження"
              : "Klær & Utstyr",
          headline:
            locale === "en"
              ? "Soft gym clothes & labeled water bottle"
              : locale === "pl"
              ? "Wygodny strój na WF i podpisana butelka wody"
              : locale === "uk"
              ? "Зручний спортивний одяг та підписана пляшка води"
              : "Vanlig gymtøy & vannflaske med navn",
          detail:
            locale === "en"
              ? "T-shirt and sweatpants/shorts without zippers, plus a water bottle. All gloves, pads, and loaner Gis are provided at the club."
              : locale === "pl"
              ? "Koszulka i spodnie dresowe/spodenki bez zamków oraz butelka wody. Wszystkie rękawice i kimona zapewniamy w klubie."
              : locale === "uk"
              ? "Футболка та спортивні штани/шорти без блискавок, а також пляшка води. Усе спорядження надається в клубі."
              : "T-skjorte og myk joggebukse/shorts uten glidelås, samt drikkeflaske merket med navn. Alt av hansker og utstyr lånes gratis hos oss.",
        },
        {
          step: "03",
          label:
            locale === "en"
              ? "For Parents"
              : locale === "pl"
              ? "Dla rodziców"
              : locale === "uk"
              ? "Для батьків"
              : "For foreldre & foresatte",
          headline:
            locale === "en"
              ? "Lounge with sofa & free coffee"
              : locale === "pl"
              ? "Strefa wypoczynku z sofą i darmową kawą"
              : locale === "uk"
              ? "Лаунж-зона з диваном та безкоштовною кавою"
              : "Peisestue med sofa og gratis kaffe",
          detail:
            locale === "en"
              ? "Show up 10 minutes before class so our coaches can welcome your child. Parents are welcome to watch or relax in our lounge."
              : locale === "pl"
              ? "Przyjdźcie 10 minut wcześniej, aby trener mógł przywitać dziecko. Rodzice mogą oglądać trening lub odpocząć przy kawie."
              : locale === "uk"
              ? "Приходьте за 10 хвилин до початку, щоб тренер зустрів дитину. Батьки можуть спостерігати або відпочити з кавою."
              : "Møt opp 10 minutter før så treneren rekker å hilse på barnet. Foreldre kan følge treningen eller slappe av i vår peisestue med gratis kaffe.",
        },
      ],
    },
  ];

  const filterButtons: { key: DisciplineFilter; label: string }[] = [
    {
      key: "all",
      label:
        locale === "en"
          ? "All Disciplines"
          : locale === "pl"
          ? "Wszystkie sekcje"
          : locale === "uk"
          ? "Усі напрямки"
          : "Alle grener",
    },
    { key: "bjj", label: "01 · BJJ (Jiu-Jitsu)" },
    { key: "muaythai", label: "02 · Muay Thai" },
    {
      key: "ct",
      label:
        locale === "en"
          ? "03 · Cross Training & Yoga"
          : locale === "pl"
          ? "03 · Crosstrening i Yoga"
          : locale === "uk"
          ? "03 · Крос-тренінг та Йога"
          : "03 · Crosstrening & Yoga",
    },
    {
      key: "kids",
      label:
        locale === "en"
          ? "04 · Kids (6–13 yrs)"
          : locale === "pl"
          ? "04 · Dzieci (6–13 lat)"
          : locale === "uk"
          ? "04 · Діти (6–13 років)"
          : "04 · Barnepartier (6–13 år)",
    },
  ];

  const visibleDisciplines =
    activeFilter === "all"
      ? disciplines
      : disciplines.filter((d) => d.key === activeFilter);

  return (
    <div id={id} className="bg-background min-h-screen pb-24">
      {/* Page Header matching /timeplan and /om-oss */}
      <div className="pt-32 bg-muted/20 border-b border-border/40 pb-14 sm:pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-5xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary block mb-3">
            {locale === "en"
              ? "New Member Guide · 14 Days Free Trial"
              : locale === "pl"
              ? "Przewodnik na start · 14 dni za darmo"
              : locale === "uk"
              ? "Гід для новачків · 14 днів безкоштовно"
              : "Ny hos oss · 14 dagers gratis prøveperiode"}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-foreground uppercase leading-[0.95]">
            {locale === "en"
              ? "Your First Training"
              : locale === "pl"
              ? "Twój pierwszy trening"
              : locale === "uk"
              ? "Ваше перше тренування"
              : "Din første trening"}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            {locale === "en"
              ? "What shoes, clothes, and gear you need depends on whether you train BJJ, Muay Thai, Cross Training, or Kids classes. Find your discipline below."
              : locale === "pl"
              ? "To, jakiego obuwia, stroju i sprzętu potrzebujesz, zależy od wybranej sekcji (BJJ, Muay Thai, Crosstrening lub grupy dziecięce)."
              : locale === "uk"
              ? "Яке взуття, одяг та спорядження вам потрібні, залежить від обраного напрямку: БЖЖ, Муай Тай, Крос-тренінг або дитячі групи."
              : "Hva du trenger av skotøy, klær og utstyr avhenger av om du skal på BJJ, Muay Thai, Crosstrening eller barneparti. Se sjekklisten for hver gren under."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl mt-10 sm:mt-12 space-y-10 sm:space-y-12">
        {/* Practical Arrival Strip (Applies to everyone) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-card border border-border/70 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-start gap-3.5 md:border-r md:border-border/50 md:pr-4">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary block">
                {locale === "en" ? "Where to show up" : locale === "pl" ? "Gdzie przyjść" : locale === "uk" ? "Куди приходити" : "Hvor møter du opp?"}
              </span>
              <a
                href="https://maps.google.com/?q=Trondheimsvegen+71B,+2072+Dal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-bold text-foreground hover:text-primary transition-colors mt-0.5 block underline decoration-primary/40 underline-offset-4"
              >
                Trondheimsvegen 71B, 2072 Dal
              </a>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {locale === "en"
                  ? "Entrance and free parking are on the back of the building."
                  : locale === "pl"
                  ? "Wejście oraz darmowy parking znajdują się z tyłu budynku."
                  : locale === "uk"
                  ? "Вхід та безкоштовна парковка знаходяться ззаду будівлі."
                  : "Inngang og gratis parkering på baksiden av bygget."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 md:border-r md:border-border/50 md:pr-4">
            <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary block">
                {locale === "en" ? "When to arrive" : locale === "pl" ? "Kiedy przyjść" : locale === "uk" ? "Коли приходити" : "Når bør du være der?"}
              </span>
              <p className="text-sm sm:text-base font-bold text-foreground mt-0.5">
                {locale === "en"
                  ? "10–15 minutes before start"
                  : locale === "pl"
                  ? "10–15 minut przed treningiem"
                  : locale === "uk"
                  ? "За 10–15 хвилин до початку"
                  : "10–15 minutter før timen"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {locale === "en"
                  ? "We have changing rooms, and the coach will greet you and show you around."
                  : locale === "pl"
                  ? "Mamy szatnie, a trener przywita Cię i oprowadzi po klubie."
                  : locale === "uk"
                  ? "У нас є роздягальні, а тренер зустріне вас і все покаже."
                  : "Vi har garderober til skifting, og treneren tar deg imot og viser deg rundt."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary block">
                {locale === "en" ? "Free Trial Period" : locale === "pl" ? "Darmowy okres próbny" : locale === "uk" ? "Безкоштовний період" : "Prøveperiode"}
              </span>
              <p className="text-sm sm:text-base font-bold text-foreground mt-0.5">
                {locale === "en"
                  ? "14 days completely free"
                  : locale === "pl"
                  ? "14 dni całkowicie za darmo"
                  : locale === "uk"
                  ? "14 днів повністю безкоштовно"
                  : "14 dager helt gratis og uforpliktende"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {locale === "en"
                  ? "Try both BJJ, Muay Thai, Cross Training, and Yoga during your 2 free weeks."
                  : locale === "pl"
                  ? "Przetestuj BJJ, Muay Thai, Crosstrening i Jogę przez 2 darmowe tygodnie."
                  : locale === "uk"
                  ? "Спробуйте БЖЖ, Муай Тай, Крос-тренінг та Йогу протягом 2 безкоштовних тижнів."
                  : "Du kan fritt prøve både BJJ, Muay Thai, Crosstrening og Yoga i løpet av dine 2 gratis uker."}
              </p>
            </div>
          </div>
        </div>

        {/* Discipline Filter Bar matching SchedulePageClient tab bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-foreground">
              {locale === "en"
                ? "Select discipline to filter checklist"
                : locale === "pl"
                ? "Wybierz sekcję, aby przefiltrować"
                : locale === "uk"
                ? "Оберіть напрямок для фільтрації"
                : "Velg gren for å filtrere sjekklisten"}
            </h2>
          </div>
          <div
            role="tablist"
            aria-label="Velg treningsgren"
            className="flex flex-wrap gap-2"
          >
            {filterButtons.map((btn) => {
              const isSelected = activeFilter === btn.key;
              return (
                <button
                  key={btn.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(btn.key)}
                  className={cn(
                    "px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-muted/25 text-muted-foreground border-border/60 hover:text-foreground hover:border-border"
                  )}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Discipline Checklist Cards */}
        <div className="space-y-8">
          {visibleDisciplines.map((disc) => (
            <article
              key={disc.key}
              id={disc.anchorId}
              className={cn(
                "scroll-mt-28 rounded-2xl bg-card border border-border/80 overflow-hidden shadow-md transition-all",
                disc.accentBorder
              )}
            >
              {/* Top Header Row with Club Photo & Discipline Meta */}
              <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-border/60">
                <div className="relative aspect-[16/9] lg:aspect-auto lg:col-span-4 min-h-[200px] overflow-hidden bg-muted">
                  <OptimizedImage
                    src={disc.image}
                    alt={disc.title}
                    fill={true}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/40" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md text-[11px] font-black tabular-nums tracking-widest text-primary border border-white/10">
                    {disc.num}
                  </span>
                </div>

                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border",
                          disc.badgeClass
                        )}
                      >
                        {disc.room}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {disc.subtitle}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
                      {disc.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <ProveukeModal
                      defaultDiscipline={disc.modalDiscipline}
                      defaultCategory={disc.modalCategory}
                      trigger={
                        <Button className="h-11 px-5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider gap-2 shadow-sm">
                          {locale === "en"
                            ? `Try ${disc.title.split(" ")[0]} Free (14 Days)`
                            : locale === "pl"
                            ? `Wypróbuj za darmo (14 dni)`
                            : locale === "uk"
                            ? `Спробувати безкоштовно (14 днів)`
                            : `Prøv ${disc.key === "bjj" ? "BJJ" : disc.key === "muaythai" ? "Muay Thai" : disc.key === "ct" ? "Crosstrening & Yoga" : "Barneparti"} gratis i 14 dager`}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      }
                    />
                    <Link
                      href="/timeplan"
                      className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border/80 bg-background hover:bg-muted/40 text-xs sm:text-sm font-bold text-foreground transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-primary" />
                      {t.nav.schedule}
                    </Link>
                    {disc.key === "bjj" && (
                      <Link
                        href="/konkurranse"
                        className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border/80 bg-background hover:bg-muted/40 text-xs sm:text-sm font-bold text-foreground transition-colors"
                      >
                        <Scale className="w-4 h-4 text-primary" />
                        {locale === "en"
                          ? "IBJJF Rules & Competition"
                          : locale === "pl"
                          ? "Przepisy IBJJF i zawody"
                          : locale === "uk"
                          ? "Правила IBJJF та змагання"
                          : "Konkurranse & IBJJF-regler"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* 3 Concrete Checklist Columns (01 Skotøy, 02 Klær & Utstyr, 03 Viktig for timen) */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60 bg-background/40">
                {disc.items.map((item) => (
                  <div key={item.step} className="p-5 sm:p-6 md:p-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="text-xs font-black tabular-nums text-primary">
                          {item.step}
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-foreground tracking-tight leading-snug mb-2">
                        {item.headline}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
