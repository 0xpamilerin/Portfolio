const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const html = fs.readFileSync("_site/index.html", "utf8");
const appJs = fs.readFileSync("_site/app.js", "utf8");
const profileJson = fs.readFileSync("_site/profile.json", "utf8");

// Set up virtual console
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", (e) => {
  console.log("JSDOM ERROR:", e);
});
virtualConsole.on("log", (log) => {
  console.log("JSDOM LOG:", log);
});

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  virtualConsole
});

// Mock fetch
dom.window.fetch = async (url) => {
  if (url === "profile.json") {
    return {
      json: async () => JSON.parse(profileJson)
    };
  }
  throw new Error("404");
};

// Execute app.js
const scriptEl = dom.window.document.createElement("script");
scriptEl.textContent = appJs;
dom.window.document.body.appendChild(scriptEl);

// Wait a bit to let promises resolve
setTimeout(() => {
  console.log("Hero innerHTML size:", dom.window.document.getElementById("hero").innerHTML.length);
  console.log("Experience innerHTML size:", dom.window.document.getElementById("experience").innerHTML.length);
}, 1000);
