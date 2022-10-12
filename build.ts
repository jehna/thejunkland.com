import fs from "fs/promises";

const build = async () => {
  await fs.mkdir("build", { recursive: true });
  await fs.writeFile("build/index.html", "Hello world!");
};
build();
