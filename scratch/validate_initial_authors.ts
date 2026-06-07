import { initialAuthors } from "../src/app/data/authorsData";

console.log("Analyzing initialAuthors...");
let count = 0;
initialAuthors.forEach((author, index) => {
  const prefix = `[Author #${index} Name: "${author.name}"]`;
  if (!author.id) console.error(`${prefix} Missing id`);
  if (!author.name) console.error(`${prefix} Missing name`);
  if (!author.nameEn) console.error(`${prefix} Missing nameEn`);
  if (!author.nationality) console.error(`${prefix} Missing nationality`);
  if (!author.birth) console.error(`${prefix} Missing birth`);
  if (!author.genre) {
    console.error(`${prefix} Missing genre`);
  } else if (!Array.isArray(author.genre)) {
    console.error(`${prefix} genre is not an array`);
  }
  if (!author.description) console.error(`${prefix} Missing description`);
  if (!author.representative) {
    console.error(`${prefix} Missing representative`);
  } else if (!Array.isArray(author.representative)) {
    console.error(`${prefix} representative is not an array`);
  }
  if (!author.books) {
    console.error(`${prefix} Missing books`);
  } else if (!Array.isArray(author.books)) {
    console.error(`${prefix} books is not an array`);
  } else {
    author.books.forEach((book, bIdx) => {
      if (!book.title) console.error(`${prefix} Book #${bIdx} missing title`);
      if (book.year === undefined || book.year === null) console.error(`${prefix} Book "${book.title}" missing year`);
      if (!book.publishers) {
        console.error(`${prefix} Book "${book.title}" missing publishers`);
      } else if (!Array.isArray(book.publishers)) {
        console.error(`${prefix} Book "${book.title}" publishers is not an array`);
      }
    });
  }
  // Check awards (it's optional in the type, but let's see if it's undefined)
  if (author.awards === undefined || author.awards === null) {
    console.error(`${prefix} awards is undefined or null`);
  } else if (!Array.isArray(author.awards)) {
    console.error(`${prefix} awards is not an array`);
  }
  count++;
});

console.log(`Analyzed ${count} authors.`);
