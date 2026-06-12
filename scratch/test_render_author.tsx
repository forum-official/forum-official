import { JSDOM } from "jsdom";
import React from "react";
import ReactDOMServer from "react-dom/server";

console.log("Setting up mock JSDOM environment...");
const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "http://localhost:3000",
});

Object.defineProperty(global, "window", { value: dom.window, writable: true, configurable: true });
Object.defineProperty(global, "document", { value: dom.window.document, writable: true, configurable: true });
Object.defineProperty(global, "navigator", { value: dom.window.navigator, writable: true, configurable: true });

const localStore: Record<string, string> = {
  "agora_user": JSON.stringify({
    userId: "test_user_id",
    nickname: "TestUser",
    email: "test@example.com",
    createdAt: new Date().toISOString()
  })
};

global.localStorage = {
  getItem: (key: string) => localStore[key] || null,
  setItem: (key: string, value: string) => { localStore[key] = value; },
  removeItem: (key: string) => { delete localStore[key]; },
  clear: () => { for (const k in localStore) delete localStore[k]; },
  length: Object.keys(localStore).length,
  key: (index: number) => Object.keys(localStore)[index] || null,
} as any;

global.sessionStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null,
} as any;

global.window.scrollTo = () => {};
global.fetch = () => Promise.resolve(new Response());

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver as any;

console.log("Importing components...");
Promise.all([
  import("../src/app/App.tsx"),
  import("../src/app/components/screens/AuthorArchiveScreen.tsx"),
  import("../src/app/components/screens/AuthorDetailScreen.tsx"),
  import("../src/app/data/authorsData.ts"),
  import("../src/app/contexts/AuthContext.tsx")
]).then(([AppMod, ArchiveMod, DetailMod, AuthorsDataMod, AuthMod]) => {
  const App = AppMod.default;
  const { AuthorArchiveScreen } = ArchiveMod;
  const { AuthorDetailScreen } = DetailMod;
  const { getAuthorsList } = AuthorsDataMod;
  const { AuthProvider } = AuthMod;

  console.log("1. Rendering home screen...");
  try {
    const htmlHome = ReactDOMServer.renderToString(
      React.createElement(AuthProvider, {}, React.createElement(App))
    );
    console.log("Home screen rendered successfully. HTML length:", htmlHome.length);
  } catch (err: any) {
    console.error("Home screen crashed:", err.stack || err);
  }

  console.log("2. Simulating AuthorArchiveScreen render...");
  try {
    const archiveElement = React.createElement(AuthProvider, {}, 
      React.createElement(AuthorArchiveScreen, {
        onBack: () => {},
        selectedAuthor: null,
        onAuthorClick: () => {},
        onBookClick: () => {},
        onUserClick: () => {},
        onLoginRequired: () => {}
      })
    );
    const htmlArchive = ReactDOMServer.renderToString(archiveElement);
    console.log("AuthorArchiveScreen rendered successfully. HTML length:", htmlArchive.length);
  } catch (err: any) {
    console.error("AuthorArchiveScreen crashed:", err.stack || err);
  }

  console.log("3. Simulating AuthorDetailScreen render for all static authors...");
  let failedAuthorsCount = 0;
  
  // Test with all 70 static authors
  const authorsList = getAuthorsList(AuthorsDataMod.initialAuthors.flatMap(a => 
    a.books.map(b => ({
      id: `book_${b.title}`,
      title: b.title,
      author: a.name,
      coverUrl: "",
      publishers: b.publishers.map(p => ({ name: p, votes: 0 })),
      rating: 0,
      likes: 0,
      reviews: 0,
      description: "",
      genre: a.genre,
      year: b.year
    }))
  ));
  
  authorsList.forEach((author) => {
    try {
      const detailElement = React.createElement(AuthProvider, {}, 
        React.createElement(AuthorDetailScreen, {
          author,
          onBack: () => {},
          onBookClick: () => {},
          onUserClick: () => {},
          onLoginRequired: () => {}
        })
      );
      ReactDOMServer.renderToString(detailElement);
    } catch (err: any) {
      failedAuthorsCount++;
      console.error(`AuthorDetailScreen crashed for author "${author.name}":`, err.stack || err);
    }
  });

  console.log(`Finished rendering author details. Total crashed: ${failedAuthorsCount}`);
}).catch(err => {
  console.error("Failed to load modules:", err);
});
