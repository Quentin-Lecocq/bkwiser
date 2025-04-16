import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

type DB = {
  bankroll: number;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file = join(__dirname, 'db.json');
const adapter = new JSONFile<DB>(file);
const db = new Low<DB>(adapter, {
  bankroll: 150,
});

await db.read();
db.data ||= { bankroll: 0 };
await db.write();

export default db;
