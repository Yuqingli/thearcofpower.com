import React from "react";

interface CalloutProps {
  type?: "insight" | "warning" | "context";
  children: React.ReactNode;
}

export function Callout({ type = "insight", children }: CalloutProps) {
  const styles = {
    insight:
      "bg-gold-900/20 border-gold-500 text-gold-100",
    warning:
      "bg-red-950/30 border-red-500 text-red-100",
    context:
      "bg-sky-950/30 border-sky-500 text-sky-100",
  };

  const labels = {
    insight: "Key Insight",
    warning: "Critical",
    context: "Context",
  };

  return (
    <div className={`p-4 rounded-lg border-l-4 my-6 ${styles[type]}`}>
      <p className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">
        {labels[type]}
      </p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
