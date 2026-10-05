const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 3000;

// ⚡ Explicit Network Allowance Overrides (CORS Layer)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Initialize Local SQLite Database Adapter
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Database connection cluster fault:', err.message);
  } else {
    console.log('Connected to TradeXpress local SQLite database file.');
  }
});

/**
 * Endpoint Node: Intelligence Ingestion Engine
 * Route: POST /api/story/create
 */
app.post('/api/story/create', (req, res) => {
  const { title, content, category, targetedAssets, isPremium, status } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ 
      success: false, 
      error: "Contract integrity failure: Missing title, content, or category fields." 
    });
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
      console.error("Database tracking write failure:", err.message);
      return res.status(500).json({ success: false, error: "Internal database transaction exception." });
    }

    console.log(`[INGESTION SUCCESS] Generated Story ID Reference: ${this.lastID}`);
    res.status(201).json({
      success: true,
      message: "Intelligence story records registered successfully.",
      data: { storyId: this.lastID, title, status: targetStatus }
    });
  });
});

/**
 * Endpoint Node: Intelligence Extraction Engine
 * Route: GET /api/story/all
 */
app.get('/api/story/all', (req, res) => {
  const selectQuery = `
    SELECT id, title, category, targeted_assets, is_premium, status, created_at 
    FROM stories 
    ORDER BY created_at DESC
  `;

  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      console.error("Database extraction failure:", err.message);
      return res.status(500).json({ success: false, error: "Internal cluster extraction failure." });
    }

    const formattedStories = rows.map(story => {
      let assets = [];
      try {
        assets = story.targeted_assets ? JSON.parse(story.targeted_assets) : [];
      } catch (e) {
        assets = [];
      }
      return {
        ...story,
        targeted_assets: assets,
        is_premium: story.is_premium === 1
      };
    });

    res.status(200).json({
      success: true,
      count: formattedStories.length,
      data: formattedStories
    });
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
      node: "tradexpress-monitor-equator",
      heartbeat: new Date().toISOString()
    }
  });
});

// Spin up HTTP Network Processing Core
app.listen(PORT, () => {
  console.log(`TradeXpress engine running seamlessly on port ${PORT}`);
});
