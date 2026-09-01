import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'c05f5e9a3f49d2bf637d361a9384fb627a783e6e', queries,  });
export default client;
  