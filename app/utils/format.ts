const months = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
];

// "2026-11-20T00:00:00.000Z" → "20-noyabr, 2026"
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${d}-${months[m - 1]}, ${y}`;
};

// 114000000 → "114 000 000 so'm"
export const formatMoney = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(n) + " so'm";

// 20000 → "20 000"
export const formatNumber = (n: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 }).format(n);