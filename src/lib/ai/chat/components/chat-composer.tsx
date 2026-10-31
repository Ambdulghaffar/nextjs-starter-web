import { useForm } from "react-hook-form";
import { ChatMessageFormValues } from "../schemas/chat";
import { ArrowUp, Loader2, Paperclip } from "lucide-react";
import { SUGGESTIONS } from "./chat";

interface ChatComposerProps {
  register: ReturnType<typeof useForm<ChatMessageFormValues>>["register"];

  textareaRef: React.RefObject<HTMLTextAreaElement | null>;

  content: string;

  error?: string;

  isSending: boolean;

  onInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;

  onSubmit: () => void;

  onSuggestion: (value: string) => void;
}

export default function ChatComposer({
  register,
  textareaRef,
  content,
  error,
  isSending,
  onInput,
  onKeyDown,
  onSubmit,
  onSuggestion,
}: ChatComposerProps) {
  return (
    <>
      <div
        className="flex items-end gap-2 rounded-3xl border border-[#E5E6EB]
          bg-white p-2 pl-4
          shadow-[0_1px_2px_rgba(20,20,30,.04),0_12px_32px_-16px_rgba(20,20,30,.12)]
          focus-within:border-[#5750E8] focus-within:ring-4
          focus-within:ring-[#EDEBFF] dark:border-[#2B2C35] dark:bg-[#1A1B22]
          dark:focus-within:ring-[#242244]"
      >
        <textarea
          {...register("content")}
          ref={(element) => {
            register("content").ref(element);
            textareaRef.current = element;
          }}
          rows={1}
          value={content}
          onChange={onInput}
          onKeyDown={onKeyDown}
          disabled={isSending}
          placeholder="Écris un message à ton assistant…"
          className="max-h-40 flex-1 resize-none bg-transparent py-2.5
            text-[15px] outline-none placeholder:text-[#9CA0AC]
            disabled:opacity-60"
        />

        <button
          type="button"
          disabled={isSending}
          title="Joindre un fichier"
          className="flex h-9 w-9 shrink-0 items-center justify-center
            rounded-full border border-[#E5E6EB] text-[#6B7280]
            transition-colors hover:border-[#5750E8] hover:text-[#5750E8]
            disabled:opacity-40 dark:border-[#2B2C35] dark:text-[#93949E]"
        >
          <Paperclip className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!content.trim() || isSending}
          title="Envoyer"
          className="flex h-9 w-9 shrink-0 items-center justify-center
            rounded-full bg-[#1B1D22] text-white transition-colors
            hover:bg-[#5750E8] disabled:opacity-40 dark:bg-[#EDEDF2]
            dark:text-[#121319]"
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-error-500 mt-1 text-xs sm:text-sm">{error}</p>
      )}

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion.label}
            type="button"
            disabled={isSending}
            onClick={() => onSuggestion(suggestion.label)}
            className="rounded-full border border-[#E5E6EB] bg-white px-3.5 py-2
              text-sm transition-all hover:-translate-y-0.5
              hover:border-[#5750E8] disabled:opacity-50 dark:border-[#2B2C35]
              dark:bg-[#1A1B22]"
          >
            <span className="mr-1.5">{suggestion.emoji}</span>
            {suggestion.label}
          </button>
        ))}
      </div>
    </>
  );
}
