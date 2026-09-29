"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Sparkles,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { ProveukeModal } from "./ProveukeModal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  followUps?: string[];
}

interface StaticFaqItem {
  id: string;
  triggerPhrases: string[];
  answer: string;
  followUps: string[];
}

function getStaticFaqs(chatT: any): StaticFaqItem[] {
  return [
    {
      id: "pricing",
      triggerPhrases: [
        "hva koster det å trene",
        "hva koster det",
        "hva er prisene",
        "priser",
        "hva koster medlemskap",
        "månedspris",
        "kontingent",
        "how much does it cost",
        "pricing",
        "membership prices",
        "ile kosztuje",
        "cennik",
        "ceny",
        "скільки коштує",
        "вартість",
        "ціни",
      ],
      answer: chatT.staticPricing,
      followUps: [chatT.promptTrial, chatT.promptGear],
    },
    {
      id: "trial",
      triggerPhrases: [
        "hvordan fungerer gratis prøveuke",
        "gratis prøveuke",
        "prøveuke",
        "prøvetime",
        "kan jeg prøve gratis",
        "prøveperiode",
        "teste en trening",
        "free trial",
        "trial week",
        "try for free",
        "jak działa darmowy okres próbny",
        "okres próbny",
        "trening próbny",
        "як працює безкоштовний пробний період",
        "пробний період",
        "пробне тренування",
      ],
      answer: chatT.staticTrial,
      followUps: [chatT.promptGear, chatT.promptSchedule],
    },
    {
      id: "gear",
      triggerPhrases: [
        "hva trenger jeg til 1. trening",
        "hva trenger jeg",
        "utstyr",
        "hva slags utstyr",
        "må jeg ha sko",
        "sko",
        "klær",
        "hva må jeg ha med",
        "what do i need",
        "equipment",
        "gear",
        "shoes",
        "czego potrzebuję",
        "sprzęt",
        "buty",
        "що потрібно",
        "екіпірування",
        "спорядження",
        "взуття",
      ],
      answer: chatT.staticGear,
      followUps: [chatT.promptTrial, chatT.promptPricing],
    },
    {
      id: "schedule",
      triggerPhrases: [
        "hvor og når trener dere",
        "når trener dere",
        "hvor trener dere",
        "adresse",
        "lokasjon",
        "treningstider",
        "hvor holder dere til",
        "timeplan",
        "parkering",
        "parkere",
        "hvor kan jeg parkere",
        "inngang",
        "hvor er inngangen",
        "finne fram",
        "veibeskrivelse",
        "where and when do you train",
        "schedule",
        "timetable",
        "opening hours",
        "address",
        "parking",
        "entrance",
        "gdzie i kiedy trenujecie",
        "grafik",
        "godziny zajęć",
        "adres",
        "parking",
        "wejście",
        "де і коли ви тренуєтесь",
        "розклад",
        "графік",
        "адреса",
        "парковка",
        "вхід",
      ],
      answer: chatT.staticSchedule,
      followUps: [chatT.promptTrial, chatT.promptGear],
    },
    {
      id: "lounge",
      triggerPhrases: [
        "peisestue",
        "peisestua",
        "peisen",
        "peis",
        "kaffe",
        "kaffekopp",
        "kan foreldre se på",
        "kan foreldre være med",
        "kan foreldre sitte",
        "se på barna",
        "se på treningen",
        "se på treningene",
        "se på barna trene",
        "kan man se på",
        "kan vi se på",
        "kan jeg se på",
        "venterom",
        "vente",
        "oppholdsrom",
        "foreldre",
        "foresatte",
        "tilskuere",
        "hvor kan foreldre sitte",
        "hva gjør foreldre",
        "lounge",
        "parent lounge",
        "parents",
        "coffee",
        "can parents watch",
        "waiting room",
        "spectators",
        "watch the kids",
        "watch kids",
        "strefa dla rodziców",
        "strefa z kominkiem",
        "kawa",
        "poczekalnia",
        "czy rodzice mogą oglądać",
        "rodzice",
        "kominek",
        "камін",
        "кава",
        "зона відпочинку",
        "батьки",
        "чи можуть батьки дивитися",
        "кімната очікування",
        "зала очікування",
      ],
      answer: chatT.staticLounge,
      followUps: [chatT.promptTrial, chatT.promptSchedule],
    },
  ];
}

