import { useState, useEffect } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Separator from "@radix-ui/react-separator";
import LoadingScreen from "./Loading";
import {
  Github,
  Linkedin,
  Code2,
  Download,
  ChevronRight,
  FileText,
  Folder,
  Star,
  GitFork,
  Database,
  Server,
  Layers,
  BookOpen,
  Award,
  Cpu,
  FileJson,
  Braces,
  Users,
  LockKeyhole,
  GitCommit,
  MessageSquare,
  TrendingUp,
  AlignLeft,
  Globe,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  Layout,
  Settings2,
  Cloud,
  Contact,
  Brain,
  NotebookText,
  Landmark,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = "bio.md" | "skills.md" | "projects.json" | "about.md";

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    name: "JQL",
    icon: FileJson,
    desc: "Lightweight CLI/GUI tool for querying and modifying raw JSON files with real-time validation and LRU caching.",
    stack: ["Python", "JSON", "JavaScript", "Bootstrap", "HTML/CSS"],
    stars: 0,
    forks: 0,
    live: false,
    github: "https://github.com/Dhineshkumarprakasam/jql",
  },
  {
    name: "HelpMe@OS",
    icon: Cpu,
    desc: "Interactive simulator for 18 classical OS algorithms across CPU, memory, disk, and page replacement subsystems.",
    stack: ["Python", "Flask", "Bootstrap", "HTML/CSS"],
    stars: 0,
    forks: 0,
    live: false,
    github: "https://github.com/Dhineshkumarprakasam/HelpmeAtOS",
  },
  {
    name: "D.S.V - Secure Vault",
    icon: LockKeyhole,
    desc: "Android app for secure PDF encryption with anti-screenshot protection and zero-persistence memory wiping.",
    stack: ["Flutter", "Kotlin", "Android SDK"],
    stars: 0,
    forks: 0,
    live: false,
    github: "https://github.com/Dhineshkumarprakasam/dsv",
  },
  {
    name: "EduNet",
    icon: Users,
    desc: "Community grouping platform using NLP and embedding-based similarity to assign users to social circles.",
    stack: ["Python", "NLP", "Flutter"],
    stars: 0,
    forks: 0,
    live: false,
    github: "https://github.com/Dhineshkumarprakasam/EduNet",
  },
  {
    name: "Math Booster",
    icon: Brain,
    desc: "Interactive Flutter app for mastering mental math operations including arithmetic, squares, and cubes.",
    stack: ["Flutter", "Dart"],
    stars: 0,
    forks: 0,
    live: false,
    github: "https://github.com/Dhineshkumarprakasam/math_booster",
  },
  {
    name: "Notes App",
    icon: NotebookText,
    desc: "Minimalist Flutter notes manager with offline storage, supporting intuitive CRUD operations and swipe-to-delete.",
    stack: ["Flutter", "Dart", "Sqflite"],
    stars: 0,
    forks: 0,
    live: false,
    github: "https://github.com/Dhineshkumarprakasam/mobile_notes_app",
  },
  {
    name: "Loan Predictor",
    icon: Landmark,
    desc: "Flutter app for loan eligibility assessment, utilizing a Python Flask backend and a machine learning model for predictions.",
    stack: ["Flutter", "Flask", "Python", "Machine Learning"],
    stars: 0,
    forks: 0,
    live: false,
    github: "https://github.com/Dhineshkumarprakasam/loan_approval_prediction",
  },
];

