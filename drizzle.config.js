
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neonDB_owner:mp7HLROc1FQk@ep-twilight-cloud-a8xph1b5.eastus2.azure.neon.tech/neonDB?sslmode=require',
  },
});
