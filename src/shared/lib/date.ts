/**
 * ISO 날짜 문자열을 "YYYY. MM. DD. HH:mm" 형태로 변환.
 * 2026-01-07T15:59:13.882774 -> 2026. 01. 07. 15:59
 */
export const formatDateTime = (isoString?: string | null) => {
  if (!isoString) return '';

  const date = new Date(isoString);

  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
};

/**
 * ISO 날짜 문자열을 "YYYY. MM. DD 형태로 변환."
 */
export const formatDateOnly = (isoString?: string | null) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}. ${month}. ${day}`;
};
