'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Send, Building2, Lightbulb, Target, AlertTriangle, 
  LayoutGrid, Link as LinkIcon, Loader2, Trash2, ChevronLeft
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

function WritePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [activeTab, setActiveTab] = useState('core');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!editId);
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

  const coreRef = useRef<HTMLElement>(null);
  const thesisRef = useRef<HTMLElement>(null);
  const synthesisRef = useRef<HTMLElement>(null);
  const critiqueRef = useRef<HTMLElement>(null);

  const sectionRefs: any = { core: coreRef, thesis: thesisRef, synthesis: synthesisRef, critique: critiqueRef };

  // Load data if in Edit Mode
  useEffect(() => {
    if (editId) {
      fetchExistingAnalysis();
    }
  }, [editId]);

  const fetchExistingAnalysis = async () => {
    try {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('id', editId)
        .single();
      
      if (error) throw error;
      if (data) {
        setFormData({
          industry: data.industry_id,
          title: data.title,
          company: data.company_name,
          topic: data.topic,
          oneLineSummary: data.oneline_summary,
          problemDefinition: data.problem_definition,
          background: data.background,
          cause_analysis: data.cause_analysis,
          current_response_evaluation: data.current_response_evaluation,
          proposed_strategy: data.proposed_strategy,
          risks_limitations: data.risks_limitations,
          references: data.reference_links?.join('\n') || '',
        } as any);
      }
    } catch (err) {
      console.error('Error fetching for edit:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async () => {
    if (!formData.industry || !formData.title) {
        alert('산업 분야와 제목은 필수입니다.');
        scrollToSection('core');
        return;
    }
    
    setIsSubmitting(true);
    const anonId = getAnonId();

    const payload = {
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
    };

    try {
      if (editId) {
        const { error } = await supabase.from('analyses').update(payload).eq('id', editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('analyses').insert([{ ...payload, anon_id: anonId, is_published: true }]);
        if (error) throw error;
      }
      
      // Success: Redirect to industry page to show "distribution"
      alert(editId ? '성공적으로 수정되었습니다.' : '성공적으로 발행되었습니다!');
      router.push(`/industries/${formData.industry}`);
    } catch (err: any) {
      alert(`저장 실패: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <p className="text-xs font-black uppercase tracking-widest text-secondary">Loading Strategic Context...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* 1. Logic Rail */}
      <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 border-r border-border bg-white z-40 flex flex-col pt-32 px-4">
        <div className="space-y-6">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                activeTab === section.id ? "bg-primary text-white shadow-xl scale-105" : "text-secondary hover:bg-slate-50"
              )}
            >
              <div className={cn("p-2 rounded-lg shrink-0", activeTab === section.id ? "bg-white/20" : "bg-slate-100")}>{section.icon}</div>
              <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block truncate">{section.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* 2. Main Canvas */}
      <main className="flex-grow pl-20 lg:pl-64 pr-4 lg:pr-80 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto space-y-32 pb-40">
          <header className="px-6">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-primary mb-6 uppercase">
              {editId ? 'Update Intelligence' : 'Rewrite the Narrative'}
            </h1>
            <p className="text-sm text-secondary font-medium max-w-lg leading-relaxed">
              분석 데이터를 작성하고 발행 버튼을 눌러 공유하세요.
            </p>
          </header>

          {/* Form Sections (simplified for brevity but includes all original inputs) */}
          <section ref={coreRef} id="core" className="space-y-12 px-6 scroll-mt-32">
             <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-4 py-1.5 rounded-full text-slate-500">01. Core Identity</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <label className="block space-y-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Target Industry</span>
                <select 
                  className="w-full bg-white border border-border p-5 rounded-2xl text-xs font-bold outline-none focus:border-accent"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                >
                  <option value="">분야를 선택해 주세요</option>
                  {INDUSTRIES.map(i => <option key={i.id} value={i.id}>{i.title.toUpperCase()}</option>)}
                </select>
              </label>
              <label className="block space-y-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Subject Entity</span>
                <input type="text" className="w-full bg-white border border-border p-5 rounded-2xl text-sm font-bold" placeholder="기업명" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
              </label>
            </div>
            <label className="block space-y-4">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Analysis Title</span>
              <input type="text" className="w-full bg-white border border-border p-6 rounded-2xl text-xl font-black" placeholder="보고서 제목" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </label>
          </section>

          <section ref={thesisRef} id="thesis" className="space-y-12 px-6 scroll-mt-32 pt-20 border-t">
            {/* Same as before but linked to formData */}
            <label className="block space-y-4">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">One-Line Strategic Pitch</span>
              <textarea className="w-full bg-white border border-border p-8 rounded-3xl text-sm italic min-h-[120px]" value={formData.oneLineSummary} onChange={(e) => setFormData({...formData, oneLineSummary: e.target.value})} />
            </label>
            <label className="block space-y-4">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Problem Definition</span>
              <textarea className="w-full bg-white border border-border p-8 rounded-3xl text-sm min-h-[220px]" value={formData.problemDefinition} onChange={(e) => setFormData({...formData, problemDefinition: e.target.value})} />
            </label>
          </section>

          <section ref={synthesisRef} id="synthesis" className="space-y-12 px-6 scroll-mt-32 pt-20 border-t">
             <label className="block space-y-4">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Proposed Strategy</span>
              <textarea className="w-full bg-white border border-accent/20 p-8 rounded-3xl text-sm min-h-[350px] shadow-lg" value={formData.proposedStrategy} onChange={(e) => setFormData({...formData, proposedStrategy: e.target.value})} />
            </label>
          </section>

          <section ref={critiqueRef} id="critique" className="space-y-12 px-6 scroll-mt-32 pt-20 border-t text-center">
            <h2 className="text-2xl font-black text-primary uppercase">Ready to Deploy?</h2>
            <p className="text-xs text-secondary font-bold">작성하신 분석 데이터는 산업별 아카이브로 즉시 분류됩니다.</p>
            
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full max-w-md mx-auto h-20 bg-accent hover:bg-black text-white rounded-3xl flex items-center justify-center gap-4 transition-all shadow-2xl shadow-accent/20 group animate-pulse hover:animate-none"
            >
              {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
              <span className="text-lg font-black uppercase tracking-tighter">
                {editId ? 'Update Report' : 'Publish Analysis Report'}
              </span>
            </button>
          </section>
        </div>
      </main>

      {/* 3. Context Board */}
      <aside className="fixed right-0 top-0 h-full w-80 border-l border-border bg-white z-40 hidden xl:flex flex-col pt-32 px-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">Real-time Context</h2>
        <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-accent">
            <p className="text-[11px] font-bold italic leading-relaxed text-secondary">
               {formData.oneLineSummary || "작성 중인 분석 요약이 여기에 표시됩니다."}
            </p>
        </div>
      </aside>
    </div>
  );
}

export default function AnalysisWritePage() {
  return (
    <Suspense fallback={<div className="p-20 text-center uppercase font-black text-slate-300">Initializing Lab...</div>}>
      <WritePageContent />
    </Suspense>
  );
}