function findStaticFaq(query: string, chatT: any): StaticFaqItem | null {
  const normalized = query
    .toLowerCase()
    .replace(/[🥋⏱️🥊📍👟📅❓?.!,]/g, "")
    .trim();

  const faqs = getStaticFaqs(chatT);
  for (const faq of faqs) {
    if (faq.triggerPhrases.some((phrase) => normalized.includes(phrase))) {
      return faq;
    }
  }
  return null;
}

/**
 * Reusable action cards rendered dynamically based on response keywords.
 */
function MessageActionCards({
  content,
  t,
}: {
  content: string;
  t: {
    actionTrial: string;
    actionBoost: string;
    actionSchedule: string;
    actionEmail: string;
  };
}) {
  const isTrial = /prøveuke|prøveperiode|prøvetrening|prøv gratis|gratis prøve|trial|free trial|okres próbny|darmowy|пробн|безкоштовн|peisestue|peisestua|lounge|kaffe|komink|камін/i.test(content);
  const isBoost = /boost|innmelding|bli medlem|treningsavgift|kr \d+|membership|join|członkostw|karnet|абонемент|вступ/i.test(content);
  const isSchedule = /timeplan|treningstider|mandag|tirsdag|onsdag|torsdag|fredag|sal 1|sal 2|schedule|timetable|grafik|rozpisk|розклад|графік/i.test(content);
  const isContact = /kontakt@|976 10 229|kontakt oss|contact|kontakt|контакт/i.test(content);

  if (!isTrial && !isBoost && !isSchedule && !isContact) {
    return null;
  }

  return (
    <div className="mt-3 pt-2.5 border-t border-border/40 flex flex-col gap-2 w-full">
      {isTrial && (
        <ProveukeModal
          trigger={
            <Button
              size="sm"
              spring={true}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-primary text-white shadow-md hover:opacity-95 transition-all text-left group"
            >
              <span>{t.actionTrial}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          }
        />
      )}

      {isBoost && (
        <a
          href="https://portal.boostsystem.no/rambukk/member"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button
            size="sm"
            spring={true}
            className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all text-left group"
          >
            <span>{t.actionBoost}</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
        </a>
      )}

      {isSchedule && (
        <Link href="/timeplan" className="block w-full">
          <Button
            size="sm"
            variant="outline"
            spring={true}
            className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl border-primary/40 hover:bg-primary/10 text-foreground transition-all text-left group"
          >
            <span>{t.actionSchedule}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      )}

      {isContact && (
        <a href="mailto:kontakt@kampsporteidsvoll.no" className="block w-full">
          <Button
            size="sm"
            variant="outline"
            spring={true}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold rounded-xl border-border/70 hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all text-left"
          >
            <span>{t.actionEmail}</span>
            <ArrowUpRight className="w-3 h-3 shrink-0" />
          </Button>
        </a>
      )}
    </div>
  );
}

