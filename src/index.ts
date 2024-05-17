import express from "express";
import routes from "./routes";
import path from "path";
import { fetchAllHackerspaces } from "./utils/fetchAllHackerspaces";
const app = express();
const port = 80;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function fetchHackerspacesLoop() {
  await fetchAllHackerspaces();
  fetchHackerspacesLoop()
}

fetchHackerspacesLoop()

routes.load(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
