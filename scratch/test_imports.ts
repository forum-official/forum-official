import { JSDOM } from "jsdom";

console.log("Setting up mock JSDOM environment...");
const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "http://localhost:3000",
});

// Safe global definitions
Object.defineProperty(global, "window", { value: dom.window, writable: true, configurable: true });
Object.defineProperty(global, "document", { value: dom.window.document, writable: true, configurable: true });
Object.defineProperty(global, "navigator", { value: dom.window.navigator, writable: true, configurable: true });

global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null,
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

console.log("Attempting to import App component...");
import("../src/app/App.tsx")
  .then((module) => {
    console.log("App component imported successfully!");
    console.log("App export keys:", Object.keys(module));
  })
  .catch((error) => {
    console.error("CRASH DURING IMPORT:");
    console.error(error.stack || error);
  });
