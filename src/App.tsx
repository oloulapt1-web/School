/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  LayoutDashboard, 
  Plus, 
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'dashboard' | 'students' | 'subjects' | 'grades';

interface Student {
  id: number;
  name: string;
  email: string;
  grade_level: string;
}

interface Subject {
  id: number;
  name: string;
  description: string;
  teacher_name: string;
}

interface Grade {
  id: number;
  student_name: string;
  subject_name: string;
  grade: number;
  term: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState({ studentsCount: 0, teachersCount: 0, subjectsCount: 0 });
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, studentsRes, subjectsRes, gradesRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/students'),
        fetch('/api/subjects'),
        fetch('/api/grades')
      ]);

      const statsData = await statsRes.json();
      const studentsData = await studentsRes.json();
      const subjectsData = await subjectsRes.json();
      const gradesData = await gradesRes.json();

      setStats(statsData);
      setStudents(studentsData);
      setSubjects(subjectsData);
      setGrades(gradesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: Tab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        activeTab === id 
          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
          : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-slate-200 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <GraduationCap size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-800">إديو-مانج</h1>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="لوحة التحكم" />
          <SidebarItem id="students" icon={Users} label="الطلاب" />
          <SidebarItem id="subjects" icon={BookOpen} label="المناهج" />
          <SidebarItem id="grades" icon={BarChart3} label="الدرجات" />
        </nav>

        <div className="pt-6 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {activeTab === 'dashboard' && 'مرحباً بك في لوحة التحكم'}
              {activeTab === 'students' && 'إدارة الطلاب'}
              {activeTab === 'subjects' && 'المناهج الدراسية'}
              {activeTab === 'grades' && 'نتائج الطلاب'}
            </h2>
            <p className="text-slate-500 mt-1">نظام إدارة المدرسة المتكامل</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="بحث..." 
                className="bg-white border border-slate-200 rounded-xl pr-10 pl-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-slate-200 rounded-xl overflow-hidden border border-slate-300">
              <img src="https://picsum.photos/seed/admin/100/100" alt="Admin" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Stats Cards */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Users size={24} />
                  </div>
                  <span className="text-xs font-medium text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
                </div>
                <h3 className="text-slate-500 text-sm font-medium">إجمالي الطلاب</h3>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.studentsCount}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <BookOpen size={24} />
                  </div>
                  <span className="text-xs font-medium text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">+5%</span>
                </div>
                <h3 className="text-slate-500 text-sm font-medium">المناهج الدراسية</h3>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.subjectsCount}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                    <GraduationCap size={24} />
                  </div>
                  <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">0%</span>
                </div>
                <h3 className="text-slate-500 text-sm font-medium">المعلمون</h3>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.teachersCount}</p>
              </div>

              {/* Recent Activity / Table Preview */}
              <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">الطلاب المضافون حديثاً</h3>
                  <button onClick={() => setActiveTab('students')} className="text-emerald-600 text-sm font-medium hover:underline">عرض الكل</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-slate-50 text-slate-500 text-sm">
                      <tr>
                        <th className="px-6 py-4 font-medium">الاسم</th>
                        <th className="px-6 py-4 font-medium">المستوى</th>
                        <th className="px-6 py-4 font-medium">البريد الإلكتروني</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.slice(0, 5).map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50 transition-all">
                          <td className="px-6 py-4 font-medium text-slate-800">{student.name}</td>
                          <td className="px-6 py-4 text-slate-600">{student.grade_level}</td>
                          <td className="px-6 py-4 text-slate-500">{student.email}</td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-6 py-8 text-center text-slate-400">لا يوجد طلاب حالياً</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">إجراءات سريعة</h3>
                <div className="flex flex-col gap-3">
                  <button className="flex items-center justify-between p-4 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-all group">
                    <div className="flex items-center gap-3">
                      <Plus size={20} />
                      <span className="font-medium">إضافة طالب جديد</span>
                    </div>
                    <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                  <button className="flex items-center justify-between p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all group">
                    <div className="flex items-center gap-3">
                      <Plus size={20} />
                      <span className="font-medium">إضافة منهج</span>
                    </div>
                    <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                  <button className="flex items-center justify-between p-4 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-all group">
                    <div className="flex items-center gap-3">
                      <BarChart3 size={20} />
                      <span className="font-medium">رصد الدرجات</span>
                    </div>
                    <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'students' && (
            <motion.div 
              key="students"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">قائمة الطلاب</h3>
                <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100">
                  <Plus size={18} />
                  <span>إضافة طالب</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-slate-50 text-slate-500 text-sm">
                    <tr>
                      <th className="px-6 py-4 font-medium">المعرف</th>
                      <th className="px-6 py-4 font-medium">الاسم</th>
                      <th className="px-6 py-4 font-medium">المستوى الدراسي</th>
                      <th className="px-6 py-4 font-medium">البريد الإلكتروني</th>
                      <th className="px-6 py-4 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50 transition-all">
                        <td className="px-6 py-4 text-slate-400">#{student.id}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{student.name}</td>
                        <td className="px-6 py-4">
                          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                            {student.grade_level}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{student.email}</td>
                        <td className="px-6 py-4">
                          <button className="text-slate-400 hover:text-emerald-500 transition-all">تعديل</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'subjects' && (
            <motion.div 
              key="subjects"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {subjects.map((subject) => (
                <div key={subject.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{subject.name}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{subject.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                        {subject.teacher_name?.charAt(0)}
                      </div>
                      <span className="text-xs text-slate-600 font-medium">{subject.teacher_name || 'غير محدد'}</span>
                    </div>
                    <button className="text-emerald-600 text-xs font-bold hover:underline">التفاصيل</button>
                  </div>
                </div>
              ))}
              <button className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-500 transition-all gap-2">
                <Plus size={32} />
                <span className="font-medium">إضافة منهج جديد</span>
              </button>
            </motion.div>
          )}

          {activeTab === 'grades' && (
            <motion.div 
              key="grades"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">سجل الدرجات</h3>
                <div className="flex gap-2">
                  <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                    <option>الفصل الدراسي الأول</option>
                    <option>الفصل الدراسي الثاني</option>
                  </select>
                  <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition-all">
                    <Plus size={18} />
                    <span>رصد درجة</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-slate-50 text-slate-500 text-sm">
                    <tr>
                      <th className="px-6 py-4 font-medium">اسم الطالب</th>
                      <th className="px-6 py-4 font-medium">المادة</th>
                      <th className="px-6 py-4 font-medium">الدرجة</th>
                      <th className="px-6 py-4 font-medium">التقدير</th>
                      <th className="px-6 py-4 font-medium">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {grades.map((grade) => (
                      <tr key={grade.id} className="hover:bg-slate-50 transition-all">
                        <td className="px-6 py-4 font-medium text-slate-800">{grade.student_name}</td>
                        <td className="px-6 py-4 text-slate-600">{grade.subject_name}</td>
                        <td className="px-6 py-4 font-bold text-slate-800">{grade.grade}%</td>
                        <td className="px-6 py-4">
                          {grade.grade >= 90 ? 'ممتاز' : grade.grade >= 80 ? 'جيد جداً' : grade.grade >= 70 ? 'جيد' : 'مقبول'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            grade.grade >= 50 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {grade.grade >= 50 ? 'ناجح' : 'راسب'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {grades.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-slate-400">لا توجد درجات مرصودة حالياً</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
