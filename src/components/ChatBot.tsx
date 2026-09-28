"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "🥋 Hva koster det å trene?",
  "⏱️ Hvordan fungerer gratis prøveuke?",
  "🥊 Hva trenger jeg til 1. trening?",
  "📍 Hvor og når trener dere?",
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "Hei! 👋 Jeg er Eidsvoll Kampsportklubbs digitale assistent. Hva kan jeg hjelpe deg med? Spør meg gjerne om timeplan, priser, utstyr eller vår 14-dagers gratis prøveperiode!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to bottom of chat when new messages appear
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    if (text.length > 500) {
      setErrorMessage("Meldingen kan ikke være lenger enn 500 tegn.");
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

    try {
      // Send the last 4 messages as history context (excluding welcome message)
      const historyContext = newMessages
        .filter((m) => m.id !== "welcome-1")
        .slice(-4)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: historyContext,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Kunne ikke hente svar fra assistenten.");
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Beklager, jeg kunne ikke svare akkurat nå.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setErrorMessage(
        err?.message || "Noe gikk galt under sending. Prøv igjen om et øyeblikk."
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

  // Helper to render message text with clickable links
  const renderMessageContent = (content: string) => {
    // Regex for URLs and emails
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;

    const parts = content.split(urlPattern);

    return parts.map((part, i) => {
      if (part.match(urlPattern)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline font-medium hover:opacity-80 break-all"
          >
            {part}
          </a>
        );
      }

      // Check emails within non-url parts
      const emailParts = part.split(emailPattern);
      return emailParts.map((subPart, j) => {
        if (subPart.match(emailPattern)) {
          return (
            <a
              key={`${i}-${j}`}
              href={`mailto:${subPart}`}
              className="text-primary underline font-medium hover:opacity-80"
            >
              {subPart}
            </a>
          );
        }
        return subPart;
      });
    });
  };

  return (
    <aside aria-label="Klubb-assistent" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="flex items-center gap-2">
          {/* Subtle Attention Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/95 backdrop-blur-md border border-border shadow-lg text-xs font-semibold text-foreground pointer-events-none animate-in fade-in slide-in-from-right-4 duration-300">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>Spør klubb-assistenten!</span>
          </div>

          <button
            onClick={() => {
              setIsOpen(true);
              setHasUnread(false);
            }}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-primary/20 group focus:outline-none focus:ring-4 focus:ring-primary/30"
            aria-label="Åpne chat med Eidsvoll Kampsportklubb"
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
          aria-label="Eidsvoll Kampsportklubb Assistent"
          className="w-[calc(100vw-2rem)] sm:w-[390px] h-[540px] max-h-[82vh] flex flex-col bg-background/98 backdrop-blur-2xl border border-border/70 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
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
                  EKK Assistent
                  <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-primary/20 text-primary tracking-wider">
                    AI
                  </span>
                </h3>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Svarer umiddelbart · Pålogget
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
                      content:
                        "Hei! 👋 Jeg er Eidsvoll Kampsportklubbs digitale assistent. Hva kan jeg hjelpe deg med? Spør meg gjerne om timeplan, priser, utstyr eller vår 14-dagers gratis prøveperiode!",
                    },
                  ]);
                  setErrorMessage(null);
                }}
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                title="Nullstill samtale"
                aria-label="Nullstill samtale"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                aria-label="Lukk chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[85%] leading-relaxed",
                    isUser ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-3.5 py-2.5 rounded-2xl whitespace-pre-wrap text-sm shadow-sm",
                      isUser
                        ? "bg-primary text-primary-foreground rounded-br-xs"
                        : "bg-muted/80 text-foreground border border-border/50 rounded-bl-xs"
                    )}
                  >
                    {renderMessageContent(msg.content)}
                  </div>
                </div>
              );
            })}

            {/* Quick Prompts (Only show right after welcome if user hasn't asked anything yet) */}
            {messages.length === 1 && (
              <div className="pt-2 space-y-1.5">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Vanlige spørsmål:
                </p>
                <div className="flex flex-col gap-1.5">
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      disabled={isLoading}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-left text-xs font-semibold px-3 py-2 rounded-xl bg-card border border-border/60 hover:border-primary/50 hover:bg-primary/5 text-foreground transition-all duration-150"
                    >
                      {prompt}
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
                placeholder="Still et spørsmål om klubben..."
                className="flex-1 h-11 px-3.5 pr-10 text-sm bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all disabled:opacity-50"
              />
              <Button
                size="sm"
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 h-8 w-8 p-0 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-30 transition-all"
                aria-label="Send melding"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-muted-foreground/70">
              <span>Svar genereres med AI</span>
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
