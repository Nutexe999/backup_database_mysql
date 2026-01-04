# SQL Database Backup Manager

ระบบสำรองข้อมูลฐานข้อมูล SQL อัตโนมัติพร้อมตัวเลือกการจัดเก็บหลายรูปแบบ

## ✨ Features

- ✅ รองรับหลายฐานข้อมูล (MySQL, PostgreSQL, MSSQL)
- ✅ สำรองข้อมูลอัตโนมัติตามตารางเวลา (Cron Schedule)
- ✅ บันทึกไฟล์สำรองข้อมูลในเครื่อง (Local Storage)
- ✅ อัปโหลดไปยัง Discord Webhook
- ✅ จัดการไฟล์สำรองข้อมูลเก่า (Retention Management)
- ✅ ระบบ Logging
- ✅ รองรับ Authentication Plugins หลายแบบ

## 📋 Requirements

- Node.js 16+ 
- MySQL/MariaDB, PostgreSQL, หรือ SQL Server
- npm หรือ yarn

## 🚀 Installation

1. Clone repository
```bash
git clone https://github.com/Nutexe999/backup_database_mysql.git
cd backup_database_mysql
```

2. ติดตั้ง dependencies
```bash
npm install
```

3. คัดลอกไฟล์ config
```bash
copy config.example.json config.json
```

4. แก้ไขการตั้งค่าใน `config.json`

## ⚙️ Configuration

แก้ไขไฟล์ `config.json`:

```json
{
  "database": {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "your_password",
    "database": "your_database",
    "options": {}
  },
  "backup": {
    "outputDir": "./backups",
    "retentionDays": 7,
    "schedule": "*/30 * * * *",
    "format": "sql"
  },
  "storage": {
    "local": {
      "enabled": true
    },
    "discord": {
      "enabled": true,
      "webhookUrl": "YOUR_DISCORD_WEBHOOK_URL",
      "maxFileSize": 25000000
    }
  },
  "logging": {
    "enabled": true,
    "level": "info",
    "file": "./logs/backup.log"
  }
}
```

### Database Types
- `mysql` - MySQL/MariaDB
- `postgresql` หรือ `postgres` - PostgreSQL
- `mssql` หรือ `sqlserver` - Microsoft SQL Server

### Schedule Format
ใช้รูปแบบ Cron Schedule:
- `*/30 * * * *` - ทุก 30 นาที
- `0 2 * * *` - ทุกวันเวลา 02:00
- `0 */6 * * *` - ทุก 6 ชั่วโมง
- `0 0 * * 0` - ทุกวันอาทิตย์เวลา 00:00

## 📖 Usage

### เริ่มต้นใช้งาน
```bash
npm start
```

หรือใช้ไฟล์ batch (Windows):
```bash
Run.bat
```

### ทำงานครั้งเดียว (ไม่ตั้งเวลา)
ลบหรือ comment ส่วน `schedule` ใน config.json แล้วรัน:
```bash
npm start
```

## 🔧 MySQL Authentication Issues

หากพบปัญหา authentication plugin (เช่น `auth_gssapi_client`):

### วิธีที่ 1: เปลี่ยน MySQL User Authentication
```sql
ALTER USER 'your_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

### วิธีที่ 2: ใช้ Remote Host
```sql
ALTER USER 'your_user'@'%' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

## 📁 Project Structure

```
backup_database_mysql/
├── index.js              # Main entry point
├── config.json           # Configuration file (use config.example.json as template)
├── config.example.json   # Configuration template
├── package.json          # Dependencies
├── modules/
│   ├── backup.js         # Database backup logic
│   ├── discord.js        # Discord webhook uploader
│   └── logger.js         # Logging system
├── backups/              # Backup files storage
└── logs/                 # Log files
```

## 🛠️ Development

### Dependencies
- `mysql2` - MySQL/MariaDB client
- `pg` - PostgreSQL client
- `mssql` - SQL Server client
- `node-cron` - Task scheduling
- `axios` - HTTP client for Discord
- `fs-extra` - Enhanced file system operations
- `form-data` - Form data handling

## 📝 License

MIT License

## 👨‍💻 Author

**Nut.exe**

- Discord: [https://discord.gg/JRaWs4QdW4](https://discord.gg/JRaWs4QdW4)
- GitHub: [https://github.com/Nutexe999](https://github.com/Nutexe999)

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## ⚠️ Disclaimer

โปรดตรวจสอบการตั้งค่าก่อนใช้งานจริง และเก็บรักษา credentials อย่างปลอดภัย อย่า commit `config.json` ที่มีข้อมูลจริงขึ้น GitHub

