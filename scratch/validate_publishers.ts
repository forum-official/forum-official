import { popularBooksData } from "../src/app/data/booksData";

console.log("Analyzing popularBooksData publishers...");
let invalidCount = 0;
popularBooksData.forEach((book, idx) => {
  if (!book.publishers) {
    console.error(`Book #${idx} "${book.title}" missing publishers`);
    invalidCount++;
  } else if (!Array.isArray(book.publishers)) {
    console.error(`Book #${idx} "${book.title}" publishers is not an array:`, typeof book.publishers);
    invalidCount++;
  } else {
    book.publishers.forEach((pub: any, pIdx) => {
      if (typeof pub !== 'object' || pub === null) {
        console.error(`Book #${idx} "${book.title}" publisher #${pIdx} is not an object:`, pub);
        invalidCount++;
      } else if (typeof pub.name !== 'string') {
        console.error(`Book #${idx} "${book.title}" publisher #${pIdx} missing string name:`, pub);
        invalidCount++;
      }
    });
  }
});

console.log(`Validation finished. Total issues found: ${invalidCount}`);
