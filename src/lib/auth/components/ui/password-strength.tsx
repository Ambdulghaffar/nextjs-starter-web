"use client";
import React from "react";

const LEVELS = [
  { label: "Très faible", bar: "bg-destructive", text: "text-destructive" },
  { label: "Faible", bar: "bg-orange-500", text: "text-orange-500" },
  { label: "Moyenne", bar: "bg-yellow-500", text: "text-yellow-500" },
  { label: "Forte", bar: "bg-lime-500", text: "text-lime-500" },
  { label: "Très forte", bar: "bg-green-500", text: "text-green-500" },
];

function getLevel(password: string): number {
  let points = 0;
  if (password.length >= 8) points++;
  if (password.length >= 12) points++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) points++;
  if (/\d/.test(password)) points++;
  if (/[^A-Za-z0-9]/.test(password)) points++;

  let level = Math.max(0, points - 1); // 0 à 4
  if (password.length < 8) level = Math.min(level, 1); // trop court = jamais plus que "Faible"
  return level;
}

export default function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const level = getLevel(password);
  const { label, bar, text } = LEVELS[level];

  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1">
        {LEVELS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= level ? bar : "bg-muted"
            }`}
          />
        ))}
      </div>
      <p className={`mt-1 text-xs font-medium ${text}`}>
        Force du mot de passe : {label}
      </p>
    </div>
  );
}
