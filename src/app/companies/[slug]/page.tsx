'use client';

import { useParams } from 'next/navigation';
import { 
  Building2, Globe, MapPin, Filter, 
  ArrowUpDown, Search, ChevronRight, BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const COMPANY_INFO = {
  'hanwha-aerospace': { 
    name: '한화에어로스페이스', 
    industry: 'Defense',
    location: '대한민국, 서울',
    desc: '항공우주, 방산, 시큐리티 분야의 글로벌 리더. 최근 폴란드 등 유럽 시장 수주를 통해 국내 대표 방산 기업으로 성장 중.',
    website: 'https://www.hanwhaaerospace.co.kr'
  },
  'hyundai-motor': { 
    name: '현대자동차그룹', 
    industry: 'Mobility',
    location: '대한민국, 서울',
    desc: '글로벌 완성차 메이커에서 스마트 모빌리티 솔루션 프로바이더로 전환 중. SDV, 자율주행, 수소 연료전지 기술에 집중.',
    website: 'https://www.hyundaimotorgroup.com'
  }
};

const MOCK_ANALYSES = [
  {
    id: 'k-defense-mro',
    title: 'K-방산의 폴란드 수출 이후: 지속 가능한 유지보수(MRO) 전략의 부재',
    problemType: 'Structural',
    topic: '공급망 리스크',
    author: '관측자A',
    discussionCount: 12,
  }
];

export default function CompanyPage() {
  const params = useParams();
  const slug = params.slug as keyof typeof COMPANY_INFO;
  const info = COMPANY_INFO[slug] || COMPANY_INFO['hanwha-aerospace'];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="bg-white border border-border p-8 rounded-2xl shadow-sm mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-24 h-24 bg-muted rounded-xl flex items-center justify-center text-primary">
            <Building2 className="w-12 h-12" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-accent">{info.industry}</span>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 text-xs text-secondary font-medium">
                <MapPin className="w-3 h-3" /> {info.location}
              </div>
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-4">{info.name}</h1>
            <p className="text-secondary leading-relaxed max-w-2xl mb-6">{info.desc}</p>
            <div className="flex items-center gap-4">
              <a 
                href={info.website} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-bold text-accent hover:underline"
              >
                <Globe className="w-3 h-3" /> 공식 웹사이트 방문
              </a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Link 
              href="/analysis/write" 
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all text-center"
            >
              기업 분석 작성하기
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Panel */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Filter className="w-3 h-3" /> Focus Area
            </h3>
            <div className="space-y-2">
              <FilterItem label="전체 분석" count={1} active />
              <FilterItem label="R&D / 기술" count={0} />
              <FilterItem label="시장 점유율" count={0} />
              <FilterItem label="조직/문화" count={0} />
            </div>
          </div>
        </aside>

        {/* List Content */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-6 text-xs font-bold text-secondary uppercase tracking-widest px-2">
            <span>{MOCK_ANALYSES.length}개의 심층 분석</span>
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <ArrowUpDown className="w-3 h-3" /> 최신순
            </button>
          </div>
          
          <div className="space-y-4">
            {MOCK_ANALYSES.map((analysis) => (
              <Link 
                key={analysis.id} 
                href={`/analysis/${analysis.id}`}
                className="flex items-center group bg-white border border-border p-6 rounded-xl hover:border-accent/40 hover:shadow-sm transition-all"
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-tighter">
                      {analysis.problemType}
                    </span>
                    <span className="text-[10px] text-slate-400 px-1.5 py-0.5 border border-border rounded">
                      {analysis.topic}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-accent transition-colors leading-snug mb-3">
                    {analysis.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-secondary">
                    <span className="font-bold text-primary">{analysis.author}</span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3" /> {analysis.discussionCount} 토론
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 group-hover:text-accent transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterItem({ label, count, active = false }: { label: string, count: number, active?: boolean }) {
  return (
    <button className={cn(
      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all",
      active ? "bg-primary text-white font-bold" : "text-secondary hover:bg-muted"
    )}>
      <span>{label}</span>
      <span className={cn("text-[10px]", active ? "text-slate-400" : "text-slate-300")}>{count}</span>
    </button>
  );
}
