'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  MessageSquare, ThumbsUp, ShieldAlert, 
  Lightbulb, HelpCircle, FileText, ChevronRight, Bookmark,
  Calendar, Folder, Clock, User, Loader2, PenTool, Trash2
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getAnonId } from '@/lib/anon-auth';
import CommentsSection from '@/components/ui/CommentsSection';

interface AnalysisData {
  id: string;
  title: string;
  industry_id: string;
  company_name: string;
  topic: string;
  oneline_summary: string;
  problem_definition: string;
  background: string;
  cause_analysis: string;
  current_response_evaluation: string;
  proposed_strategy: string;
  risks_limitations: string;
  reference_links: string[];
  created_at: string;
  anon_id?: string;
}

export default function AnalysisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const analysisId = params.id as string;
  
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [localAnonId, setLocalAnonId] = useState('');

  useEffect(() => {
    setLocalAnonId(getAnonId());
    fetchAnalysis();
  }, [analysisId]);

  const fetchAnalysis = async () => {
    try {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('id', analysisId)
        .single();
      
      if (error) throw error;
      setAnalysis(data);
    } catch (err) {
      console.error('Error fetching analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('이 분석 리포트를 영구적으로 삭제하시겠습니까? 복구할 수 없습니다.')) return;
    
    try {
      const { error } = await supabase
        .from('analyses')
        .delete()
        .eq('id', analysisId)
        .eq('anon_id', localAnonId); // 본인 확인 보안 강화

      if (error) throw error;
      
      alert('성공적으로 삭제되었습니다.');
      router.push('/archive');
    } catch (err: any) {
      alert(`삭제 실패: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h1 className="text-2xl font-black">Analysis Report Not Found</h1>
        <p className="text-secondary mt-4">요청하신 분석물을 찾을 수 없거나 이미 삭제된 상태입니다.</p>
        <Link href="/" className="text-accent mt-6 inline-block font-bold">← Back to Archive</Link>
      </div>
    );
  }

  // 본인 확인 (익명 ID 대조)
  const isAuthor = analysis.anon_id === localAnonId;

  const sections = [
    { key: 'problem_definition', label: '문제 정의' },
    { key: 'background', label: '배경 상황' },
    { key: 'cause_analysis', label: '근본 원인' },
    { key: 'current_response_evaluation', label: '대응 평가' },
    { key: 'proposed_strategy', label: '전략 제언' },
    { key: 'risks_limitations', label: '리스크' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-8 py-20 lg:py-32">
      <header className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
            <span className="flex items-center gap-1.5 underline decoration-accent decoration-2 underline-offset-4">
              {analysis.industry_id.toUpperCase()}
            </span>
            <span className="flex items-center gap-1.5">
               | {analysis.company_name}
            </span>
          </div>
          
          {isAuthor && (
            <div className="flex items-center gap-3">
              <Link 
                href={`/analysis/write?id=${analysis.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-black hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                <PenTool className="w-3 h-3" /> Edit
              </Link>
              <button 
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          )}
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-[800] tracking-tighter leading-tight mb-8 text-primary">
          {analysis.title}
        </h1>

        <div className="flex items-center justify-between border-y border-border py-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-primary">STRATEGIC ANALYST</p>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.1em]">Archive Contributor (You)</p>
            </div>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Published At</p>
             <p className="text-xs font-bold text-secondary">{new Date(analysis.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </header>

      {/* Main Analysis Body */}
      <article className="space-y-20">
        <div className="bg-muted p-10 rounded-2xl border-l-[6px] border-accent italic text-lg leading-relaxed text-slate-700 font-medium">
          "{analysis.oneline_summary}"
        </div>

        {sections.map((section) => (
          <section key={section.key} className="space-y-6">
            <div className="flex items-baseline gap-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex-shrink-0">
                {section.label}
              </h2>
              <div className="h-px flex-grow bg-slate-100" />
            </div>
            <div className="analysis-content text-slate-700 leading-loose whitespace-pre-wrap text-md">
              {(analysis as any)[section.key]}
            </div>
          </section>
        ))}

        <hr className="border-border opacity-50" />

        {/* References */}
        {analysis.reference_links && analysis.reference_links.length > 0 && (
          <section className="pt-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">References / Bibliography</h3>
            <ul className="space-y-3">
              {analysis.reference_links.map((ref, i) => (
                <li key={i} className="text-xs text-secondary font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" /> {ref}
                </li>
              ))}
            </ul>
          </section>
        )}

        <CommentsSection analysisId={analysisId} />
      </article>

      <footer className="mt-32 pt-16 border-t border-border flex flex-col items-center gap-8">
        <Link href="/archive" className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors flex items-center gap-3">
          <ChevronRight className="w-3 h-3 rotate-180" /> Back to Strategic Archive
        </Link>
      </footer>
    </div>
  );
}
