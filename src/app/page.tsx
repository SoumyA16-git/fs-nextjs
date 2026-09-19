import fs from "fs"
import path from "path"
import { remark } from "remark"
import html from "remark-html"

export default async function HomePage() {
  const filePath = path.join(process.cwd(), "content", "home.md")
  let contentHtml = ""
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const processedContent = await remark().use(html).process(fileContent)
    contentHtml = processedContent.toString()
  }

  return (
    <div className="markdown bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  )
}
