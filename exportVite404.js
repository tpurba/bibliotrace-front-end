import { copyFileSync } from "fs";

const source = "./vite404.html";
const destination = "./dist/vite404.html";

try {
  copyFileSync(source, destination);
  console.log(`Successfully added 404 file to dist: ${destination}`);
} catch (err) {
  console.error(`Error copying 404 file to dist: ${err}`);
}
