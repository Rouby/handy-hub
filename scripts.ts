import { parallel, scripts } from "scriptful";

export default scripts({
  dev: parallel([
    "vite",
    "wds --watch --esbuild ./app/main.server.ts | pino-pretty",
  ]),
});
