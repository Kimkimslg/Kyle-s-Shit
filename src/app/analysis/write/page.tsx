'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, ChevronLeft, Send, 
  ShieldCheck, AlertCircle, Loader2,
  LayoutGrid, FileText, Target, Zap
} from 'lucide-react';
import { INDUSTRIES } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { getAnonId } from '@/lib/anon-auth';

export default function AnalysisWritePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
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

  const handleNext = () => setStep(s => Math.min(s + 1, 5));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
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
      console.error('Submission failed:', {
        message: err.message,
        details: err.details,
        hint: err.hint,
        code: err.code
      });
      alert(`발행에 실패했습니다: ${err.message || '알 수 없는 오류'}\n상세: ${err.details || '없음'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-20 lg:py-32 min-h-screen">
      <header className="mb-16">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">
          <span>Writing Wizard</span>
          <div className="h-px w-12 bg-accent/30" />
          <span>Step {step} of 5</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-primary">
          NEW ANALYSIS ENTRY
        </h1>
      </header>

      {/* Progress Line */}
      <div className="w-full h-1 bg-slate-100 rounded-full mb-16 overflow-hidden flex">
        {[1,2,3,4,5].map(i => (
          <div 
            key={i} 
            className={`h-full flex-grow transition-all duration-500 ${i <= step ? 'bg-accent' : 'bg-transparent'}`}
          />
        ))}
      </div>

      <div className="space-y-12">
        {step === 1 && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <label className="block space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-2">
                <LayoutGrid className="w-3 h-3" /> 1. Select Industry Hub (Mandatory)
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => setFormData({...formData, industry: ind.id})}
                    className={`p-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.industry === ind.id ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white border-border text-secondary hover:border-accent'}`}
                  >
                    {ind.title}
                  </button>
                ))}
              </div>
            </label>
            <label className="block space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Analysis Title</span>
              <input 
                type="text" 
                placeholder="ex. [기업명] 전략적 과제..."
                className="w-full bg-white border border-border p-6 rounded-2xl text-lg font-bold outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </label>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <label className="block space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Target Company</span>
                <input 
                  type="text" 
                  className="w-full bg-white border border-border p-4 rounded-xl text-sm font-bold outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </label>
              <label className="block space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Core Topic / Keyword</span>
                <input 
                  type="text" 
                  className="w-full bg-white border border-border p-4 rounded-xl text-sm font-bold outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                />
              </label>
             </div>
             <label className="block space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-2"><Zap className="w-3 h-3" /> One-Line Strategic Summary</span>
                <textarea 
                  className="w-full bg-white border border-border p-6 rounded-2xl text-sm leading-relaxed outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all min-h-[100px]"
                  value={formData.oneLineSummary}
                  onChange={(e) => setFormData({...formData, oneLineSummary: e.target.value})}
                />
              </label>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <label className="block space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Problem Definition</span>
                <textarea 
                  className="w-full bg-white border border-border p-6 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all min-h-[150px]"
                  value={formData.problemDefinition}
                  onChange={(e) => setFormData({...formData, problemDefinition: e.target.value})}
                />
              </label>
              <label className="block space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Background Context</span>
                <textarea 
                  className="w-full bg-white border border-border p-6 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all min-h-[150px]"
                  value={formData.background}
                  onChange={(e) => setFormData({...formData, background: e.target.value})}
                />
              </label>
          </section>
        )}

        {step === 4 && (
          <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <label className="block space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Root Cause Analysis</span>
                <textarea 
                  className="w-full bg-white border border-border p-6 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all min-h-[150px]"
                  value={formData.causeAnalysis}
                  onChange={(e) => setFormData({...formData, causeAnalysis: e.target.value})}
                />
              </label>
              <label className="block space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Strategy Recommendation</span>
                <textarea 
                  className="w-full bg-white border border-border p-6 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all min-h-[150px]"
                  value={formData.proposedStrategy}
                  onChange={(e) => setFormData({...formData, proposedStrategy: e.target.value})}
                />
              </label>
          </section>
        )}

        {step === 5 && (
          <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <label className="block space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary text-red-400">Risks & Limitations</span>
                <textarea 
                  className="w-full bg-white border border-border p-6 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all min-h-[150px]"
                  value={formData.risksLimitations}
                  onChange={(e) => setFormData({...formData, risksLimitations: e.target.value})}
                />
              </label>
              <label className="block space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">References (One per line)</span>
                <textarea 
                  className="w-full bg-white border border-border p-6 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all min-h-[100px]"
                  placeholder="ex. 2024 IR Report\nReuters Energy News..."
                  value={formData.references}
                  onChange={(e) => setFormData({...formData, references: e.target.value})}
                />
              </label>
          </section>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-16 border-t border-border">
          <button 
            onClick={handleBack}
            className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          
          <div className="flex items-center gap-4">
            {step < 5 ? (
              <button 
                onClick={handleNext}
                disabled={step === 1 && !formData.industry}
                className="flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-primary/10 disabled:opacity-30"
              >
                Next Section <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-3 px-10 py-4 bg-accent text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-accent/20 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish Archive Entry'}
                {!isSubmitting && <Send className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
