
import React, { useState } from 'react';
import { 
  ArrowLeft, Calendar, Mail, Phone, MapPin, 
  Award, FileText, Clock, ChevronDown, CheckCircle, 
  Star, Share2, Briefcase, GraduationCap, Droplet, User
} from 'lucide-react';
import { mockDoctors } from '../services/mockData';

interface DoctorDetailsProps {
  doctorId: string;
  onBack: () => void;
  onBookAppointment: (doctorId: string) => void;
}

export const DoctorDetails: React.FC<DoctorDetailsProps> = ({ doctorId, onBack, onBookAppointment }) => {
  const doctor = mockDoctors.find(d => d.id === doctorId);
  const [activeTab, setActiveTab] = useState('Monday');

  if (!doctor) {
    return <div className="p-8 text-center text-slate-500">Doctor not found. <button onClick={onBack} className="text-primary hover:underline font-bold">Go Back</button></div>;
  }

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '11:30 AM - 12:30 PM', '12:30 PM - 01:30 PM', '02:30 PM - 03:30 PM',
    '04:30 PM - 05:30 PM', '06:00 PM - 07:30 PM', '07:00 PM - 08:30 PM',
    '09:00 PM - 11:00 PM', '11:00 PM - 11:30 PM'
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-10">
      {/* Back Header */}
      <div className="flex items-center gap-2 mb-6 text-slate-500 hover:text-primary transition-colors w-fit cursor-pointer group" onClick={onBack}>
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold text-sm">Back to Doctors</span>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-6 md:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50/50 dark:bg-primary-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row gap-8 relative z-10">
          <div className="w-full md:w-56 h-56 rounded-2xl overflow-hidden shrink-0 relative shadow-lg group">
             <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
             <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm border border-white/20 backdrop-blur-md ${doctor.availability === 'Available' ? 'bg-emerald-500/90' : 'bg-slate-500/90'}`}>
                {doctor.availability}
             </div>
          </div>
          
          <div className="flex-1 min-w-0 flex flex-col justify-between">
             <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                   <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">{doctor.name}</h1>
                   <div className="flex flex-wrap items-center gap-2 text-slate-500 dark:text-slate-400 mt-2">
                      <span className="px-2.5 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary dark:text-primary-400 rounded-md text-xs font-bold uppercase tracking-wide border border-primary-100 dark:border-primary-800">{doctor.department}</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-sm font-medium">{doctor.specialty}</span>
                   </div>
                   <div className="flex items-center gap-4 mt-6 text-sm text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                          <Briefcase className="w-4 h-4 text-slate-400" /> Downtown Medical Clinic
                      </span>
                   </div>
                </div>
                <div className="text-left md:text-right w-full md:w-auto mt-4 md:mt-0">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Consultation Fee</p>
                   <h2 className="text-3xl font-bold text-slate-800 dark:text-white">${doctor.fee} <span className="text-sm font-medium text-slate-400">/ 30 Min</span></h2>
                   <button 
                      onClick={() => onBookAppointment(doctor.id)}
                      className="mt-5 w-full md:w-auto bg-primary hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
                   >
                      <Calendar className="w-4 h-4" /> Book Appointment
                   </button>
                </div>
             </div>
             
             <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 max-w-lg">
                <div>
                    <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                        <Star className="w-5 h-5 fill-amber-400" />
                        <span className="text-xl font-bold text-slate-800 dark:text-white">{doctor.rating}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Rating</p>
                </div>
                <div>
                    <div className="text-xl font-bold text-slate-800 dark:text-white">{doctor.patientsCount}+</div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mt-1">Patients</p>
                </div>
                <div>
                    <div className="text-xl font-bold text-slate-800 dark:text-white">10+</div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mt-1">Years Exp.</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Schedule & Info */}
        <div className="lg:col-span-2 space-y-8">
           {/* Availability Section */}
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-6 md:p-8">
              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> Availability
              </h3>
              <div className="border-b border-slate-100 dark:border-slate-700 flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
                 {weekDays.map(day => (
                    <button 
                      key={day} 
                      onClick={() => setActiveTab(day)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all relative whitespace-nowrap ${
                          activeTab === day 
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary dark:text-primary-400' 
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                       {day}
                    </button>
                 ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                 {timeSlots.map((slot, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-700/30 text-slate-600 dark:text-slate-300 text-xs font-medium py-3 px-3 rounded-xl text-center border border-slate-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/10 hover:text-primary dark:hover:text-primary-400 transition-all cursor-pointer">
                       {slot}
                    </div>
                 ))}
              </div>
           </div>

           {/* Short Bio */}
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-6 md:p-8">
              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-sky-500" /> Biography
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                 {doctor.about || "Dr. John Smith has been practicing family medicine for over 10 years. She has extensive experience in managing chronic illnesses, preventive care, and treating a wide range of medical conditions for patients of all ages."}
              </p>
              <button className="text-primary hover:text-primary-700 text-sm font-bold mt-4 flex items-center gap-1 transition-colors">
                 Read More <ChevronDown className="w-4 h-4" />
              </button>
           </div>

           {/* Education */}
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-6 md:p-8">
              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-6 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-violet-500" /> Education
              </h3>
              <div className="space-y-8 relative pl-2">
                 {/* Vertical Line */}
                 <div className="absolute left-[11px] top-2 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-700"></div>
                 
                 {doctor.education?.map((edu, idx) => (
                    <div key={idx} className="relative pl-8 group">
                       <span className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-slate-50 dark:border-slate-800 bg-primary z-10 group-hover:scale-110 transition-transform shadow-sm"></span>
                       <h4 className="font-bold text-slate-800 dark:text-white">{edu.degree}</h4>
                       <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{edu.institution}</p>
                       <span className="text-xs font-bold text-slate-400 mt-1 block bg-slate-50 dark:bg-slate-700 px-2 py-0.5 rounded w-fit">{edu.year}</span>
                    </div>
                 ))}
                 {!doctor.education && (
                    <p className="text-slate-500 italic pl-8">No education details available.</p>
                 )}
              </div>
           </div>

           {/* Awards */}
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-6 md:p-8">
              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" /> Awards & Recognition
              </h3>
              <div className="space-y-4">
                 {doctor.awards?.map((award, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50">
                       <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shrink-0 shadow-sm text-amber-500">
                          <Award className="w-5 h-5" />
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-800 dark:text-white text-sm">{award.name} <span className="text-slate-400 font-normal ml-1">({award.year})</span></h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{award.description}</p>
                       </div>
                    </div>
                 ))}
                 {(!doctor.awards || doctor.awards.length === 0) && (
                    <p className="text-slate-500 italic">No awards listed.</p>
                 )}
              </div>
           </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-6 md:p-8 sticky top-24">
              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">Personal Info</h3>
              <div className="space-y-6">
                 <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0 text-slate-500 group-hover:text-primary group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                       <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">License Number</p>
                       <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate mt-0.5">{doctor.licenseNumber || 'N/A'}</p>
                    </div>
                 </div>
                 
                 <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0 text-slate-500 group-hover:text-primary group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                       <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Phone</p>
                       <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate mt-0.5">{doctor.phone}</p>
                    </div>
                 </div>

                 <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0 text-slate-500 group-hover:text-primary group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                       <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Email</p>
                       <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate mt-0.5" title={doctor.email}>{doctor.email}</p>
                    </div>
                 </div>

                 <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0 text-slate-500 group-hover:text-primary group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                       <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Location</p>
                       <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5 leading-snug">{doctor.address || 'Not Provided'}</p>
                    </div>
                 </div>

                 <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0 text-slate-500 group-hover:text-primary group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                       <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">DOB</p>
                       <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{doctor.dob || 'N/A'}</p>
                    </div>
                 </div>

                 <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0 text-slate-500 group-hover:text-primary group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                       <Droplet className="w-5 h-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Blood Group</p>
                       <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">O+ ve</p>
                    </div>
                 </div>

                 <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0 text-slate-500 group-hover:text-primary group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                       <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Gender</p>
                       <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{doctor.gender || 'Unknown'}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
