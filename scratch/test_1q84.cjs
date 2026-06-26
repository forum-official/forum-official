const { getMatchingClassicTitle, isClassicBook } = require('./src/app/utils/titleHelper.ts');

const title1 = "1Q84 세트 전3권";
const author1 = "무라카미 하루키";

console.log("getMatchingClassicTitle(title1):", getMatchingClassicTitle(title1));
console.log("isClassicBook(title1, author1):", isClassicBook(title1, author1));
