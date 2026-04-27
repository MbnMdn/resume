'use client';

import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, MapPin, ExternalLink, Download, Code2, Layers, Cpu, Database, Layout, Globe, Github, ChevronRight, Sparkles, MessageSquare, Music, Activity, Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- Data ---

const RESUME_DATA = {
  name: "Mobina Madani",
  title: "Frontend Engineer",
  location: "Mashhad, Iran",
  email: "mobina.madanikhah.4@gmail.com",
  linkedin: "https://www.linkedin.com/in/mobina-madanikhah/",
  summary: "Frontend Engineer specializing in building scalable, high-performance web applications using React and Next.js ecosystems. Strong experience in SSR, real-time systems, and complex UI architectures including streaming platforms, admin dashboards, and data-driven applications.",
  skills: [
    { category: "Frontend Core", items: ["React.js", "Next.js", "SSR", "JavaScript", "TypeScript", "Vue.js"], icon: <Code2 className="w-5 h-5 text-blue-400" /> },
    { category: "Styling", items: ["TailwindCSS", "Bootstrap", "HTML5", "CSS3"], icon: <Layout className="w-5 h-5 text-indigo-400" /> },
    { category: "Real-Time", items: ["WebSockets", "HLS Streaming", "Video Players"], icon: <Globe className="w-5 h-5 text-teal-400" /> },
    { category: "Architecture", items: ["Modular", "Scalable UI", "Clean Code"], icon: <Layers className="w-5 h-5 text-amber-400" /> },
    { category: "Dashboards", items: ["RBAC", "Dynamic Permissions", "Cache"], icon: <Database className="w-5 h-5 text-purple-400" /> },
    { category: "Tools", items: ["MUI", "shadcn", "Ant Design", "Figma"], icon: <Cpu className="w-5 h-5 text-rose-400" /> },
  ],
  experience: [
    {
      role: "Frontend Engineer",
      company: "Chimzy",
      companyUrl: "https://chimzy.com/",
      period: "2025 – Present",
      location: "London, UK (Remote)",
      bullets: [
        "Architected multi-vendor price comparison interfaces handling complex data streams.",
        "Built comprehensive admin engine for global product aggregation and pricing management.",
        "Optimized frontend performance for massive datasets using reactive state patterns."
      ]
    },
    {
      role: "Frontend Engineer",
      company: "Clever",
      companyUrl: "https://pelcast.ir",
      period: "2024 – 2025",
      location: "Mashhad, Iran",
      bullets: [
        "Developed custom HLS streaming engine for Pelcast video platform with sub-second latency.",
        "Implemented synchronized subtitle rendering across native and web interfaces.",
        "Engineered modular e-commerce architecture for multi-tenant deployment."
      ]
    },
    {
      role: "Frontend Developer",
      company: "Veerasense",
      period: "2024",
      location: "Mashhad, Iran",
      bullets: [
        "Designed real-time monitoring canvases for industrial thermal detection systems.",
        "Integrated computer vision data into interactive dashboards for kitchen design AI.",
        "Developed organizational Pulse systems for real-time team synchronization."
      ]
    }
  ],
  projects: [
    {
      title: "AI Chatbot",
      description: "Real-time LLM integration with socket streams and structured markdown rendering.",
      tech: ["Next.js", "WebSockets", "Gemini API"],
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      title: "Pelcast",
      description: "Enterprise-grade video streaming platform with custom HLS player and RBAC.",
      tech: ["React", "HLS.js", "TypeScript"],
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: "Music Hub",
      description: "High-performance audio sharing ecosystem with seamless playback transitions.",
      tech: ["Next.js", "Audio API", "Tailwind"],
      icon: <Music className="w-5 h-5" />
    },
    {
      title: "Veerapulse",
      description: "Live dashboard for industrial metrics and organizational health monitoring.",
      tech: ["D3.js", "WebSockets", "Node.js"],
      icon: <Activity className="w-5 h-5" />
    }
  ],
  education: {
    degree: "B.Sc. in Computer Engineering",
    school: "Ferdowsi University of Mashhad",
    period: "2021 – 2025"
  }
};

