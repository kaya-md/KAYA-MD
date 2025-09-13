// ================= config.js ===============
const fs = require('fs');
const path = require('path');

// ---------------- Config par défaut ----------------
const defaultConfig = {
  // ---------------- session----------------
  SESSION_ID: "kaya~HEcFiYpS#wo1CHTDUQaRduESSoAH1jT0tLShtg7tiM7VDZ9hCTHE",
  OWNER_NUMBER: "50941460559", // Numéro 

  // ---------------- Paramètres généraux ----------------
  PREFIX: ".",
  TIMEZONE: "Africa/Kinshasa",
  publicBot: true,    
  autoRead: true,     
  restrict: false,    

  // ---------------- Apparence ----------------
  botImage: "",      

  // ---------------- Liens utiles ----------------
  LINKS: {
    group:    "https://chat.whatsapp.com/DoMh6jWjly2ErwVppmCGZo",
    chanel:   "https://whatsapp.com/channel/0029Vb6FFPM002T3SKA6bb2D",
    telegram: "https://t.me/zonetech2"
  }
};

// ---------------- Chemins ----------------
const dataDir = path.join(__dirname, "data");
const configPath = path.join(dataDir, "config.json");

// ---------------- Création dossier /data si absent ----------------
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// ---------------- Lecture ou création de config.json ----------------
let userConfig = defaultConfig;
try {
  if (fs.existsSync(configPath)) {
    const rawData = fs.readFileSync(configPath, "utf-8");
    const parsed = JSON.parse(rawData);

    // Merge avec les valeurs par défaut pour conserver les nouvelles clés
    userConfig = { ...defaultConfig, ...parsed };
  } else {
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
    console.log("✅ config.json créé avec les paramètres par défaut dans /data");
  }
} catch (err) {
  console.error("❌ Erreur lors du chargement de config.json:", err);
  console.log("ℹ️ Le bot utilisera les paramètres par défaut");
}

// ---------------- Validation minimale ----------------
if (!userConfig.SESSION_ID || !userConfig.OWNER_NUMBER) {
  console.warn("⚠️ SESSION_ID ou OWNER_NUMBER vide ! Vérifie config.json");
}

// ---------------- Fonction pour sauvegarder la configuration ----------------
function saveConfig(updatedConfig) {
  try {
    userConfig = { ...userConfig, ...updatedConfig };
    fs.writeFileSync(configPath, JSON.stringify(userConfig, null, 2));
    console.log("✅ Configuration sauvegardée avec succès.");
  } catch (err) {
    console.error("❌ Impossible de sauvegarder la configuration:", err);
  }
}

// ---------------- Export ----------------
module.exports = {
  ...userConfig,
  saveConfig
};
