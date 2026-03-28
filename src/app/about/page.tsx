import { Mail, Github, Linkedin, Calendar, MapPin, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-20 lg:py-32">
      <header className="mb-20">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-4 text-primary uppercase">
          About Me
        </h1>
        <p className="text-sm text-secondary font-medium tracking-tight">
          Strategic Analyst & Industrial Research Enthusiast
        </p>
      </header>

      <section className="space-y-20">
        <div className="space-y-8">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Mission</h2>
          <div className="analysis-content text-lg leading-relaxed text-slate-800 italic">
            "데이터 이면의 맥락을 읽고, 파편화된 산업 뉴스를 구조화된 통찰력으로 전환하는 것을 목표로 합니다.
            전략적 사고를 통해 기업과 산업이 직면한 실질적인 난제를 정의하고 논리적 해법을 모색합니다."
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Core Expertise</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                <div>
                  <h3 className="text-sm font-bold text-primary">산업 분석 (Industrial Analysis)</h3>
                  <p className="text-xs text-secondary mt-1">국방, 모빌리티, 에너지 산업의 공급망 및 가동률 리스크 분석</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                <div>
                  <h3 className="text-sm font-bold text-primary">기업 전략 (Corporate Strategy)</h3>
                  <p className="text-xs text-secondary mt-1">기업의 구조적 문제 진단 및 중장기 전환 전략(Transformation) 제언</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                <div>
                  <h3 className="text-sm font-bold text-primary">데이터 구조화 (Data Structuring)</h3>
                  <p className="text-xs text-secondary mt-1">비정형 비즈니스 데이터를 논리적 모델로 아카이빙</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Contact & Link</h2>
            <div className="space-y-4">
              <a href="mailto:name@example.com" className="group flex items-center gap-4 p-4 border border-border rounded-xl hover:border-accent transition-all">
                <Mail className="w-4 h-4 text-slate-400 group-hover:text-accent" />
                <span className="text-xs font-bold text-secondary group-hover:text-primary">name@example.com</span>
              </a>
              <a href="https://linkedin.com" className="group flex items-center gap-4 p-4 border border-border rounded-xl hover:border-accent transition-all">
                <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-accent" />
                <span className="text-xs font-bold text-secondary group-hover:text-primary">LinkedIn Profile</span>
              </a>
               <a href="https://github.com" className="group flex items-center gap-4 p-4 border border-border rounded-xl hover:border-accent transition-all">
                <Github className="w-4 h-4 text-slate-400 group-hover:text-accent" />
                <span className="text-xs font-bold text-secondary group-hover:text-primary">GitHub Archive</span>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-border opacity-50" />

        <div className="flex flex-col items-center gap-4">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Last Updated: MAR 2026</p>
        </div>
      </section>
    </div>
  );
}
