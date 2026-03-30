import React from 'react';

export interface IndustryDeepDive {
  slug: string;
  overview: string;
  trends: string[];
  risks: string[];
  keyAnalysisPoints: string[];
  imagePath: string;
}

export const INDUSTRY_DEEP_DIVES: Record<string, IndustryDeepDive> = {
  defense: {
    slug: 'defense',
    overview: '방위 산업은 이제 단순한 무기 제조를 넘어 인공지능(AI), 자율주행, 위성 통신이 결합된 첨단 기술의 집약체로 진화하고 있습니다. 지정학적 위기 고조에 따른 글로벌 국방 예산 증액과 K-방산의 높은 가성비 및 빠른 인도 능력이 결합되어 전례 없는 성장기를 맞이하고 있습니다.',
    trends: ['#K-방산_수출_확대', '#MRO_서비스_디지털화', '#드론_및_안티드론_체계', '#위성_기반_초연결_전장'],
    risks: ['#글로벌_공급망_불안정', '#각국_보호무역주의_강화', '#기술_유출_보안_위스크'],
    keyAnalysisPoints: [
      '국가별 수주 잔고 및 신규 계약 파이프라인 확인',
      '수출 대상국의 정치적 안정성 및 예산 집행 가능성 분석',
      '차세대 무기 체계(레이저, AI) 개발 단계 및 상용화 시점'
    ],
    imagePath: '/images/industries/defense.png'
  },
  mobility: {
    slug: 'mobility',
    overview: '모빌리티 산업은 ‘소프트웨어 중심 자동차(SDV)’로의 패러다임 전환이 핵심입니다. 전기차(EV) 캐즘(일시적 수요 둔화) 현상 속에서도 자율주행 기술 고도화와 도심 항공 모빌리티(UAM) 등 하드웨어와 소프트웨어의 통합 혁신이 지속적으로 이루어지고 있습니다.',
    trends: ['#SDV_전환_가속화', '#LFP_및_전고체_배터리_경쟁', '#충전_인프라_생태계_확장', '#UAM_상용화_실증'],
    risks: ['#전기차_캐즘_현상', '#원자재_가격_변동성', '#보조금_정책_및_규제_환경_변화'],
    keyAnalysisPoints: [
      '소프트웨어 내재화 비율 및 플랫폼 통합 능력',
      'EV 라인업의 가격 경쟁력 및 배터리 공급망 수직 계열화 수준',
      '자율주행 데이터 축적량 및 알고리즘 신뢰도'
    ],
    imagePath: '/images/industries/mobility.png'
  },
  electronics: {
    slug: 'electronics',
    overview: '전자 산업은 AI 반도체를 중심으로 한 컴퓨팅 환경의 비약적 발전을 겪고 있습니다. 단순히 기기를 만드는 단계에서 벗어나, 온디바이스 AI(On-Device AI)를 통해 사용자 맞춤형 경험을 제공하는 지능형 생태계 구축이 기업의 생존을 결정짓는 핵심 지표가 되었습니다.',
    trends: ['#HBM_H_Bandwidth_Memory_주도권', '#온디바이스_AI_가전', '#차세대_OLED_및_마이크로LED', '#반도체_파운드리_미세공정_경쟁'],
    risks: ['#반도체_사이클_변동성', '#글로벌_빅테크의_칩_자체_설계(In-house)', '#미중_기술_패권_경쟁'],
    keyAnalysisPoints: [
      '차세대 반도체(HBM, CXL) 시장 점유율 및 고객사 확보 현황',
      'AI 기능을 통한 가전/모바일의 ASP(평균판매단가) 상승 여부',
      '글로벌 생산 기지의 다변화 및 리스크 관리 체계'
    ],
    imagePath: '/images/industries/electronics.png'
  },
  energy: {
    slug: 'energy',
    overview: '에너지 산업은 탄소 중립과 에너지 안보라는 두 마리 토끼를 잡기 위해 소형 모듈 원자로(SMR)와 수소 경제로 빠르게 이동하고 있습니다. 화석 연료 기반에서 벗어나 분산형 에너지 자원(DER)을 효율적으로 관리하는 스마트 그리드 기술이 미래 에너지의 핵심입니다.',
    trends: ['#SMR_소형모듈원자로_확산', '#그린_수소_생태계_구축', '#ESS_에너지저장장치_고도화', '#분산_에너지_VPP'],
    risks: ['#대형_신재생_프로젝트_지연', '#에너지_안보_및_지정학적_갈등', '#전력망_포화_및_계통_불안정'],
    keyAnalysisPoints: [
      'SMR 설계 인증 및 실증 사업 진행 단계',
      '친환경 에너지 포트폴리오 비중 및 수익성 개선 속도',
      '정부의 에너지 정책 지원 규모 및 지속 가능성'
    ],
    imagePath: '/images/industries/energy.png'
  },
  cosmetics: {
    slug: 'cosmetics',
    overview: '화장품 산업은 전통적인 오프라인 시장에서 벗어나 디지털 전환과 고기능성 ‘더마 코스메틱’ 중심으로 재편되고 있습니다. K-뷰티는 북미 및 일본 시장으로의 판로 다변화와 함께 ODM(제조업자 개발생산) 위주의 견고한 생태계를 통해 안정적인 성장 모델을 구축하고 있습니다.',
    trends: ['#인디_브랜드_전성시대', '#더마_및_슬로우_에이징_케어', '#북미_및_일본_채널_확장', '#AI_피부_진단_맞춤형_뷰티'],
    risks: ['#중국_내수_성장_둔화_및_C-뷰티_부상', '#핵심_성분_특허_경쟁', '#원료_공급_망_이슈'],
    keyAnalysisPoints: [
      '비(非)중국 지역의 매출 성장률 및 이익 기여도',
      '특수 제형/성분 개발에 대한 R&D 투자 비중',
      'SNS 트렌드 대응을 위한 마케팅 기동성 및 플랫폼 활용 능력'
    ],
    imagePath: '/images/industries/cosmetics.png'
  },
  finance: {
    slug: 'finance',
    overview: '금융 산업은 뱅킹 서비스의 API 개방과 AI 기반 자산 관리 서비스로 인해 경계가 허물어지는 ‘빅블러(Big Blur)’ 현상을 겪고 있습니다. 전통적인 이자 수익 구조에서 벗어나 플랫폼 기반의 비이자 수익을 얼마나 창출할 수 있는지가 미래 기업 가치의 척도가 되고 있습니다.',
    trends: ['#AI_기반_초개인화_금융', '#STO_토큰증권_시장_개화', '#내장형_금융_Embedded_Finance', '#사이버_보안_및_레그테크_RegTech'],
    risks: ['#고금리_지속에_따른_연체율_리스크', '#디지털_자산_규제_강화', '#빅테크와의_금융_플랫폼_경쟁'],
    keyAnalysisPoints: [
      '디지털 채널 비중 및 MAU(월간 활성 사용자 수) 성장',
      'AI를 활용한 신용 평가 모델 정교화 및 부실 채권 관리 능력',
      '신규 사업(토큰증권, 해외 송금 등)의 가트라인 통과 및 수익화 단계'
    ],
    imagePath: '/images/industries/finance.png'
  }
};
