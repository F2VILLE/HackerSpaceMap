import { type Application, type Router } from "express";
import fs from "fs";
import path from "path";

async function loadRoutes(app: Application, dir: string) {
  for (const file of fs.readdirSync(path.join(__dirname, dir))) {
    if (["index.ts", "index.js"].includes(file)) continue;
    if (fs.lstatSync(path.join(__dirname, dir, file)).isDirectory()) {
      loadRoutes(app, dir + file + "/");
    } else {
      if (["ts", "js"].includes(file.split(".").pop() || "")) {
        const route = await import(path.join(__dirname, dir, file));
        console.log("Loading route", ((route.path || dir + file.split(".").shift())), "from", dir + file, "...");
        console.log("path:", route.path)
        if (route.route) {
          app.use((route.path || dir + file.split(".").shift()), route.route);
        }
      }
    }
  }
}

export default {
  load(app: Application) {
    loadRoutes(app, "/");
  },
};
