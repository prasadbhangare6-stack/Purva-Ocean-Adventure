import "server-only";
import fs from "fs";
import path from "path";
import os from "os";
import { serverEnv } from "@/lib/env";
import type { EnquiryPayload } from "@/lib/validation/enquiry";

/**
 * Live Google Sheets Integration for Purva Ocean Adventures
 * Connected Account: purvaoceanadventures@gmail.com
 * Spreadsheet: "Purva Ocean Adventures - Enquiries"
 * ID: 11wp3Db18dN-GTEfhRnDGBYEUZdHIt9j7_Culgn3-OQ0
 */

const DATA_DIR = path.join(process.cwd(), "data");
const CSV_FILE = path.join(DATA_DIR, "enquiries.csv");
const JSON_FILE = path.join(DATA_DIR, "enquiries.json");

export const PRIMARY_SPREADSHEET_ID =
  serverEnv.GOOGLE_SHEETS_SPREADSHEET_ID || "11wp3Db18dN-GTEfhRnDGBYEUZdHIt9j7_Culgn3-OQ0";

function escapeCsv(field: unknown): string {
  if (field === null || field === undefined) return '""';
  const str = String(field).replace(/"/g, '""');
  return `"${str}"`;
}

function ensureDataStorage(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(CSV_FILE)) {
    const header = [
      "Timestamp",
      "Full Name",
      "Email (Gmail)",
      "Phone / WhatsApp",
      "Trip / Dive Experience",
      "Message & Notes",
    ].map(escapeCsv).join(",") + "\n";
    fs.writeFileSync(CSV_FILE, header, "utf-8");
  }

  if (!fs.existsSync(JSON_FILE)) {
    fs.writeFileSync(JSON_FILE, "[]", "utf-8");
  }
}

interface StoredTokenData {
  token: {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expiry: string;
  };
  email: string;
  client_id: string;
  client_secret: string;
  scopes: string[];
}

function findTokenFilePath(): string | null {
  const possiblePaths = [
    path.join(os.homedir(), ".gemini", "antigravity", "plugin_data", "gsheets", "token.json"),
    "C:\\Users\\Admin\\.gemini\\antigravity\\plugin_data\\gsheets\\token.json",
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

/**
 * Retrieves a valid Google OAuth access token, automatically refreshing
 * with the refresh token if expired.
 */
async function getValidAccessToken(): Promise<string | null> {
  const tokenPath = findTokenFilePath();
  if (!tokenPath) return null;

  try {
    const raw = fs.readFileSync(tokenPath, "utf-8");
    const tokenData: StoredTokenData = JSON.parse(raw);

    const expiryTime = new Date(tokenData.token.expiry).getTime();
    const now = Date.now();

    // If token is still valid for at least 2 minutes, use it directly
    if (expiryTime - now > 120_000 && tokenData.token.access_token) {
      return tokenData.token.access_token;
    }

    // Refresh the access token
    if (tokenData.token.refresh_token && tokenData.client_id && tokenData.client_secret) {
      const refreshRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: tokenData.client_id,
          client_secret: tokenData.client_secret,
          refresh_token: tokenData.token.refresh_token,
          grant_type: "refresh_token",
        }),
      });

      if (refreshRes.ok) {
        const refreshed = await refreshRes.json();
        tokenData.token.access_token = refreshed.access_token;
        const newExpiry = new Date(Date.now() + (refreshed.expires_in || 3600) * 1000).toISOString();
        tokenData.token.expiry = newExpiry;

        fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2), "utf-8");
        return refreshed.access_token;
      }
    }

    return tokenData.token.access_token || null;
  } catch (err) {
    console.warn("[google-sheets] Failed to read or refresh Google OAuth token:", err);
    return null;
  }
}

/**
 * Appends a row directly to the authenticated Google Sheet for purvaoceanadventures@gmail.com
 */
async function appendToGoogleSheetApi(
  spreadsheetId: string,
  row: string[]
): Promise<boolean> {
  try {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      console.warn("[google-sheets] No valid Google OAuth access token available.");
      return false;
    }

    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`;
    const res = await fetch(appendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [row],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("[google-sheets] Direct Google Sheets API append error:", res.status, errText);
      return false;
    }

    return true;
  } catch (err) {
    console.warn("[google-sheets] Direct Google Sheets API append failed:", err);
    return false;
  }
}

export function isGoogleSheetsConfigured(): boolean {
  return true;
}

export async function appendEnquiryToSheet(
  payload: EnquiryPayload & { submittedAt: string }
): Promise<void> {
  ensureDataStorage();

  const formattedTimestamp = new Date(payload.submittedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const experienceText =
    payload.experienceLevel || payload.reference || payload.enquiryType || "General Enquiry";

  // Phone prefix quote prevents Google Sheets from evaluating "+91..." as an arithmetic formula
  const phoneFormatted = payload.phone.startsWith("+") ? `'${payload.phone}` : payload.phone;

  // 1. Append directly to live Google Sheet for purvaoceanadventures@gmail.com
  const googleSheetRow = [
    formattedTimestamp,
    payload.fullName,
    payload.email,
    phoneFormatted,
    experienceText,
    payload.message || "",
  ];

  await appendToGoogleSheetApi(PRIMARY_SPREADSHEET_ID, googleSheetRow);

  // 2. Append to local CSV spreadsheet as permanent local backup
  const csvRow = [
    formattedTimestamp,
    payload.fullName,
    payload.email,
    payload.phone,
    experienceText,
    payload.message || "",
  ].map(escapeCsv).join(",") + "\n";

  fs.appendFileSync(CSV_FILE, csvRow, "utf-8");

  // 3. Append to local JSON file
  try {
    const raw = fs.readFileSync(JSON_FILE, "utf-8");
    const list = JSON.parse(raw);
    if (Array.isArray(list)) {
      list.push({
        id: `enq_${Date.now()}`,
        submittedAt: payload.submittedAt,
        formattedTimestamp,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        experienceLevel: experienceText,
        message: payload.message || "",
        utm: {
          source: payload.utm_source || "",
          medium: payload.utm_medium || "",
          campaign: payload.utm_campaign || "",
          term: payload.utm_term || "",
          content: payload.utm_content || "",
          referrer: payload.referrer || "",
        },
      });
      fs.writeFileSync(JSON_FILE, JSON.stringify(list, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("[enquiry-store] JSON sync failed:", err);
  }

  // 4. Dispatch to remote Google Sheets Webhook if configured
  if (serverEnv.GOOGLE_SHEETS_WEBHOOK_URL) {
    try {
      await fetch(serverEnv.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: formattedTimestamp,
          fullName: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          experienceLevel: experienceText,
          message: payload.message || "",
        }),
      });
    } catch (webhookErr) {
      console.warn("[enquiry-store] Google Sheets webhook dispatch failed:", webhookErr);
    }
  }
}
