import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "../../lib/prisma";
import {
  buildImprovementSnapshot,
  snapshotToMarkdown
} from "../../lib/mcp/continuous-improvement";

async function main() {
  const snapshot = await buildImprovementSnapshot();
  const markdown = snapshotToMarkdown(snapshot);

  const lines = [
    "# Daglig forbedringsrapport",
    "",
    `Generert: ${new Date().toISOString()}`,
    "",
    markdown
  ];

  const reportDir = path.resolve(process.cwd(), "reports/continuous-improvement");
  fs.mkdirSync(reportDir, { recursive: true });
  const report = lines.join("\n");
  const stamp = new Date().toISOString().slice(0, 10);

  fs.writeFileSync(path.join(reportDir, "latest.md"), report, "utf8");
  fs.writeFileSync(path.join(reportDir, `${stamp}.md`), report, "utf8");

  console.log(`Rapport skrevet til ${path.join(reportDir, "latest.md")}`);
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
