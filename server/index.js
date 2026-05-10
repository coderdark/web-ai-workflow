import { initDb } from './db/init.js';
import { createApp } from './app.js';

const PORT = process.env.PORT || 3001;

const db = initDb();
const app = createApp(db);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
