"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  GitBranch,
  LoaderCircle,
  Mail,
  MessageSquareText,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "sent" | "error";

const links = [
  { Icon: Mail, label: "[VOTRE EMAIL]", category: "EMAIL" },
  { Icon: GitBranch, label: "[VOTRE GITHUB]", category: "CODE SOURCE" },
  {
    Icon: Briefcase,
    label: "[VOTRE LINKEDIN]",
    category: "RÉSEAU PROFESSIONNEL",
  },
];

const fieldClassName =
  "min-h-12 w-full rounded-xl border-border bg-background px-4 text-sm shadow-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Échec de l'envoi");
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-border bg-primary text-primary-foreground relative
        isolate mb-10 scroll-mt-24 overflow-hidden rounded-3xl border px-5 py-12
        sm:mb-16 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
    >
      {/* Fond décoratif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      <div
        aria-hidden="true"
        className="bg-accent/30 pointer-events-none absolute top-0 -left-40
          -z-10 size-[360px] rounded-full blur-[110px] sm:size-[420px]"
      />

      <div
        aria-hidden="true"
        className="bg-secondary/20 pointer-events-none absolute right-0
          -bottom-48 -z-10 size-[380px] rounded-full blur-[120px]
          sm:size-[460px]"
      />

      <div className="mx-auto max-w-6xl space-y-12 lg:space-y-16">
        {/* En-tête */}
        <header className="max-w-3xl space-y-5">
          <div
            className="border-primary-foreground/15 bg-primary-foreground/5
              inline-flex items-center gap-2 rounded-full border px-3.5 py-2"
          >
            <span
              aria-hidden="true"
              className="bg-accent size-1.5 rounded-full"
            />
            <span
              className="text-primary-foreground/75 font-mono text-[10px]
                tracking-[0.16em] sm:text-xs"
            >
              CONTACT · ELANRIF
            </span>
          </div>

          <h2
            id="contact-title"
            className="text-4xl leading-[1.1] font-semibold tracking-tight
              text-balance sm:text-5xl lg:text-6xl"
          >
            Une idée en tête ?
            <span className="text-primary-foreground/70 mt-2 block">
              Construisons-la ensemble.
            </span>
          </h2>

          <p
            className="text-primary-foreground/75 max-w-2xl text-base leading-7
              sm:text-lg sm:leading-8"
          >
            Un projet, une question ou une suggestion concernant le starter kit
            ? Présentez-moi votre idée. Échangeons sur vos besoins et explorons
            ensemble les possibilités.
          </p>
        </header>

        {/* Présentation et formulaire */}
        <div
          className="flex flex-col items-start gap-10 lg:flex-row lg:gap-16
            xl:gap-20"
        >
          {/* Informations de contact */}
          <div
            className="w-full min-w-0 space-y-9 lg:sticky lg:top-24 lg:flex-1"
          >
            <div className="flex items-start gap-4">
              <div
                className="border-primary-foreground/15 bg-primary-foreground/5
                  flex size-11 shrink-0 items-center justify-center rounded-xl
                  border"
              >
                <MessageSquareText
                  aria-hidden="true"
                  className="text-primary-foreground size-5"
                />
              </div>

              <div className="min-w-0 space-y-2">
                <h3 className="text-base font-semibold sm:text-lg">
                  Parlons de votre projet
                </h3>

                <p
                  className="text-primary-foreground/70 max-w-md text-sm
                    leading-6 sm:text-base sm:leading-7"
                >
                  Décrivez votre besoin, posez votre question ou partagez
                  simplement une idée. Je serai ravi d’en discuter avec vous.
                </p>
              </div>
            </div>

            <div
              className="border-primary-foreground/15 space-y-4 border-t pt-6"
            >
              <h3
                className="text-primary-foreground/60 font-mono text-[10px]
                  tracking-[0.18em] sm:text-xs"
              >
                RETROUVEZ-MOI AUSSI SUR
              </h3>

              <ul className="space-y-1">
                {links.map(({ Icon, label, category }) => (
                  <li key={category}>
                    <div
                      className="flex min-w-0 items-center gap-4 rounded-xl py-3
                        transition-colors"
                    >
                      <div
                        className="bg-primary-foreground/5
                          text-primary-foreground flex size-10 shrink-0
                          items-center justify-center rounded-xl"
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-4"
                          strokeWidth={1.7}
                        />
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <p
                          className="text-primary-foreground/60 font-mono
                            text-[9px] tracking-[0.14em] sm:text-[10px]"
                        >
                          {category}
                        </p>

                        <p
                          className="text-primary-foreground/90 text-sm
                            leading-6 font-medium break-words"
                        >
                          {label}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <p
              className="text-primary-foreground/60 flex items-center gap-2
                font-mono text-[10px] tracking-wide sm:text-xs"
            >
              <span
                aria-hidden="true"
                className="bg-accent size-1.5 rounded-full"
              />
              OPEN TO NEW IDEAS
            </p>
          </div>

          {/* Formulaire */}
          <div
            className="border-primary-foreground/15 bg-primary-foreground/5
              shadow-foreground/10 w-full min-w-0 rounded-2xl border p-2
              shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:p-3 lg:flex-1"
          >
            <form
              onSubmit={onSubmit}
              className="bg-background text-foreground flex min-w-0 flex-col
                space-y-7 rounded-xl p-5 sm:rounded-2xl sm:p-8 lg:p-9"
            >
              <header className="border-border space-y-3 border-b pb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="border-primary/20 bg-primary/10 text-primary flex
                      size-10 shrink-0 items-center justify-center rounded-xl
                      border"
                  >
                    <Send aria-hidden="true" className="size-4" />
                  </div>

                  <p
                    className="text-primary font-mono text-[10px]
                      tracking-[0.14em] sm:text-xs"
                  >
                    NOUVELLE CONVERSATION
                  </p>
                </div>

                <h3
                  className="text-xl leading-snug font-semibold tracking-tight
                    sm:text-2xl"
                >
                  Envoyez-moi un message.
                </h3>

                <p
                  className="text-muted-foreground text-sm leading-6
                    sm:text-base"
                >
                  Remplissez le formulaire ci-dessous. Je vous répondrai dès que
                  possible.
                </p>
              </header>

              <div className="space-y-2">
                <Label htmlFor="c-nom">Nom complet</Label>
                <Input
                  id="c-nom"
                  name="nom"
                  required
                  autoComplete="name"
                  placeholder="Votre nom et prénom"
                  className={fieldClassName}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="c-email">Adresse e-mail</Label>
                <Input
                  id="c-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="vous@exemple.com"
                  className={fieldClassName}
                />
                <p className="text-muted-foreground text-xs leading-5">
                  Cette adresse me permettra de vous répondre.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="c-message">Votre message</Label>
                <Textarea
                  id="c-message"
                  name="message"
                  required
                  minLength={10}
                  rows={5}
                  placeholder="Présentez votre projet, votre question ou votre idée..."
                  className="border-border bg-background
                    placeholder:text-muted-foreground/70
                    focus-visible:border-primary focus-visible:ring-primary/20
                    min-h-36 resize-y rounded-xl px-4 py-3 text-sm leading-6
                    shadow-none transition-colors"
                />
                <p className="text-muted-foreground text-xs leading-5">
                  Décrivez votre demande en 10 caractères minimum.
                </p>
              </div>

              <div className="border-border space-y-4 border-t pt-5">
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-primary text-primary-foreground
                    shadow-primary/15 hover:bg-primary/90
                    focus-visible:ring-ring focus-visible:ring-offset-background
                    h-12 w-full rounded-xl text-sm font-semibold shadow-lg
                    transition-colors focus-visible:ring-2
                    focus-visible:ring-offset-2 disabled:cursor-not-allowed
                    disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <LoaderCircle
                        aria-hidden="true"
                        className="size-4 animate-spin
                          motion-reduce:animate-none"
                      />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </>
                  )}
                </Button>

                <div
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-sm leading-6"
                >
                  {status === "sent" && (
                    <p className="text-chart-2 flex items-start gap-2">
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0"
                      />
                      <span>
                        Message envoyé avec succès. Merci pour votre confiance !
                      </span>
                    </p>
                  )}

                  {status === "error" && (
                    <p className="text-destructive">
                      L’envoi a échoué. Vérifiez votre connexion et réessayez.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
