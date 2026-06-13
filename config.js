import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= DEFAULT CONFIG ================= */
const defaultConfig = {
  SESSION_ID: "SESSION_ID",
  OWNERS: ["OWNER_NUMBER"],
  PREFIX: ".",
  TIMEZONE: "Africa/Kinshasa",
  publicBot: true,
  autoRead: true,
  restrict: false,
  botImage: "",
  LINKS: {
    group: "",
    chanel: "",
    telegram: ""
  }
};

/* ================= PATHS ================= */
const dataDir = path.join(__dirname, "data");
const configPath = path.join(dataDir, "config.json");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

/* ================= LOAD CONFIG ================= */
let userConfig = defaultConfig;

try {
  if (fs.existsSync(configPath)) {
    const rawData = fs.readFileSync(configPath, "utf-8");
    const parsed = JSON.parse(rawData);

    userConfig = { ...defaultConfig, ...parsed };
  } else {
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  }
} catch (err) {
  console.error("❌ config error:", err);
}

/* ================= SAVE FUNCTION (FIX) ================= */
export function saveConfig(updatedConfig) {
  try {
    userConfig = { ...userConfig, ...updatedConfig };

    fs.writeFileSync(
      configPath,
      JSON.stringify(userConfig, null, 2)
    );

    // 🔥 SYNC GLOBAL PREFIX DIRECT
    if (updatedConfig.PREFIX) {
      global.PREFIX = updatedConfig.PREFIX;
    }

    console.log("✅ Configuration sauvegardée");
  } catch (err) {
    console.error("❌ Erreur sauvegarde config:", err);
  }
}

export default userConfig;