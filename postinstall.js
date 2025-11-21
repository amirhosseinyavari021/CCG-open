const https = require("https");
const fs = require("fs");
const path = require("path");
const os = require("os");

const version = "v3.1.1";  // نسخه‌ای که در Release پابلیک گذاشتی

const releaseBase =
  `https://github.com/amirhosseinyavari021/CCG-open/releases/download/${version}/`;

let fileName = "";

switch (os.platform()) {
  case "linux":
    fileName = "ccg-linux";
    break;
  case "darwin":
    fileName = "ccg-macos";
    break;
  case "win32":
    fileName = "ccg-win.exe";
    break;
  default:
    console.error("Unsupported OS for CCG.");
    process.exit(1);
}

const url = releaseBase + fileName;
const dest = path.join(__dirname, "bin", fileName);

console.log("Downloading:", url);

https.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error("Failed to download binary:", res.statusCode);
    process.exit(1);
  }

  const file = fs.createWriteStream(dest, { mode: 0o755 });

  res.pipe(file);

  file.on("finish", () => {
    file.close(() => {
      console.log("CCG installed successfully!");
    });
  });
});
