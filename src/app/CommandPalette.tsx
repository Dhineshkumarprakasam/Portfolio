import { useEffect } from "react";
import { Command } from "cmdk";
import { useToast } from "./Toast";
import {
  Search,
  FileText,
  AlignLeft,
  Braces,
  BookOpen,
  Github,
  Linkedin,
  Code2,
  Copy,
  Download,
} from "lucide-react";

type TabId = "bio.md" | "skills.md" | "projects.json" | "about.md";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setActiveTab: (tab: TabId) => void;
}

const itemClass =
  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-mono text-[#e6edf3] cursor-pointer data-[selected=true]:bg-[#21262d] data-[selected=true]:text-[#58a6ff] transition-colors";
const groupClass =
  "px-2 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#8b949e]";

export const CommandPalette = ({ open, onOpenChange, setActiveTab }: CommandPaletteProps) => {
  const { showToast } = useToast();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  if (!open) return null;

  const go = (tab: TabId) => {
    setActiveTab(tab);
    onOpenChange(false);
  };

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("dhineshkumarprakasam@gmail.com");
      showToast("Email copied to clipboard");
    } catch {
      showToast("Couldn't copy email");
    }
    onOpenChange(false);
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/dhinesh_resume.pdf";
    link.download = "";
    link.click();
    onOpenChange(false);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4"
      onClick={() => onOpenChange(false)}
    >
      <Command
        onClick={(e) => e.stopPropagation()}
        label="Command Menu"
        className="w-full h-full sm:h-auto sm:max-w-lg sm:rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#30363d] shrink-0">
          <Search className="w-4 h-4 text-[#8b949e] shrink-0" />
          <Command.Input
            autoFocus
            placeholder="Search pages, links, actions..."
            className="w-full bg-transparent outline-none text-[13px] font-mono text-[#e6edf3] placeholder:text-[#6e7681] py-1"
          />
          <button
            onClick={() => onOpenChange(false)}
            className="sm:hidden text-[11px] font-mono text-[#8b949e] px-2 py-1 shrink-0"
          >
            Cancel
          </button>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono text-[#8b949e] border border-[#30363d] bg-[#0d1117]">
            esc
          </kbd>
        </div>

        <Command.List className="flex-1 overflow-y-auto p-2 sm:max-h-[360px]">
          <Command.Empty className="py-10 text-center text-[12px] font-mono text-[#8b949e]">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigate" className={groupClass}>
            <Command.Item className={itemClass} onSelect={() => go("bio.md")}>
              <FileText className="w-3.5 h-3.5 text-[#3fb950]" /> Go to bio.md
            </Command.Item>
            <Command.Item className={itemClass} onSelect={() => go("skills.md")}>
              <AlignLeft className="w-3.5 h-3.5 text-[#61dafb]" /> Go to skills.md
            </Command.Item>
            <Command.Item className={itemClass} onSelect={() => go("projects.json")}>
              <Braces className="w-3.5 h-3.5 text-[#ffa657]" /> Go to projects.json
            </Command.Item>
            <Command.Item className={itemClass} onSelect={() => go("about.md")}>
              <BookOpen className="w-3.5 h-3.5 text-[#d2a8ff]" /> Go to about.md
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Profiles" className={`${groupClass} mt-2`}>
            <Command.Item className={itemClass} onSelect={() => openLink("https://github.com/Dhineshkumarprakasam")}>
              <Github className="w-3.5 h-3.5" /> Open GitHub
            </Command.Item>
            <Command.Item className={itemClass} onSelect={() => openLink("https://www.linkedin.com/in/dhineshkumar-prakasam-a7454b251/")}>
              <Linkedin className="w-3.5 h-3.5" /> Open LinkedIn
            </Command.Item>
            <Command.Item className={itemClass} onSelect={() => openLink("https://leetcode.com/u/dhineshkumarprakasam/")}>
              <Code2 className="w-3.5 h-3.5" /> Open LeetCode
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Actions" className={`${groupClass} mt-2`}>
            <Command.Item className={itemClass} onSelect={copyEmail}>
              <Copy className="w-3.5 h-3.5" /> Copy email address
            </Command.Item>
            <Command.Item className={itemClass} onSelect={downloadResume}>
              <Download className="w-3.5 h-3.5" /> Download resume
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
};