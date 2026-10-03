// ============================================
// ENTERPRISE ADMIN ACCOUNT INITIALIZATION SEED
// ============================================
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');

// Target paths pointing straight to your live database file storage container
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Target profile metrics variables - configure your credentials matrix blocks here
const ADMIN_USERNAME = 'kenwell-admin';
const ADMIN_PASSWORD = 'CoreHighEntropySecurePassword2026'; // Change this key in production
const ADMIN_ROLE = 'admin';

/**
 * Helper Subroutine: Compiles PBKDF2 cryptography hashes safely to match server.js rules
 */
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

console.log(`[SEED ENGINE] Initializing secure connection to: ${path.basename(dbPath)}...`);

db.serialize(() => {
  // Ensure the base operators storage table layer exists perfectly
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password_hash TEXT,
      salt TEXT,
      role TEXT DEFAULT 'standard',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Generate an isolated high-entropy cryptography tracking salt
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(ADMIN_PASSWORD, salt);

  const insertQuery = `INSERT INTO users (username, password_hash, salt, role) VALUES (?, ?, ?, ?)`;

  db.run(insertQuery, [ADMIN_USERNAME, passwordHash, salt, ADMIN_ROLE], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        console.error(`\n[ABORTED] Registration Rejected: The operator username "${ADMIN_USERNAME}" already exists inside this database cluster.\n`);
      } else {
        console.error(`\n[CRITICAL FAILURE] Database insertion fault:`, err.message, `\n`);
      }
      db.close();
      process.exit(1);
    }

    console.log(`
================================================================
🚀 SUCCESS: ENTERPRISE ADMIN ACCOUNT INITIALIZED COMPLETED!
================================================================
* DATABASE PROFILE KEY ID : #${this.lastID}
* OPERATOR USERNAME MATRIX: ${ADMIN_USERNAME}
* PRIVILEGE ACCESS ROLE   : ${ADMIN_ROLE}
* ENCRYPTED SECURITY SALT : ${salt}
================================================================
// Handshake verified. Account is ready for immediate UI login.
    `);
    
    db.close();
  });
});

