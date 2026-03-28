import { Shield, BarChart3, Cpu, Flame, Sparkles, Landmark } from 'lucide-react';
import React from 'react';

export interface IndustryMetadata {
  id: string;
  title: string;
  icon: React.ReactNode;
  definition: string;
  companies: string[];
  desc: string;
}

export const INDUSTRIES: IndustryMetadata[] = [
  {
    id: 'defense',
    title: '국방',
    icon: <Shield className="w-5 h-5" />,
    definition: '현대 전장의 기술 주도권과 국가 안보 인프라 분석. 무기 체계의 수출 전략, MRO 서비스, 위성 및 항공우주 기술을 포괄합니다.',
    companies: ['한화에어로스페이스', 'LIG넥스원', '현대로템', 'KAI'],
    desc: '글로벌 방산 수주 및 공급망 분석'
  },
  {
    id: 'mobility',
    title: '모빌리티',
    icon: <BarChart3 className="w-5 h-5" />,
    definition: '자동차, 항공, 해운의 소프트웨어 기반 혁신(SDV, UAM) 분석. 자율주행, 전기차 배터리 생태계 및 차세대 물류 혁명을 다룹니다.',
    companies: ['현대자동차', '기아', 'LG에너지솔루션', '현대모비스'],
    desc: 'SDV 및 자율주행 전환 전략 분석'
  },
  {
    id: 'electronics',
    title: '전자',
    icon: <Cpu className="w-5 h-5" />,
    definition: '가전, 반도체, 스마트 홈 생태계의 경쟁 우위 분석. AI 반도체, 차세대 디스플레이, 지능형 가전의 글로벌 경쟁 구도를 분석합니다.',
    companies: ['삼성전자', 'LG전자', 'SK하이닉스', '삼성디스플레이'],
    desc: '글로벌 가전 및 반도체 전략 분석'
  },
  {
    id: 'energy',
    title: '에너지',
    icon: <Flame className="w-5 h-5" />,
    definition: '기후 변화 대응을 위한 소형 모듈 원자로(SMR) 및 재생 에너지 전환 전략 분석. 수소 경제와 에너지 저장 장치(ESS) 시장의 난제를 다룹니다.',
    companies: ['두산에너빌리티', 'SK이노베이션', '한화솔루션', '에코프로'],
    desc: 'SMR 및 신재생 에너지 전환 분석'
  },
  {
    id: 'cosmetics',
    title: '화장품',
    icon: <Sparkles className="w-5 h-5" />,
    definition: 'K-뷰티의 글로벌 시장 침투 및 성분 기반 차별화 분석. 화장품 개발(ODM) 생태계와 럭셔리 브랜딩 전략을 심층적으로 분석합니다.',
    companies: ['아모레퍼시픽', 'LG생활건강', '한국콜마', '코스맥스'],
    desc: 'K-뷰티 글로벌 확장 전략 분석'
  },
  {
    id: 'finance',
    title: '금융',
    icon: <Landmark className="w-5 h-5" />,
    definition: '전통 금융의 디지털 전환과 핀테크 혁신 전략 분석. 디지털 자산 규제, 인터넷 전문 은행의 성장 및 AI 기반 자산 관리 모델을 다룹니다.',
    companies: ['카카오뱅크', '토스(비바리퍼블리카)', 'KB금융그룹', '신한지주'],
    desc: '핀테크 혁신 및 디지털 전환 분석'
  }
];
