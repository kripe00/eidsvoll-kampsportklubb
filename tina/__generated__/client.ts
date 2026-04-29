import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/Users/kristianpedersen/Eidsvoll kampsportklubb/tina/__generated__/.cache/1777459102061', url: 'http://localhost:4001/graphql', token: 'undefined', queries,  });
export default client;
  