import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export { __filename, __dirname };

let renderUrl = "http://localhost:3000/";
let viteUrl = "http://localhost:5173/";

if (process.env.NODE_ENV === "production") {
  renderUrl = process.env.RENDER_API;
  viteUrl = process.env.VITE_API;
}

export { renderUrl, viteUrl };
