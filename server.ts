import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("school.db");

// Initialize Database Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    grade_level TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    subject TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
  );

  CREATE TABLE IF NOT EXISTS grades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    subject_id INTEGER,
    grade REAL,
    term TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
  );

  // Seed initial data if empty
  const studentCount = db.prepare("SELECT COUNT(*) as count FROM students").get().count;
  if (studentCount === 0) {
    const insertStudent = db.prepare("INSERT INTO students (name, email, grade_level) VALUES (?, ?, ?)");
    insertStudent.run("أحمد محمد", "ahmed@example.com", "الصف العاشر");
    insertStudent.run("سارة علي", "sara@example.com", "الصف الحادي عشر");
    insertStudent.run("ياسين خالد", "yassin@example.com", "الصف التاسع");

    const insertTeacher = db.prepare("INSERT INTO teachers (name, subject) VALUES (?, ?)");
    insertTeacher.run("أستاذ إبراهيم", "الرياضيات");
    insertTeacher.run("أستاذة ليلى", "العلوم");

    const insertSubject = db.prepare("INSERT INTO subjects (name, description, teacher_id) VALUES (?, ?, ?)");
    insertSubject.run("الرياضيات المتقدمة", "دراسة الجبر والهندسة التحليلية", 1);
    insertSubject.run("الفيزياء العامة", "مبادئ الميكانيكا والكهرباء", 2);
    insertSubject.run("اللغة العربية", "النحو والأدب والبلاغة", 1);

    const insertGrade = db.prepare("INSERT INTO grades (student_id, subject_id, grade, term) VALUES (?, ?, ?, ?)");
    insertGrade.run(1, 1, 95, "الفصل الأول");
    insertGrade.run(1, 2, 88, "الفصل الأول");
    insertGrade.run(2, 1, 92, "الفصل الأول");
  }
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/stats", (req, res) => {
    const studentsCount = db.prepare("SELECT COUNT(*) as count FROM students").get().count;
    const teachersCount = db.prepare("SELECT COUNT(*) as count FROM teachers").get().count;
    const subjectsCount = db.prepare("SELECT COUNT(*) as count FROM subjects").get().count;
    res.json({ studentsCount, teachersCount, subjectsCount });
  });

  app.get("/api/students", (req, res) => {
    const students = db.prepare("SELECT * FROM students").all();
    res.json(students);
  });

  app.post("/api/students", (req, res) => {
    const { name, email, grade_level } = req.body;
    const info = db.prepare("INSERT INTO students (name, email, grade_level) VALUES (?, ?, ?)").run(name, email, grade_level);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/subjects", (req, res) => {
    const subjects = db.prepare(`
      SELECT subjects.*, teachers.name as teacher_name 
      FROM subjects 
      LEFT JOIN teachers ON subjects.teacher_id = teachers.id
    `).all();
    res.json(subjects);
  });

  app.get("/api/grades", (req, res) => {
    const grades = db.prepare(`
      SELECT grades.*, students.name as student_name, subjects.name as subject_name
      FROM grades
      JOIN students ON grades.student_id = students.id
      JOIN subjects ON grades.subject_id = subjects.id
    `).all();
    res.json(grades);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