export function ChatBot() {
  const { locale, t } = useLanguage();
  const chatT = t.chat;

  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome-1",
      role: "assistant",
      content: chatT?.welcomeMessage || "Hei! 👋 Jeg er Eidsvoll Kampsportklubbs digitale assistent. Hva kan jeg hjelpe deg med? Spør meg gjerne om timeplan, priser, utstyr eller vår 14-dagers gratis prøveperiode!",
    },
  ]);

  // Oppdater velkomstmelding dersom brukeren skifter språk og samtalen ikke er påbegynt
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === "welcome-1") {
        return [
          {
            id: "welcome-1",
            role: "assistant",
            content: chatT.welcomeMessage,
          },
        ];
      }
      return prev;
    });
  }, [locale, chatT.welcomeMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Skånsom automatisk åpning etter 5 sekunder
  useEffect(() => {
    const dismissed =
      typeof window !== "undefined" &&
      sessionStorage.getItem("ekk_chat_dismissed") === "true";

    if (!dismissed) {
      const timer = setTimeout(() => {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
        if (isMobile) {
          setShowTeaser(true);
        } else {
          setIsOpen(true);
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-scroll when messages update, but keep at top on initial welcome
  useEffect(() => {
    if (isOpen) {
      if (messages.length > 1 || isLoading) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Når chatten åpnes for første gang: vis alltid velkomstmeldingen øverst
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }

      if (typeof window !== "undefined" && window.innerWidth >= 640) {
        inputRef.current?.focus({ preventScroll: true });
      }
    }
  }, [messages, isOpen, isLoading]);

  const handleClose = () => {
    setIsOpen(false);
    setShowTeaser(false);
    try {
      sessionStorage.setItem("ekk_chat_dismissed", "true");
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    if (text.length > 500) {
      setErrorMessage(chatT.charLimitError);
      return;
    }

    setErrorMessage(null);
    setInput("");

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    // 1. Sjekk 0-token lokal FAQ cache først for lynraskt svar (0 tokens brukt!)
    const staticMatch = findStaticFaq(text, chatT);
    if (staticMatch) {
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: staticMatch.answer,
          followUps: staticMatch.followUps,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 250);
      return;
    }

    // 2. Hvis ingen direkte FAQ-treff: Send til OpenAI gpt-4o-mini via Cloud Function
    try {
      const historyContext = newMessages
        .filter((m) => m.id !== "welcome-1")
        .slice(-4)
        .map((m) => ({ role: m.role, content: m.content }));

      let sessionId = "";
      try {
        sessionId = localStorage.getItem("ekk_chat_session_id") || "";
        if (!sessionId) {
          sessionId = "sess_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
          localStorage.setItem("ekk_chat_session_id", sessionId);
        }
      } catch {
        sessionId = "temp_" + Date.now();
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: historyContext,
          sessionId,
          locale,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || chatT.connectionError);
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || chatT.defaultError,
        followUps: [
          chatT.promptTrial,
          chatT.promptPricing,
        ],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setErrorMessage(
        err?.message || chatT.connectionError
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Formater og render markdown med rene stiler
  const renderFormattedMessage = (content: string) => {
    const withLinks = content.replace(/(?<!\]\()(https?:\/\/[^\s\)]+)/g, (match, url, offset, full) => {
      if (full.slice(offset - 1, offset) === "(" || full.slice(offset - 2, offset) === "](") return match;
      return `[${url}](${url})`;
    });

    return (
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
          strong: ({ children }) => <strong className="font-extrabold text-foreground">{children}</strong>,
          ul: ({ children }) => <ul className="my-2 space-y-1.5 pl-4 list-disc marker:text-primary">{children}</ul>,
          ol: ({ children }) => <ol className="my-2 space-y-1.5 pl-4 list-decimal marker:text-primary">{children}</ol>,
          li: ({ children }) => <li className="pl-0.5 leading-snug">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-primary underline underline-offset-2 hover:opacity-85 break-all"
            >
              {children}
            </a>
          ),
        }}
      >
        {withLinks}
      </ReactMarkdown>
    );
  };

  // Baseline: 20px (bottom-5 equivalent) + iOS safe area inset
  return (
    <aside aria-label={chatT.floatingAria} className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-5 sm:bottom-6 sm:right-6 z-40 select-none">
      {/* Mobile Teaser Bubble */}
      {showTeaser && !isOpen && (
        <div className="sm:hidden absolute bottom-16 right-0 w-64 p-3.5 bg-background/98 backdrop-blur-xl border border-border shadow-2xl rounded-2xl animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-start justify-between gap-2">
            <div
              onClick={() => {
                setShowTeaser(false);
                setIsOpen(true);
              }}
              className="cursor-pointer flex-1"
            >
              <p className="text-xs font-bold text-foreground flex items-center gap-1.5 mb-1">
                <span>{chatT.teaserTitle}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              </p>
              <p className="text-xs text-muted-foreground leading-snug">
                {chatT.teaserSubtitle}
              </p>
              <span className="inline-block mt-2 text-[11px] font-bold text-primary">
                {chatT.teaserCta}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="text-muted-foreground hover:text-foreground p-1 -mr-1 -mt-1 rounded-md"
              aria-label={chatT.closeChat}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="flex items-center gap-2">
          {/* Desktop Attention Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/95 backdrop-blur-md border border-border shadow-lg text-xs font-semibold text-foreground pointer-events-none animate-in fade-in slide-in-from-right-4 duration-300">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>{chatT.floatingBadge}</span>
          </div>

          <button
            onClick={() => {
              setIsOpen(true);
              setShowTeaser(false);
              setHasUnread(false);
            }}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-primary/20 group focus:outline-none focus:ring-4 focus:ring-primary/30"
            aria-label={chatT.floatingAria}
          >
            <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110" />
            {hasUnread && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 border-2 border-background" />
            )}
          </button>
        </div>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={chatT.headerTitle}
          className="w-[calc(100vw-2rem)] sm:w-[395px] h-[550px] max-h-[82vh] flex flex-col bg-background/98 backdrop-blur-2xl border border-border/70 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-border/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground leading-tight flex items-center gap-1.5">
                  {chatT.headerTitle}
                  <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-primary/20 text-primary tracking-wider">
                    AI
                  </span>
                </h3>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  {chatT.statusOnline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setMessages([
                    {
                      id: "welcome-1",
                      role: "assistant",
                      content: chatT.welcomeMessage,
                    },
                  ]);
                  setErrorMessage(null);
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTop = 0;
                  }
                }}
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                title={chatT.resetConversation}
                aria-label={chatT.resetConversation}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleClose}
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                aria-label={chatT.closeChat}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              const isLastMessage = idx === messages.length - 1;
              const showFollowUps = !isUser && isLastMessage && !isLoading && msg.followUps && msg.followUps.length > 0;

              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[88%] leading-relaxed",
                    isUser ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-3.5 py-2.5 rounded-2xl text-sm shadow-sm w-full",
                      isUser
                        ? "bg-primary text-primary-foreground rounded-br-xs whitespace-pre-wrap font-medium"
                        : "bg-card text-card-foreground border border-border/70 rounded-bl-xs leading-relaxed"
                    )}
                  >
                    {isUser ? msg.content : renderFormattedMessage(msg.content)}
                    {!isUser && <MessageActionCards content={msg.content} t={chatT} />}

                    {/* Contextual Follow-up Next Step Chips */}
                    {showFollowUps && (
                      <div className="mt-3 pt-2.5 border-t border-border/40 flex flex-col gap-1.5 w-full">
                        <p className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">
                          {chatT.nextSteps}
                        </p>
                        <div className="flex flex-col gap-1.5">
                          {msg.followUps?.map((chip, chipIdx) => (
                            <button
                              key={chipIdx}
                              onClick={() => handleSendMessage(chip)}
                              className="text-left text-xs font-semibold px-2.5 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 transition-all flex items-center justify-between group"
                            >
                              <span>{chip}</span>
                              <ArrowRight className="w-3 h-3 shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Quick Prompts (Only show right after initial welcome) */}
            {messages.length === 1 && (
              <div className="pt-2 space-y-1.5">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  {chatT.commonQuestions}
                </p>
                <div className="flex flex-col gap-1.5">
                  {[
                    chatT.promptPricing,
                    chatT.promptTrial,
                    chatT.promptLounge,
                    chatT.promptGear,
                    chatT.promptSchedule,
                  ].map((prompt, idx) => (
                    <button
                      key={idx}
                      disabled={isLoading}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-left text-xs font-semibold px-3 py-2 rounded-xl bg-card border border-border/60 hover:border-primary/50 hover:bg-primary/5 text-foreground transition-all duration-150 flex items-center justify-between group"
                    >
                      <span>{prompt}</span>
                      <ArrowRight className="w-3 h-3 shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing Dots Animation */}
            {isLoading && (
              <div className="mr-auto items-start max-w-[85%]">
                <div className="px-4 py-3 rounded-2xl bg-muted/80 border border-border/50 rounded-bl-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-primary/70 animate-bounce" />
                </div>
              </div>
            )}

            {/* Error Message Box */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <div className="p-3 border-t border-border/50 bg-background/50 shrink-0">
            <div className="relative flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                maxLength={500}
                placeholder={chatT.inputPlaceholder}
                className="flex-1 h-11 px-3.5 pr-10 text-sm bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all disabled:opacity-50"
              />
              <Button
                size="sm"
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 h-8 w-8 p-0 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-30 transition-all"
                aria-label={chatT.sendAria}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-muted-foreground/70">
              <span>{chatT.instantReply}</span>
              {input.length > 400 && (
                <span className={input.length >= 500 ? "text-red-500 font-bold" : ""}>
                  {input.length}/500 tegn
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
