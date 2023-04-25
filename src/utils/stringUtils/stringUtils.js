export const nth = (num) => {
  const n = num % 100;
  return num + (n >= 11 && n <= 13 ? 'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][num % 10]);
}