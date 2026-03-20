import { readdirSync } from "node:fs";
import path from "node:path";

export async function GET() {
  const dirPath = path.join(process.cwd(), "/public/partners");
  const list = readdirSync(dirPath);

  return Response.json(list, { status: 200 });
}
