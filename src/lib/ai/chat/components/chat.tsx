"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useSidebar } from "@/context/SidebarContext";
import Alert from "@/components/ui/alert/Alert";

import { chatMessageSchema, ChatMessageFormValues } from "../schemas/chat";

import { sendChatMessageStream } from "../api/services/chat.client";
import ChatComposer from "./chat-composer";

export const SUGGESTIONS = [
  { emoji: "🧩", label: "Explique un extrait de code" },
  { emoji: "✍️", label: "Rédige un message" },
  { emoji: "📊", label: "Résume un document" },
  { emoji: "💡", label: "Trouve une idée" },
];

const PROVIDERS = [
  { id: "groq", label: "Groq · gpt-oss-120b" },
  { id: "gemini", label: "Gemini 2.5 Flash" },
] as const;

const DEFAULT_PROVIDER = "groq";

// --- Réglages ajustables à la main ---
const HEADER_HEIGHT = 76; // hauteur de MON header (celui avec "Studio" + sélecteur de modèle)
const HEADER_TOP_OFFSET = 72; // distance entre le haut de la fenêtre et MON header
const EXTRA_SCROLL = 80; // plus cette valeur est grande, plus le message envoyé remonte haut à l'écran après l'envoi

export default function Chat() {
  const { data: session } = useSession();
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const [messages, setMessages] = useState<ChatMessageFormValues[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>(DEFAULT_PROVIDER);
  const [isProviderMenuOpen, setIsProviderMenuOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement | null>(null);
  const shouldScrollToUserMessage = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChatMessageFormValues>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      role: "user",
      content: "",
    },
  });

  const content = watch("content");

  // Même logique de marge que AccountLayout, mais appliquée à un "left"
  // fixe (pas une marge) puisque le header sort du flux normal.
  const headerLeftOffset = isMobileOpen
    ? "left-0"
    : isExpanded || isHovered
      ? "left-0 lg:left-[290px]"
      : "left-0 lg:left-[90px]";

  // Scroll manuel calculé — remonte le message utilisateur qu'on vient
  // d'envoyer, en tenant compte du header fixe ET d'une marge EXTRA_SCROLL
  // réglable pour le faire monter plus ou moins haut à l'écran.
  useEffect(() => {
    if (shouldScrollToUserMessage.current && lastUserMessageRef.current) {
      const element = lastUserMessageRef.current;
      const rect = element.getBoundingClientRect();
      const targetY =
        window.scrollY +
        rect.top -
        (HEADER_HEIGHT + HEADER_TOP_OFFSET) -
        EXTRA_SCROLL;

      window.scrollTo({ top: targetY, behavior: "smooth" });
      shouldScrollToUserMessage.current = false;
    }
  }, [messages]);

  const onSubmit = async (values: ChatMessageFormValues) => {
    setSubmitError(null);
    setIsSending(true);

    const userMessage: ChatMessageFormValues = {
      role: "user",
      content: values.content,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages([...updatedMessages, { role: "assistant", content: "" }]);
    shouldScrollToUserMessage.current = true;

    reset({ role: "user", content: "" });
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const stream = await sendChatMessageStream({
        provider,
        messages: updatedMessages,
      });

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let buffer = ""; // bytes pas encore parsés (event SSE incomplet)
      let accumulated = ""; // texte final affiché

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // un event SSE = un bloc séparé par une ligne vide
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? ""; // le dernier morceau est peut-être incomplet, on le garde pour le prochain read()

        for (const rawEvent of events) {
          const dataLines = rawEvent
            .split("\n")
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.slice(5)); // retire juste "data:", garde le reste tel quel (espace inclus)

          if (dataLines.length === 0) continue;

          accumulated += dataLines.join("\n");

          setMessages((previous) => {
            const next = [...previous];
            next[next.length - 1] = { role: "assistant", content: accumulated };
            return next;
          });
        }
      }

      // au cas où il resterait un event SSE sans "\n\n" final
      if (buffer.startsWith("data:")) {
        accumulated += buffer.slice(5);
        setMessages((previous) => {
          const next = [...previous];
          next[next.length - 1] = { role: "assistant", content: accumulated };
          return next;
        });
      }
    } catch (error: any) {
      if (error?.status === 401) {
        setSubmitError("Votre session a expiré, veuillez vous reconnecter.");
      } else {
        setSubmitError(error?.message ?? "Une erreur est survenue.");
      }

      setMessages((previous) => previous.slice(0, -1));
    } finally {
      setIsSending(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue("content", e.target.value, {
      shouldDirty: true,
      shouldValidate: true,
    });

    const element = textareaRef.current;

    if (element) {
      element.style.height = "auto";
      element.style.height = `${Math.min(element.scrollHeight, 160)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter" || e.shiftKey || isSending) {
      return;
    }

    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  const handleSuggestion = (suggestion: string) => {
    setValue("content", suggestion, {
      shouldDirty: true,
      shouldValidate: true,
    });

    textareaRef.current?.focus();
  };

  const handleSelectProvider = (id: string) => {
    setProvider(id);
    setIsProviderMenuOpen(false);
  };

  const currentProviderLabel =
    PROVIDERS.find((p) => p.id === provider)?.label ?? provider;

  return (
    <div
      className="bg-background text-foreground relative flex min-h-screen
        flex-col"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 20%, color-mix(in srgb, var(--punch) 12%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Header — position: fixed, toujours collé à la fenêtre, aligné sur la sidebar,
          décalé de HEADER_TOP_OFFSET pour ne pas passer sous ton AppHeader TailAdmin */}
      <header
        className={`fixed right-0 z-20 flex items-center justify-between
          border-b border-[#E5E6EB]/60 bg-[#F5F6F8]/90 px-6 backdrop-blur-md
          transition-all duration-300 ease-in-out md:px-10
          dark:border-[#2B2C35]/60 dark:bg-[#121319]/90 ${headerLeftOffset}`}
        style={{ height: HEADER_HEIGHT, top: HEADER_TOP_OFFSET }}
      >
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full bg-[#5750E8] dark:bg-[#8B85FF]"
          />
          <span className="text-sm font-medium tracking-tight">Studio</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProviderMenuOpen((open) => !open)}
              className="flex items-center gap-1.5 rounded-full border
                border-[#E5E6EB] px-3 py-1.5 text-sm text-[#6B7280]
                dark:border-[#2B2C35] dark:text-[#93949E]"
            >
              {currentProviderLabel}
              <ChevronDown className="h-3 w-3" />
            </button>

            {isProviderMenuOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 overflow-hidden
                  rounded-xl border border-[#E5E6EB] bg-white shadow-lg
                  dark:border-[#2B2C35] dark:bg-[#1B1D22]"
              >
                {PROVIDERS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectProvider(p.id)}
                    className={
                      p.id === provider
                        ? `flex w-full items-center px-4 py-2.5 text-left
                          text-sm font-medium text-[#5750E8]
                          dark:text-[#8B85FF]`
                        : `flex w-full items-center px-4 py-2.5 text-left
                          text-sm text-[#1B1D22] hover:bg-[#F5F6F8]
                          dark:text-[#EDEDF2] dark:hover:bg-[#242531]`
                    }
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div
            className="flex h-8 w-8 items-center justify-center rounded-full
              bg-[#EDEBFF] text-sm font-medium text-[#5750E8] dark:bg-[#242244]
              dark:text-[#8B85FF]"
          >
            {session?.user?.firstName?.charAt(0).toUpperCase() ?? "U"}
          </div>
        </div>
      </header>

      {/* Main — décalé vers le bas de la hauteur totale des deux headers empilés */}
      <main
        className="relative flex flex-1 flex-col px-6"
        style={{ paddingTop: HEADER_HEIGHT + HEADER_TOP_OFFSET }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="max-w-2xl text-center">
              <h1
                className="font-serif text-[2.2rem] leading-[1.1]
                  md:text-[2.9rem]"
              >
                Bonjour, {session?.user?.firstName}.
              </h1>

              <p
                className="font-serif text-[2.2rem] leading-[1.1] text-[#6B7280]
                  md:text-[2.9rem] dark:text-[#93949E]"
              >
                Que veux-tu explorer aujourd&apos;hui ?
              </p>
            </div>

            <div className="mt-10 w-full max-w-2xl">
              <ChatComposer
                register={register}
                textareaRef={textareaRef}
                content={content}
                error={errors.content?.message}
                isSending={isSending}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onSubmit={handleSubmit(onSubmit)}
                onSuggestion={handleSuggestion}
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
            <div className="flex-1 space-y-6 py-8">
              {submitError && (
                <Alert
                  variant="error"
                  title="Échec de l'envoi"
                  message={submitError}
                  showLink={false}
                />
              )}

              {messages.map((message, index) => {
                const isLastUserMessage =
                  message.role === "user" && index === messages.length - 2;

                return (
                  <div
                    key={`${message.role}-${index}`}
                    ref={isLastUserMessage ? lastUserMessageRef : undefined}
                    className={
                      message.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    {/* Message content */}
                    <div
                      className={
                        message.role === "user"
                          ? `max-w-[80%] rounded-2xl bg-[#E0E0E0] px-4 py-3
                            text-sm text-[#1B1D22] dark:bg-[#2A2B33]
                            dark:text-[#EDEDF2]`
                          : `max-w-[80%] rounded-2xl px-4 py-3 text-[16px]
                            text-[#1B1D22] dark:text-[#EDEDF2]`
                      }
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-2 list-disc space-y-1 pl-5">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-2 list-decimal space-y-1 pl-5">
                              {children}
                            </ol>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold">
                              {children}
                            </strong>
                          ),
                          code: ({ children }) => (
                            <code
                              className="rounded bg-black/5 px-1 py-0.5
                                text-[13px] dark:bg-white/10"
                            >
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                );
              })}

              {isSending && (
                <div
                  className="flex items-center gap-2 px-4 py-3 text-sm
                    text-[#6B7280] dark:text-[#93949E]"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {currentProviderLabel} réfléchit...
                </div>
              )}
            </div>

            <div
              className="sticky bottom-0 bg-[#F5F6F8] pt-3 pb-6
                dark:bg-[#121319]"
            >
              <ChatComposer
                register={register}
                textareaRef={textareaRef}
                content={content}
                error={errors.content?.message}
                isSending={isSending}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onSubmit={handleSubmit(onSubmit)}
                onSuggestion={handleSuggestion}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
