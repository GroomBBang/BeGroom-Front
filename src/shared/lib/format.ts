export function formatWon(n: number) {
  return n.toLocaleString('ko-KR') + '원';
}

export function formatKRW(v: number) {
  return `₩${v.toLocaleString('ko-KR')}`;
}
