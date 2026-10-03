// ==========================================
// SECURE JWT TOKEN VERIFICATION MIDDLEWARE
// ==========================================
/**
 * Intercepts requests to enforce cryptographically signed session validation
 */
function authenticateJwtToken(req, res, next) {
  // Extract token from the standard Authorization header format (Bearer <token>)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.warn(`[SECURITY ALERT] Request blocked: Missing authentication token signature.`);
    return res.status(401).json({ success: false, error: "Access Denied: Missing authorization token." });
  }

  try {
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    const secret = "KENWELL_TX_CORE_HIGH_ENTROPY_SECRET_MATRIX_KEY_2026";
    
    // Re-verify the crypt signature validity locally
    const verifiedSignature = crypto.createHmac('sha256', secret)
      .update(`${headerB64}.${payloadB64}`)
      .digest('base64url');

    if (verifiedSignature !== signatureB64) {
      console.warn(`[SECURITY ALERT] Request blocked: Tampered or invalid cryptographic token signature detected.`);
      return res.status(403).json({ success: false, error: "Access Denied: Invalid signature verification." });
    }

    // Decode token parameters to evaluate session expiration limits
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());
    if (payload.exp  {
  const { uuid } = req.params;
  const operator = req.operatorSession.username;
  
  console.log(`[SECURITY] Authorized node link verified for operator [${operator}] at hardware UUID: ${uuid}`);

  const dbQueryString = "SELECT id, title, category, status FROM stories WHERE status = 'published' ORDER BY id DESC LIMIT 10";
  db.all(dbQueryString, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Database transaction exception." });
    }
    
    res.json({
      success: true,
      authenticatedNode: uuid,
      verifiedOperator: operator,
      count: rows.length,
      data: rows
    });
  });
});

