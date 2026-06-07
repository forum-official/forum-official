import { initialAuthors, getAuthorsList } from "../src/app/data/authorsData";
import { popularBooksData } from "../src/app/data/booksData";
import { getGlobalBooks } from "../src/app/utils/db";

try {
  console.log("Loading popularBooksData and global books...");
  // Mock global books getter (similar to what App.tsx / AuthorArchiveScreen.tsx does)
  const allBooks = popularBooksData;
  console.log("Calling getAuthorsList...");
  const authors = getAuthorsList(allBooks);
  console.log(`Successfully generated authors list. Total authors: ${authors.length}`);

  // Validate each author for potential undefined/null fields that could crash UI
  let invalidAuthorsCount = 0;
  authors.forEach(author => {
    const issues: string[] = [];
    if (!author.id) issues.push("missing id");
    if (!author.name) issues.push("missing name");
    if (!author.genre || !Array.isArray(author.genre)) issues.push("genre is not an array");
    if (!author.representative || !Array.isArray(author.representative)) issues.push("representative is not an array");
    if (!author.books || !Array.isArray(author.books)) {
      issues.push("books is not an array");
    } else {
      author.books.forEach((b, i) => {
        if (!b.title) issues.push(`book[${i}] missing title`);
        if (!b.publishers || !Array.isArray(b.publishers)) issues.push(`book[${i}] ("${b.title}") publishers is not an array`);
      });
    }
    if (!author.awards || !Array.isArray(author.awards)) issues.push("awards is not an array");

    if (issues.length > 0) {
      invalidAuthorsCount++;
      console.log(`Author "${author.name}" has issues:`, issues);
    }
  });

  console.log(`Validation complete. Total authors with issues: ${invalidAuthorsCount}`);

} catch (error: any) {
  console.error("CRASH ENCOUNTERED:");
  console.error(error.stack || error);
}
