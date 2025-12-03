
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { AdminDashboard } from './components/Dashboard';
import { PatientList } from './components/PatientList';
import { AddPatient } from './components/AddPatient';
import { AppointmentCalendar } from './components/AppointmentCalendar';
import { Doctors } from './components/Doctors';
import { DoctorDetails } from './components/DoctorDetails';
import { AddDoctor } from './components/AddDoctor';
import { DoctorSchedule } from './components/DoctorSchedule';
import { LeaveManagement } from './components/LeaveManagement';
import { LeaveTypes } from './components/LeaveTypes';
import { Departments } from './components/Departments';
import { Staffs } from './components/Staffs';
import { Payroll } from './components/Payroll';
import { AIChat } from './components/AIChat';
import { Settings } from './components/Settings';
import { Locations } from './components/Locations';
import { Specializations } from './components/Specializations';
import { Invoices } from './components/Invoices';
import { Transactions } from './components/Transactions';
import { Income } from './components/Income';
import { Reports } from './components/Reports';
import { DoctorDashboard } from './components/DoctorDashboard';
import { PatientDashboard } from './components/PatientDashboard';
import { NewAppointment } from './components/NewAppointment';
import { CalendarView } from './components/CalendarView';
import { Services } from './components/Services';
import { Assets } from './components/Assets';
import { mockPatients, mockAppointments, mockDoctors, mockDepartments, mockStaffs } from './services/mockData';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('admin-dashboard');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [viewingDoctorId, setViewingDoctorId] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset doctor filter if navigating via sidebar
    if (tab !== 'appointments') {
      setSelectedDoctorId(null);
    } 
    if (tab !== 'doctor-details') {
      setViewingDoctorId(null);
    }
  };

  const handleDoctorScheduleClick = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setActiveTab('appointments');
  };

  const handleDoctorProfileClick = (doctorId: string) => {
    setViewingDoctorId(doctorId);
    setActiveTab('doctor-details');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={setActiveTab} />;
      case 'doctor-dashboard':
        return <DoctorDashboard />;
      case 'patient-dashboard':
        return <PatientDashboard />;
      case 'patients':
        return <PatientList onAddPatient={() => setActiveTab('create-patient')} />;
      case 'create-patient':
        return <AddPatient onCancel={() => setActiveTab('patients')} onSave={() => setActiveTab('patients')} />;
      case 'appointments':
        return <AppointmentCalendar initialDoctorId={selectedDoctorId} />;
      case 'new-appointment':
        return <NewAppointment onCancel={() => setActiveTab('appointments')} onSave={() => setActiveTab('appointments')} />;
      case 'calendar':
        return <CalendarView />;
      case 'doctors':
        return (
          <Doctors 
            onScheduleClick={handleDoctorScheduleClick} 
            onDoctorClick={handleDoctorProfileClick}
            onAddDoctor={() => setActiveTab('add-doctor')}
          />
        );
      case 'doctor-details':
        return viewingDoctorId ? (
          <DoctorDetails 
             doctorId={viewingDoctorId} 
             onBack={() => setActiveTab('doctors')}
             onBookAppointment={(id) => handleDoctorScheduleClick(id)}
          />
        ) : <Doctors 
              onScheduleClick={handleDoctorScheduleClick} 
              onDoctorClick={handleDoctorProfileClick}
              onAddDoctor={() => setActiveTab('add-doctor')}
            />;
      case 'add-doctor':
         return <AddDoctor onCancel={() => setActiveTab('doctors')} onSave={() => setActiveTab('doctors')} />;
      case 'doctor-schedule':
         return (
            <DoctorSchedule 
              onProfileClick={handleDoctorProfileClick}
              onScheduleClick={handleDoctorScheduleClick}
            />
         );
      case 'departments':
        return <Departments />;
      case 'staffs':
        return <Staffs />;
      case 'payroll':
        return <Payroll />;
      case 'leaves':
        return <LeaveManagement />;
      case 'leave-type':
        return <LeaveTypes />;
      case 'locations':
        return <Locations />;
      case 'services':
        return <Services />;
      case 'specializations':
        return <Specializations />;
      case 'assets':
        return <Assets />;
      case 'invoices':
        return <Invoices />;
      case 'transactions':
        return <Transactions />;
      case 'income':
        return <Income />;
      case 'reports':
        return <Reports />;
      case 'settings':
         return <Settings />;
      default:
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-slate-400 animate-in fade-in duration-500">
                <div className="bg-indigo-50 p-8 rounded-full mb-6">
                <span className="text-5xl">🚧</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-700 mb-2 capitalize">{activeTab.replace('-', ' ')}</h2>
                <p className="max-w-md text-center text-slate-500">This module is currently under development.</p>
            </div>
        );
    }
  };

  // Construct context string for the AI based on current data
  const getContextData = () => {
    if (activeTab === 'patients') {
      return `Viewing Patient List. Total Count: ${mockPatients.length}. Sample Names: ${mockPatients.slice(0,3).map(p=>p.name).join(', ')}`;
    }
    if (activeTab === 'create-patient') {
      return `User is on the Patient Registration form.`;
    }
    if (activeTab === 'appointments') {
      return `Viewing Appointment Calendar. Total Appointments: ${mockAppointments.length}. Next: ${mockAppointments[0].time} with ${mockAppointments[0].doctorName}`;
    }
    if (activeTab === 'new-appointment') {
      return `User is booking a new appointment.`;
    }
    if (activeTab === 'doctors') {
       return `Viewing Doctors List. Total: ${mockDoctors.length}. Top rated: ${mockDoctors.find(d => d.rating > 4.8)?.name}`;
    }
    if (activeTab === 'doctor-details' && viewingDoctorId) {
       const doc = mockDoctors.find(d => d.id === viewingDoctorId);
       return `Viewing details of Doctor ${doc?.name}, Specialty: ${doc?.specialty}.`;
    }
    if (activeTab === 'departments') {
      return `Viewing Departments. Total: ${mockDepartments.length}.`;
    }
    if (activeTab === 'staffs') {
      return `Viewing Staff List. Total: ${mockStaffs.length}.`;
    }
    return 'Viewing Admin Dashboard. General Hospital Overview.';
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      <Layout activeTab={activeTab} onTabChange={handleTabChange}>
        {renderContent()}
      </Layout>
      <AIChat contextData={getContextData()} />
    </div>
  );
};

export default App;