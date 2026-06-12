
import { popularBooksData } from './src/app/data/booksData';
import { getAuthorsList } from './src/app/data/authorsData';

const authors = getAuthorsList(popularBooksData);
const counts = {};
authors.forEach(a => {
  counts[a.nationality] = (counts[a.nationality] || 0) + 1;
});
console.log('Actual counts per country:', counts);
console.log('Total authors:', authors.length);
