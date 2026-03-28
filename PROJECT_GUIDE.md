# 프로젝트 개발 가이드: 인사이트 아카이브 (Insight Archive)

본 문서는 프로젝트의 구조, 사용된 기술 스택 및 각 파일의 역할을 상세히 설명하여 향후 유지보수 및 기능 확장을 용이하게 하기 위해 작성되었습니다.

---

## 1. 기술 스택 (Tech Stack)

본 프로젝트는 최신 웹 개발 트렌드에 맞춰 성능과 생산성을 극대화하는 스택을 사용합니다.

- **Next.js (App Router)**: 최신 React 프레임워크로, 서버 사이드 렌더링(SSR) 및 정적 사이트 생성(SSG)을 지원합니다.
- **TypeScript**: 자바스크립트에 정적 타입을 도입하여 개발 시 버그를 방지하고 코드 가독성을 높입니다.
- **Tailwind CSS (v4)**: 유틸리티 중심의 CSS 프레임워크로, 별도의 CSS 파일 없이 빠른 스타일링이 가능합니다.
- **Firebase (Firestore & Auth)**: 실시간 데이터베이스(NoSQL) 및 간편한 사용자 인증 시스템을 제공합니다.
- **Lucide-React**: 미니멀하고 일관된 디자인의 아이콘 라이브러리입니다.
- **clsx & tailwind-merge**: 여러 스타일 클래스를 조건부로 안전하게 병합하기 위한 유틸리티입니다.

---

## 2. 폴더 및 파일 구조 (Folder Structure)

```text
src/
├── app/                  # Next.js App Router (페이지 및 레이아웃)
│   ├── analysis/         # 분석글 관련 페이지 (상세보기, 작성 위저드)
│   ├── auth/             # 인증 관련 페이지 (로그인, 회원가입)
│   ├── companies/        # 기업별 허브 페이지
│   ├── industries/       # 산업별 허브 페이지
│   ├── globals.css       # 전역 스타일 및 디자인 토큰 정의
│   └── layout.tsx        # 전체 페이지의 공통 트리 (Header/Footer 포함)
├── components/           # 재사용 가능한 UI 컴포넌트
│   ├── layout/           # Header, Footer 등 레이아웃용 컴포넌트
│   ├── ui/               # 기본 UI 요소 (Button, Input 등 - 추후 확장 가능)
│   └── analysis/         # 분석 도메인 전용 컴포넌트 (준비 중)
├── lib/                  # 외부 라이브러리 및 유틸리티 설정
│   ├── firebase.ts       # Firebase SDK 초기화 및 설정
│   └── utils.ts          # Tailwind 클래스 병합 등 공통 유틸리티
├── types/                # TypeScript 인터페이스 및 타입 정의
│   └── index.ts          # 분석글, 토론, 사용자 데이터 모델 정의
└── ... (설정 파일들)
```

---

## 3. 주요 파일별 역할 설명

### 📂 `src/app/layout.tsx` (루트 레이아웃)
- 모든 페이지의 공통 뼈대입니다.
- `Header`와 `Footer`를 포함하며, 전체적인 폰트(`Inter`)와 기본 스타일을 적용합니다.

### 📂 `src/app/page.tsx` (홈 페이지)
- 사이트의 첫인상을 결정하는 페이지입니다.
- 주요 산업 카테고리로의 진입점(Industry Cards)과 추천 분석글 리스트를 보여줍니다.

### 📂 `src/app/analysis/write/page.tsx` (작성 마법사)
- 본 프로젝트의 핵심인 **'구조화된 작성'**을 강제하는 5단계 Wizard 폼입니다.
- 사용자가 논리적 흐름에 따라 문제 정의 -> 원인 분석 -> 전략 제안 순으로 데이터를 입력하도록 유도합니다.

### 📂 `src/app/analysis/[id]/page.tsx` (분석 상세 페이지)
- 개별 분석 내용을 구조적으로 렌더링합니다.
- 우측에 **섹션별 토론 레이어**가 있어, 특정 논점에 대해 정밀한 피드백을 주고받을 수 있도록 설계되었습니다.

### 📂 `src/types/index.ts` (데이터 모델)
- 분석글(`Analysis`)과 토론(`Discussion`) 객체가 어떤 데이터를 가져야 하는지 정의합니다.
- `causeAnalysis`, `proposedStrategy` 등 각 필드가 명확히 구분되어 있어 데이터 구조화의 핵심 역할을 합니다.

---

## 4. 데이터 모델 설계 (Data Model)

### 분석(Analysis) 객체 특징
단순한 블로그 글이 아니라, 비즈니스 분석 결과를 저장하는 데이터셋입니다.
- `problemDefinition`: 문제가 무엇인가?
- `causeAnalysis`: 원인은 무엇인가?
- `proposedStrategy`: 어떤 전략적 해법을 제시하는가?
- `risksLimitations`: 해당 전략의 한계는 무엇인가?

### 토론(Discussion) 객체 특징
- `sectionKey`: 전체 댓글이 아닌 특정 섹션(예: 원인 분석)에 연결됩니다.
- `type`: '찬성(Agree)', '반박(Counter)', '근보 보완(Evidence)' 등 의견의 성격을 명확히 규정합니다.

---

## 5. 수정 및 확장 가이드

1. **데이터 연동**: 현재는 Mock Data(가짜 데이터)를 사용하고 있습니다. 실제 데이터를 연동하려면 `src/lib/firebase.ts`에 본인의 API 키를 넣고, `useEffect`를 통해 Firestore 데이터를 불러오면 됩니다.
2. **스타일 수정**: `src/app/globals.css`의 `@theme` 섹션에서 색상이나 폰트를 변경하면 사이트 전체에 반영됩니다.
3. **새 페이지 추가**: `src/app` 폴더 아래에 새 폴더를 만들고 `page.tsx`를 생성하면 자동으로 라우팅이 설정됩니다.

---

이 문서를 바탕으로 프로젝트의 논리 구조를 파악하시면, 향후 직접 코드를 수정하거나 기능을 추가하실 때 큰 도움이 될 것입니다.
