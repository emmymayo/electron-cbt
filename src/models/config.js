const DB = require('better-sqlite3')('./src/models/cbt.db', {
    fileMustExist: true,
    // verbose: console.log
});


process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));

module.exports = DB;