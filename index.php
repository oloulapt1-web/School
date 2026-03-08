<?php
require_once 'db.php';
require_once 'header.php';

$stats = getStats($db);
$recent_students = $db->query("SELECT * FROM students ORDER BY created_at DESC LIMIT 5")->fetchAll(PDO::FETCH_ASSOC);
?>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex justify-between items-start mb-4">
            <div class="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="19" cy="11" r="3"/></svg>
            </div>
        </div>
        <h3 class="text-slate-500 text-sm font-medium">إجمالي الطلاب</h3>
        <p class="text-3xl font-bold text-slate-800 mt-1"><?php echo $stats['students']; ?></p>
    </div>

    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex justify-between items-start mb-4">
            <div class="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
            </div>
        </div>
        <h3 class="text-slate-500 text-sm font-medium">المناهج الدراسية</h3>
        <p class="text-3xl font-bold text-slate-800 mt-1"><?php echo $stats['subjects']; ?></p>
    </div>

    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex justify-between items-start mb-4">
            <div class="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
        </div>
        <h3 class="text-slate-500 text-sm font-medium">المعلمون</h3>
        <p class="text-3xl font-bold text-slate-800 mt-1"><?php echo $stats['teachers']; ?></p>
    </div>
</div>

<div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div class="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 class="font-bold text-slate-800">الطلاب المضافون حديثاً</h3>
        <a href="students.php" class="text-emerald-600 text-sm font-medium hover:underline">عرض الكل</a>
    </div>
    <div class="overflow-x-auto">
        <table class="w-full text-right">
            <thead class="bg-slate-50 text-slate-500 text-sm">
                <tr>
                    <th class="px-6 py-4 font-medium">الاسم</th>
                    <th className="px-6 py-4 font-medium">المستوى</th>
                    <th className="px-6 py-4 font-medium">البريد الإلكتروني</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <?php foreach ($recent_students as $student): ?>
                <tr class="hover:bg-slate-50 transition-all">
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