// --- Components ---

const BackgroundEffect = ({ theme }: { theme: string }) => (
  <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden">
    <div className={`absolute inset-0 transition-colors duration-700 ${theme === 'dark' ? 'bg-[#060606]' : 'bg-[#f8f9fa]'}`} />
    <div className={`absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-20 transition-colors duration-700 ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-300/30'}`} />
    <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[140px] opacity-20 transition-colors duration-700 ${theme === 'dark' ? 'bg-indigo-500/10' : 'bg-indigo-300/30'}`} />
    <div 
      className={`absolute inset-0 transition-opacity duration-700 ${theme === 'dark' ? 'opacity-[0.03]' : 'opacity-[0.04]'} mix-blend-overlay`} 
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
    />
  </div>
);

const Navbar = ({ toggleTheme, theme }: { toggleTheme: () => void, theme: string }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 inset-x-0 z-50 h-20 flex items-center justify-between px-8 md:px-16 backdrop-blur-sm border-b transition-colors duration-500 ${theme === 'dark' ? 'border-white/[0.03] bg-[#060606]/30' : 'border-black/[0.03] bg-white/70'}`}
    >
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${theme === 'dark' ? 'bg-white/10 border-white/10' : 'bg-slate-900/5 border-slate-900/10'}`}>
          <Terminal size={14} className="text-blue-500" />
        </div>
        <span className={`font-mono text-sm tracking-tighter font-bold uppercase transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Madani.dev</span>
      </div>
      
      <div className="hidden md:flex items-center gap-10">
        {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className={`text-[10px] font-mono tracking-[0.2em] uppercase transition-colors duration-300 ${theme === 'dark' ? 'text-zinc-500 hover:text-white' : 'text-slate-500 hover:text-blue-600'}`}
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className={`p-2.5 rounded-full border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-black hover:bg-black/10'}`}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sparkles size={14} /> : <div className="w-3.5 h-3.5 rounded-full bg-black" />}
        </button>
        <button 
          className={`hidden sm:flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-widest border rounded-full transition-all ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20' : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'}`}
        >
          <Download size={12} /> CV
        </button>
        <a 
          href={RESUME_DATA.linkedin} 
          target="_blank" 
          rel="noopener"
          className={`p-2.5 rounded-full border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-black hover:bg-black/10'}`}
        >
          <Linkedin size={14} />
        </a>
      </div>

      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 origin-left"
        style={{ scaleX }}
      />
    </motion.nav>
  );
};

