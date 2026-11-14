const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// File paths
const DATA_DIR = path.join(__dirname, "data");
const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");
const USERS_FILE = path.join(DATA_DIR, "admin-users.json");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");
const UPLOADS_DIR = path.join(__dirname, "uploads");
const FRONTEND_MEDIA_DIR = path.join(__dirname, "..", "frontend", "public", "media");

// Ensure directories exist
[DATA_DIR, UPLOADS_DIR, FRONTEND_MEDIA_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Configure Multer for image/video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
    const uniqueName = `${cleanName}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|webp|gif|svg|mp4|webm)$/i;
    if (allowed.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error("Only images and videos are allowed."));
    }
  },
});

// Helper: read/write JSON files
function readJson(filePath, defaultValue) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return defaultValue;
}

function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    // Also sync to frontend data dir if it exists
    const frontendDataFile = path.join(__dirname, "..", "frontend", "data", path.basename(filePath));
    const frontendDataDir = path.dirname(frontendDataFile);
    if (fs.existsSync(frontendDataDir)) {
      fs.writeFileSync(frontendDataFile, JSON.stringify(data, null, 2), "utf-8");
    }
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// -----------------------------------------------------------------------------
// Health Check
// -----------------------------------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Purva Ocean Adventures Backend API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// -----------------------------------------------------------------------------
// Media Upload Route
// -----------------------------------------------------------------------------
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded." });
  }

  const filename = req.file.filename;
  const uploadedPath = req.file.path;
  const frontendPath = path.join(FRONTEND_MEDIA_DIR, filename);

  // Copy to frontend/public/media so Next.js can serve it instantly
  try {
    fs.copyFileSync(uploadedPath, frontendPath);
  } catch (err) {
    console.error("Failed to copy upload to frontend media:", err);
  }

  const publicUrl = `/media/${filename}`;
  res.json({
    success: true,
    message: "File uploaded successfully.",
    url: publicUrl,
    filename,
  });
});

// -----------------------------------------------------------------------------
// Content Routes (Trips, Courses, Gallery, FAQ, About, Instagram, Settings)
// -----------------------------------------------------------------------------
app.get("/api/content", (req, res) => {
  const store = readJson(CONTENT_FILE, {});
  res.json({ success: true, data: store });
});

app.post("/api/content", (req, res) => {
  const { resource, action = "update", data } = req.body;
  if (!resource || !data) {
    return res.status(400).json({ success: false, message: "Resource and data required." });
  }

  const store = readJson(CONTENT_FILE, {});

  switch (resource) {
    case "trips": {
      store.trips = store.trips || [];
      if (action === "delete") {
        store.trips = store.trips.filter((t) => t.slug !== data.slug);
      } else {
        const cleanTripData = { ...data };
        if (cleanTripData.remainingSpots !== undefined) {
          const parsed = parseInt(String(cleanTripData.remainingSpots), 10);
          cleanTripData.remainingSpots = isNaN(parsed) ? 0 : Math.max(0, parsed);
        }
        const idx = store.trips.findIndex((t) => t.slug === data.slug);
        if (idx >= 0) store.trips[idx] = { ...store.trips[idx], ...cleanTripData };
        else store.trips.push(cleanTripData);
      }
      break;
    }
    case "courses": {
      store.courses = store.courses || [];
      if (action === "delete") {
        store.courses = store.courses.filter((c) => c.slug !== data.slug);
      } else {
        const idx = store.courses.findIndex((c) => c.slug === data.slug);
        if (idx >= 0) store.courses[idx] = { ...store.courses[idx], ...data };
        else store.courses.push(data);
      }
      break;
    }
    case "gallery": {
      store.gallery = store.gallery || [];
      if (action === "delete") {
        store.gallery = store.gallery.filter((g) => g.id !== data.id);
      } else {
        const idx = store.gallery.findIndex((g) => g.id === data.id);
        if (idx >= 0) store.gallery[idx] = { ...store.gallery[idx], ...data };
        else store.gallery.push(data);
      }
      break;
    }
    case "faq": {
      store.faqs = store.faqs || [];
      if (action === "delete") {
        store.faqs = store.faqs.filter((f) => f.id !== data.id);
      } else {
        const idx = store.faqs.findIndex((f) => f.id === data.id);
        if (idx >= 0) store.faqs[idx] = { ...store.faqs[idx], ...data };
        else store.faqs.push(data);
      }
      break;
    }
    case "about": {
      store.about = { ...store.about, ...data };
      break;
    }
    case "instagram": {
      store.instagram = { ...store.instagram, ...data };
      break;
    }
    case "settings": {
      store.settings = { ...store.settings, ...data };
      break;
    }
    default:
      return res.status(400).json({ success: false, message: `Unsupported resource: ${resource}` });
  }

  writeJson(CONTENT_FILE, store);
  res.json({ success: true, message: `Successfully saved ${resource} changes.`, data: store });
});

// -----------------------------------------------------------------------------
// Authentication Routes (PBKDF2 Hashing)
// -----------------------------------------------------------------------------
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
}

app.post("/api/auth/sign-in", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required." });
  }

  const users = readJson(USERS_FILE, []);
  const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid email or password." });
  }

  const inputHash = hashPassword(password, user.salt);
  if (inputHash !== user.passwordHash) {
    return res.status(401).json({ success: false, message: "Invalid email or password." });
  }

  // Update login time
  user.lastLoginAt = new Date().toISOString();
  writeJson(USERS_FILE, users);

  res.json({
    success: true,
    message: "Sign-in successful",
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

app.post("/api/auth/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email required." });

  const users = readJson(USERS_FILE, []);
  const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

  if (!user) {
    return res.json({ success: true, message: "If an account exists, a reset code was generated." });
  }

  const token = crypto.randomBytes(3).toString("hex").toUpperCase();
  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 60 * 60 * 1000;
  writeJson(USERS_FILE, users);

  res.json({ success: true, message: `Reset code generated for ${user.name}`, resetToken: token });
});

app.post("/api/auth/reset-password", (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ success: false, message: "Valid token and 6+ char password required." });
  }

  const users = readJson(USERS_FILE, []);
  const user = users.find((u) => u.resetToken === token.toUpperCase() && u.resetTokenExpires > Date.now());

  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid or expired reset code." });
  }

  const salt = crypto.randomBytes(16).toString("hex");
  user.salt = salt;
  user.passwordHash = hashPassword(newPassword, salt);
  delete user.resetToken;
  delete user.resetTokenExpires;
  writeJson(USERS_FILE, users);

  res.json({ success: true, message: "Password reset successfully!" });
});

// -----------------------------------------------------------------------------
// Enquiries Routes
// -----------------------------------------------------------------------------
app.get("/api/enquiries", (req, res) => {
  const enquiries = readJson(ENQUIRIES_FILE, []);
  res.json({ success: true, enquiries });
});

app.post("/api/enquiries", async (req, res) => {
  const enquiry = {
    id: `enq-${Date.now()}`,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    ...req.body,
  };

  const enquiries = readJson(ENQUIRIES_FILE, []);
  enquiries.unshift(enquiry);
  writeJson(ENQUIRIES_FILE, enquiries);

  // Sync to Google Sheets if configured
  const store = readJson(CONTENT_FILE, {});
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
    } catch (err) {
      console.error("Google Sheets webhook error:", err);
    }
  }

  res.json({ success: true, message: "Enquiry received.", enquiry });
});

// -----------------------------------------------------------------------------
// Users Management
// -----------------------------------------------------------------------------
app.get("/api/users", (req, res) => {
  const users = readJson(USERS_FILE, []).map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
    lastLoginAt: u.lastLoginAt,
  }));
  res.json({ success: true, users });
});

// Serve static uploads
app.use("/uploads", express.static(UPLOADS_DIR));

// Start backend server
app.listen(PORT, () => {
  console.log(`🌊 Purva Ocean Adventures Backend running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
});

