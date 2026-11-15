"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Info, Sparkles, HeartHandshake, Coins, Calendar } from "lucide-react";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { RichText } from "./RichText";
import { ProveukeModal } from "./ProveukeModal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useScrollReveal, animate, stagger, ATHLETIC_SPRING, cleanAnimationStyles, remove } from "@/lib/animations";

interface MembershipProps {
  title?: string;
  description?: string;
  linkUrl?: string;
  boostLinkUrl?: string;
  boostEnabled?: boolean;
  extraInfo?: any;
  [key: string]: any;
}

export function Membership(props: MembershipProps) {
  const { locale, t } = useLanguage();

  const title = locale === "no" ? (props.title || t.membership.pageTitle) : t.membership.pageTitle;
  const description = locale === "no" ? (props.description || t.membership.pageDescription) : t.membership.pageDescription;
  const linkUrl = props.linkUrl || "https://www.minidrett.no/medlemskap/988726";
  const boostLinkUrl = props.boostLinkUrl || "https://portal.boostsystem.no/rambukk/member";
  const boostEnabled = props.boostEnabled !== false;

  const localizedCopy = {
    no: {
      trialTitle: "Helt ny hos oss? Start med 14 dagers gratis prøveperiode",
      trialDesc:
        "Du trenger ikke melde deg inn før du har testet treningen! Prøv BJJ, Muay Thai, Crosstrening og Yoga gratis i 2 uker – med gratis låneutstyr hele prøveperioden.",
      trialBtn: "Start 14 dagers gratis prøveperiode",
      firstTrainingBtn: "Se hva du trenger på 1. trening",
      pricingBadge: "Priser · Treningsavgift i Boost",
      pricingTitle: "Hva koster det å trene?",
      pricingSubtitle:
        "Alle faste medlemskap inkluderer fri tilgang til treningene i valgt kategori. I tillegg kommer den årlige medlemskontingenten til idrettslaget i MinIdrett.",
      annualFeeLabel: "Årskontingent til idrettslaget:",
      annualFeeValue: "Årsmøtevedtatt sats (se beløp i MinIdrett)",
      inclusionTitle: "Økonomi skal ikke stå i veien",
      inclusionDesc:
        "Som ideelt idrettslag tilsluttet NIF ønsker vi at alle barn og unge i lokalmiljøet skal ha mulighet til å delta, uavhengig av familieøkonomi. Ta gjerne konfidensiell kontakt med styreleder for en ubyråkratisk prat om tilrettelegging eller aktuelle støtteordninger.",
      inclusionLink: "Send e-post til leder@kampsporteidsvoll.no",
      grasrotTitle: "Støtt klubben med Grasrotandelen",
      grasrotDesc:
        "Spiller du hos Norsk Tipping, kan du støtte Eidsvoll Kampsportklubb (org.nr. 932 716 461) helt uten ekstra kostnad for deg. Alle grasrotmidler går direkte til barne- og ungdomsaktivitet og felles utstyr på Dal.",
      grasrotBadge: "Org.nr. 932 716 461 · Norsk Tipping",
      tiers: [
        {
          name: "Barn (6–13 år) · BJJ & Muay Thai",
          price: "539,-",
          unit: "/ mnd",
          binding: "6 mnd binding",
          details: "Fri tilgang til alle aldersdelte barnepartier i både BJJ (6–9 og 10–13 år) og Muay Thai.",
          badge: "Barn & lek",
        },
        {
          name: "Ungdom (14–19 år) · Totalmedlemskap",
          price: "649,-",
          unit: "/ mnd",
          binding: "12 mnd binding · 749,-/mnd ved 6 mnd",
          details: "Fri tilgang til BJJ (Gi & No-Gi), Muay Thai, Crosstrening, Yinsaya Yoga og Åpen matte.",
          badge: "Ungdom",
        },
        {
          name: "Voksen (20+ år) · Totalmedlemskap",
          price: "749,-",
          unit: "/ mnd",
          binding: "12 mnd binding · 849,- (6 mnd) · 949,- (uten binding)",
          details: "Full tilgang til alle fellestreninger, sparring og Åpen matte gjennom hele uken.",
          badge: "Mest populær",
          highlighted: true,
        },
        {
          name: "Crosstrening & Yoga (fra 14 år)",
          price: "399,-",
          unit: "/ mnd",
          binding: "6 mnd binding",
          details: "Funksjonell styrke og intervaller i egen CT-sal samt skadeforebyggende Yinsaya Yoga.",
          badge: "Styrke & mobilitet",
        },
        {
          name: "Familierabatt CT & Yoga",
          price: "249,-",
          unit: "/ mnd",
          binding: "For foresatte med aktive barn i klubben",
          details: "Kombiner barnets treningstid med egen Crosstrening eller Yoga til redusert familiepris.",
          badge: "Familiefordel",
        },
        {
          name: "Drop-in enkelttime",
          price: "150,-",
          unit: "/ økt",
          binding: "Vipps ved oppmøte · Ingen binding",
          details: "Passer for gjester eller deg som ønsker enkelttimer uten fast månedlig avtale.",
          badge: "Enkeltbesøk",
        },
      ],
    },
    en: {
      trialTitle: "Brand new? Start with a 14-day free trial period",
      trialDesc:
        "You don't need to register as a paying member before testing our classes! Try BJJ, Muay Thai, Cross Training, and Yoga free for 2 weeks — all loaner gear included.",
      trialBtn: "Start 14-day free trial",
      firstTrainingBtn: "See what to bring to 1st class",
      pricingBadge: "Pricing · Monthly Training Fee in Boost",
      pricingTitle: "Membership Pricing",
      pricingSubtitle:
        "All regular memberships include unlimited training in your chosen tier, in addition to the annual club membership fee in MinIdrett.",
      annualFeeLabel: "Annual sports club fee:",
      annualFeeValue: "Annual-meeting rate (see exact amount in MinIdrett)",
      inclusionTitle: "Finances should never be a barrier",
      inclusionDesc:
        "As a non-profit NIF sports club, we want children and youth in Eidsvoll to participate regardless of family finances. Reach out confidentially to our board chair for support options.",
      inclusionLink: "Email leder@kampsporteidsvoll.no",
      grasrotTitle: "Support us via Grasrotandelen",
      grasrotDesc:
        "If you play with Norsk Tipping, select Eidsvoll Kampsportklubb (org.nr. 932 716 461) as your recipient at no extra cost — funding goes straight to youth activities and shared gear.",
      grasrotBadge: "Org.nr. 932 716 461 · Norsk Tipping",
      tiers: [
        {
          name: "Kids (6–13 yrs) · BJJ & Muay Thai",
          price: "539 NOK",
          unit: "/ mo",
          binding: "6-month term",
          details: "Unlimited access to age-grouped kids BJJ (6–9 & 10–13) and kids Muay Thai classes.",
          badge: "Kids",
        },
        {
          name: "Youth (14–19 yrs) · All-Access",
          price: "649 NOK",
          unit: "/ mo",
          binding: "12-month term · 749 NOK (6-month)",
          details: "Unlimited access to BJJ (Gi & No-Gi), Muay Thai, Cross Training, Yoga, and Open Mat.",
          badge: "Youth",
        },
        {
          name: "Adult (20+ yrs) · All-Access",
          price: "749 NOK",
          unit: "/ mo",
          binding: "12-mo · 849 NOK (6-mo) · 949 NOK (no lock-in)",
          details: "Full access to all weekly group classes, sparring sessions, and Sunday Open Mat.",
          badge: "Most popular",
          highlighted: true,
        },
        {
          name: "Cross Training & Yoga (14+ yrs)",
          price: "399 NOK",
          unit: "/ mo",
          binding: "6-month term",
          details: "Functional strength and conditioning in our CT room plus Yinsaya Yoga mobility.",
          badge: "Strength & Mobility",
        },
        {
          name: "Family Discount CT & Yoga",
          price: "249 NOK",
          unit: "/ mo",
          binding: "For parents with active kids in the club",
          details: "Train Cross Training or Yoga at a reduced rate while your child is a registered member.",
          badge: "Family perk",
        },
        {
          name: "Drop-in Single Class",
          price: "150 NOK",
          unit: "/ class",
          binding: "Vipps on arrival · No commitment",
          details: "Ideal for visiting athletes or occasional drop-in sessions.",
          badge: "Drop-in",
        },
      ],
    },
    pl: {
      trialTitle: "Nowy w klubie? Zacznij od 14 dni darmowego okresu próbnego",
      trialDesc:
        "Nie musisz od razu wykupywać karnetu! Przetestuj BJJ, Muay Thai, Crosstrening i Jogę bez opłat przez 2 tygodnie — sprzęt pożyczysz na miejscu za darmo.",
      trialBtn: "Rozpocznij 14-dniowy okres próbny",
      firstTrainingBtn: "Zobacz, co zabrać na 1. trening",
      pricingBadge: "Cennik · Miesięczny karnet w Boost",
      pricingTitle: "Ile kosztuje trening?",
      pricingSubtitle:
        "Wszystkie stałe karnety dają nielimitowany dostęp w wybranej kategorii. Dodatkowo opłaca się roczną składkę klubową w MinIdrett.",
      annualFeeLabel: "Roczna składka klubowa:",
      annualFeeValue: "Stawka uchwalona na walnym zgromadzeniu (kwota widoczna w MinIdrett)",
      inclusionTitle: "Finanse nie mogą być przeszkodą",
      inclusionDesc:
        "Jako klub sportowy należący do NIF chcemy, aby dzieci i młodzież mogły trenować niezależnie od sytuacji finansowej rodziny. Napisz poufnie do prezesa w sprawie wsparcia.",
      inclusionLink: "Napisz na leder@kampsporteidsvoll.no",
      grasrotTitle: "Wesprzyj klub przez Grasrotandelen",
      grasrotDesc:
        "Grając w Norsk Tipping, możesz bez dodatkowych kosztów wskazać Eidsvoll Kampsportklubb (nr org. 932 716 461) — środki wspierają zajęcia i sprzęt dla dzieci i młodzieży.",
      grasrotBadge: "Org.nr. 932 716 461 · Norsk Tipping",
      tiers: [
        {
          name: "Dzieci (6–13 lat) · BJJ & Muay Thai",
          price: "539 kr",
          unit: "/ mies.",
          binding: "Umowa 6 mies.",
          details: "Nielimitowany dostęp do wszystkich grup dziecięcych BJJ (6–9 i 10–13 lat) oraz Muay Thai.",
          badge: "Dzieci",
        },
        {
          name: "Młodzież (14–19 lat) · Karnet Total",
          price: "649 kr",
          unit: "/ mies.",
          binding: "12 mies. · 749 kr/mies. (6 mies.)",
          details: "Dostęp do BJJ (Gi & No-Gi), Muay Thai, Crosstreningu, Jogi i Otwartej maty.",
          badge: "Młodzież",
        },
        {
          name: "Dorośli (20+ lat) · Karnet Total",
          price: "749 kr",
          unit: "/ mies.",
          binding: "12 mies. · 849 kr (6 mies.) · 949 kr (bez zobowiązań)",
          details: "Pełny dostęp do wszystkich treningów grupowych, sparingów i niedzielnej maty.",
          badge: "Najpopularniejszy",
          highlighted: true,
        },
        {
          name: "Crosstrening & Joga (14+ lat)",
          price: "399 kr",
          unit: "/ mies.",
          binding: "Umowa 6 mies.",
          details: "Trening siłowo-kondycyjny w sali CT oraz regeneracyjna Yinsaya Yoga.",
          badge: "Siła i mobilność",
        },
        {
          name: "Zniżka rodzinna CT & Joga",
          price: "249 kr",
          unit: "/ mies.",
          binding: "Dla rodziców aktywnych dzieci w klubie",
          details: "Trenuj Crosstrening lub Jogę w niższej cenie, gdy Twoje dziecko trenuje w EKK.",
          badge: "Dla rodzin",
        },
        {
          name: "Wejście jednorazowe (Drop-in)",
          price: "150 kr",
          unit: "/ trening",
          binding: "Płatność Vipps na miejscu · Bez umowy",
          details: "Dla gości oraz osób chcących trenować okazjonalnie bez miesięcznej umowy.",
          badge: "Pojedyncze wejście",
        },
      ],
    },
    uk: {
      trialTitle: "Вперше у нас? Почніть із 14 днів безкоштовного пробного періоду",
      trialDesc:
        "Не потрібно оформлювати платний абонемент одразу! Спробуйте БЖЖ, Муай Тай, Крос-тренінг та Йогу безкоштовно протягом 2 тижнів — спорядження видаємо безкоштовно.",
      trialBtn: "Почати 14 днів безкоштовно",
      firstTrainingBtn: "Що взяти на 1-ше тренування",
      pricingBadge: "Ціни · Щомісячний абонемент у Boost",
      pricingTitle: "Скільки коштують тренування?",
      pricingSubtitle:
        "Усі регулярні абонементи дають вільний доступ до занять обраної категорії. Додатково сплачується щорічний членський внесок клубу в MinIdrett.",
      annualFeeLabel: "Щорічний внесок до клубу:",
      annualFeeValue: "Ставка, затверджена зборами (сума вказана в MinIdrett)",
      inclusionTitle: "Фінанси не повинні бути перешкодою",
      inclusionDesc:
        "Як неприбутковий клуб NIF, ми прагнемо, щоб діти та молодь могли займатися незалежно від бюджету сім'ї. Напишіть конфіденційно голові правління щодо підтримки.",
      inclusionLink: "Написати на leder@kampsporteidsvoll.no",
      grasrotTitle: "Підтримайте клуб через Grasrotandelen",
      grasrotDesc:
        "Граючи в Norsk Tipping, ви можете без додаткових витрат обрати отримувачем Eidsvoll Kampsportklubb (org.nr. 932 716 461) — кошти йдуть на дитячі заняття та інвентар.",
      grasrotBadge: "Org.nr. 932 716 461 · Norsk Tipping",
      tiers: [
        {
          name: "Діти (6–13 років) · БЖЖ & Муай Тай",
          price: "539 kr",
          unit: "/ міс.",
          binding: "Контракт 6 міс.",
          details: "Необмежений доступ до дитячих груп БЖЖ (6–9 та 10–13 років) і Муай Тай.",
          badge: "Діти",
        },
        {
          name: "Молодь (14–19 років) · Повний доступ",
          price: "649 kr",
          unit: "/ міс.",
          binding: "12 міс. · 749 kr/міс. (6 міс.)",
          details: "Доступ до БЖЖ (Gi та No-Gi), Муай Тай, Крос-тренінгу, Йоги й Відкритого татамі.",
          badge: "Молодь",
        },
        {
          name: "Дорослі (20+ років) · Повний доступ",
          price: "749 kr",
          unit: "/ міс.",
          binding: "12 міс. · 849 kr (6 міс.) · 949 kr (без контракту)",
          details: "Повний доступ до всіх групових тренувань, спарингів та недільного татамі.",
          badge: "Найпопулярніший",
          highlighted: true,
        },
        {
          name: "Крос-тренінг та Йога (від 14 років)",
          price: "399 kr",
          unit: "/ міс.",
          binding: "Контракт 6 міс.",
          details: "Силові та інтервальні заняття в залі CT плюс відновлювальна Yinsaya Yoga.",
          badge: "Сила та мобільність",
        },
        {
          name: "Сімейна знижка CT & Йога",
          price: "249 kr",
          unit: "/ міс.",
          binding: "Для батьків, чиї діти займаються в клубі",
          details: "Тренуйте Крос-тренінг або Йогу за зниженою ціною, поки дитина тренується в EKK.",
          badge: "Для родин",
        },
        {
          name: "Разове відвідування (Drop-in)",
          price: "150 kr",
          unit: "/ заняття",
          binding: "Оплата Vipps на місці · Без контракту",
          details: "Зручно для гостей або разових тренувань без щомісячної підписки.",
          badge: "Разовий візит",
        },
      ],
    },
  }[locale];

  const sectionRef = useScrollReveal<HTMLElement>({
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
    onReveal: (container, isReducedMotion) => {
      if (isReducedMotion) return;

      const cards = container.querySelectorAll<HTMLElement>(".membership-card");
      const alertBox = container.querySelector<HTMLElement>(".membership-alert-box");
      const allTargets = [...Array.from(cards), ...(alertBox ? [alertBox] : [])];

      if (cards.length > 0) {
        animate(Array.from(cards), {
          opacity: [0, 1],
          translateY: [28, 0],
          duration: 500,
          delay: stagger(110),
          ease: ATHLETIC_SPRING,
          onComplete: () => {
            cards.forEach(cleanAnimationStyles);
          },
        });
      }

      if (alertBox) {
        animate(alertBox, {
          opacity: [0, 1],
          translateY: [18, 0],
          duration: 460,
          delay: 260,
          ease: ATHLETIC_SPRING,
          onComplete: () => {
            cleanAnimationStyles(alertBox);
          },
        });
      }

      return () => {
        remove(allTargets);
        allTargets.forEach(cleanAnimationStyles);
      };
    },
  });

  return (
    <section ref={sectionRef} id="medlemskap" className="w-full">
      <div className="max-w-6xl mx-auto">
        
        {/* Seksjonsoverskrift og ingress */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-primary block mb-3">
            {t.membership.badge}
          </span>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground uppercase leading-[0.95] mb-4 sm:mb-6"
            data-tina-field={tinaField(props, "title")}
          >
            {title}
          </h2>
          <p
            className="text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed font-normal"
            data-tina-field={tinaField(props, "description")}
          >
            {description}
          </p>
        </div>

        {/* Prøvetime-bro for helt nye besøkende */}
        <div className="mb-14 sm:mb-16 rounded-2xl bg-slate-950 text-white border border-slate-800 p-6 sm:p-8 md:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{t.hero.tryFreeCta}</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
                {localizedCopy.trialTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {localizedCopy.trialDesc}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 shrink-0">
              <ProveukeModal
                trigger={
                  <Button
                    size="lg"
                    spring={true}
                    className="w-full sm:w-auto h-12 px-6 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/25 gap-2"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{localizedCopy.trialBtn}</span>
                  </Button>
                }
              />
              <Link
                href="/forste-trening"
                className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs sm:text-sm font-bold text-slate-100 transition-colors whitespace-nowrap"
              >
                <span>{localizedCopy.firstTrainingBtn}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>

        {/* Synlig Pristabell */}
        <div className="mb-14 sm:mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary block mb-2">
              {localizedCopy.pricingBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground mb-2">
              {localizedCopy.pricingTitle}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {localizedCopy.pricingSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {localizedCopy.tiers.map((tier) => (
              <div
                key={tier.name}
                className={
                  tier.highlighted
                    ? "rounded-2xl bg-card border-2 border-primary p-5 sm:p-6 flex flex-col justify-between shadow-md"
                    : "rounded-2xl bg-card border border-border/80 p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:border-primary/40 transition-colors"
                }
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                      {tier.badge}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-foreground tracking-tight mb-2">
                    {tier.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-3xl sm:text-4xl font-black tracking-tight text-foreground tabular-nums">
                      {tier.price}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-muted-foreground uppercase">
                      {tier.unit}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-primary mb-3">
                    {tier.binding}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {tier.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pedagogiske kort for Boost og MinIdrett */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-stretch mb-12">
          
          {/* 1. BOOST (Venstre / Først) */}
          <div className="membership-card bg-card border-2 border-emerald-600/30 hover:border-emerald-600/60 rounded-2xl p-5 sm:p-8 md:p-10 flex flex-col justify-between shadow-lg transition-all duration-300">
            <div>
              {/* Steg-badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  {t.membership.step1Badge}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {t.membership.step1Frequency}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-4">
                {t.membership.step1Title}
              </h3>

              {/* Forklaring med stor skrift og god luft */}
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                <p>
                  {t.membership.step1Desc}
                </p>
                <ul className="space-y-2.5 text-sm sm:text-base text-foreground font-medium pt-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-700 font-bold text-lg leading-none">✓</span>
                    <span>{t.membership.step1Perk1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-700 font-bold text-lg leading-none">✓</span>
                    <span>{t.membership.step1Perk2}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-700 font-bold text-lg leading-none">✓</span>
                    <span>{t.membership.step1Perk3}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Boost Knapp (Plassert under teksten) */}
            <div className="pt-4 border-t border-border/40">
              {boostEnabled && boostLinkUrl ? (
                <Link
                  href={boostLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-tina-field={tinaField(props, "boostLinkUrl")}
                  className="block w-full"
                >
                  <Button
                    size="lg"
                    spring={true}
                    className="w-full h-auto min-h-[3.5rem] sm:min-h-[4.5rem] py-3.5 px-4 sm:px-6 text-sm sm:text-base md:text-lg font-black rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-600/25 transition-all duration-300 flex items-center justify-between uppercase tracking-wider group text-left whitespace-normal leading-tight gap-2"
                  >
                    <span>{t.membership.step1Btn}</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
                  </Button>
                </Link>
              ) : (
                <div className="relative group/disabled select-none" data-tina-field={tinaField(props, "boostEnabled")}>
                  <Button
                    size="lg"
                    disabled
                    className="w-full h-auto min-h-[3.5rem] sm:min-h-[4.5rem] py-3.5 px-4 sm:px-6 text-sm sm:text-base md:text-lg font-bold rounded-xl bg-muted border border-border text-muted-foreground/40 cursor-not-allowed flex items-center justify-center uppercase tracking-wider text-center whitespace-normal leading-tight"
                  >
                    Boost
                  </Button>
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-100 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded border border-slate-700 shadow-sm whitespace-nowrap">
                    {t.membership.comingSoon}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 2. MINIDRETT (Høyre / Deretter) */}
          <div className="membership-card bg-card border-2 border-primary/30 hover:border-primary/60 rounded-2xl p-5 sm:p-8 md:p-10 flex flex-col justify-between shadow-lg transition-all duration-300">
            <div>
              {/* Steg-badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  <ShieldCheck className="w-4 h-4" />
                  {t.membership.step2Badge}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {t.membership.step2Frequency}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-4">
                {t.membership.step2Title}
              </h3>

              {/* Forklaring med stor skrift og god luft */}
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                <p>
                  {t.membership.step2Desc}
                </p>
                <ul className="space-y-2.5 text-sm sm:text-base text-foreground font-medium pt-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold text-lg leading-none">✓</span>
                    <span>{t.membership.step2Perk1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold text-lg leading-none">✓</span>
                    <span>{t.membership.step2Perk2}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold text-lg leading-none">✓</span>
                    <span>{t.membership.step2Perk3}</span>
                  </li>
                </ul>
                <div className="rounded-xl bg-muted/40 border border-border/60 px-4 py-3 text-sm">
                  <span className="font-bold text-foreground block">{localizedCopy.annualFeeLabel}</span>
                  <span className="text-muted-foreground">{localizedCopy.annualFeeValue}</span>
                </div>
              </div>
            </div>

            {/* MinIdrett Knapp (Plassert under teksten) */}
            <div className="pt-4 border-t border-border/40">
              <Link
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-tina-field={tinaField(props, "linkUrl")}
                className="block w-full"
              >
                <Button
                  size="lg"
                  spring={true}
                  className="w-full h-auto min-h-[3.75rem] sm:min-h-[4.5rem] py-3.5 px-4 sm:px-6 text-sm sm:text-base md:text-lg font-black rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-between uppercase tracking-wider group text-left whitespace-normal leading-tight gap-2"
                >
                  <span>{t.membership.step2Btn}</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Oppklarende informasjonsboks om skillet mellom systemene */}
        <div className="membership-alert-box bg-primary/10 border border-primary/25 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5 max-w-4xl mx-auto shadow-sm">
          <div className="p-3 bg-primary/15 text-primary rounded-xl shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2 text-left">
            <h4 className="text-lg sm:text-xl font-bold text-foreground">
              {t.membership.alertTitle}
            </h4>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t.membership.alertDesc}
            </p>
          </div>
        </div>

        {/* Tilleggsinformasjon fra CMS dersom definert */}
        {props.extraInfo && locale === "no" && (
          <div className="mt-8 max-w-3xl mx-auto">
            <RichText
              content={props.extraInfo}
              className="p-6 bg-muted/30 border border-border/50 rounded-xl text-sm text-muted-foreground leading-relaxed text-center"
              data-tina-field={tinaField(props, "extraInfo")}
            />
          </div>
        )}

        {/* Økonomisk inkludering & Grasrotandelen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
          <div className="rounded-2xl bg-card border border-border/80 p-6 flex items-start gap-4 shadow-sm">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-black text-foreground">
                {localizedCopy.inclusionTitle}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {localizedCopy.inclusionDesc}
              </p>
              <a
                href="mailto:leder@kampsporteidsvoll.no"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline underline-offset-4 pt-1"
              >
                {localizedCopy.inclusionLink}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border/80 p-6 flex items-start gap-4 shadow-sm">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-black text-foreground">
                {localizedCopy.grasrotTitle}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {localizedCopy.grasrotDesc}
              </p>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-muted text-xs font-bold text-foreground">
                {localizedCopy.grasrotBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Hjelp & FAQ lenker */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p className="inline-flex items-center gap-2">
            <Info className="w-4 h-4 text-primary shrink-0" />
            <span>
              {t.membership.helpPrompt}{" "}
              <Link href="#faq" className="text-foreground font-bold underline underline-offset-4 hover:text-primary transition-colors">
                {t.membership.helpFaq}
              </Link>
              , {locale === 'no' ? 'eller' : locale === 'pl' ? 'lub' : locale === 'uk' ? 'або' : 'or'}{" "}
              <Link href="/kontakt" className="text-foreground font-bold underline underline-offset-4 hover:text-primary transition-colors">
                {t.membership.helpContact}
              </Link>
              .
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
