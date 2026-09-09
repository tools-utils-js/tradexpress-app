const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// Connects to local file database (creates database.db automatically)
const db = new sqlite3.Database('./database.db');

// Initialize database table and sample data on startup
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS AppSettings (AppDate_old TEXT)");
  db.run("INSERT INTO AppSettings (AppDate_old) VALUES ('09/09/2026')");
});

// Migration Endpoint
app.post('/api/migrate/appdate', (req, res) => {
  db.serialize(() => {
    db.run("ALTER TABLE AppSettings ADD COLUMN AppDate_new TEXT", (err) => {
      if (err && !err.message.includes('duplicate column')) {
        return res.status(500).json({ success: false, error: err.message });
      }
      
      db.run("UPDATE AppSettings SET AppDate_new = AppDate_old", (err) => {
        if (err) {
          return res.status(500).json({ success: false, error: err.message });
        }

        res.status(200).json({ 
          success: true, 
          message: 'AppDate migration completed successfully (SQLite).' 
        });
      });
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Offline SQLite migration endpoint running at http://localhost:${PORT}`);
});