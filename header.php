<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إديو-مانج | منصة إدارة المدرسة</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Noto Sans Arabic', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-l border-slate-200 p-6 flex flex-col gap-8 hidden md:flex">
        <div class="flex items-center gap-3 px-2">
            <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <h1 class="text-xl font-bold text-slate-800">إديو-مانج</h1>
        </div>

        <nav class="flex flex-col gap-2 flex-1">
            <a href="index.php" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-100 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                <span class="font-medium">لوحة التحكم</span>
            </a>
            <a href="students.php" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-100 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="19" cy="11" r="3"/></svg>
                <span class="font-medium">الطلاب</span>
            </a>
            <a href="subjects.php" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-100 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
                <span class="font-medium">المناهج</span>
            </a>
            <a href="grades.php" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-100 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
                <span class="font-medium">الدرجات</span>
            </a>
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-y-auto">
        <header class="flex justify-between items-center mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800">نظام إدارة المدرسة</h2>
                <p class="text-slate-500 mt-1">مرحباً بك في المنصة التعليمية</p>
            </div>
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-slate-200 rounded-xl overflow-hidden border border-slate-300">
                    <img src="https://picsum.photos/seed/admin/100/100" alt="Admin" referrerPolicy="no-referrer">
                </div>
            </div>
        </header>
