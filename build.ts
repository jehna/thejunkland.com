import fs from "fs/promises";

const build = async () => {
  await fs.mkdir("build", { recursive: true });
  await fs.writeFile(
    "build/index.html",
    `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Sample web page</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="This is a sample web page" />
    </head>
    <body>
      <p>Hello world!</p>
    </body>
  </html>`
  );
  await fs.writeFile("build/robots.txt", `User-agent: *\nallow: /`);
};
build();
