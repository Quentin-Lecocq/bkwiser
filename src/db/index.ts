import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';
import { defaultBankroll } from './data';

interface DatabaseSchema {
  bankroll: number;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbFile = join(__dirname, 'db.json');
console.log(`Database file path: ${dbFile}`);

async function initializeDb() {
  try {
    try {
      await fs.access(dbFile);
      console.log('Database file exists, no need to create it.');
    } catch {
      // File does not exist, create it
      await fs.writeFile(dbFile, JSON.stringify({ bankroll: 0 }, null, 2));
      console.log('Database file created .');
    }

    const adapter = new JSONFile<DatabaseSchema>(dbFile);
    const db = new Low<DatabaseSchema>(adapter, {
      bankroll: defaultBankroll,
    });

    await db.read();
    if (!db.data) {
      db.data = { bankroll: defaultBankroll };
      await db.write();
      console.log('Database initialized with default values.');
    }

    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

let dbInstance: Low<DatabaseSchema>;

export async function syncDb() {
  if (!dbInstance) {
    dbInstance = await initializeDb();
  }

  await dbInstance.read();
  dbInstance.data ||= { bankroll: defaultBankroll };
  return dbInstance.data;
}