const CustomCursor = ({ theme }: { theme: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <motion.div
      animate={{ 
        x: position.x - 16, 
        y: position.y - 16,
        scale: isPointer ? 1.5 : 1,
        backgroundColor: isPointer ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.1)'
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500/50 pointer-events-none z-[9999] hidden md:block backdrop-blur-[2px]`}
    />
  );
};

const SkillCard = ({ skill, index, theme }: { skill: any, index: number, theme: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
    className={`group relative p-8 rounded-3xl border transition-all duration-500 ${theme === 'dark' ? 'bg-white/[0.02] border-white/5 hover:border-blue-500/20' : 'bg-white border-black/[0.03] shadow-sm hover:shadow-md hover:border-blue-500/10'}`}
  >
    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-b-3xl" />
    <div className="relative z-10">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`}>
        {skill.icon}
      </div>
      <h3 className={`text-lg font-bold mb-4 tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{skill.category}</h3>
      <div className={`flex flex-wrap gap-2 transition-colors ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>
        {skill.items.map((item: string) => (
          <span key={item} className="text-xs font-mono uppercase tracking-widest">{item}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

const ExperienceItem = ({ exp, index, theme }: { exp: any, index: number, theme: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8 py-16 border-b transition-colors ${theme === 'dark' ? 'border-white/[0.05]' : 'border-black/[0.05]'}`}
  >
    <div className="flex flex-col gap-1">
      <span className="text-sm font-mono text-blue-500 tracking-widest">{exp.period}</span>
      <span className={`text-xs font-mono uppercase transition-colors ${theme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>{exp.location}</span>
    </div>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className={`text-2xl font-bold tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {exp.company}
          <span className={`font-medium font-mono text-sm ml-4 transition-colors ${theme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>/ {exp.role}</span>
        </h3>
        {exp.companyUrl && (
          <a href={exp.companyUrl} target="_blank" rel="noopener" className={`p-2 rounded-full border transition-colors ${theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}>
            <ExternalLink size={16} className={theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'} />
          </a>
        )}
      </div>
      <ul className="space-y-4">
        {exp.bullets.map((bullet: string, i: number) => (
          <li key={i} className={`text-base leading-relaxed flex gap-4 transition-colors ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}`}>
            <span className="w-1.5 h-1.5 bg-blue-500/50 rounded-full mt-2.5 shrink-0" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const ProjectCard = ({ project, index, theme }: { project: any, index: number, theme: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`group relative h-[400px] overflow-hidden rounded-[2.5rem] border transition-all duration-500 ${theme === 'dark' ? 'bg-zinc-900/40 border-white/5' : 'bg-white border-black/5 shadow-sm hover:shadow-xl'}`}
  >
    {/* Decorative background */}
    <div className={`absolute inset-0 z-10 transition-colors duration-700 ${theme === 'dark' ? 'bg-gradient-to-b from-transparent to-[#060606]/90' : 'bg-gradient-to-b from-white/10 to-white/95'}`} />
    <div className={`absolute -top-24 -right-24 w-64 h-64 blur-[100px] transition-colors duration-700 ${theme === 'dark' ? 'bg-blue-500/10 group-hover:bg-blue-500/20' : 'bg-blue-200/20 group-hover:bg-blue-200/40'}`} />
    
    <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 rounded-2xl border backdrop-blur-md transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-slate-900'}`}>
          {project.icon}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t: string) => (
            <span key={t} className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${theme === 'dark' ? 'text-blue-400/60' : 'text-blue-600'}`}>{t}</span>
          ))}
        </div>
      </div>
      <h3 className={`text-3xl font-bold mb-4 tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
      <p className={`text-sm leading-relaxed max-w-sm transition-colors ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}`}>
        {project.description}
      </p>
      
      <motion.button 
        whileHover={{ x: 5 }}
        className={`mt-8 flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
      >
        View Case Study <ChevronRight size={14} />
      </motion.button>
    </div>
  </motion.div>
);

export default function ResumePage() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans ${theme === 'dark' ? 'bg-[#060606] text-white' : 'bg-[#f8f9fa] text-slate-900'} selection:bg-blue-500/30 selection:text-white`}>
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-[#060606]' : 'bg-white'}`}
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 240 }}
              className="h-[2px] bg-blue-500 relative"
            >
              <div className={`absolute -top-8 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.5em] ${theme === 'dark' ? 'text-zinc-600' : 'text-slate-300'}`}>
                Architecting Experiences
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor theme={theme} />
      <BackgroundEffect theme={theme} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="relative pt-20">
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-20 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-12">
                  <Sparkles size={18} className="text-blue-500 animate-pulse" />
                  <span className={`text-xs font-mono tracking-[0.4em] uppercase transition-colors ${theme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>Currently Engineering @ Pelcast</span>
                </div>
                
                <h1 className="text-[12vw] lg:text-[9vw] font-bold tracking-tighter leading-[0.85] uppercase mb-12">
                  <span className={`block transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Mobina</span>
                  <span className={`block text-transparent stroke-text bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 ${theme === 'light' ? 'drop-shadow-sm' : ''}`}>Madani</span>
                </h1>

                <p className={`max-w-xl text-xl md:text-2xl leading-relaxed font-medium mb-16 transition-colors ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>
                  {RESUME_DATA.name}, specializing in high-performance web applications, real-time architectures, and scalable UI systems.
                </p>

                <div className="flex flex-wrap gap-6">
                  <motion.a 
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`h-16 px-10 rounded-full flex items-center justify-center font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-xl ${theme === 'dark' ? 'bg-white text-black hover:bg-blue-500 hover:text-white' : 'bg-slate-900 text-white hover:bg-blue-600'}`}
                  >
                    Explore Work
                  </motion.a>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`h-16 px-10 rounded-full border flex items-center justify-center font-bold text-sm uppercase tracking-widest transition-all duration-300 ${theme === 'dark' ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-200 text-slate-900 hover:bg-slate-50'}`}
                  >
                    <Download size={18} className="mr-3" /> Get Resume
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <div className="hidden lg:block relative h-[600px]">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                style={{ 
                  y: useTransform(useScroll().scrollY, [0, 500], [0, -100]),
                  rotate: useTransform(useScroll().scrollY, [0, 500], [0, 5])
                }}
                className={`absolute inset-0 rounded-[100px] border backdrop-blur-3xl overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'border-white/[0.03] bg-gradient-to-br from-white/[0.05] to-transparent' : 'border-black/[0.05] bg-gradient-to-br from-black/[0.02] to-transparent shadow-2xl'}`}
              >
                <div className={`absolute inset-x-0 top-0 h-10 border-b flex items-center px-4 gap-2 ${theme === 'dark' ? 'border-white/[0.05]' : 'border-black/[0.05]'}`}>
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className={`mt-16 p-10 font-mono text-sm leading-loose transition-colors ${theme === 'dark' ? 'text-zinc-700' : 'text-slate-400'}`}>
                  <span className="text-blue-500">interface</span> Mobina {'{'} <br />
                  &nbsp;&nbsp;focus: <span className="text-amber-500">'Scalable UI'</span>; <br />
                  &nbsp;&nbsp;stack: [<span className="text-teal-500">'React', 'Next.js', 'TS'</span>]; <br />
                  &nbsp;&nbsp;specialty: <span className="text-rose-500">'Real-time streams'</span>; <br />
                  &nbsp;&nbsp;vision: <span className="text-purple-500">'Seamless Performance'</span>; <br />
                  {'}'}
                </div>
                <div className={`absolute bottom-[-100px] right-[-100px] w-80 h-80 blur-[100px] transition-colors ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-500/10'}`} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION: SKILLS */}
        <section id="about" className="py-40 px-8 md:px-16 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="sticky top-40"
              >
                <div className={`text-[10px] font-mono tracking-[0.5em] uppercase mb-8 transition-colors ${theme === 'dark' ? 'text-zinc-700' : 'text-slate-400'}`}>Technical Proficiency</div>
                <h2 className={`text-5xl font-bold tracking-tighter leading-tight mb-8 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Architecting <br /> the Next Generation <br /> 
                  <span className={`transition-colors ${theme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>of User Interfaces.</span>
                </h2>
                <p className={`text-lg leading-relaxed max-w-md transition-colors ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>
                  My approach focuses on creating modular, maintainable codebases that power fluid, lightning-fast web experiences.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {RESUME_DATA.skills.map((skill, idx) => (
                  <SkillCard key={skill.category} skill={skill} index={idx} theme={theme} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: EXPERIENCE */}
        <section id="experience" className={`py-40 transition-colors ${theme === 'dark' ? 'bg-white/[0.01] border-y border-white/[0.03]' : 'bg-slate-50 border-y border-slate-200'}`}>
          <div className="max-w-5xl mx-auto px-8 md:px-16">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className={`text-[10px] font-mono tracking-[0.5em] uppercase mb-6 transition-colors ${theme === 'dark' ? 'text-zinc-700' : 'text-slate-400'}`}>Career Path</div>
              <h2 className={`text-6xl font-bold tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Journey.</h2>
            </motion.div>

            <div className="flex flex-col">
              {RESUME_DATA.experience.map((exp, idx) => (
                <ExperienceItem key={exp.company} exp={exp} index={idx} theme={theme} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: PROJECTS */}
        <section id="projects" className="py-40 px-8 md:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-10">
              <div className="max-w-2xl">
                <div className={`text-[10px] font-mono tracking-[0.5em] uppercase mb-8 transition-colors ${theme === 'dark' ? 'text-zinc-700' : 'text-slate-400'}`}>Selected Projects</div>
                <h2 className={`text-7xl font-bold tracking-tighter leading-[0.9] transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Shaping <span className={`italic transition-colors ${theme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>Digital</span> Reality.
                </h2>
              </div>
              <div className="pb-4">
                <a href={RESUME_DATA.linkedin} target="_blank" rel="noopener" className={`group flex items-center gap-4 py-4 px-8 rounded-full border transition-all ${theme === 'dark' ? 'border-white/10 hover:border-blue-500/50' : 'border-slate-200 hover:border-blue-400 hover:bg-white shadow-sm'}`}>
                  <span className={`text-xs font-mono uppercase tracking-widest transition-colors ${theme === 'dark' ? 'text-zinc-500 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'}`}>See all work</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {RESUME_DATA.projects.map((project, idx) => (
                <ProjectCard key={project.title} project={project} index={idx} theme={theme} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: FOOTER */}
        <footer id="contact" className={`py-40 transition-colors ${theme === 'dark' ? 'bg-zinc-950/50' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col items-center">
            <motion.div 
               whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
               className="relative mb-24"
            >
              <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-10 animate-pulse" />
              <h2 className={`relative text-[10vw] font-bold tracking-tighter text-center leading-none uppercase transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Let's <span className={`italic stroke-text transition-colors ${theme === 'dark' ? 'text-zinc-700' : 'text-slate-200'}`}>Collab</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full mb-40 text-center md:text-left">
              <div className="space-y-6">
                <h4 className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${theme === 'dark' ? 'text-zinc-700' : 'text-slate-400'}`}>Navigation</h4>
                <div className="flex flex-col gap-3">
                  {['Home', 'About', 'Experience', 'Projects'].map(item => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-blue-500 transition-colors">{item}</a>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h4 className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${theme === 'dark' ? 'text-zinc-700' : 'text-slate-400'}`}>Connect</h4>
                <div className="flex flex-col gap-3">
                  <a href={`mailto:${RESUME_DATA.email}`} className="text-sm font-medium hover:text-blue-500 transition-colors">{RESUME_DATA.email}</a>
                  <a href={RESUME_DATA.linkedin} target="_blank" rel="noopener" className="text-sm font-medium hover:text-blue-500 transition-colors">LinkedIn</a>
                </div>
              </div>
              <div className="space-y-6 lg:text-right">
                <h4 className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${theme === 'dark' ? 'text-zinc-700' : 'text-slate-400'}`}>Location</h4>
                <div className="flex flex-col gap-1 items-center lg:items-end">
                  <p className="text-sm font-medium">{RESUME_DATA.location}</p>
                  <p className={`text-xs font-mono transition-colors ${theme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>UTC+3:30</p>
                </div>
              </div>
            </div>

            <div className={`w-full flex flex-col md:flex-row items-center justify-between pt-16 border-t gap-8 transition-colors ${theme === 'dark' ? 'border-white/[0.03]' : 'border-black/[0.05]'}`}>
              <div className="flex items-center gap-6">
                <div className={`text-[10px] font-mono uppercase tracking-[0.3em] transition-colors ${theme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>
                  Crafted by M. Madani
                </div>
              </div>
              <div className="flex items-center gap-10">
                <span className={`text-[10px] font-mono transition-colors ${theme === 'dark' ? 'text-zinc-800' : 'text-slate-400'}`}>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
                <motion.button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  whileHover={{ y: -5 }}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-white/5' : 'border-black/5 hover:bg-black/5'}`}
                >
                  <ChevronRight size={16} className={`-rotate-90 transition-colors ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`} />
                </motion.button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        .stroke-text {
          -webkit-text-stroke: 1px ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          color: transparent;
        }
        
        html {
          scroll-behavior: smooth;
        }

        body {
          cursor: crosshair;
        }
      `}</style>
    </div>
  );
}
