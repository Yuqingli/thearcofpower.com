import React from "react";

interface CalloutProps {
  type?: "insight" | "warning" | "context" | "info" | "tip";
  children: React.ReactNode;
}

export function Callout({ type = "insight", children }: CalloutProps) {
  const styles: Record<string, string> = {
    insight: "border-l-gold-500",
    warning: "border-l-red-500",
    context: "border-l-sky-500",
    info: "border-l-sky-500",
    tip: "border-l-gold-500",
  };

  const labelStyles: Record<string, string> = {
    insight: "text-gold-500",
    warning: "text-red-400",
    context: "text-sky-400",
    info: "text-sky-400",
    tip: "text-gold-500",
  };

  const labels: Record<string, string> = {
    insight: "Key Insight",
    warning: "Critical",
    context: "Context",
    info: "Note",
    tip: "Tip",
  };

  return (
    <div
      className={`callout my-8 border border-edge-dim border-l-2 bg-paper-doc p-5 ${
        styles[type] ?? styles.insight
      }`}
    >
      <p
        className={`mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] ${
          labelStyles[type] ?? labelStyles.insight
        }`}
      >
        {labels[type] ?? labels.insight}
      </p>
      <div className="text-sm leading-relaxed text-ink-muted">{children}</div>
    </div>
  );
}
