'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, Database, PenSquare, ChevronRight, 
  BarChart3, Clock, Settings, LogOut, 
  FileEdit, Trash2 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MY_ANALYSES = [
  {
    id: 'k-defense-mro',
    title: 'K-방산의 폴란드 수출 이후: 지속 가능한 유지보수(MRO) 전략의 부재',
    industry: 'Defense',
    company: '한화에어로스페이스',
    status: 'published',
    createdAt: '2024-03-24',
    metrics: { discussionCount: 12, agreeCount: 45, counterCount: 8 }
  },
  {
    id: 'draft-01',
    title: '전기차 화재 리스크와 LFP 배터리 시장 전이 시나리오',
    industry: 'Mobility',
    company: 'LG에너지솔루션',
    status: 'draft',
    createdAt: '2024-03-27',
    metrics: { discussionCount: 0, agreeCount: 0, counterCount: 0 }
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('published');

  const filteredAnalyses = MY_ANALYSES.filter(a => a.status === activeTab);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="p-8 border border-border rounded-2xl bg-white shadow-sm text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center text-secondary">
              <User className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black tracking-tight">StrategyLab</h2>
            <p className="text-xs text-secondary mt-1 uppercase tracking-widest font-bold">Contributor Tier 1</p>
            <div className="mt-8 pt-8 border-t border-border space-y-2">
              <Link href="/settings" className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted font-medium">
                <Settings className="w-4 h-4" /> 계정 설정
              </Link>
              <button className="w-full flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50 font-medium">
                <LogOut className="w-4 h-4" /> 로그아웃
              </button>
            </div>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <main className="lg:col-span-9 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                <Database className="w-8 h-8 text-primary" /> 내 분석 워크스페이스
              </h1>
              <p className="text-secondary mt-2">작성한 통찰력을 관리하고 보관하는 일차적인 저장소입니다.</p>
            </div>
            <Link 
              href="/analysis/write" 
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-primary/95 transition-all shadow-lg shadow-primary/10 flex items-center gap-2 justify-center"
            >
              <PenSquare className="w-4 h-4" /> 새로운 분석 작성
            </Link>
          </div>

          <div className="border-b border-border">
            <div className="flex gap-8">
              <button 
                onClick={() => setActiveTab('published')}
                className={cn(
                  "pb-4 text-sm font-black uppercase tracking-widest transition-all relative",
                  activeTab === 'published' ? "text-primary" : "text-slate-400 hover:text-slate-600"
                )}
              >
                발행 완료 {activeTab === 'published' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
              </button>
              <button 
                onClick={() => setActiveTab('draft')}
                className={cn(
                  "pb-4 text-sm font-black uppercase tracking-widest transition-all relative",
                  activeTab === 'draft' ? "text-primary" : "text-slate-400 hover:text-slate-600"
                )}
              >
                임시 저장 {activeTab === 'draft' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredAnalyses.length > 0 ? (
              filteredAnalyses.map((analysis) => (
                <div 
                  key={analysis.id} 
                  className="flex items-center group bg-white border border-border p-6 rounded-xl hover:border-slate-300 transition-all shadow-sm"
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-accent uppercase tracking-tighter bg-accent/5 px-1.5 py-0.5 rounded">
                        {analysis.industry}
                      </span>
                      <span className="text-[10px] text-slate-400 px-1.5 py-0.5 border border-border rounded uppercase">
                        {analysis.company}
                      </span>
                    </div>
                    <Link href={`/analysis/${analysis.id}`} className="block">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-snug mb-3 hover:underline underline-offset-4">
                        {analysis.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-6 text-[11px] text-secondary">
                      <span className="flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" /> {analysis.metrics.discussionCount} 토론 참여
                      </span>
                      <span className="flex items-center gap-1 font-bold text-accent">
                        찬성 {Math.round((analysis.metrics.agreeCount / (analysis.metrics.agreeCount + analysis.metrics.counterCount + 1)) * 100)}%
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {analysis.createdAt}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <button className="p-2 text-secondary hover:text-primary hover:bg-muted rounded-lg transition-all" title="수정">
                      <FileEdit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="삭제">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link href={`/analysis/${analysis.id}`} className="p-2 text-secondary hover:text-accent">
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-border rounded-2xl bg-muted/30">
                <p className="text-secondary font-medium">작성된 분석 리포트가 없습니다.</p>
                <Link href="/analysis/write" className="text-accent font-bold mt-2 inline-block hover:underline">
                  첫 분석 작성을 시작하세요.
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
