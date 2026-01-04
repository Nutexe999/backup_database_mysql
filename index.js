// https://discord.gg/JRaWs4QdW4 | https://github.com/Nutexe999
// DEVELOPED BY Nut.exe

import cron from 'node-cron';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { DatabaseBackup } from './modules/backup.js';
import { DiscordUploader } from './modules/discord.js';
import { Logger } from './modules/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BackupManager {
  constructor() {
    this.config = null;
    this.logger = null;
    this.backupService = null;
    this.discordUploader = null;
  }

  async loadConfig() {
    try {
      let configPath = path.join(process.cwd(), 'config.json');
      let configData = await fs.readFile(configPath, 'utf8');
      this.config = JSON.parse(configData);
      this.logger = new Logger(this.config);
      
      if (this.config.storage.discord.enabled) {
        this.discordUploader = new DiscordUploader(this.config.storage.discord);
      }
      
      this.backupService = new DatabaseBackup(this.config);
    } catch (err) {
      console.error('Failed to load config:', err.message);
      process.exit(1);
    }
  }

  async performBackup() {
    try {
      await this.logger.info('Starting database backup...');
      
      let backupResult = await this.backupService.createBackup();
      await this.logger.success(`Backup created: ${backupResult.filename} (${this.formatFileSize(backupResult.size)})`);
      
      let results = { local: null, discord: null };

      if (this.config.storage.local.enabled) {
        results.local = {
          success: true,
          filepath: backupResult.filepath,
          message: 'Backup saved locally'
        };
        await this.logger.info(`Backup saved locally: ${backupResult.filepath}`);
      }

      if (this.config.storage.discord.enabled && this.discordUploader) {
        try {
          results.discord = await this.discordUploader.upload(backupResult.filepath, backupResult.filename);
          await this.logger.success(`Backup uploaded to Discord: ${backupResult.filename}`);
        } catch (err) {
          results.discord = { success: false, error: err.message };
          await this.logger.error(`Discord upload failed: ${err.message}`);
        }
      }

      if (this.config.storage.local.enabled) {
        await this.backupService.cleanupOldBackups();
      }

      await this.logger.success('Backup process completed');
      return results;
    } catch (err) {
      await this.logger.error(`Backup process failed: ${err.message}`);
      throw err;
    }
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    let k = 1024;
    let sizes = ['Bytes', 'KB', 'MB', 'GB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  async start() {
    await this.loadConfig();
    await this.logger.info('Backup manager started');

    let schedule = this.config.backup.schedule;
    
    if (schedule && cron.validate(schedule)) {
      await this.logger.info(`Scheduled backup: ${schedule}`);
      await this.performBackup();
      
      cron.schedule(schedule, async () => {
        await this.performBackup();
      });
    } else {
      await this.performBackup();
      process.exit(0);
    }
  }
}

let manager = new BackupManager();
manager.start().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