const skillGroups = [
  {
    label: "Frontend",
    color: "#61dafb",
    icon: Layout,
    items: [
      "React.js",
      "Flutter",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "HTML5",
      "CSS3",
    ],
  },
  {
    label: "Backend",
    color: "#3fb950",
    icon: Server,
    items: ["FastAPI", "Flask", "Node.js", "Express.js", "REST APIs"],
  },
  {
    label: "Databases",
    color: "#2496ed",
    icon: Database,
    items: ["MySQL", "MongoDB", "Redis", "SQLite"],
  },
  {
    label: "Data Science",
    color: "#ffa657",
    icon: Cloud,
    items: ["Machine Learning", "Sklearn", "Pandas", "Matplotlib", "Seaborn"],
  },
  {
    label: "Tools & DevOps",
    color: "#d2a8ff",
    icon: Settings2,
    items: ["Git", "Docker", "Linux(CLI)"],
  },
];
const education = [
  {
    title: "Master of Computer Applications",
    org: "Vellore Institute of Technology",
    period: "2026 — 2028",
    type: "edu",
    details: [
      "Admitted via VITMEE entrance examination",
      "Secured All India Rank 15",
    ],
  },
  {
    title: "B.Sc. Computer Science",
    org: "Vellore Institute of Technology",
    period: "2023 — 2026",
    type: "edu",
    details: [
      "CGPA: 9.47/10",
      "University Rank 4, consistently in Top 10",
      "Awarded Merit Scholarship for 3 consecutive years",
    ],
  },
];
const experience = [
  {
    title: "Python Developer Intern",
    org: "Lysa Solutions",
    period: "2025 — 2025",
    type: "work",
    details: [
      "Developed an automated content extraction tool for legacy academic question papers",
      "Integrated YOLO for diagram detection and Gemini AI API for intelligent content analysis",
    ],
  },
  {
    title: "Data Analyst Intern",
    org: "Collab Junction",
    period: "2024 — 2024",
    type: "work",
    details: [
      "Transformed complex datasets into actionable business insights",
      "Solved operational challenges through data-driven analysis and collaborative workflows",
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const Badge = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <span
    className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border transition-all duration-200 hover:scale-105 cursor-default"
    style={{
      borderColor: color ? `${color}44` : "#30363d",
      color: color ?? "#c9d1d9",
      backgroundColor: color ? `${color}18` : "#21262d",
      boxShadow: color ? `0 0 8px ${color}22` : "none",
    }}
  >
    {children}
  </span>
);

const SectionCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-xl border border-[#30363d] bg-[#161b22] ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 px-4 py-3 border-b border-[#30363d] bg-[#1c2128] rounded-t-xl">
    {children}
  </div>
);

// ─── File Tab Icon ────────────────────────────────────────────────────────────

// VS Code-style: .md = markdown icon (green), .json = braces (orange), about = user (purple)
const TabIcon = ({ tab, active }: { tab: TabId; active: boolean }) => {
  const cls = "w-3.5 h-3.5 shrink-0";
  if (tab === "bio.md")
    return (
      <FileText
        className={cls}
        style={{ color: active ? "#3fb950" : "#8b949e" }}
      />
    );
  if (tab === "skills.md")
    return (
      <AlignLeft
        className={cls}
        style={{ color: active ? "#61dafb" : "#8b949e" }}
      />
    );
  if (tab === "projects.json")
    return (
      <Braces
        className={cls}
        style={{ color: active ? "#ffa657" : "#8b949e" }}
      />
    );
  if (tab === "about.md")
    return (
      <BookOpen
        className={cls}
        style={{ color: active ? "#d2a8ff" : "#8b949e" }}
      />
    );
  return <FileText className={cls} />;
};

// ─── BIO.MD Page ─────────────────────────────────────────────────────────────

const BioPage = () => (
  <div className="flex flex-col md:flex-row items-center justify-between min-h-[80vh] px-6 py-10 md:px-14 gap-12">
    {/* ── LEFT: Code Block (Half Space) ── */}
    <div className="flex-1 min-w-0 w-full pt-4">
      {/* Terminal prompt */}
      <p className="text-[11px] font-mono text-[#3fb950] mb-6 flex items-center gap-2">
        <span className="text-[#58a6ff]">$</span>
        <span>cat bio.md</span>
        <span className="animate-pulse text-[#3fb950]">█</span>
      </p>

      {/* Hero heading */}
      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-none mb-10"
        style={{ fontFamily: "Geist, sans-serif" }}
      >
        <span className="text-[#e6edf3]">SOFTWARE </span>
        <span style={{ color: "#58a6ff" }}>ENGINEER</span>
      </h1>

      {/* ── C++ Code Block (No background/border) ── */}
      <div className="text-[13px] md:text-[14px] font-mono leading-relaxed overflow-x-auto w-full max-w-full pb-4">
        <p className="mb-2">
          <span className="text-[#d2a8ff]">#include</span>{" "}
          <span className="text-[#a5d6ff]">&lt;iostream&gt;</span>
          <br />
          <span className="text-[#d2a8ff]">#include</span>{" "}
          <span className="text-[#a5d6ff]">&lt;string&gt;</span>
        </p>

        <p className="mb-4">
          <span className="text-[#ff7b72]">using namespace</span>{" "}
          <span className="text-[#e6edf3]">std;</span>
        </p>

        <p>
          <span className="text-[#ff7b72]">class</span>{" "}
          <span className="text-[#ffa657]">Developer</span>
          {" {"}
        </p>

        <p className="pl-4">
          <span className="text-[#d2a8ff]">private</span>
          <span className="text-[#e6edf3]">:</span>
        </p>
        <p className="pl-8">
          <span className="text-[#79c0ff]">string</span>{" "}
          <span className="text-[#e6edf3]">_codename</span>{" "}
          <span className="text-[#ff7b72]">=</span>{" "}
          <span className="text-[#a5d6ff]">"dhineshkumar"</span>
          <span className="text-[#e6edf3]">;</span>
        </p>
        <p className="pl-8 mb-2">
          <span className="text-[#79c0ff]">int</span>{" "}
          <span className="text-[#e6edf3]">_yearsOfCoding</span>{" "}
          <span className="text-[#ff7b72]">=</span>{" "}
          <span className="text-[#ffa657]">5</span>
          <span className="text-[#e6edf3]">;</span>
        </p>

        <p className="pl-4">
          <span className="text-[#d2a8ff]">public</span>
          <span className="text-[#e6edf3]">:</span>
        </p>
        <p className="pl-8">
          <span className="text-[#79c0ff]">string</span>{" "}
          <span className="text-[#e6edf3]">expertise</span>{" "}
          <span className="text-[#ff7b72]">=</span>{" "}
          <span className="text-[#a5d6ff]">
            "Full Stack Application Development"
          </span>
          <span className="text-[#e6edf3]">;</span>
        </p>
        <p className="pl-8">
          <span className="text-[#79c0ff]">string</span>{" "}
          <span className="text-[#e6edf3]">location</span>{" "}
          <span className="text-[#ff7b72]">=</span>{" "}
          <span className="text-[#a5d6ff]">"Tamil Nadu, IN"</span>
          <span className="text-[#e6edf3]">;</span>
        </p>
        <p className="pl-8">
          <span className="text-[#79c0ff]">string</span>{" "}
          <span className="text-[#e6edf3]">objective</span>{" "}
          <span className="text-[#ff7b72]">=</span>{" "}
          <span className="text-[#3fb950]">
            "if it doesn't exist i'll build it"
          </span>
          <span className="text-[#e6edf3]">;</span>
        </p>
        <p className="pl-8 mb-3">
          <span className="text-[#79c0ff]">string</span>{" "}
          <span className="text-[#e6edf3]">status</span>{" "}
          <span className="text-[#ff7b72]">=</span>{" "}
          <span className="text-[#3fb950]">"open to opportunities"</span>
          <span className="text-[#e6edf3]">;</span>
        </p>
        <p className="pl-8">
          <span className="text-[#ffa657]">Developer</span>
          <span className="text-[#e6edf3]">()</span>{" "}
          <span className="text-[#e6edf3]">{"{"}</span>
        </p>
        <p className="pl-12">
          <span className="text-[#79c0ff]">cout</span>{" "}
          <span className="text-[#ff7b72]">&lt;&lt;</span>{" "}
          <span className="text-[#a5d6ff]">"Ready to build."</span>{" "}
          <span className="text-[#ff7b72]">&lt;&lt;</span>{" "}
          <span className="text-[#79c0ff]">endl</span>
          <span className="text-[#e6edf3]">;</span>
        </p>
        <p className="pl-8">
          <span className="text-[#e6edf3]">{"}"}</span>
        </p>

        <p>
          <span className="text-[#e6edf3]">{"};"}</span>
        </p>
      </div>
    </div>

    {/* ── RIGHT: Profile Picture (Blob shape) ── */}
    {/* ── RIGHT: Profile Picture (Blob shape) ── */}
    <div className="hidden xl:flex flex-1 flex-col items-center justify-center shrink-0 w-full relative">
      <div
        className="relative w-full max-w-[360px] xl:max-w-[420px] aspect-square overflow-hidden"
        style={{
          backgroundColor: "#58a6ff",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          boxShadow: "0 0 60px #58a6ff33",
        }}
      >
        <img
          src="/profile.png"
          alt="Profile"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Name badge under photo */}
      <div className="mt-8 text-center">
        <p className="text-[16px] font-semibold text-[#e6edf3] tracking-widest font-mono uppercase">
          Dhinesh kumar
        </p>
        <p className="text-[13px] font-mono text-[#58a6ff] mt-1">
          Software Engineer
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="w-2 h-2 bg-[#3fb950] rounded-full animate-pulse" />
          <span className="text-[11px] font-mono text-[#3fb950]">
            Available for hire
          </span>
        </div>
      </div>
    </div>
  </div>
);

// ─── SKILLS.MD Page ───────────────────────────────────────────────────────────

const SkillsPage = () => (
  <div className="p-6 md:p-8 space-y-8">
    <div>
      <p className="text-[11px] font-mono text-[#3fb950] mb-6 flex items-center gap-2">
        <span className="text-[#58a6ff]">$</span>
        <span>cat skills.md</span>
        <span className="animate-pulse text-[#3fb950]">█</span>
      </p>
      <h2 className="text-2xl font-bold text-[#e6edf3] mb-1">
        Technical Skills
      </h2>
      <p className="text-[#8b949e] text-sm font-mono">
        Technologies I work with daily
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {skillGroups.map((group) => {
        const Icon = group.icon;
        return (
          <div
            key={group.label}
            className="rounded-xl border border-[#30363d] bg-[#0d1117] p-5 hover:border-opacity-60 transition-all duration-300"
            style={{ borderColor: `${group.color}33` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: `${group.color}18`,
                  border: `1px solid ${group.color}33`,
                }}
              >
                <Icon className="w-4 h-4" style={{ color: group.color }} />
              </div>
              <span
                className="text-[13px] font-semibold font-mono tracking-wide uppercase"
                style={{ color: group.color }}
              >
                {group.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} color={group.color}>
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// ─── PROJECTS.JSON Page ───────────────────────────────────────────────────────

const ProjectsPage = () => (
  <div className="p-6 md:p-8 space-y-6">
    <div>
      <p className="text-[11px] font-mono text-[#3fb950] mb-6 flex items-center gap-2">
        <span className="text-[#58a6ff]">$</span>
        <span>cat projects.json</span>
        <span className="animate-pulse text-[#3fb950]">█</span>
      </p>
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-[#e6edf3]">Projects</h2>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-[#30363d] text-[#8b949e] bg-[#21262d]">
          {projects.length} major repos
        </span>
      </div>
      <p className="text-[#8b949e] text-sm font-mono mt-1">
        Open source work & side projects
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {projects.map((p) => (
        <div
          key={p.name}
          className="rounded-xl border border-[#30363d] bg-[#0d1117] p-4 flex flex-col gap-3 hover:border-[#58a6ff55] transition-all duration-200 group"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#21262d] border border-[#30363d]">
                <p.icon className="w-4 h-4 text-[#58a6ff]" />
              </div>
              <span className="text-[13px] font-mono font-semibold text-[#58a6ff] group-hover:underline truncate">
                {p.name}
              </span>
            </div>
            <div className="flex gap-1 shrink-0">
              {p.live && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg hover:bg-[#21262d] text-[#8b949e] hover:text-[#3fb950] transition-colors"
                  title="Live demo"
                >
                  <Globe className="w-3.5 h-3.5" />
                </a>
              )}
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                title="View on GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <p className="text-[14px] text-[#8b949e] leading-relaxed line-clamp-2">
            {p.desc}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-[#21262d]">
            <span className="flex items-center gap-1 text-[10px] font-mono text-[#8b949e]">
              <Star className="w-3 h-3 text-[#ffa657]" /> {p.stars}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-[#8b949e]">
              <GitFork className="w-3 h-3" /> {p.forks}
            </span>
            {p.live && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-[#3fb950] ml-auto">
                <span className="w-1.5 h-1.5 bg-[#3fb950] rounded-full animate-pulse" />{" "}
                live
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── ABOUT.MD Page ────────────────────────────────────────────────────────────

const AboutPage = () => {
  const [activeProfile, setActiveProfile] = useState<"github" | "leetcode">(
    "github",
  );
  const [githubStats, setGithubStats] = useState({
    repos: "...",
    followers: "...",
    following: "...",
  });

  useEffect(() => {
    fetch("https://api.github.com/users/Dhineshkumarprakasam")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.message) {
          setGithubStats({
            repos: String(data.public_repos || "0"),
            followers: String(data.followers || "0"),
            following: String(data.following || "0"),
          });
        }
      })
      .catch((err) => console.error("Error fetching GitHub stats", err));
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <p className="text-[11px] font-mono text-[#3fb950] mb-6 flex items-center gap-2">
          <span className="text-[#58a6ff]">$</span>
          <span>cat about.md</span>
          <span className="animate-pulse text-[#3fb950]">█</span>
        </p>
        <h2 className="text-2xl font-bold text-[#e6edf3]">About</h2>
        <p className="text-[#8b949e] text-sm font-mono mt-1">
          Experience, education & coding profiles
        </p>
      </div>

      {/* Experience*/}
      <SectionCard>
        <CardHeader>
          <BookOpen className="w-3.5 h-3.5 text-[#d2a8ff]" />
          <span className="text-[11px] font-mono font-semibold text-[#8b949e] uppercase tracking-widest">
            Experience
          </span>
        </CardHeader>
        <div className="p-4">
          <Accordion.Root type="multiple" defaultValue={["0", "1"]}>
            {experience.map((e, i) => (
              <Accordion.Item
                key={i}
                value={String(i)}
                className="border border-[#30363d] rounded-lg mb-2 overflow-hidden"
              >
                <Accordion.Trigger className="w-full flex items-center gap-3 px-4 py-3 bg-[#0d1117] hover:bg-[#161b22] transition-colors group text-left">
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      e.type === "work"
                        ? "bg-[#388bfd1a] border border-[#388bfd44]"
                        : "bg-[#d2a8ff1a] border border-[#d2a8ff44]"
                    }`}
                  >
                    {e.type === "work" ? (
                      <Layers className="w-3.5 h-3.5 text-[#58a6ff]" />
                    ) : (
                      <Award className="w-3.5 h-3.5 text-[#d2a8ff]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#e6edf3] truncate">
                      {e.title}
                    </p>
                    <p className="text-[11px] font-mono text-[#8b949e]">
                      {e.org} · {e.period}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#8b949e] transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
                </Accordion.Trigger>
                <Accordion.Content>
                  <div className="px-4 py-3 bg-[#0d1117] border-t border-[#30363d]">
                    <div className="pl-4 border-l-2 border-[#30363d] space-y-2">
                      {e.details.map((d, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-2 text-[12px] font-mono text-[#8b949e]"
                        >
                          <span className="text-[#3fb950] shrink-0 mt-0.5">
                            ›
                          </span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </SectionCard>

      {/* Education */}
      <SectionCard>
        <CardHeader>
          <BookOpen className="w-3.5 h-3.5 text-[#d2a8ff]" />
          <span className="text-[11px] font-mono font-semibold text-[#8b949e] uppercase tracking-widest">
            Education
          </span>
        </CardHeader>
        <div className="p-4">
          <Accordion.Root type="multiple" defaultValue={["0", "1"]}>
            {education.map((e, i) => (
              <Accordion.Item
                key={i}
                value={String(i)}
                className="border border-[#30363d] rounded-lg mb-2 overflow-hidden"
              >
                <Accordion.Trigger className="w-full flex items-center gap-3 px-4 py-3 bg-[#0d1117] hover:bg-[#161b22] transition-colors group text-left">
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      e.type === "work"
                        ? "bg-[#388bfd1a] border border-[#388bfd44]"
                        : "bg-[#d2a8ff1a] border border-[#d2a8ff44]"
                    }`}
                  >
                    {e.type === "work" ? (
                      <Layers className="w-3.5 h-3.5 text-[#58a6ff]" />
                    ) : (
                      <Award className="w-3.5 h-3.5 text-[#d2a8ff]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#e6edf3] truncate">
                      {e.title}
                    </p>
                    <p className="text-[11px] font-mono text-[#8b949e]">
                      {e.org} · {e.period}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#8b949e] transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
                </Accordion.Trigger>
                <Accordion.Content>
                  <div className="px-4 py-3 bg-[#0d1117] border-t border-[#30363d]">
                    <div className="pl-4 border-l-2 border-[#30363d] space-y-2">
                      {e.details.map((d, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-2 text-[12px] font-mono text-[#8b949e]"
                        >
                          <span className="text-[#3fb950] shrink-0 mt-0.5">
                            ›
                          </span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </SectionCard>

      {/* Coding Profiles — GitHub & LeetCode */}
      <SectionCard>
        <CardHeader>
          <Code2 className="w-3.5 h-3.5 text-[#3fb950]" />
          <span className="text-[11px] font-mono font-semibold text-[#8b949e] uppercase tracking-widest">
            Coding Profiles
          </span>
          <div className="ml-auto flex gap-1">
            {(["github", "leetcode"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setActiveProfile(p)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all duration-200 ${
                  activeProfile === p
                    ? "bg-[#388bfd1a] text-[#58a6ff] border border-[#388bfd44]"
                    : "text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] border border-transparent"
                }`}
              >
                {p === "github" ? "GitHub" : "LeetCode"}
              </button>
            ))}
          </div>
        </CardHeader>

        <div className="p-5 space-y-5">
          {activeProfile === "github" && (
            <>
              {/* GitHub info bar */}
              <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-[#0d1117] border border-[#30363d]">
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-[#e6edf3]" />
                  <div>
                    <p className="text-[13px] font-semibold text-[#e6edf3]">
                      github/Dhineshkumarprakasam
                    </p>
                    <p className="text-[10px] text-[#8b949e] font-mono">
                      Open source contributions & projects
                    </p>
                  </div>
                </div>
                <a
                  href="https://github.com/Dhineshkumarprakasam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#21262d] border border-[#30363d] text-[11px] font-mono text-[#8b949e] hover:text-[#e6edf3] hover:border-[#58a6ff] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> View Profile
                </a>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Public Repos",
                    value: githubStats.repos,
                    color: "#58a6ff",
                  },
                  {
                    label: "Followers",
                    value: githubStats.followers,
                    color: "#ffa657",
                  },
                  {
                    label: "Following",
                    value: githubStats.following,
                    color: "#3fb950",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg bg-[#0d1117] border border-[#30363d] p-3 text-center"
                  >
                    <p
                      className="text-[22px] font-bold font-mono"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </p>
                    <p className="text-[10px] text-[#8b949e] mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeProfile === "leetcode" && (
            <>
              {/* LeetCode info bar */}
              <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-[#0d1117] border border-[#30363d]">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[#ffa657]" />
                  <div>
                    <p className="text-[13px] font-semibold text-[#e6edf3]">
                      leetcode/dhineshkumarprakasam
                    </p>
                    <p className="text-[10px] text-[#8b949e] font-mono">
                      Competitive programming & problem solving
                    </p>
                  </div>
                </div>
                <a
                  href="https://leetcode.com/u/dhineshkumarprakasam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#21262d] border border-[#30363d] text-[11px] font-mono text-[#8b949e] hover:text-[#ffa657] hover:border-[#ffa657] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> View Profile
                </a>
              </div>
            </>
          )}
        </div>
      </SectionCard>
    </div>
  );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  isOpen: boolean;
  onClose: () => void;
}

const sidebarFiles: { icon: React.ElementType; name: TabId; ext: string }[] = [
  { icon: FileText, name: "bio.md", ext: "md" },
  { icon: AlignLeft, name: "skills.md", ext: "md" },
  { icon: Braces, name: "projects.json", ext: "json" },
  { icon: BookOpen, name: "about.md", ext: "md" },
];

const Sidebar = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
}: SidebarProps) => {
  const navLinks = [
    {
      icon: Github,
      label: "github/Dhineshkumarprakasam",
      href: "https://github.com/Dhineshkumarprakasam",
    },
    {
      icon: Linkedin,
      label: "linkedin/dhineshkumarprakasam",
      href: "https://www.linkedin.com/in/dhineshkumar-prakasam-a7454b251/",
    },
    {
      icon: Code2,
      label: "leetcode/dhineshkumarprakasam",
      href: "https://leetcode.com/u/dhineshkumarprakasam/",
    },
  ];

  const extColor = (ext: string) => {
    if (ext === "md") return "#3fb950";
    if (ext === "json") return "#ffa657";
    if (ext === "tsx" || ext === "ts") return "#61dafb";
    return "#8b949e";
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:relative z-30 md:z-auto
          w-72 min-w-[288px] flex flex-col h-full
          border-r border-[#30363d] bg-[#161b22]
          overflow-y-auto transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Avatar + Name */}
        <div className="flex flex-col items-center gap-2 px-4 py-5 border-b border-[#30363d]">
          <div className="flex w-full justify-end md:hidden">
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-2 border-[#388bfd] overflow-hidden bg-[#21262d]">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#0d1117",
                  fontSize: 30,
                  fontWeight: 900,
                  letterSpacing: -0.5,
                  userSelect: "none",
                  fontFamily: "ui-monospace, 'Geist Mono', Consolas, monospace",
                }}
              >
                <span style={{ color: "#e6edf3" }}>D</span>
                <span style={{ color: "#58a6ff" }}>K</span>
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#3fb950] rounded-full border-2 border-[#161b22]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#e6edf3] tracking-wide uppercase">
              DHINESH KUMAR
            </p>
            <p className="text-[10px] font-mono text-[#58a6ff] mt-0.5">
              @dhineshkumar
            </p>
          </div>
        </div>

        {/* File Explorer */}
        <div className="flex-1 overflow-y-auto">
          <Accordion.Root
            type="multiple"
            defaultValue={["files", "profiles"]}
            className="w-full"
          >
            {/* Files */}
            <Accordion.Item value="files" className="border-b border-[#30363d]">
              <Accordion.Trigger className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors group">
                <ChevronRight className="w-3 h-3 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                <Folder className="w-3 h-3" />
                Portfolio
              </Accordion.Trigger>
              <Accordion.Content className="data-[state=open]:animate-none">
                <div className="py-1">
                  {sidebarFiles.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => {
                        setActiveTab(f.name);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-2 pl-7 pr-3 py-1.5 text-[12px] font-mono transition-colors text-left ${
                        activeTab === f.name
                          ? "text-[#e6edf3] bg-[#21262d] border-l-2 border-[#388bfd]"
                          : "text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]"
                      }`}
                    >
                      <f.icon
                        className="w-3 h-3 shrink-0"
                        style={{ color: extColor(f.ext) }}
                      />
                      {f.name}
                    </button>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Item>

            {/* Profiles */}
            <Accordion.Item
              value="profiles"
              className="border-b border-[#30363d]"
            >
              <Accordion.Trigger className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors group">
                <ChevronRight className="w-3 h-3 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                <Globe className="w-3 h-3" />
                Profiles
              </Accordion.Trigger>
              <Accordion.Content>
                <div className="py-1">
                  {navLinks.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 pl-7 pr-3 py-1.5 text-[11px] font-mono text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] transition-colors"
                    >
                      <l.icon className="w-3 h-3 shrink-0" />
                      <span className="truncate">{l.label}</span>
                      <ExternalLink className="w-2.5 h-2.5 ml-auto shrink-0 opacity-0 group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>

        <Separator.Root className="bg-[#30363d] h-px" />
        {/*  Contact */}
        <div className="p-3">
          <a
            href="https://mail.google.com/mail/?view=cm&to=dhineshkumarprakasam@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#21262d] border border-[#30363d] text-[11px] font-mono text-[#8b949e] hover:text-[#e6edf3] hover:border-[#58a6ff] transition-all duration-200"
          >
            <Contact className="w-3 h-3" />
            Contact
          </a>
        </div>

        {/* Download Resume */}
        <div className="p-3">
          <a
            href="/dhinesh_resume.pdf"
            download
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#21262d] border border-[#30363d] text-[11px] font-mono text-[#8b949e] hover:text-[#e6edf3] hover:border-[#58a6ff] transition-all duration-200"
          >
            <Download className="w-3 h-3" />
            Download Resume
          </a>
        </div>
      </aside>
    </>
  );
};

// ─── File Tab Bar ─────────────────────────────────────────────────────────────

interface FileTabBarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  onMenuClick: () => void;
}

const allTabs: TabId[] = ["bio.md", "skills.md", "projects.json", "about.md"];

const FileTabBar = ({
  activeTab,
  setActiveTab,
  onMenuClick,
}: FileTabBarProps) => (
  <div className="flex items-center border-b border-[#30363d] bg-[#0d1117] shrink-0 overflow-x-auto">
    <button
      onClick={onMenuClick}
      className="md:hidden p-2 ml-2 mr-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] transition-colors shrink-0"
    >
      <Menu className="w-4 h-4" />
    </button>
    {allTabs.map((tab) => {
      const isActive = activeTab === tab;
      return (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-mono border-r border-[#30363d] whitespace-nowrap cursor-pointer transition-all duration-150 ${
            isActive
              ? "text-[#e6edf3] border-t-2 border-t-[#388bfd] bg-[#161b22]"
              : "text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22]"
          }`}
        >
          <TabIcon tab={tab} active={isActive} />
          <span>{tab}</span>
        </button>
      );
    })}
  </div>
);

// ─── Status Bar ───────────────────────────────────────────────────────────────

const StatusBar = ({ activeTab }: { activeTab: TabId }) => (
  <div className="flex items-center h-6 border-t border-[#30363d] bg-[#161b22] px-3 gap-3 shrink-0 text-[10px] font-mono text-[#8b949e]">
    <span className="flex items-center gap-1">
      <span className="w-1.5 h-1.5 bg-[#3fb950] rounded-full" />
      Ready
    </span>
    <Separator.Root orientation="vertical" className="bg-[#30363d] w-px h-3" />
    <span>UTF-8</span>
    <Separator.Root orientation="vertical" className="bg-[#30363d] w-px h-3" />
    <span className="text-[#58a6ff]">{activeTab}</span>
    <div className="ml-auto flex items-center gap-3">
      <span className="flex items-center gap-1">
        <GitCommit className="w-3 h-3" />
        main
      </span>
      <span className="flex items-center gap-1 text-[#3fb950]">
        <MessageSquare className="w-3 h-3" />
        No problems
      </span>
    </div>
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("bio.md");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const renderPage = () => {
    switch (activeTab) {
      case "bio.md":
        return <BioPage />;
      case "skills.md":
        return <SkillsPage />;
      case "projects.json":
        return <ProjectsPage />;
      case "about.md":
        return <AboutPage />;
    }
  };

  return (
    <div
      className="dark flex flex-col h-screen bg-[#0d1117] overflow-hidden"
      style={{ fontFamily: "Geist, system-ui, sans-serif" }}
    >
      <LoadingScreen onComplete={() => setLoading(false)} />
      {/* Main Layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Right Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* File Tab Bar */}
          <FileTabBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onMenuClick={() => setSidebarOpen(true)}
          />

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#30363d] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#8b949e]">
            <div className="max-w-[1400px]">{renderPage()}</div>
          </div>
        </main>
      </div>

      {/* Status Bar */}
      <StatusBar activeTab={activeTab} />
    </div>
  );
}
