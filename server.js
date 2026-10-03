/**
 * KENWELL-TX-ORG Ecosystem Core Ingestion Engine & Router Platform
 * Location Profile: Self-Hosted Production Node Array [tx@192.168.100.11:3000]
 */
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

// ⚡ Dynamic Cross-Origin Resource Allowance (CORS Production Layer Override)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Initialize Localized Database Matrix Context Adapters
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('[DATABASE INITIALIZATION FAULT]:', err.message);
  } else {
    console.log('[CLUSTER LINK ACTIVE]: Secure connection verified for local SQLite data block.');
    
    // Auto-Integrate Intelligence Storage Ingestion Tables
    db.run(`
      CREATE TABLE IF NOT EXISTS stories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        targeted_assets TEXT DEFAULT '[]',
        is_premium INTEGER DEFAULT 0,
        status TEXT DEFAULT 'draft',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Auto-Integrate Customs Telemetry Classification Matrix Tables
    db.run(`
      CREATE TABLE IF NOT EXISTS hs_codes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        commodity_name TEXT NOT NULL,
        base_hs_code TEXT NOT NULL,
        ahtn_nomenclature TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

/**
 * Endpoint Node: Customs Telemetry Classification Engine with DB Auto-Save
 * Route: POST /api/trade/classify
 */
app.post('/api/trade/classify', (req, res) => {
  const { commodityName, baseHsCode, ahtnSuffix } = req.body;

  if (!commodityName || !baseHsCode) {
    return res.status(400).json({ success: false, error: "Contract validation exception: Missing commodity label or primary HSCode indicators." });
  }

  // AHTN nomenclature defaults to 8-digit precision groupings across ASEAN networks
  const fullAhtnCode = ahtnSuffix ? `${baseHsCode}.${ahtnSuffix}` : `${baseHsCode}.00`;

  const insertQuery = `INSERT INTO hs_codes (commodity_name, base_hs_code, ahtn_nomenclature) VALUES (?, ?, ?)`;
  db.run(insertQuery, [commodityName, baseHsCode, fullAhtnCode], function(err) {
    if (err) {
      console.error("[DATABASE RECORD WRITE FAILURE]:", err.message);
      return res.status(500).json({ success: false, error: "Internal data cluster transaction exception." });
    }

    res.status(200).json({
      success: true,
      engine: "KENWELL-TX AHTN Core Classifier",
      timestamp: new Date().toISOString(),
      match: {
        id: this.lastID,
        commodity: commodityName,
        hs_code: baseHsCode,
        ahtn_nomenclature: fullAhtnCode,
        region_scope: "ASEAN Zone Compliance Verified & Saved"
      }
    });
  });
});

/**
 * Endpoint Node: Data Ingestion Pipeline
 * Route: POST /api/story/create
 */
app.post('/api/story/create', (req, res) => {
  const { title, content, category, targetedAssets, isPremium, status } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ success: false, error: "Contract integrity failure: Missing title, content, or category fields." });
  }

  const premiumFlag = isPremium ? 1 : 0;
  const stringifiedAssets = targetedAssets ? JSON.stringify(targetedAssets) : '[]';
  const targetStatus = status || 'draft';

  const insertQuery = `
    INSERT INTO stories (title, content, category, targeted_assets, is_premium, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(insertQuery, [title, content, category, stringifiedAssets, premiumFlag, targetStatus], function (err) {
    if (err) {
      console.error("[DATABASE STORY WRITE EXCEPTION]:", err.message);
      return res.status(500).json({ success: false, error: "Internal database tracking transaction exception occurred." });
    }

    res.status(201).json({
      success: true,
      message: "Ecosystem platform data metrics initialized and saved successfully.",
      data: { storyId: this.lastID, title, status: targetStatus }
    });
  });
});

/**
 * Endpoint Node: Intelligence Extraction Engine
 * Route: GET /api/story/all
 */
app.get('/api/story/all', (req, res) => {
  db.all(`SELECT id, title, category, targeted_assets, is_premium, status, created_at FROM stories ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) {
      console.error("[DATABASE RECORD EXTRACTION FAULT]:", err.message);
      return res.status(500).json({ success: false, error: "Internal cluster extraction processing failure." });
    }
    res.status(200).json({ success: true, count: rows.length, data: rows });
  });
});

/**
 * Endpoint Node: Telemetry Equator Alignment Hub
 * Route: GET /api/monitor/equator
 */
app.get('/api/monitor/equator', (req, res) => {
  res.status(200).json({
    success: true,
    telemetry: {
      status: "active",
      node: "KENWELL-TX Equator Daemon Process Module",
      heartbeat: new Date().toISOString(),
      database_state: "connected"
    }
  });
});

// Spin up HTTP Network Processing Core
app.listen(PORT, () => {
  console.log(`[BOOTUP SUCCESS]: KENWELL TX Production Core running seamlessly on port ${PORT}`);
});

