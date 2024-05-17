import { Router } from "express";
import { Space } from "@f2ville/spaceapi";
import SpaceAPISchema from "@f2ville/spaceapi/lib/types/SpaceAPISchema";
import axios from "axios";
import fs from "fs";
import { fetchAllHackerspaces } from "../../utils/fetchAllHackerspaces";

const route = Router();

let cache: {
  lastUpdated: number;
  data: Array<{ name: string; url: string }>;
} = {
  lastUpdated: 0,
  data: [],
};

async function fetchList() {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(
        "https://raw.githubusercontent.com/SpaceApi/directory/master/directory.json"
      )
      .then((response) => {
        console.log("Fetched data from SpaceAPI directory");
        cache = {
          lastUpdated: Date.now(),
          data: Object.keys(response.data).map((k: any) => ({
            name: k,
            url: response.data[k],
          })),
        };
        resolve(
          Object.keys(response.data).map((k: any) => ({
            name: k,
            url: response.data[k],
          }))
        );
      })
      .catch((error) => {
        reject(error);
      });
  });
}

route.get("/search", async (req, res) => {
  if (!req.query.q) {
    return res.status(400).send('Missing query parameter "q"');
  }

  if (
    cache.data.length < 1 ||
    cache.lastUpdated +
      ((process.env.COOLDOWN_FETCH as unknown as number) || 2000) <
      Date.now()
  ) {
    console.log("Fetching data");
    await fetchList();
    console.log("Fetched data");
    console.log(cache.data);
  }
  const filtered = cache.data.filter((x) =>
    x.name
      .toLowerCase()
      .replace(/\s+/gm, "")
      .includes((req.query.q as string).toLowerCase().replace(/\s+/gm, ""))
  );
  console.log("Filtered", filtered);
  return res.json(filtered);
});

route.get("/all", async (req,res) => {
    if (!cache.data.length) {
        await fetchList()
    }
    if (fs.existsSync('hackerspaces.json')) {
        const allSpaces: {updatedAt: number, spaces: Array<SpaceAPISchema>} = JSON.parse(fs.readFileSync('hackerspaces.json').toString())
        return res.json({
            count: allSpaces.spaces.length,
            updatedAt: allSpaces.updatedAt,
            data: allSpaces.spaces
        })
    }
    else {
        return res.json({
            count: 0,
            updatedAt: null,
            data: []
        })
    }
})

route.get("/space/:name", async (req, res) => {
  console.log(req.params.name);
  if (!req.params.name) {
    return res.status(400).send('Missing parameter "name"');
  }

  if (!cache.data.length) {
    await fetchList();
  }

  const url = cache.data.find((x) => x.name.toLowerCase().replace(/\s+/gm, "") === req.params.name.toLowerCase().replace(/\s+/gm, ""))?.url;
  console.log(url);
  if (!url) {
    return res.status(404).send("Not found");
  }

  const space = new Space(url);
  await space.fetch({}).then((data) => {
    return res.json(data as SpaceAPISchema);
  });
});

export { route };
