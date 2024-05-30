import fs from 'fs/promises';
import path from 'path';

const envContent = 'DATABASE_URL="file:./dev.db"\n';

const envFilePath = path.join(process.cwd(), '.env');

(async () => {
  try {
    await fs.writeFile(envFilePath, envContent);
    console.log('.env file created successfully.');
  } catch (err) {
    console.error('Error creating .env file:', err);
  }
})();