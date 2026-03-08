<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_student'])) {
    $stmt = $db->prepare("INSERT INTO students (name, email, grade_level) VALUES (?, ?, ?)");
    $stmt->execute([$_POST['name'], $_POST['email'], $_POST['grade_level']]);
    header("Location: students.php");
    exit;
}

$students = $db->query("SELECT * FROM students ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
require_once 'header.php';
?>

<div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
    <div class="p-6 border-b border-slate-100">
        <h3 class="font-bold text-slate-800">إضافة طالب جديد</h3>
    </div>
    <form method="POST" class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" name="name" placeholder="اسم الطالب" required class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500/20 outline-none">
        <input type="email" name="email" placeholder="البريد الإلكتروني" required class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500/20 outline-none">
        <select name="grade_level" required class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500/20 outline-none">
            <option value="الصف التاسع">الصف التاسع</option>
            <option value="الصف العاشر">الصف العاشر</option>
            <option value="الصف الحادي عشر">الصف الحادي عشر</option>
            <option value="الصف الثاني عشر">الصف الثاني عشر</option>
        </select>
        <button type="submit" name="add_student" class="md:col-span-3 bg-emerald-500 text-white py-2 rounded-xl font-bold hover:bg-emerald-600 transition-all">إضافة الطالب</button>
    </form>
</div>

<div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div class="p-6 border-b border-slate-100">
        <h3 class="font-bold text-slate-800">قائمة الطلاب</h3>
    </div>
    <div class="overflow-x-auto">
        <table class="w-full text-right">
            <thead class="bg-slate-50 text-slate-500 text-sm">
                <tr>
                    <th class="px-6 py-4 font-medium">المعرف</th>
                    <th class="px-6 py-4 font-medium">الاسم</th>
                    <th class="px-6 py-4 font-medium">المستوى</th>
                    <th class="px-6 py-4 font-medium">البريد الإلكتروني</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <?php foreach ($students as $student): ?>
                <tr class="hover:bg-slate-50 transition-all">
                    <td class="px-6 py-4 text-slate-400">#<?php echo $student['id']; ?></td>
                    <td class="px-6 py-4 font-medium text-slate-800"><?php echo htmlspecialchars($student['name']); ?></td>
                    <td class="px-6 py-4 text-slate-600"><?php echo htmlspecialchars($student['grade_level']); ?></td>
                    <td class="px-6 py-4 text-slate-500"><?php echo htmlspecialchars($student['email']); ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<?php require_once 'footer.php'; ?>
