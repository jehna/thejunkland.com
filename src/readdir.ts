import fs from 'fs'

export const readdir = (path: string): string[] => {
  const files = fs.readdirSync(path, { withFileTypes: true })
  return files.flatMap((file) =>
    file.isDirectory()
      ? readdir(`${path}/${file.name}`).map((f) => `${file.name}/${f}`)
      : file.name
  )
}
