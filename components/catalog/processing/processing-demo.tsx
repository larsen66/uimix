import * as React from "react";
import ProcessingCard from "@/components/ui/processing-card";

export default function ProcessingDemo() {
  const [status, setStatus] = React.useState<
    "queued" | "running" | "succeeded" | "failed"
  >("queued");
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setStatus("queued");
    setProgress(0);

    const t1 = setTimeout(() => setStatus("running"), 800);
    const interval = setInterval(
      () => setProgress((p) => Math.min(p + Math.random() * 10 + 5, 95)),
      500
    );
    const t2 = setTimeout(() => {
      setProgress(100);
      setStatus("succeeded");
      clearInterval(interval);
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Градиентный фон */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      />

      {/* Контент поверх */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        <div className="w-[480px]">
          <ProcessingCard
            name="ComponentGeneration"
            status={status}
            progress={progress}
            className="rounded-2xl border border-white/20 shadow-lg bg-white/[0.03]"
          />
        </div>
      </div>
    </div>
  );
}

