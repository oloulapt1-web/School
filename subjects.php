<?php
require_once 'db.php';
$subjects = $db->query("SELECT subjects.*, teachers.name as teacher_name FROM subjects LEFT JOIN teachers ON subjects.teacher_id = teachers.id")->fetchAll(PDO::FETCH_ASSOC);
require_once 'header.php';
?>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <?php foreach ($subjects as $subject): ?>
    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
        <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
        </div>
        <h3 class="text-lg font-bold text-slate-800 mb-2"><?php echo htmlspecialchars($subject['name']); ?></h3>
        <p class="text-slate-500 text-sm mb-4"><?php echo htmlspecialchars($subject['description']); ?></p>
        <div class="pt-4 border-t border-slate-100 flex items-center gap-2">
            <span class="text-xs text-slate-400">المعلم:</span>
            <span class="text-xs font-bold text-slate-600"><?php echo htmlspecialchars($subject['teacher_name'] ?? 'غير محدد'); ?></span>
        </div>
    </div>
    <?php endforeach; ?>
</div>

<?php require_once 'footer.php'; ?>
