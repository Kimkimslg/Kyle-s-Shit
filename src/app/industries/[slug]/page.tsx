'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { INDUSTRIES } from '@/lib/constants';
import PostCard from '@/components/ui/PostCard';
import { ChevronRight, Building2, BookOpen, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function IndustryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const industry = INDUSTRIES.find(i => i.id === slug);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (industry) {
      fetchIndustryAnalyses();
    }
  }, [slug]);

  const fetchIndustryAnalyses = async () => {
    try {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('industry_id', slug)
        .order('created_at', { ascending: false });
      
      if (data) {
        setAnalyses(data.map(item => ({
          id: item.id,
          title: item.title,
          category: item.industry_id,
          date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase(),
          summary: item.oneline_summary
        })));
      }
    } catch (err) {
      console.error('Error fetching Industry data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!industry) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h1 className="text-2xl font-black">Industry not found.</h1>
        <Link href="/" className="text-accent mt-4 inline-block underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-20 lg:py-32">
      {/* Industry Header */}
      <header className="mb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-muted rounded-xl text-primary border border-border">
            {industry.icon}
          </div>
          <div className="h-px flex-grow bg-border opacity-50" />
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-8 text-primary uppercase">
          {industry.title} Archive
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8 border-t border-border">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <BookOpen className="w-3 h-3" /> Definition & Scope
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {industry.definition}
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <Building2 className="w-3 h-3" /> Target Companies
            </h2>
            <div className="flex flex-wrap gap-2">
              {industry.companies.map((company) => (
                <span key={company} className="px-3 py-1 bg-muted rounded-full text-[10px] font-bold text-secondary border border-border">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Analysis List */}
      <section className="space-y-0">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>{industry.title} CASE STUDIES</span>
          </div>
          <span className="text-[10px] font-black text-secondary">{analyses.length} 리포트</span>
        </div>
        
        <div className="divide-y divide-border border-t border-border">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
            </div>
          ) : analyses.length > 0 ? (
            analyses.map((analysis) => (
              <PostCard 
                key={analysis.id}
                {...analysis}
                category={industry.title} 
              />
            ))
          ) : (
            <div className="py-20 text-center text-secondary text-sm italic">
              아직 {industry.title} 분야에 등록된 분석 리포트가 없습니다.
            </div>
          )}
        </div>
      </section>

      <footer className="mt-20 pt-10 border-t border-border flex flex-col items-center gap-6">
        <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors flex items-center gap-2">
          ← Back to Strategic Archive
        </Link>
      </footer>
    </div>
  );
}
