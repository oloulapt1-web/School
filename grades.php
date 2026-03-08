<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_grade'])) {
    $stmt = $db->prepare("INSERT INTO grades (student_id, subject_id, grade, term) VALUES (?, ?, ?, ?)");
    $stmt->execute([$_POST['student_id'], $_POST['subject_id'], $_POST['grade'], $_POST['term']]);
    header("Location: grades.php");
    exit;
}

$grades = $db->query("SELECT grades.*, students.name as student_name, subjects.name as subject_name FROM grades JOIN students ON grades.student_id = students.id JOIN subjects ON grades.subject_id = subjects.id")->fetchAll(PDO::FETCH_ASSOC);
$students = $db->query("SELECT id, name FROM students")->fetchAll(PDO::FETCH_ASSOC);
$subjects = $db->query("SELECT id, name FROM subjects")->fetchAll(PDO::FETCH_ASSOC);

require_once 'header.php';
?>

<div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
    <div class="p-6 border-b border-slate-100">
        <h3 class="font-bold text-slate-800">رصد درجة جديدة</h3>
    </div>
    <form method="POST" class="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select name="student_id" required class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none">
            <option value="">اختر الطالب</option>
            <?php foreach ($students as $s): ?>
                <option value="<?php echo $s['id']; ?>"><?php echo htmlspecialchars($s['name']); ?></option>
            <?php endforeach; ?>
        </select>
        <select name="subject_id" required class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none">
            <option value="">اختر المادة</option>
            <?php foreach ($subjects as $sub): ?>
                <option value="<?php echo $sub['id']; ?>"><?php echo htmlspecialchars($sub['name']); ?></option>
            <?php endforeach; ?>
        </select>
        <input type="number" name="grade" placeholder="الدرجة" required min="0" max="100" class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none">
        <select name="term" required class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none">
            <option value="الفصل الأول">الفصل الأول</option>
            <option value="الفصل الثاني">الفصل الثاني</option>
        </select>
        <button type="submit" name="add_grade" class="md:col-span-4 bg-emerald-500 text-white py-2 rounded-xl font-bold hover:bg-emerald-600 transition-all">رصد الدرجة</button>
    </form>
</div>

<div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div class="p-6 border-b border-slate-100">
        <h3 class="font-bold text-slate-800">سجل الدرجات</h3>
    </div>
    <div class="overflow-x-auto">
        <table class="w-full text-right">
            <thead class="bg-slate-50 text-slate-500 text-sm">
                <tr>
                    <th class="px-6 py-4 font-medium">اسم الطالب</th>
                    <th class="px-6 py-4 font-medium">المادة</th>
                    <th class="px-6 py-4 font-medium">الدرجة</th>
                    <th class="px-6 py-4 font-medium">التقدير</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <?php foreach ($grades as $grade): ?>
                <tr class="hover:bg-slate-50 transition-all">
                    <td class="px-6 py-4 font-medium text-slate-800"><?php echo htmlspecialchars($grade['student_name']); ?></td>
                    <td class="px-6 py-4 text-slate-600"><?php echo htmlspecialchars($grade['subject_name']); ?></td>
                    <td class="px-6 py-4 font-bold text-slate-800"><?php echo $grade['grade']; ?>%</td>
                    <td class="px-6 py-4">
                        <?php 
                        $g = $grade['grade'];
                        if ($g >= 90) echo 'ممتاز';
                        elseif ($g >= 80) echo 'جيد جداً';
                        elseif ($g >= 70) echo 'جيد';
                        else echo 'مقبول';
                        ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<?php require_once 'footer.php'; ?>
