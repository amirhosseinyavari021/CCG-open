const https = require("https");
const fs = require("fs");
const path = require("path");
const os = require("os");

const version = "v3.1.1";  // نسخه‌ای که در Release آپلود کردی
const baseUrl = `https://github.com/amirhosseinyavari021/CCG-open/releases/download/${version}/`;

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
    console.error("Unsupported OS for CCG installer.");
    process.exit(1);
}

const url = baseUrl + fileName;
const dest = path.join(__dirname, "bin", fileName);

console.log("Downloading:", url);

// تابع دانلود با دنبال کردن ریدایرکت‌های 302
function download(url, dest, cb) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      // FOLLOW REDIRECT
      return download(res.headers.location, dest, cb);
    }

    if (res.statusCode !== 200) {
      console.error("Download failed with status:", res.statusCode);
      process.exit(1);
    }

    const file = fs.createWriteStream(dest, { mode: 0o755 });
    res.pipe(file);

    file.on("finish", () => {
      file.close(cb);
    });
  });
}

download(url, dest, () => {
  console.log("CCG installed successfully!");
});
