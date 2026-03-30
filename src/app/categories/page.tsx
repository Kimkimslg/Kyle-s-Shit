'use client';

import { INDUSTRIES } from '@/lib/constants';
import Link from 'next/link';
import { ChevronRight, LayoutGrid } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-20 lg:py-32">
      <header className="mb-16">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">
          <span>Industry Hub</span>
          <div className="h-px w-12 bg-accent/30" />
          <span>Issue Collection</span>
        </div>
        <h1 className="text-3xl font-black tracking-tighter mb-4 text-primary uppercase">
          CATEGORIES
        </h1>
        <div className="bg-slate-50 border-l-4 border-accent p-6 rounded-r-2xl">
          <p className="text-sm text-secondary font-medium leading-relaxed italic">
            "이곳은 산업의 주요 이슈를 각 분야별로 모아서 체계적으로 정리해두는 공간입니다. 
            각 카테고리를 클릭하여 <strong>산업 트렌드, 리스크, 핵심 분석 포인트</strong>를 담은 심층 개괄 내용과 최신 리포트를 확인해 보세요."
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INDUSTRIES.map((industry) => (
          <Link 
            key={industry.id} 
            href={`/industries/${industry.id}`}
            className="group block p-8 bg-white border border-border rounded-3xl hover:border-accent hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="p-4 bg-slate-50 rounded-2xl text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                {industry.icon}
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-accent transform group-hover:translate-x-1 transition-all duration-300" />
            </div>
            
            <h2 className="text-xl font-black tracking-tighter text-primary mb-3">
              {industry.title.toUpperCase()}
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
              {industry.desc}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {industry.companies.slice(0, 3).map((company) => (
                <span key={company} className="px-3 py-1 bg-slate-100 text-[9px] font-bold text-slate-500 rounded-full">
                  {company}
                </span>
              ))}
              {industry.companies.length > 3 && (
                <span className="px-3 py-1 bg-slate-50 text-[9px] font-bold text-slate-400 rounded-full">
                  +{industry.companies.length - 3}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-20 pt-10 border-t border-border flex justify-center">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-4">
          <LayoutGrid className="w-4 h-4" />
          <span>Exploring {INDUSTRIES.length} Industrial Domains</span>
        </div>
      </footer>
    </div>
  );
}
