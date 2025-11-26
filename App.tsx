import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar as CalendarIcon, PieChart, Settings as SettingsIcon, LogOut, 
  Plus, Search, DollarSign, Trash2, Camera, 
  Printer, ChevronRight, ChevronLeft, Instagram,
  MessageCircle, Moon, Sun, UserPlus, Save, Clock, Cloud, RefreshCw, Check, Menu, X
} from 'lucide-react';
import { 
  ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip as RechartsTooltip
} from 'recharts';
import { db } from './services/db';
import { AppData, Patient, Doctor, Appointment, Payment, PatientImage, Settings } from './types';
import { TeethChart } from './components/TeethChart';
import { ImageCanvas } from './components/ImageCanvas';

// --- TRANSLATIONS ---
const t = {
  ar: {
    appName: 'طبيبي - إدارة العيادات',
    login: 'تسجيل الدخول باستخدام جوجل',
    welcome: 'أهلاً بك',
    clinicName: 'اسم العيادة',
    enterClinicName: 'أدخل اسم العيادة',
    selectDoctor: 'اختر الطبيب',
    addDoctor: 'إضافة طبيب جديد',
    patients: 'المرضى',
    calendar: 'التقويم',
    dashboard: 'الإحصائيات',
    settings: 'الإعدادات',
    logout: 'تسجيل خروج',
    newPatient: 'مريض جديد',
    search: 'بحث عن مريض...',
    active: 'مستمر',
    finished: 'منتهي',
    save: 'حفظ',
    continue: 'متابعة',
    cancel: 'إلغاء',
    delete: 'حذف',
    deleteConfirm: 'هل أنت متأكد من حذف هذا المريض؟ لا يمكن التراجع عن هذا الإجراء.',
    edit: 'تعديل',
    print: 'طباعة',
    teeth: 'الأسنان',
    finance: 'المالية',
    images: 'الصور والأشعة',
    notes: 'ملاحظات',
    totalCost: 'المبلغ الكلي للعلاج',
    paid: 'المدفوع',
    remaining: 'المبلغ المتبقي',
    addPayment: 'إضافة دفعة جديدة',
    prescription: 'وصفة طبية',
    printInvoice: 'طباعة وصل',
    printPrescription: 'طباعة الوصفة',
    whatsapp: 'واتساب',
    name: 'اسم المريض',
    age: 'العمر',
    phone: 'رقم الهاتف',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    address: 'العنوان',
    medicalHistory: 'التاريخ الطبي',
    toothStatus: 'حالة السن',
    healthy: 'سليم',
    decay: 'تسوس',
    filled: 'حشوة',
    missing: 'مفقود',
    crown: 'تلبيس',
    rct: 'عصب',
    syncing: 'جاري المزامنة...',
    syncDrive: 'مزامنة مع Google Drive',
    syncSuccess: 'تمت المزامنة بنجاح!',
    darkMode: 'الوضع الليلي',
    language: 'اللغة',
    devCredit: 'تم التطوير بواسطة',
    visitHistory: 'سجل الزيارات',
    addVisit: 'تسجيل زيارة اليوم',
    appointments: 'المواعيد',
    addAppointment: 'إضافة موعد جديد',
    time: 'الوقت',
    date: 'التاريخ',
    status: 'الحالة',
    scheduled: 'مجدول',
    completed: 'مكتمل',
    cancelled: 'ملغى',
    uploadImage: 'رفع صورة',
    doctorName: 'الطبيب المعالج',
    instagram: 'تواصل على انستقرام',
    info: 'معلومات المريض',
    next: 'التالي',
    prev: 'السابق',
    today: 'اليوم',
    weekDays: ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
  },
  en: {
    appName: 'MyDoctor - Clinic Manager',
    login: 'Sign in with Google',
    welcome: 'Welcome',
    clinicName: 'Clinic Name',
    enterClinicName: 'Enter Clinic Name',
    selectDoctor: 'Select Doctor',
    addDoctor: 'Add New Doctor',
    patients: 'Patients',
    calendar: 'Calendar',
    dashboard: 'Dashboard',
    settings: 'Settings',
    logout: 'Logout',
    newPatient: 'New Patient',
    search: 'Search patients...',
    active: 'Active',
    finished: 'Finished',
    save: 'Save',
    continue: 'Continue',
    cancel: 'Cancel',
    delete: 'Delete',
    deleteConfirm: 'Are you sure you want to delete this patient? This cannot be undone.',
    edit: 'Edit',
    print: 'Print',
    teeth: 'Teeth',
    finance: 'Finance',
    images: 'Images & X-Rays',
    notes: 'Notes',
    totalCost: 'Total Treatment Cost',
    paid: 'Paid',
    remaining: 'Balance Due',
    addPayment: 'Add New Payment',
    prescription: 'Prescription',
    printInvoice: 'Print Invoice',
    printPrescription: 'Print Rx',
    whatsapp: 'WhatsApp',
    name: 'Patient Name',
    age: 'Age',
    phone: 'Phone',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    address: 'Address',
    medicalHistory: 'Medical History',
    toothStatus: 'Tooth Status',
    healthy: 'Healthy',
    decay: 'Decay',
    filled: 'Filled',
    missing: 'Missing',
    crown: 'Crown',
    rct: 'Root Canal',
    syncing: 'Syncing...',
    syncDrive: 'Sync to Google Drive',
    syncSuccess: 'Synced Successfully!',
    darkMode: 'Dark Mode',
    language: 'Language',
    devCredit: 'Developed by',
    visitHistory: 'Visit History',
    addVisit: 'Log Visit Today',
    appointments: 'Appointments',
    addAppointment: 'Add New Appointment',
    time: 'Time',
    date: 'Date',
    status: 'Status',
    scheduled: 'Scheduled',
    completed: 'Completed',
    cancelled: 'Cancelled',
    uploadImage: 'Upload Image',
    doctorName: 'Attending Doctor',
    instagram: 'Contact on Instagram',
    info: 'Patient Info',
    next: 'Next',
    prev: 'Prev',
    today: 'Today',
    weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// --- ISOLATED COMPONENTS ---

const SetupScreen = ({ onSave, txt, initialName }: { onSave: (name: string) => void, txt: any, initialName: string }) => {
  const [name, setName] = useState(initialName);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md border dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-6 dark:text-white text-center">{txt.enterClinicName}</h2>
        <input 
          className="w-full p-4 text-lg border rounded-lg mb-6 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
          placeholder={txt.clinicName} 
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <button 
          onClick={() => name.trim() && onSave(name)}
          disabled={!name.trim()}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all ${name.trim() ? 'bg-blue-600 hover:bg-blue-700 shadow-lg' : 'bg-slate-400 cursor-not-allowed'}`}
        >
          {txt.continue}
        </button>
      </div>
    </div>
  );
};

const Sidebar = ({ clinicName, doctorName, currentView, onViewChange, onLogout, txt, isRtl, isOpen, onClose }: any) => (
  <>
    {/* Mobile Overlay */}
    {isOpen && (
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
    )}
    
    {/* Sidebar Content */}
    <div className={`fixed inset-y-0 ${isRtl ? 'right-0' : 'left-0'} w-64 bg-white dark:bg-slate-800 shadow-xl z-50 flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')} lg:translate-x-0 lg:transform-none no-print border-r dark:border-slate-700`}>
      <div className="p-6 border-b dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
        <div className="overflow-hidden">
          <h2 className="text-xl font-bold text-blue-600 truncate">{clinicName}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-1">{doctorName}</p>
        </div>
        <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-red-500">
          <X size={24} />
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {[
          { id: 'patients', icon: Users },
          { id: 'dashboard', icon: PieChart },
          { id: 'calendar', icon: CalendarIcon },
          { id: 'settings', icon: SettingsIcon }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => { onViewChange(item.id); onClose(); }} 
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${currentView === item.id ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-semibold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
          >
            <item.icon size={20} /> {txt[item.id]}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
        <button onClick={onLogout} className="w-full flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/10">
           <LogOut size={18} /> {txt.logout}
        </button>
      </div>
    </div>
  </>
);

const Invoice = ({ patient, doctorName, clinicName, txt }: any) => {
  const remaining = patient.totalCost - patient.payments.reduce((acc: number, p: Payment) => acc + p.amount, 0);
  return (
    <div className="print-only">
      <div className="text-center mb-8 border-b pb-4">
         <h1 className="text-4xl font-bold mb-2">{clinicName}</h1>
         <p className="text-xl text-gray-600">Dr. {doctorName}</p>
      </div>
      
      <div className="flex justify-between mb-8 text-lg">
         <div>
           <p className="mb-1"><strong className="text-gray-600">{txt.name}:</strong> {patient.name}</p>
           <p className="mb-1"><strong className="text-gray-600">{txt.phone}:</strong> {patient.phone}</p>
           <p className="mb-1"><strong className="text-gray-600">{txt.age}:</strong> {patient.age}</p>
         </div>
         <div className="text-right">
           <p className="mb-1"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
           <p className="mb-1"><strong>Invoice #:</strong> {Date.now().toString().slice(-6)}</p>
         </div>
      </div>

      <table className="w-full mb-8 border-collapse">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="text-left py-3 text-lg">Description</th>
            <th className="text-right py-3 text-lg">Amount</th>
          </tr>
        </thead>
        <tbody>
           <tr>
             <td className="py-4 text-lg">Dental Treatment / Services</td>
             <td className="text-right text-lg font-bold">{patient.totalCost.toLocaleString()}</td>
           </tr>
           {patient.payments.map((p: Payment) => (
             <tr key={p.id} className="text-gray-500">
               <td className="py-2 pl-4">Payment ({new Date(p.date).toLocaleDateString()})</td>
               <td className="text-right">-{p.amount.toLocaleString()}</td>
             </tr>
           ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-black font-bold text-xl">
            <td className="py-4 pt-6">{txt.remaining}</td>
            <td className="text-right pt-6">{remaining.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>

      <div className="mt-12 p-4 border rounded-lg bg-gray-50">
        <h4 className="font-bold mb-2">Notes:</h4>
        <p className="text-sm text-gray-600">Please retain this invoice for your records.</p>
      </div>

      <div className="text-center mt-20 text-sm text-gray-400">
         Thank you for choosing {clinicName}!
      </div>
    </div>
  );
};

const PatientDetail = ({ 
  patient, 
  appointments,
  doctors,
  onUpdate, 
  onDelete, 
  onClose, 
  onAddAppt,
  onDeleteAppt,
  onUpdateAppt,
  clinicName,
  doctorName,
  txt, 
  isRtl 
}: any) => {
  const [activeTab, setActiveTab] = useState('info');
  const [toothStatusMode, setToothStatusMode] = useState('decay');
  const [apptDate, setApptDate] = useState(new Date().toISOString().split('T')[0]);
  const [apptTime, setApptTime] = useState('09:00');
  const [apptNote, setApptNote] = useState('');

  const patientAppointments = appointments
    .filter((a: Appointment) => a.patientId === patient.id)
    .sort((a: Appointment, b: Appointment) => new Date(b.start).getTime() - new Date(a.start).getTime());

  const remaining = patient.totalCost - patient.payments.reduce((acc: number, p: Payment) => acc + p.amount, 0);

  const handleToothClick = (id: number) => {
    const existing = patient.teeth.find((t: any) => t.id === id);
    let newTeeth = [...patient.teeth];
    if (existing) {
      newTeeth = newTeeth.map((t: any) => t.id === id ? { ...t, status: toothStatusMode } : t);
    } else {
      newTeeth.push({ id, status: toothStatusMode, notes: '' });
    }
    onUpdate(patient.id, { teeth: newTeeth });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImg: PatientImage = {
          id: Date.now().toString(),
          url: reader.result as string,
          notes: '',
          date: new Date().toISOString()
        };
        onUpdate(patient.id, { images: [...patient.images, newImg] });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAppt = () => {
    if (!apptDate || !apptTime) return;
    const start = new Date(`${apptDate}T${apptTime}`).toISOString();
    const end = new Date(new Date(start).getTime() + 60*60*1000).toISOString();
    
    onAddAppt({
      id: Date.now().toString(),
      patientId: patient.id,
      patientName: patient.name,
      doctorId: patient.doctorId,
      start,
      end,
      note: apptNote,
      status: 'scheduled'
    });
    setApptNote('');
  };

  const handleDeletePatient = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm(txt.deleteConfirm)) {
      onDelete(patient.id);
    }
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden relative">
      <Invoice patient={patient} doctorName={doctorName} clinicName={clinicName} txt={txt} />
      
      {/* Header */}
      <div className="p-4 border-b dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800 no-print sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
            {isRtl ? <ChevronRight /> : <ChevronLeft />}
          </button>
          <div>
            <h2 className="text-2xl font-bold dark:text-white">{patient.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${patient.status === 'active' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {patient.status === 'active' ? txt.active : txt.finished}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">ID: {patient.id.slice(-4)}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
           <button 
             type="button"
             onClick={() => window.open(`https://wa.me/${patient.phone.replace(/[^0-9]/g, '')}`, '_blank')} 
             className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors shadow-sm"
             title={txt.whatsapp}
           >
              <MessageCircle size={20} />
           </button>
           <button 
             type="button"
             onClick={handlePrint} 
             className="bg-slate-700 text-white p-2 rounded-full hover:bg-slate-800 transition-colors shadow-sm"
             title={txt.print}
           >
              <Printer size={20} />
           </button>
           <button 
             type="button"
             onClick={handleDeletePatient} 
             className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-sm"
             title={txt.delete}
           >
              <Trash2 size={20} />
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b dark:border-slate-700 overflow-x-auto no-print bg-white dark:bg-slate-800">
        {['info', 'appointments', 'teeth', 'images', 'finance'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'text-blue-600 border-blue-600 bg-blue-50 dark:bg-blue-900/10' : 'text-slate-500 border-transparent hover:text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
          >
            {txt[tab]}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 no-print custom-scrollbar">
        {/* INFO TAB */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{txt.name}</label>
                <input type="text" value={patient.name} onChange={e => onUpdate(patient.id, { name: e.target.value })} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{txt.phone}</label>
                <input 
                  type="text" 
                  dir="ltr"
                  value={patient.phone} 
                  onChange={e => onUpdate(patient.id, { phone: e.target.value })} 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white text-right font-mono" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{txt.age}</label>
                  <input type="number" value={patient.age} onChange={e => onUpdate(patient.id, { age: parseInt(e.target.value) })} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{txt.gender}</label>
                  <select value={patient.gender} onChange={e => onUpdate(patient.id, { gender: e.target.value })} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                    <option value="male">{txt.male}</option>
                    <option value="female">{txt.female}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{txt.status}</label>
                <select value={patient.status} onChange={e => onUpdate(patient.id, { status: e.target.value })} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <option value="active">{txt.active}</option>
                  <option value="finished">{txt.finished}</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{txt.address}</label>
                <textarea value={patient.address} onChange={e => onUpdate(patient.id, { address: e.target.value })} className="w-full p-2 border rounded h-24 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{txt.medicalHistory}</label>
                <textarea value={patient.medicalHistory} onChange={e => onUpdate(patient.id, { medicalHistory: e.target.value })} className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{txt.doctorName}</label>
                 <select 
                    value={patient.doctorId} 
                    onChange={e => onUpdate(patient.id, { doctorId: e.target.value })} 
                    className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                 >
                   {doctors.map((d: Doctor) => <option key={d.id} value={d.id}>{d.name}</option>)}
                 </select>
              </div>
            </div>
          </div>
        )}

        {/* APPOINTMENTS TAB */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border dark:border-slate-600 shadow-sm">
              <h3 className="font-bold mb-4 dark:text-white flex items-center gap-2 text-lg">
                 <Plus className="w-5 h-5 text-blue-500" /> {txt.addAppointment}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                   <label className="text-xs font-semibold text-slate-500 mb-1 block uppercase">{txt.date}</label>
                   <input 
                    type="date" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    value={apptDate}
                    onChange={e => setApptDate(e.target.value)}
                  />
                </div>
                <div>
                   <label className="text-xs font-semibold text-slate-500 mb-1 block uppercase">{txt.time}</label>
                   <input 
                    type="time" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    value={apptTime}
                    onChange={e => setApptTime(e.target.value)}
                  />
                </div>
                <div>
                   <label className="text-xs font-semibold text-slate-500 mb-1 block uppercase">{txt.notes}</label>
                   <input 
                    type="text" 
                    placeholder={txt.notes}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    value={apptNote}
                    onChange={e => setApptNote(e.target.value)}
                  />
                </div>
              </div>
              <button 
                onClick={handleAddAppt}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex justify-center items-center gap-2 font-semibold shadow-lg shadow-blue-500/30 transition-all"
              >
                <Save size={18} /> {txt.save}
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold dark:text-white text-lg px-2">{txt.visitHistory}</h3>
              {patientAppointments.length === 0 && <div className="text-center py-8 text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed dark:border-slate-700">No appointments recorded.</div>}
              {patientAppointments.map((appt: Appointment) => (
                <div key={appt.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-lg shadow-sm gap-4 hover:shadow-md transition-shadow">
                   <div className="flex gap-4 items-center">
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full text-blue-600 dark:text-blue-300">
                         <Clock size={20} />
                      </div>
                      <div>
                         <div className="font-bold dark:text-white flex items-center gap-2">
                           {new Date(appt.start).toLocaleDateString()}
                           <span className="text-slate-300">|</span>
                           {new Date(appt.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                         </div>
                         {appt.note && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{appt.note}</p>}
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <select 
                        value={appt.status}
                        onChange={(e) => onUpdateAppt(appt.id, { status: e.target.value })}
                        className={`text-sm rounded-full px-4 py-1.5 border font-medium outline-none ${
                          appt.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' : 
                          appt.status === 'cancelled' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800' : 
                          'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800'
                        }`}
                      >
                        <option value="scheduled">{txt.scheduled}</option>
                        <option value="completed">{txt.completed}</option>
                        <option value="cancelled">{txt.cancelled}</option>
                      </select>
                      <button onClick={() => onDeleteAppt(appt.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors"><Trash2 size={18}/></button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEETH TAB */}
        {activeTab === 'teeth' && (
          <div className="animate-fadeIn">
            <div className="bg-white dark:bg-slate-800 p-4 sticky top-0 z-10 shadow-sm mb-4 rounded-lg border dark:border-slate-700">
              <div className="flex flex-wrap gap-2 justify-center">
                 {['healthy', 'decay', 'filled', 'missing', 'crown', 'rct'].map(status => (
                   <button 
                    key={status}
                    onClick={() => setToothStatusMode(status)}
                    className={`px-4 py-2 rounded-full capitalize border text-sm font-semibold transition-all ${toothStatusMode === status ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600'}`}
                   >
                     {txt[status]}
                   </button>
                 ))}
              </div>
            </div>
            <TeethChart teeth={patient.teeth} onToothClick={handleToothClick} />
            <div className="mt-6">
              <h3 className="font-semibold mb-2 dark:text-white flex items-center gap-2"><SettingsIcon size={16} /> {txt.notes}</h3>
              <textarea 
                className="w-full p-4 border rounded-xl h-32 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                placeholder="Write treatment notes here..."
              ></textarea>
            </div>
          </div>
        )}

        {/* IMAGES TAB */}
        {activeTab === 'images' && (
          <div className="animate-fadeIn">
            <div className="mb-6 flex items-center gap-4">
              <label className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                <Camera size={20} />
                {txt.uploadImage}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patient.images.map((img: PatientImage) => (
                <div key={img.id} className="border rounded-xl p-3 bg-white dark:bg-slate-700 dark:border-slate-600 shadow-sm">
                  <ImageCanvas 
                    imageSrc={img.url} 
                    onSave={(newUrl) => {
                      const newImages = patient.images.map((i: any) => i.id === img.id ? { ...i, url: newUrl } : i);
                      onUpdate(patient.id, { images: newImages });
                    }} 
                  />
                  <div className="mt-3 flex justify-between items-center">
                     <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{new Date(img.date).toLocaleDateString()}</span>
                     <button onClick={() => onUpdate(patient.id, { images: patient.images.filter((i: any) => i.id !== img.id) })} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors">
                       <Trash2 size={18} />
                     </button>
                  </div>
                </div>
              ))}
              {patient.images.length === 0 && (
                <div className="col-span-2 text-center py-12 border-2 border-dashed rounded-xl dark:border-slate-700 text-slate-400">
                  No images uploaded yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* FINANCE TAB */}
        {activeTab === 'finance' && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
               <div className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">{txt.totalCost}</label>
                  <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold text-slate-400">$</span>
                    <input 
                      type="number" 
                      value={patient.totalCost} 
                      onChange={e => onUpdate(patient.id, { totalCost: parseInt(e.target.value) || 0 })}
                      className="bg-transparent text-3xl font-bold w-full focus:outline-none dark:text-white ml-2 border-b border-dashed border-slate-300 focus:border-blue-500 transition-colors"
                    />
                  </div>
               </div>
               <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                  <label className="text-xs text-green-600 dark:text-green-400 font-bold uppercase tracking-wider">{txt.paid}</label>
                  <div className="text-3xl font-bold text-green-700 dark:text-green-400 mt-2">
                    ${patient.payments.reduce((acc: number, p: Payment) => acc + p.amount, 0).toLocaleString()}
                  </div>
               </div>
               <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
                  <label className="text-xs text-red-600 dark:text-red-400 font-bold uppercase tracking-wider">{txt.remaining}</label>
                  <div className="text-3xl font-bold text-red-700 dark:text-red-400 mt-2">
                    ${remaining.toLocaleString()}
                  </div>
               </div>
            </div>

            <div className="mb-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 shadow-sm">
               <h3 className="font-bold mb-4 dark:text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" /> {txt.addPayment}
               </h3>
               <div className="flex gap-4">
                 <input type="number" id="payAmount" className="border p-3 rounded-lg flex-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="Amount ($)" />
                 <button onClick={() => {
                    const input = document.getElementById('payAmount') as HTMLInputElement;
                    const val = parseInt(input.value);
                    if (val) {
                      const newPayment: Payment = { id: Date.now().toString(), amount: val, date: new Date().toISOString(), note: '' };
                      onUpdate(patient.id, { payments: [...patient.payments, newPayment] });
                      input.value = '';
                    }
                 }} className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-bold shadow-lg shadow-green-600/20 transition-all">
                   {txt.save}
                 </button>
               </div>
            </div>

            <div className="border rounded-xl overflow-hidden dark:border-slate-700 shadow-sm">
               <div className="bg-slate-100 dark:bg-slate-700 p-4 font-bold text-slate-600 dark:text-slate-300 border-b dark:border-slate-600">
                 Payment History
               </div>
               {patient.payments.length === 0 && <div className="p-8 text-center text-slate-400 bg-white dark:bg-slate-800">No payments recorded.</div>}
               {patient.payments.map((p: Payment) => (
                 <div key={p.id} className="flex justify-between items-center p-4 border-b last:border-0 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                   <div>
                     <div className="font-bold text-lg text-green-600 dark:text-green-400">${p.amount.toLocaleString()}</div>
                     <div className="text-xs text-slate-500">{new Date(p.date).toLocaleDateString()}</div>
                   </div>
                   <button onClick={() => onUpdate(patient.id, { payments: patient.payments.filter((pay: any) => pay.id !== p.id) })} className="text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors">
                     <Trash2 size={18} />
                   </button>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = ({ patients, appointments, txt }: any) => {
  const totalPatients = patients.length;
  const activePatients = patients.filter((p: any) => p.status === 'active').length;
  const totalRevenue = patients.reduce((acc: number, p: any) => acc + p.payments.reduce((sum: number, pay: any) => sum + pay.amount, 0), 0);
  const genderData = [
    { name: 'Male', value: patients.filter((p: any) => p.gender === 'male').length },
    { name: 'Female', value: patients.filter((p: any) => p.gender === 'female').length },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-screen pb-20">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg card-shadow border-t-4 border-blue-500">
             <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">{txt.patients}</h3>
                  <p className="text-4xl font-bold dark:text-white mt-2">{totalPatients}</p>
               </div>
               <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <Users size={24} />
               </div>
             </div>
             <div className="mt-4 pt-4 border-t dark:border-slate-700">
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">{activePatients} Active</span>
             </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg card-shadow border-t-4 border-green-500">
             <div className="flex justify-between items-start">
               <div>
                 <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">{txt.totalCost}</h3>
                 <p className="text-4xl font-bold dark:text-white mt-2">${totalRevenue.toLocaleString()}</p>
               </div>
               <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <DollarSign size={24} />
               </div>
             </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg card-shadow border-t-4 border-purple-500">
             <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">{txt.appointments} (Today)</h3>
                  <p className="text-4xl font-bold dark:text-white mt-2">
                    {appointments.filter((a: any) => new Date(a.start).toDateString() === new Date().toDateString()).length}
                  </p>
               </div>
               <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                  <CalendarIcon size={24} />
               </div>
             </div>
          </div>
       </div>
       <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg h-96 card-shadow border dark:border-slate-700">
          <h3 className="text-lg font-bold mb-6 dark:text-white border-b pb-4 dark:border-slate-700">Patients by Gender</h3>
          <ResponsiveContainer width="100%" height="100%">
             <RePieChart>
               <Pie data={genderData} cx="50%" cy="40%" innerRadius={80} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value">
                 {genderData.map((entry: any, index: number) => (
                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                 ))}
               </Pie>
               <RechartsTooltip />
             </RePieChart>
          </ResponsiveContainer>
       </div>
    </div>
  );
};

const SettingsView = ({ settings, onUpdate, onLogout, txt }: any) => {
  const [syncState, setSyncState] = useState<'idle'|'syncing'|'success'>('idle');

  const handleSync = async () => {
    setSyncState('syncing');
    await db.sync(); // Simulated delay
    setSyncState('success');
    setTimeout(() => setSyncState('idle'), 3000);
  };

  return (
    <div className="p-6 h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">{txt.settings}</h2>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 space-y-8 max-w-2xl mx-auto border dark:border-slate-700">
         
         <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="flex items-center gap-4">
               <div className={`p-3 rounded-full ${settings.darkMode ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                 {settings.darkMode ? <Moon size={24} /> : <Sun size={24} />}
               </div>
               <span className="font-bold text-lg dark:text-white">{txt.darkMode}</span>
            </div>
            <button 
              onClick={() => onUpdate({ darkMode: !settings.darkMode })} 
              className={`w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${settings.darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
               <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${settings.darkMode ? 'translate-x-8' : 'translate-x-0'}`} />
            </button>
         </div>
  
         <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <span className="font-bold text-lg dark:text-white">{txt.language}</span>
            <div className="flex gap-2">
               <button onClick={() => onUpdate({ language: 'en' })} className={`px-6 py-2 rounded-lg font-bold transition-all ${settings.language === 'en' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>English</button>
               <button onClick={() => onUpdate({ language: 'ar' })} className={`px-6 py-2 rounded-lg font-bold transition-all ${settings.language === 'ar' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>العربية</button>
            </div>
         </div>
  
         <div className="border-t pt-8 dark:border-slate-700 space-y-4">
           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{txt.clinicName}</label>
           <input 
             value={settings.clinicName}
             onChange={e => onUpdate({ clinicName: e.target.value })}
             className="w-full p-4 border rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
           />
         </div>
  
         <div className="border-t pt-8 dark:border-slate-700">
           <button 
            onClick={handleSync}
            disabled={syncState !== 'idle'}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${syncState === 'success' ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30'}`}
           >
             {syncState === 'syncing' ? <RefreshCw className="animate-spin" /> : syncState === 'success' ? <Check /> : <Cloud />}
             {syncState === 'syncing' ? txt.syncing : syncState === 'success' ? txt.syncSuccess : txt.syncDrive}
           </button>
         </div>
  
         <div className="border-t pt-8 dark:border-slate-700">
            <a href="https://instagram.com/h8.5t" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-pink-600 font-bold hover:underline mb-2">
               <Instagram /> {txt.instagram} (@h8.5t)
            </a>
            <p className="text-xs text-slate-400 font-mono">{txt.devCredit} H8.5T</p>
         </div>
  
         <button onClick={onLogout} className="w-full py-3 text-red-500 border-2 border-red-100 rounded-xl hover:bg-red-50 mt-4 transition-colors font-bold dark:border-red-900/30 dark:hover:bg-red-900/20">
            {txt.logout}
         </button>
      </div>
    </div>
  );
};

const CalendarView = ({ appointments, txt, isRtl }: any) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getAppointmentsForDay = (day: number) => {
    return appointments.filter((a: Appointment) => {
      const d = new Date(a.start);
      return d.getDate() === day && d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
    });
  };

  return (
    <div className="p-6 h-full flex flex-col bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">{txt.calendar}</h2>
        <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border dark:border-slate-700">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"><ChevronLeft /></button>
          <span className="font-bold w-40 text-center dark:text-white text-lg">
            {currentDate.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"><ChevronRight /></button>
        </div>
      </div>
      
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col border dark:border-slate-700">
        {/* Week Headers */}
        <div className="grid grid-cols-7 border-b dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
          {txt.weekDays.map((d: string) => (
            <div key={d} className="p-4 text-center font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-sm">{d}</div>
          ))}
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-7 flex-1 auto-rows-fr overflow-y-auto">
           {blanks.map((b) => <div key={`blank-${b}`} className="border-b border-r dark:border-slate-700 bg-slate-50/30 dark:bg-slate-900/50"></div>)}
           {days.map((day) => {
             const dayAppts = getAppointmentsForDay(day);
             const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
             return (
               <div key={day} className={`border-b border-r dark:border-slate-700 p-2 min-h-[120px] hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors relative flex flex-col gap-1 ${isToday ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                 <span className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full mb-2 ${isToday ? 'bg-blue-600 text-white shadow-md' : 'text-slate-700 dark:text-slate-300'}`}>
                   {day}
                 </span>
                 <div className="space-y-1 overflow-y-auto max-h-[100px] custom-scrollbar">
                   {dayAppts.map((appt: Appointment) => (
                     <div key={appt.id} className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 p-1.5 rounded border border-blue-200 dark:border-blue-800 truncate shadow-sm">
                        <span className="font-bold opacity-75">{new Date(appt.start).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span> {appt.patientName}
                     </div>
                   ))}
                 </div>
               </div>
             )
           })}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [data, setData] = useState<AppData>(db.load());
  const [user, setUser] = useState<{ email: string } | null>(db.getUser());
  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'patients' | 'calendar' | 'settings'>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [newDoctorName, setNewDoctorName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer state

  // Derived state
  const lang = data.settings.language;
  const txt = t[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    db.save(data);
    if (data.settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.body.dir = isRtl ? 'rtl' : 'ltr';
  }, [data, isRtl]);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      db.login('doctor@gmail.com');
      setUser({ email: 'doctor@gmail.com' });
      const loaded = db.load();
      setData(loaded);
      setLoading(false);
    }, 1500);
  };

  const addDoctor = (name: string) => {
    const newDoc: Doctor = {
      id: Date.now().toString(),
      name,
      color: COLORS[data.doctors.length % COLORS.length]
    };
    setData(prev => ({ ...prev, doctors: [...prev.doctors, newDoc] }));
  };

  const handleAddDoctor = () => {
    if (newDoctorName.trim()) {
      addDoctor(newDoctorName);
      setNewDoctorName('');
    }
  };

  const handleDoctorSelect = (doc: Doctor) => {
    setCurrentDoctor(doc);
    setCurrentView('patients'); // Default to patients view
  };

  const addPatient = () => {
    if (!currentDoctor) return;
    const newPatient: Patient = {
      id: Date.now().toString(),
      doctorId: currentDoctor.id,
      name: isRtl ? 'مريض جديد' : 'New Patient',
      phone: '+964', // Default Iraq Code
      age: 0,
      gender: 'male',
      address: '',
      medicalHistory: '',
      status: 'active',
      teeth: [],
      images: [],
      payments: [],
      totalCost: 0,
      visits: [new Date().toISOString()],
      createdAt: new Date().toISOString()
    };
    setData(prev => ({ ...prev, patients: [newPatient, ...prev.patients] }));
    setSelectedPatientId(newPatient.id);
    setCurrentView('patients');
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setData(prev => ({
      ...prev,
      patients: prev.patients.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const deletePatient = (id: string) => {
    setData(prev => ({
      ...prev,
      patients: prev.patients.filter(p => p.id !== id),
      appointments: prev.appointments.filter(a => a.patientId !== id)
    }));
    setSelectedPatientId(null);
  };

  const addAppointment = (appt: Appointment) => {
    setData(prev => ({ ...prev, appointments: [...prev.appointments, appt] }));
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setData(prev => ({
      ...prev,
      appointments: prev.appointments.map(a => a.id === id ? { ...a, ...updates } : a)
    }));
  };

  const deleteAppointment = (id: string) => {
    setData(prev => ({ ...prev, appointments: prev.appointments.filter(a => a.id !== id) }));
  };

  // 1. LOGIN SCREEN
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-4">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border dark:border-slate-700">
          <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Users className="w-12 h-12 text-blue-600 dark:text-blue-300" />
          </div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">{txt.appName}</h1>
          <p className="text-slate-500 mb-8">Manage your clinic efficiently</p>
          <button 
            onClick={handleLogin} 
            disabled={loading} 
            className="w-full bg-white border-2 border-slate-200 dark:border-slate-600 py-4 px-6 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-700 dark:text-white flex items-center justify-center gap-3 font-bold transition-all"
          >
            {loading ? (
              <RefreshCw className="animate-spin text-blue-600" />
            ) : (
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                 <img src="https://www.google.com/favicon.ico" alt="G" className="w-4 h-4" />
              </div>
            )}
            {loading ? txt.syncing : txt.login}
          </button>
        </div>
      </div>
    );
  }

  // 2. SETUP SCREEN (CLINIC NAME)
  if (!data.settings.clinicName) {
    return (
      <SetupScreen 
        initialName={data.settings.clinicName}
        onSave={(name) => setData(prev => ({ ...prev, settings: { ...prev.settings, clinicName: name } }))} 
        txt={txt} 
      />
    );
  }

  // 3. DOCTOR SELECTION
  if (!currentDoctor) {
    return (
      <div className="min-h-screen p-8 bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center">
         <h1 className="text-4xl font-bold text-center mb-12 dark:text-white text-blue-900 dark:text-blue-100">{data.settings.clinicName}</h1>
         <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.doctors.map(doc => (
              <button key={doc.id} onClick={() => handleDoctorSelect(doc)} className="group p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all border-2 border-transparent hover:border-blue-500">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700 mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-slate-700 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">{doc.name.charAt(0)}</div>
                <div className="text-center font-bold text-lg dark:text-white">{doc.name}</div>
              </button>
            ))}
            <div className="p-6 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 transition-all">
              <input 
                value={newDoctorName}
                onChange={(e) => setNewDoctorName(e.target.value)}
                placeholder={txt.addDoctor}
                className="bg-transparent border-b-2 border-slate-300 focus:border-blue-500 text-center focus:outline-none mb-4 w-full dark:text-white placeholder:text-slate-400 py-2 font-medium"
                onKeyDown={(e) => { if(e.key === 'Enter') handleAddDoctor() }}
              />
              <button 
                onClick={handleAddDoctor}
                disabled={!newDoctorName.trim()}
                className={`p-4 rounded-full transition-all shadow-md ${newDoctorName.trim() ? 'bg-blue-600 text-white hover:scale-110' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                <Plus size={24} />
              </button>
            </div>
         </div>
      </div>
    );
  }

  // 4. MAIN APP
  const filteredPatients = data.patients.filter(p => p.doctorId === currentDoctor.id && (p.name.includes(searchTerm) || p.phone.includes(searchTerm)));

  return (
    <div className={`flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden ${isRtl ? 'rtl' : 'ltr'}`}>
       <Sidebar 
          clinicName={data.settings.clinicName}
          doctorName={currentDoctor.name}
          currentView={currentView}
          onViewChange={(v: any) => { setCurrentView(v); setSelectedPatientId(null); }}
          onLogout={() => { setUser(null); setCurrentDoctor(null); }}
          txt={txt}
          isRtl={isRtl}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
       />
       
       <main className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${isRtl ? 'lg:mr-64' : 'lg:ml-64'} relative`}>
          
          {/* Mobile Header Toggle */}
          <div className="lg:hidden p-4 bg-white dark:bg-slate-800 shadow-sm flex items-center justify-between no-print">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
              <Menu size={24} className="dark:text-white" />
            </button>
            <span className="font-bold text-lg dark:text-white">{txt[currentView]}</span>
            <div className="w-8"></div> {/* Spacer for centering */}
          </div>

          {currentView === 'patients' && !selectedPatientId && (
            <div className="p-6 h-full flex flex-col animate-fadeIn">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold dark:text-white hidden lg:block">{txt.patients}</h2>
                 <button onClick={addPatient} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 font-bold w-full lg:w-auto justify-center">
                    <UserPlus size={20} /> {txt.newPatient}
                 </button>
              </div>
              <div className="mb-4 relative">
                 <Search className="absolute top-3.5 left-4 rtl:right-4 rtl:left-auto text-slate-400" size={20} />
                 <input 
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                   className="w-full pl-12 pr-4 rtl:pr-12 rtl:pl-4 py-3.5 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                   placeholder={txt.search}
                 />
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pb-20 custom-scrollbar">
                {filteredPatients.map(patient => (
                  <div key={patient.id} onClick={() => setSelectedPatientId(patient.id)} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm hover:shadow-md cursor-pointer flex justify-between items-center border-l-4 border-transparent hover:border-blue-500 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ${patient.gender === 'male' ? 'bg-gradient-to-br from-blue-400 to-blue-600' : 'bg-gradient-to-br from-pink-400 to-pink-600'}`}>
                           {patient.name.charAt(0)}
                        </div>
                        <div>
                           <h3 className="font-bold text-lg dark:text-white group-hover:text-blue-600 transition-colors">{patient.name}</h3>
                           <p className="text-sm text-slate-500 flex items-center gap-1"><span className={`w-2 h-2 rounded-full ${patient.status === 'active' ? 'bg-green-500' : 'bg-slate-300'}`}></span> {patient.phone}</p>
                        </div>
                     </div>
                     <ChevronRight className={`text-slate-300 group-hover:text-blue-500 transition-colors ${isRtl ? 'rotate-180' : ''}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'patients' && selectedPatientId && (
             <PatientDetail 
                patient={data.patients.find(p => p.id === selectedPatientId)}
                appointments={data.appointments}
                doctors={data.doctors}
                onUpdate={updatePatient}
                onDelete={deletePatient}
                onClose={() => setSelectedPatientId(null)}
                onAddAppt={addAppointment}
                onUpdateAppt={updateAppointment}
                onDeleteAppt={deleteAppointment}
                clinicName={data.settings.clinicName}
                doctorName={currentDoctor.name}
                txt={txt}
                isRtl={isRtl}
             />
          )}

          {currentView === 'dashboard' && <Dashboard patients={data.patients} appointments={data.appointments} txt={txt} />}
          
          {currentView === 'settings' && (
            <SettingsView 
               settings={data.settings} 
               onUpdate={(s: any) => setData(prev => ({ ...prev, settings: { ...prev.settings, ...s } }))}
               onLogout={() => { setUser(null); setCurrentDoctor(null); }}
               txt={txt}
            />
          )}

          {currentView === 'calendar' && <CalendarView appointments={data.appointments} txt={txt} isRtl={isRtl} />}
       </main>
    </div>
  );
}