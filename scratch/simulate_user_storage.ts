import { getGlobalBooks, saveGlobalBook } from "../src/app/utils/db";
import { getAuthorsList } from "../src/app/data/authorsData";
import { popularBooksData } from "../src/app/data/booksData";

// Mock localStorage
const store: Record<string, string> = {};
global.localStorage = {
  getItem: (key: string) => store[key] || null,
  setItem: (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { for (const k in store) delete store[k]; },
  length: 0,
  key: (index: number) => null,
};

function runTest(desc: string, corruptData: any) {
  console.log(`\n--- Running test: ${desc} ---`);
  localStorage.setItem("forum_global_books", JSON.stringify(corruptData));
  
  try {
    const books = getGlobalBooks(popularBooksData);
    console.log(`getGlobalBooks completed successfully. Loaded ${books.length} books.`);
    
    const authors = getAuthorsList(books);
    console.log(`getAuthorsList completed successfully. Generated ${authors.length} authors.`);
  } catch (error: any) {
    console.error("CRASHED!");
    console.error(error.stack || error);
  }
}

// Test case 1: Completely null elements in localStorage books array
runTest("Null elements in array", [
  null,
  { id: "1", title: "Test Book", author: "Test Author", publishers: [] },
  undefined
]);

// Test case 2: Books missing critical fields like title or author
runTest("Missing title or author", [
  { id: "1", author: "Test Author", publishers: [] },
  { id: "2", title: "Test Book", publishers: [] }
]);

// Test case 3: publishers field is not an array (e.g. string or object)
runTest("publishers is not an array", [
  { id: "1", title: "Test Book 1", author: "Author A", publishers: "Some Publisher", year: 2020 },
  { id: "2", title: "Test Book 2", author: "Author B", publishers: { name: "Some Publisher" }, year: 2021 }
]);

// Test case 4: publishers is an array of strings instead of objects
runTest("publishers is string array", [
  { id: "1", title: "Test Book", author: "Author A", publishers: ["창비", "민음사"], year: 2022 }
]);
