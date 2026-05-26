import { Button as MovingBorderButton } from "./ui/moving-border";
import { useState } from "react";

export type InstallGuide = {
  shell: string;
  shellHint: string;
  steps: { title: string; code?: string[]; note?: string }[];
  copyText: string;
  afterSteps?: string;
};

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`shrink-0 px-2.5 py-1 text-[11px] font-mono rounded border transition-all cursor-pointer ${
        copied
          ? "text-[#a6e3a1] border-[#a6e3a1] bg-[#a6e3a1]/10"
          : "text-[#6c7086] border-[#45475a] bg-[#313244] hover:text-[#cdd6f4] hover:bg-[#45475a]"
      }`}
    >
      {copied ? "copied!" : "copy all"}
    </button>
  );
}

export default function InstallSteps({ guide }: { guide: InstallGuide }) {
  return (
    <MovingBorderButton
      borderRadius="6px"
      className="bg-[#181825] text-[#cdd6f4] border-[#313244] font-mono text-[11px] sm:text-xs w-full"
      containerClassName="h-auto max-w-full w-full"
      duration={3000}
    >
      <div className="px-4 sm:px-5 py-4 w-full text-left space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] uppercase tracking-[1.5px] text-[#585b70]">{guide.shellHint}</span>
          <CopyBtn text={guide.copyText} />
        </div>

        {guide.steps.map((step, i) => (
          <div key={i}>
            <p className="text-[#a6adc8] text-[12px] mb-1.5">
              <span className="text-[#fab387]">{i + 1}.</span> {step.title}
            </p>
            {step.code && (
              <pre className="overflow-x-auto rounded-md border border-[#313244] bg-[#11111b] px-3 py-2.5 text-[#89b4fa] leading-[1.65] whitespace-pre-wrap break-all">
                <span className="text-[#a6e3a1]">{guide.shell} </span>
                {step.code.join("\n")}
              </pre>
            )}
            {step.note && <p className="mt-1.5 text-[11px] text-[#585b70] leading-[1.55]">{step.note}</p>}
          </div>
        ))}

        {guide.afterSteps && (
          <p className="text-[11px] text-[#585b70] leading-[1.6] border-t border-[#313244] pt-3">{guide.afterSteps}</p>
        )}
      </div>
    </MovingBorderButton>
  );
}
