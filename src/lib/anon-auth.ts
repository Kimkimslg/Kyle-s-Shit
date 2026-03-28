/**
 * 브라우저별 고유 익명 ID를 관리하는 유틸리티
 */
export const getAnonId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let anonId = localStorage.getItem('archive_anon_id');
  
  if (!anonId) {
    // 브라우저 내장 UUID 생성기 사용 (외부 라이브러리 불필요)
    anonId = crypto.randomUUID();
    localStorage.setItem('archive_anon_id', anonId);
  }
  
  return anonId;
};

/**
 * 익명 ID를 기반으로 읽기 쉬운 닉네임을 생성 (ex: 익명 A5B1)
 */
export const getAnonNickname = (anonId: string): string => {
  if (!anonId) return '익명 사용자';
  // ID의 마지막 4자리를 추출하여 구분자로 사용
  const suffix = anonId.slice(-4).toUpperCase();
  return `익명 ${suffix}`;
};
