'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PostCard from '@/components/ui/PostCard';
import { supabase } from '@/lib/supabase';
import { INDUSTRIES } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestAnalyses();
  }, []);

  const fetchLatestAnalyses = async () => {
    try {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
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
      console.error('Error fetching Home data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-20 lg:py-32">
      <header className="mb-20">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-4 text-primary">
          Strategic Archive
        </h1>
        <p className="text-secondary max-w-xl font-medium tracking-tight leading-relaxed">
          산업과 기업의 복잡한 비즈니스 난제를 정의하고, 데이터 기반의 논리적 해법을 기록하는 개인 분석 저장소입니다.
        </p>
      </header>

      {/* Industry Hub Grid */}
      <section className="mb-24">
        <div className="mb-8 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>Industrial Expertise</span>
          <div className="h-px flex-grow bg-slate-100" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {INDUSTRIES.map((industry) => (
            <Link 
              key={industry.id} 
              href={`/industries/${industry.id}`}
              className="group p-6 bg-white border border-border rounded-xl hover:border-accent hover:shadow-sm transition-all flex flex-col items-center text-center gap-4"
            >
              <div className="text-slate-400 group-hover:text-accent transition-colors">
                {industry.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary group-hover:text-accent transition-colors">
                  {industry.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-0">
        <div className="mb-10 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>RECENT ANALYSES</span>
          <div className="h-px flex-grow bg-slate-100" />
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
              />
            ))
          ) : (
            <div className="py-20 text-center text-secondary text-sm italic">
              아직 등록된 분석 리포트가 없습니다. 우측 상단의 작성 버튼을 통해 첫 기록을 남겨보세요.
            </div>
          )}
        </div>
      </section>

      <footer className="mt-20 pt-10 border-t border-border flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
        <span>© 2024 USER NAME</span>
        <div className="flex gap-6">
          <Link href="/archive" className="hover:text-primary transition-colors cursor-pointer">Archive</Link>
          <span className="hover:text-primary transition-colors cursor-pointer">RSS Feed</span>
        </div>
      </footer>
    </div>
  );
}
