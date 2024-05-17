import { Space } from "@f2ville/spaceapi";
import SpaceAPISchema from "@f2ville/spaceapi/lib/types/SpaceAPISchema";
import axios from "axios";
import fs from 'fs';

export async function fetchAllHackerspaces(): Promise<Array<SpaceAPISchema>> {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(
        "https://raw.githubusercontent.com/SpaceApi/directory/master/directory.json"
      )
      .then(async (response) => {

        const hsurls = Object.keys(response.data).map((k: any) => ({
          name: k,
          url: response.data[k],
        }));

        const allSpaces: Array<SpaceAPISchema> = []

        const colors = {
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            white: "\x1b[37m",
            reset: "\x1b[0m",
        }

        for await (const space of hsurls) {
            const spaceObj = new Space(space.url)
            await spaceObj.fetch({
              timeout: 6000
            }).then((data) => {
                console.log(`${colors.green}[${hsurls.indexOf(space)}/${hsurls.length}]${colors.reset}`, "Fetched data from", space.name, "at", space.url)
                allSpaces.push(data)
            })
            .catch((err) => {
                console.log(`${colors.red}[${hsurls.indexOf(space)}/${hsurls.length}]${colors.reset} Error fetching data from ${space.name} at {space.url}`)
                // console.error(err)
            })
        }

        fs.writeFileSync('hackerspaces.json', JSON.stringify({
          updatedAt: Date.now(),
          spaces: allSpaces
        }, null, 2))
        resolve(allSpaces)

      })
      .catch((error) => {
        reject(error);
      });
  });
}
