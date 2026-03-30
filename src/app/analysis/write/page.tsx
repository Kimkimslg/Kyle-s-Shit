'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, ChevronLeft, Send, 
  ShieldCheck, AlertCircle, Loader2,
  LayoutGrid, FileText, Target, Zap,
  Lightbulb, PenTool, BookOpen, AlertTriangle,
  Link as LinkIcon, Building2, Terminal
} from 'lucide-react';
import { INDUSTRIES } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { getAnonId } from '@/lib/anon-auth';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { id: 'core', label: 'Core Info', icon: <Building2 className="w-4 h-4" /> },
  { id: 'thesis', label: 'The Thesis', icon: <Lightbulb className="w-4 h-4" /> },
  { id: 'synthesis', label: 'Synthesis', icon: <Target className="w-4 h-4" /> },
  { id: 'critique', label: 'Critique', icon: <AlertTriangle className="w-4 h-4" /> },
];

export default function AnalysisWritePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('core');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    industry: '',
    title: '',
    company: '',
    topic: '',
    oneLineSummary: '',
    problemDefinition: '',
    background: '',
    causeAnalysis: '',
    currentResponseEvaluation: '',
    proposedStrategy: '',
    risksLimitations: '',
    references: '',
  });

  // Section Refs for Scrolling
  const coreRef = useRef<HTMLElement>(null);
  const thesisRef = useRef<HTMLElement>(null);
  const synthesisRef = useRef<HTMLElement>(null);
  const critiqueRef = useRef<HTMLElement>(null);

  const sectionRefs: any = {
    core: coreRef,
    thesis: thesisRef,
    synthesis: synthesisRef,
    critique: critiqueRef,
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Intersection Observer to update active tab on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs).forEach((ref: any) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async () => {
    if (!formData.industry) {
        alert('산업 분야를 먼저 선택해 주세요.');
        scrollToSection('core');
        return;
    }
    
    setIsSubmitting(true);
    const anonId = getAnonId();

    try {
      const { error } = await supabase
        .from('analyses')
        .insert([{
          author_id: null,
          anon_id: anonId,
          industry_id: formData.industry,
          title: formData.title,
          company_name: formData.company,
          topic: formData.topic,
          oneline_summary: formData.oneLineSummary,
          problem_definition: formData.problemDefinition,
          background: formData.background,
          cause_analysis: formData.causeAnalysis,
          current_response_evaluation: formData.currentResponseEvaluation,
          proposed_strategy: formData.proposedStrategy,
          risks_limitations: formData.risksLimitations,
          reference_links: formData.references.split('\n').filter(r => r.trim() !== ''),
          is_published: true
        }]);

      if (error) throw error;
      router.push('/archive');
    } catch (err: any) {
      alert(`발행 실패: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* 1. Left Navigation Track (The Logic Rail) */}
      <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 border-r border-border bg-white z-40 flex flex-col pt-32 px-4 shadow-sm">
        <div className="space-y-6">
          <div className="px-4 mb-10 hidden lg:block">
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Analysis Lab</h2>
          </div>
          
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                activeTab === section.id 
                  ? "bg-primary text-white shadow-xl shadow-primary/10 scale-105" 
                  : "text-secondary hover:bg-slate-50"
              )}
            >
              <div className={cn(
                  "p-2 rounded-lg shrink-0",
                  activeTab === section.id ? "bg-white/20" : "bg-slate-100"
              )}>
                {section.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block truncate">
                {section.label}
              </span>
            </button>
          ))}
        </div>

        {/* Action Button Section in Sidebar */}
        <div className="mt-auto mb-10 px-2 lg:px-4">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.industry}
            className="w-full h-14 bg-accent hover:bg-black text-white rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-30 disabled:grayscale group"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            <span className="text-[10px] font-black tracking-widest hidden lg:block uppercase">Publish</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Canvas Area */}
      <main className="flex-grow pl-20 lg:pl-64 pr-4 lg:pr-80 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto space-y-32 pb-40">
          
          {/* Header */}
          <header className="px-6 mb-20 animate-in fade-in duration-700">
            <h1 className="text-5xl font-black tracking-tighter text-primary mb-6 uppercase">
              REWRITE THE NARRATIVE
            </h1>
            <p className="text-sm text-secondary font-medium max-w-lg leading-relaxed">
              분석은 단순히 사실을 나열하는 것이 아니라, 전략적 긴장감을 해소하는 과정입니다. 
              당신의 통찰을 논리적으로 직조해 보세요.
            </p>
          </header>

          {/* Section 1: CORE */}
          <section ref={coreRef} id="core" className="space-y-12 px-6 scroll-mt-32">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-4 py-1.5 rounded-full text-slate-500">01. Core Identity</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <label className="block space-y-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <LayoutGrid className="w-3.5 h-3.5" /> Target Industry
                </span>
                <select 
                  className="w-full bg-white border border-border p-5 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all appearance-none cursor-pointer"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                >
                  <option value="">분야를 선택해 주세요</option>
                  {INDUSTRIES.map(i => <option key={i.id} value={i.id}>{i.title.toUpperCase()}</option>)}
                </select>
              </label>

              <label className="block space-y-4">
                 <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5" /> Subject Entity
                </span>
                <input 
                  type="text" 
                  placeholder="분석 대상 기업명"
                  className="w-full bg-white border border-border p-5 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all placeholder:text-slate-300"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </label>
            </div>

            <label className="block space-y-4">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Analysis Title</span>
              <input 
                type="text" 
                placeholder="ex. [기업명] 전략적 과제 및 대응 방안"
                className="w-full bg-white border border-border p-6 rounded-2xl text-xl lg:text-2xl font-black outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all placeholder:text-slate-200"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </label>
          </section>

          {/* Section 2: THESIS */}
          <section ref={thesisRef} id="thesis" className="space-y-12 px-6 scroll-mt-32 pt-20 border-t border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-4 py-1.5 rounded-full text-slate-500">02. The Thesis</span>
            </div>

            <label className="block space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-accent" /> One-Line Strategic Pitch
                </span>
                 <p className="text-[10px] font-bold text-slate-300 italic">"동료에게 이 분석을 10초 만에 설명한다면?"</p>
              </div>
              <textarea 
                className="w-full bg-white border border-border p-8 rounded-3xl text-sm leading-relaxed outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all min-h-[120px] shadow-sm italic font-medium"
                placeholder="이 보고서가 제안하는 핵심적인 단 한 줄..."
                value={formData.oneLineSummary}
                onChange={(e) => setFormData({...formData, oneLineSummary: e.target.value})}
              />
            </label>

            <div className="grid grid-cols-1 gap-12">
               <label className="block space-y-6">
                 <div className="space-y-2">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Problem Definition (The Pain Point)</span>
                    <p className="text-[10px] font-bold text-slate-300 italic">현재 이 기업이 해결하지 못하고 있는 가장 본질적인 문제는 무엇입니까?</p>
                 </div>
                <textarea 
                  className="w-full bg-white border border-border p-8 rounded-3xl text-sm leading-relaxed outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all min-h-[220px]"
                  value={formData.problemDefinition}
                  onChange={(e) => setFormData({...formData, problemDefinition: e.target.value})}
                />
              </label>

              <label className="block space-y-6">
                <div className="space-y-2">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Background & Context</span>
                    <p className="text-[10px] font-bold text-slate-300 italic">이 문제가 불거지게 된 거시적 트렌드나 산업적 배경은 무엇입니까?</p>
                </div>
                <textarea 
                  className="w-full bg-white border border-border p-8 rounded-3xl text-sm leading-relaxed outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all min-h-[220px]"
                  value={formData.background}
                  onChange={(e) => setFormData({...formData, background: e.target.value})}
                />
              </label>
            </div>
          </section>

          {/* Section 3: SYNTHESIS */}
          <section ref={synthesisRef} id="synthesis" className="space-y-12 px-6 scroll-mt-32 pt-20 border-t border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-4 py-1.5 rounded-full text-slate-500">03. The Synthesis</span>
            </div>

            <label className="block space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Root Cause Analysis</span>
                <p className="text-[10px] font-bold text-slate-300 italic">겉으로 드러난 증상이 아닌, 구조적인 근본 원인을 파악해 보세요.</p>
              </div>
              <textarea 
                className="w-full bg-white border border-border p-8 rounded-3xl text-sm leading-relaxed outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all min-h-[250px]"
                value={formData.causeAnalysis}
                onChange={(e) => setFormData({...formData, causeAnalysis: e.target.value})}
              />
            </label>

            <label className="block space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-accent">Proposed Strategy & Solution</span>
                <p className="text-[10px] font-bold text-slate-300 italic">원인을 해결하기 위한 구체적이고 실행 가능한 당신만의 전략적 제언입니다.</p>
              </div>
              <textarea 
                className="w-full bg-white border border-accent/20 p-8 rounded-3xl text-sm leading-relaxed outline-none focus:ring-8 focus:ring-accent/5 focus:border-accent transition-all min-h-[350px] shadow-lg shadow-accent/5"
                value={formData.proposedStrategy}
                onChange={(e) => setFormData({...formData, proposedStrategy: e.target.value})}
              />
            </label>
          </section>

          {/* Section 4: CRITIQUE */}
          <section ref={critiqueRef} id="critique" className="space-y-12 px-6 scroll-mt-32 pt-20 border-t border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-4 py-1.5 rounded-full text-slate-500">04. The Critique & Sources</span>
            </div>

            <label className="block space-y-6">
               <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-red-400">Risks & Final Limitations</span>
                <p className="text-[10px] font-bold text-slate-300 italic">제안한 전략이 가진 예상치 못한 리스크나 현실적인 한계점은 무엇입니까?</p>
              </div>
              <textarea 
                className="w-full bg-white border border-border p-8 rounded-3xl text-sm leading-relaxed outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all min-h-[180px]"
                value={formData.risksLimitations}
                onChange={(e) => setFormData({...formData, risksLimitations: e.target.value})}
              />
            </label>

            <label className="block space-y-6">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <LinkIcon className="w-3.5 h-3.5" /> References (One per line)
              </span>
              <textarea 
                className="w-full bg-slate-100 border-none p-6 rounded-2xl text-[11px] font-mono outline-none focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all min-h-[120px]"
                placeholder="ex. 2024 Energy IR Report\nReuters Business News..."
                value={formData.references}
                onChange={(e) => setFormData({...formData, references: e.target.value})}
              />
            </label>
          </section>
        </div>
      </main>

      {/* 3. Right Dashboard Area (Context Board) */}
      <aside className="fixed right-0 top-0 h-full w-80 border-l border-border bg-white z-40 hidden xl:flex flex-col pt-32 px-10 overflow-y-auto pb-10">
        <div className="space-y-12">
            <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">Strategic Summary</h2>
                {formData.oneLineSummary ? (
                    <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-accent">
                        <p className="text-[11px] font-bold italic leading-relaxed text-secondary italic">"{formData.oneLineSummary}"</p>
                    </div>
                ) : (
                    <div className="py-10 text-center text-[10px] font-black text-slate-200 border-2 border-dashed border-slate-100 rounded-3xl">SUMMARY WILL APPEAR HERE</div>
                )}
            </div>

            <div>
                 <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Real-time Context</h2>
                 <div className="space-y-6">
                    <div className="space-y-2">
                        <span className="text-[9px] font-black text-slate-300 uppercase">Analysis Target</span>
                        <p className="text-xs font-black text-primary border-b border-slate-100 pb-2 truncate">{formData.company || 'PENDING...'}</p>
                    </div>
                    <div className="space-y-2">
                        <span className="text-[9px] font-black text-slate-300 uppercase">Problem Core</span>
                        <p className="text-xs font-medium text-secondary line-clamp-4">{formData.problemDefinition || 'No problem defined yet.'}</p>
                    </div>
                 </div>
            </div>

            <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Scratchpad</h2>
                <textarea 
                    placeholder="임시 아이디어나 키워드를 자유롭게 적어두세요... (저장되지 않음)"
                    className="w-full bg-slate-50 border-none p-6 rounded-3xl text-[11px] leading-relaxed min-h-[300px] outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all shadow-sm"
                />
            </div>
        </div>
      </aside>
    </div>
  );
}
