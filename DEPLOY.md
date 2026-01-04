# 📤 Deployment Guide - GitHub

คำแนะนำในการ push โค้ดขึ้น GitHub Repository

## Repository URL
https://github.com/Nutexe999/backup_database_mysql.git

## ขั้นตอนการ Deploy

### 1. ตรวจสอบว่ามี Git หรือยัง
```bash
git --version
```

ถ้ายังไม่มี ติดตั้ง Git จาก [https://git-scm.com/](https://git-scm.com/)

### 2. Initialize Git (ถ้ายังไม่ได้ทำ)
```bash
git init
```

### 3. เพิ่ม Remote Repository
```bash
git remote add origin https://github.com/Nutexe999/backup_database_mysql.git
```

หรือถ้ามี remote อยู่แล้ว:
```bash
git remote set-url origin https://github.com/Nutexe999/backup_database_mysql.git
```

### 4. ตรวจสอบไฟล์ที่จะ commit
```bash
git status
```

ควรจะเห็นว่า:
- ✅ config.example.json (จะถูก commit)
- ❌ config.json (จะไม่ถูก commit เพราะอยู่ใน .gitignore)
- ❌ backups/ (จะไม่ถูก commit)
- ❌ logs/ (จะไม่ถูก commit)
- ❌ node_modules/ (จะไม่ถูก commit)

### 5. Add ไฟล์ทั้งหมด
```bash
git add .
```

### 6. Commit
```bash
git commit -m "Initial commit: SQL Database Backup Manager"
```

หรือ commit message อื่นๆ:
```bash
git commit -m "feat: Add MySQL/PostgreSQL/MSSQL backup system with Discord upload"
```

### 7. Push ขึ้น GitHub
```bash
git branch -M main
git push -u origin main
```

ถ้า repository ยังว่างอยู่และต้องการ force push:
```bash
git push -u origin main --force
```

## ⚠️ สิ่งที่ต้องตรวจสอบก่อน Push

1. ✅ **config.json ไม่ถูก commit** - ตรวจสอบว่าใน .gitignore มี `config.json` อยู่
2. ✅ **credentials ไม่ถูก expose** - ตรวจสอบว่าไม่มี password หรือ token ใน code
3. ✅ **backup files ไม่ถูก commit** - ตรวจสอบว่า `backups/` และ `*.sql` อยู่ใน .gitignore
4. ✅ **node_modules ไม่ถูก commit** - ตรวจสอบว่า `node_modules/` อยู่ใน .gitignore

## 📝 Commit Messages ที่แนะนำ

- `feat: Add new feature`
- `fix: Fix bug`
- `docs: Update documentation`
- `refactor: Code refactoring`
- `chore: Update dependencies`

## 🔄 การ Update โค้ดในภายหลัง

เมื่อมีการแก้ไขโค้ด:

```bash
# 1. ดูสถานะไฟล์ที่เปลี่ยนแปลง
git status

# 2. Add ไฟล์ที่ต้องการ commit
git add .

# 3. Commit
git commit -m "your commit message"

# 4. Push
git push
```

## 🛠️ Troubleshooting

### ถ้า push ไม่ได้ (Permission Denied)
1. ตรวจสอบว่าได้ login GitHub ถูกต้อง
2. ใช้ Personal Access Token แทน password
3. หรือใช้ SSH key

### ถ้า Remote Repository มีโค้ดอยู่แล้ว
```bash
git pull origin main --allow-unrelated-histories
# แก้ไข conflicts (ถ้ามี)
git push origin main
```

### ถ้าต้องการเปลี่ยน Remote URL
```bash
git remote remove origin
git remote add origin https://github.com/Nutexe999/backup_database_mysql.git
```

## 📚 เพิ่มเติม

- GitHub Docs: [https://docs.github.com](https://docs.github.com)
- Git Documentation: [https://git-scm.com/doc](https://git-scm.com/doc)

