'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import PostCard from '@/components/ui/PostCard';
import { supabase } from '@/lib/supabase';

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllAnalyses();
  }, []);

  const fetchAllAnalyses = async () => {
    try {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
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
      console.error('Error fetching Archive data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAnalyses = analyses.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-8 py-20 lg:py-32">
      <header className="mb-16">
        <h1 className="text-3xl font-black tracking-tighter mb-4 text-primary uppercase">
          Full Archive
        </h1>
        <p className="text-sm text-secondary font-medium tracking-tight">
          기록된 모든 분석 리포트의 연대순 목록입니다. ({analyses.length} entries)
        </p>
      </header>

      {/* Search Input */}
      <div className="mb-12 relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-accent transition-colors" />
        <input 
          type="text" 
          placeholder="주제, 기업, 키워드 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-border pl-12 pr-6 py-4 rounded-xl text-sm outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all shadow-sm"
        />
      </div>

      <div className="divide-y divide-border border-t border-border">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
          </div>
        ) : filteredAnalyses.length > 0 ? (
          filteredAnalyses.map((post) => (
            <PostCard key={post.id} {...post} />
          ))
        ) : (
          <div className="py-20 text-center text-secondary text-sm italic">
            검색 결과와 일치하는 분석 리포트가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
