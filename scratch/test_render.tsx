import { JSDOM } from "jsdom";
import React from "react";
import ReactDOMServer from "react-dom/server";

console.log("Setting up mock JSDOM environment...");
const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "http://localhost:3000",
});

// Safe global definitions
Object.defineProperty(global, "window", { value: dom.window, writable: true, configurable: true });
Object.defineProperty(global, "document", { value: dom.window.document, writable: true, configurable: true });
Object.defineProperty(global, "navigator", { value: dom.window.navigator, writable: true, configurable: true });

// Mock localStorage with default mock values to simulate user session/data
const localStore: Record<string, string> = {
  // We can leave it empty first, or test with mock user
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

// Mock fetch
global.fetch = () => Promise.resolve(new Response());

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver as any;

console.log("Importing App component...");
import("../src/app/App.tsx")
  .then((module) => {
    const App = module.default;
    console.log("Attempting to render App to string...");
    try {
      const html = ReactDOMServer.renderToString(React.createElement(App));
      console.log("App rendered successfully! HTML length:", html.length);
      // Print first 200 chars of HTML
      console.log("HTML Preview:", html.substring(0, 300));
    } catch (renderError: any) {
      console.error("CRASH DURING RENDER:");
      console.error(renderError.stack || renderError);
    }
  })
  .catch((importError) => {
    console.error("Import failed:", importError.stack || importError);
  });
