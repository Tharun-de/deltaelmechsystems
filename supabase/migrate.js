import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error(chalk.red('Error: Missing Supabase environment variables'));
  console.error(chalk.yellow('Please ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file'));
  process.exit(1);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runMigration(filePath) {
  const fileName = path.basename(filePath);
  console.log(chalk.blue(`\nRunning migration: ${fileName}`));
  
  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error(chalk.red(`\n❌ Error running migration ${fileName}:`));
      console.error(chalk.red(error.message));
      throw error;
    }
    
    console.log(chalk.green(`\n✓ Successfully ran migration: ${fileName}`));
  } catch (error) {
    console.error(chalk.red(`\n❌ Failed to run migration ${fileName}:`));
    console.error(chalk.red(error.message));
    throw error;
  }
}

async function runMigrations() {
  const migrationsDir = path.join(__dirname, 'migrations');
  
  if (!fs.existsSync(migrationsDir)) {
    console.error(chalk.red('\n❌ Migrations directory not found'));
    console.error(chalk.yellow(`Expected at: ${migrationsDir}`));
    process.exit(1);
  }

  try {
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    if (files.length === 0) {
      console.warn(chalk.yellow('\n⚠ No migration files found'));
      return;
    }

    console.log(chalk.blue('\nFound migrations:'), files);
    
    for (const file of files) {
      await runMigration(path.join(migrationsDir, file));
    }
    
    console.log(chalk.green('\n✓ All migrations completed successfully'));
  } catch (error) {
    console.error(chalk.red('\n❌ Migration process failed'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

// Run migrations
console.log(chalk.blue('\n🚀 Starting database migrations...'));
runMigrations(); 