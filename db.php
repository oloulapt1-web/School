<?php
// Database connection using SQLite for portability in this environment
try {
    $db = new PDO('sqlite:school_management.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create tables if they don't exist
    $db->exec("CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        grade_level TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    $db->exec("CREATE TABLE IF NOT EXISTS teachers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        subject TEXT NOT NULL
    )");

    $db->exec("CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        teacher_id INTEGER,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id)
    )");

    $db->exec("CREATE TABLE IF NOT EXISTS grades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        subject_id INTEGER,
        grade REAL,
        term TEXT,
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )");

    // Seed data if empty
    $stmt = $db->query("SELECT COUNT(*) FROM students");
    if ($stmt->fetchColumn() == 0) {
        $db->exec("INSERT INTO students (name, email, grade_level) VALUES ('أحمد محمد', 'ahmed@example.com', 'الصف العاشر')");
        $db->exec("INSERT INTO students (name, email, grade_level) VALUES ('سارة علي', 'sara@example.com', 'الصف الحادي عشر')");
        
        $db->exec("INSERT INTO teachers (name, subject) VALUES ('أستاذ إبراهيم', 'الرياضيات')");
        $db->exec("INSERT INTO teachers (name, subject) VALUES ('أستاذة ليلى', 'العلوم')");
        
        $db->exec("INSERT INTO subjects (name, description, teacher_id) VALUES ('الرياضيات المتقدمة', 'دراسة الجبر والهندسة', 1)");
        $db->exec("INSERT INTO subjects (name, description, teacher_id) VALUES ('الفيزياء', 'مبادئ الميكانيكا', 2)");
        
        $db->exec("INSERT INTO grades (student_id, subject_id, grade, term) VALUES (1, 1, 95, 'الفصل الأول')");
        $db->exec("INSERT INTO grades (student_id, subject_id, grade, term) VALUES (2, 1, 88, 'الفصل الأول')");
    }

} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

function getStats($db) {
    $stats = [];
    $stats['students'] = $db->query("SELECT COUNT(*) FROM students")->fetchColumn();
    $stats['subjects'] = $db->query("SELECT COUNT(*) FROM subjects")->fetchColumn();
    $stats['teachers'] = $db->query("SELECT COUNT(*) FROM teachers")->fetchColumn();
    return $stats;
}
?>
