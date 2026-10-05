const fs = require('fs');

const userId = "tx_user_1660ti_ubuntu";
const timestamp = Date.now();
const tx7Content = `TX7_PROFILE_\nID:${userId}\nTIMESTAMP:${timestamp}\nROOT:/home/tx/tradexpress-app\nEOF`;

fs.writeFileSync('user_profile.tx7', tx7Content);
console.log("Successfully created user_profile.tx7 file!");

