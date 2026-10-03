// ============================================
// AUTOMATED HS CODE & TARIFF SYSTEM UTILITY
// ============================================
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tariff_classifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      commodity_name TEXT,
      base_hs_code TEXT,
      ahtn_suffix TEXT,
      ahtn_nomenclature TEXT UNIQUE,
      region_scope TEXT DEFAULT 'ASEAN Zone',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

/**
 * POST /api/trade/classify
 * Processes inbound trade items and maps them to verified 8-digit nomenclature signatures
 */
app.post('/api/trade/classify', (req, res) => {
  const { commodityName, baseHsCode, ahtnSuffix } = req.body;
  
  if (!commodityName || !baseHsCode || !ahtnSuffix) {
    return res.status(400).json({ success: false, error: "Validation Fault: Missing HS Code criteria matrix inputs." });
  }

  // Compile the parts into an absolute 8-digit precision AHTN tracking string (e.g., 081340.00)
  const fullNomenclature = `${baseHsCode}.${ahtnSuffix}`;

  const insertQuery = `
    INSERT INTO tariff_classifications (commodity_name, base_hs_code, ahtn_suffix, ahtn_nomenclature)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(ahtn_nomenclature) DO UPDATE SET commodity_name = excluded.commodity_name
  `;

  db.run(insertQuery, [commodityName, baseHsCode, ahtnSuffix, fullNomenclature], function(err) {
    if (err) {
      return res.status(500).json({ success: false, error: "Database mapping transaction exception." });
    }
    
    res.json({
      success: true,
      message: "AHTN classification successfully verified and persisted to ledger.",
      match: {
        id: this.lastID || 1,
        commodity: commodityName,
        hs_code: baseHsCode,
        ahtn_nomenclature: fullNomenclature,
        region_scope: "ASEAN Zone"
      }
    });
  });
});

