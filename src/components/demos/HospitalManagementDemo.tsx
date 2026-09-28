import React, { useState } from 'react';
import { UserCheck, Calendar, Clock, Stethoscope, CheckCircle2, ShieldAlert, User, Plus } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  department: string;
  date: string;
  timeSlot: string;
  symptoms: string;
  status: 'Scheduled' | 'In Consultation' | 'Completed' | 'Triage';
}

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    patientName: 'Devansh Sharma',
    patientId: 'PAT-4821',
    doctorName: 'Dr. Sarah Mathews, MD',
    department: 'Cardiology',
    date: 'Tomorrow',
    timeSlot: '10:00 AM',
    symptoms: 'Mild chest tightness during aerobic activity',
    status: 'Scheduled'
  },
  {
    id: 'apt-102',
    patientName: 'Priya Narayanan',
    patientId: 'PAT-3904',
    doctorName: 'Dr. Sarah Mathews, MD',
    department: 'Cardiology',
    date: 'Today',
    timeSlot: '11:30 AM',
    symptoms: 'Post-viral fatigue and elevated resting pulse',
    status: 'In Consultation'
  },
  {
    id: 'apt-103',
    patientName: 'Karan Mehra',
    patientId: 'PAT-1882',
    doctorName: 'Dr. Sarah Mathews, MD',
    department: 'Cardiology',
    date: 'Today',
    timeSlot: '09:00 AM',
    symptoms: 'Annual ECG evaluation & blood pressure check',
    status: 'Completed'
  }
];

export const HospitalManagementDemo: React.FC = () => {
  const [role, setRole] = useState<'patient' | 'doctor'>('doctor');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  // New booking form state (for patient role)
  const [patientName, setPatientName] = useState('');
  const [selectedDept, setSelectedDept] = useState('Cardiology');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Sarah Mathews, MD');
  const [selectedSlot, setSelectedSlot] = useState('02:30 PM');
  const [patientSymptoms, setPatientSymptoms] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    const newApt: Appointment = {
      id: `apt-${Date.now().toString().slice(-4)}`,
      patientName: patientName.trim(),
      patientId: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      doctorName: selectedDoctor,
      department: selectedDept,
      date: 'Next Available',
      timeSlot: selectedSlot,
      symptoms: patientSymptoms || 'General Health Consultation',
      status: 'Scheduled'
    };

    setAppointments((prev) => [newApt, ...prev]);
    setBookingSuccess(true);
    setPatientName('');
    setPatientSymptoms('');
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  const updateStatus = (id: string, newStatus: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <div className="space-y-4 text-slate-200">
      {/* Role Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
            Role-Based Access Control (RBAC)
          </span>
          <span className="text-xs text-slate-300">
            Current active view: <strong className="text-white capitalize">{role} Portal</strong>
          </span>
        </div>

        <div className="flex gap-1.5 p-1 bg-slate-950/60 rounded-lg">
          <button
            onClick={() => setRole('doctor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              role === 'doctor'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctor Dashboard</span>
          </button>
          <button
            onClick={() => setRole('patient')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              role === 'patient'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Patient Booking Portal</span>
          </button>
        </div>
      </div>

      {role === 'doctor' ? (
        /* Doctor Clinical View */
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 block">Today's Appointments</span>
              <span className="text-xl font-bold font-mono text-white tabular-nums">
                {appointments.length} Consultations
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 block">In Consultation</span>
              <span className="text-xl font-bold font-mono text-indigo-400 tabular-nums">
                {appointments.filter((a) => a.status === 'In Consultation').length} Active
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 block">PostgreSQL Schema State</span>
              <span className="text-xs font-mono text-emerald-400 mt-1 block">
                ● Synchronized (ACID Compliant)
              </span>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden">
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
              <h5 className="text-xs font-mono uppercase tracking-wider text-slate-300">
                Scheduled Patient Queue · Dr. Sarah Mathews (Cardiology)
              </h5>
              <span className="text-xs font-mono text-slate-500">Live Queue</span>
            </div>

            <div className="divide-y divide-slate-800">
              {appointments.map((apt) => (
                <div key={apt.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{apt.patientName}</span>
                      <span className="font-mono text-slate-500 text-[11px]">[{apt.patientId}]</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          apt.status === 'In Consultation'
                            ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-700'
                            : apt.status === 'Completed'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">
                      Symptoms: <span className="text-slate-300">{apt.symptoms}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400 font-mono text-xs">
                    <div>
                      <span>{apt.date}</span> · <span className="text-white">{apt.timeSlot}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {apt.status !== 'Completed' && (
                        <button
                          onClick={() => updateStatus(apt.id, 'Completed')}
                          className="px-2.5 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 rounded transition-colors"
                        >
                          Complete
                        </button>
                      )}
                      {apt.status !== 'In Consultation' && apt.status !== 'Completed' && (
                        <button
                          onClick={() => updateStatus(apt.id, 'In Consultation')}
                          className="px-2.5 py-1 text-xs font-medium text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-800 rounded transition-colors"
                        >
                          Begin Consult
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Patient Portal Booking Form */
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h5 className="text-sm font-bold text-white">Book an Outpatient Specialist Consultation</h5>
              <p className="text-xs text-slate-400">Direct integration with Django appointments API & slot allocator.</p>
            </div>
            {bookingSuccess && (
              <span className="flex items-center gap-1 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Appointment confirmed!
              </span>
            )}
          </div>

          <form onSubmit={handleBookAppointment} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sen"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Clinical Department</label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Cardiology">Cardiology & Vascular Medicine</option>
                  <option value="Neurology">Neurology & Cognitive Health</option>
                  <option value="General Medicine">Internal Medicine / Diagnostics</option>
                  <option value="Orthopedics">Orthopedics & Sports Rehab</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Attending Physician</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Dr. Sarah Mathews, MD">Dr. Sarah Mathews, MD (Lead Cardiologist)</option>
                  <option value="Dr. Rajesh Verma, MBBS, MS">Dr. Rajesh Verma, MBBS, MS</option>
                  <option value="Dr. Elena Rostova, PhD, MD">Dr. Elena Rostova, PhD, MD</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Consultation Time Slot</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="10:00 AM">10:00 AM (Morning Session)</option>
                  <option value="11:30 AM">11:30 AM (Morning Session)</option>
                  <option value="02:30 PM">02:30 PM (Afternoon Session)</option>
                  <option value="04:00 PM">04:00 PM (Evening Session)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Primary Symptoms / Reason for Visit</label>
              <textarea
                rows={2}
                placeholder="Briefly describe recurring symptoms, current medications, or diagnosis..."
                value={patientSymptoms}
                onChange={(e) => setPatientSymptoms(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Confirm & Lock Appointment</span>
            </button>
          </form>
        </div>
      )}

      {/* Backend Architecture Spec */}
      <div className="p-3.5 rounded-lg bg-indigo-950/20 border border-indigo-900/40 text-xs text-slate-400 flex items-start gap-2.5">
        <Stethoscope className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-white">Django MVT Architecture:</strong> Built with modular Django apps (<code className="text-indigo-300">accounts</code>, <code className="text-indigo-300">doctors</code>, <code className="text-indigo-300">appointments</code>), Django ORM foreign key relations with PostgreSQL-ready migration trees, and CSRF-protected authentication sessions.
        </p>
      </div>
    </div>
  );
};
