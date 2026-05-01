const fs = require('node:fs/promises');
const { generateReadme } = require('./readme-service.js');

async function main(options = {}) {
  const {
    errorLogger = console,
    exit = process.exit,
    generate = generateReadme,
    logger = console,
    outputPath = 'README.md',
    token = process.env.GITHUB_TOKEN,
    writeFile = fs.writeFile,
  } = options;

  try {
    const readme = await generate({ token });
    await writeFile(outputPath, readme);
    logger.log(`${outputPath} generated.`);
  } catch (err) {
    errorLogger.error(err);
    exit(1);
  }
}

module.exports = { main };
