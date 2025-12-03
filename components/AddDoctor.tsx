
import React, { useState } from 'react';
import { 
  Camera, ChevronDown, Plus, Trash2, Calendar, Clock, 
  MapPin, Globe, CreditCard, User, Mail, Phone, FileText,
  X, CheckCircle, Save, Award, GraduationCap
} from 'lucide-react';

interface AddDoctorProps {
  onCancel?: () => void;
  onSave?: () => void;
}

export const AddDoctor: React.FC<AddDoctorProps> = ({ onCancel, onSave }) => {
  const [activeDay, setActiveDay] = useState('Monday');
  
  // Dynamic Lists State
  const [educationList, setEducationList] = useState([{ id: 1, degree: '', university: '', from: '', to: '' }]);
  const [awardList, setAwardList] = useState([{ id: 1, name: '', from: '' }]);
  const [certList, setCertList] = useState([{ id: 1, name: '', from: '' }]);

  const addEducation = () => setEducationList([...educationList, { id: Date.now(), degree: '', university: '', from: '', to: '' }]);
  const removeEducation = (id: number) => setEducationList(educationList.filter(item => item.id !== id));

  const addAward = () => setAwardList([...awardList, { id: Date.now(), name: '', from: '' }]);
  const removeAward = (id: number) => setAwardList(awardList.filter(item => item.id !== id));

  const addCert = () => setCertList([...certList, { id: Date.now(), name: '', from: '' }]);
  const removeCert = (id: number) => setCertList(certList.filter(item => item.id !== id));

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Common input class for consistent styling
  const inputClass = "w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 transition-all bg-white text-slate-800 placeholder:text-slate-800";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 text-slate-500 mb-1 cursor-pointer hover:text-slate-800" onClick={onCancel}>
             <span className="text-sm">Doctor</span>
             <span className="text-xs">/</span>
             <span className="text-sm font-medium text-slate-800">New Doctor</span>
           </div>
           <h1 className="text-2xl font-bold text-slate-800">New Doctor</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-10">
        
        {/* 1. Contact Information */}
        <section className="space-y-6">
           <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-4">Contact Information</h3>
           
           <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <div className="w-full md:w-48 shrink-0 flex flex-col gap-2">
                 <label className="text-sm font-medium text-slate-700">Profile Image</label>
                 <div className="w-32 h-32 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 hover:border-indigo-300 transition-colors relative overflow-hidden group">
                    <Camera className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs">Upload</span>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                 </div>
              </div>

              {/* Fields Grid */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Name <span className="text-red-500">*</span></label>
                    <input type="text" className={inputClass} placeholder="First Name Last Name" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Username <span className="text-red-500">*</span></label>
                    <input type="text" className={inputClass} placeholder="username" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" className={inputClass} placeholder="+1 234 567 890" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" className={inputClass} placeholder="email@example.com" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">DOB <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <input type="text" placeholder="dd/mm/yyyy" className={inputClass} />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Year Of Experience <span className="text-red-500">*</span></label>
                    <input type="number" className={inputClass} placeholder="e.g. 5" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Department <span className="text-red-500">*</span></label>
                    <select className={inputClass}>
                        <option>Select</option>
                        <option>Cardiology</option>
                        <option>Neurology</option>
                        <option>Orthopedics</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Designation <span className="text-red-500">*</span></label>
                    <select className={inputClass}>
                        <option>Select</option>
                        <option>Senior Consultant</option>
                        <option>Junior Resident</option>
                        <option>Specialist</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Medical License Number <span className="text-red-500">*</span></label>
                    <input type="text" className={inputClass} placeholder="MED-XXXX-XXXX" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Language Spoken</label>
                    <input type="text" placeholder="English, French" className={inputClass} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Blood Group <span className="text-red-500">*</span></label>
                    <select className={inputClass}>
                        <option>Select</option>
                        <option>A+</option>
                        <option>B+</option>
                        <option>O+</option>
                        <option>AB+</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Gender <span className="text-red-500">*</span></label>
                    <select className={inputClass}>
                        <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                 </div>
                 <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-slate-700">Bio</label>
                    <textarea rows={4} placeholder="About Doctor" className={`${inputClass} resize-none`}></textarea>
                 </div>
                 
                 <div className="md:col-span-2 flex items-center gap-3">
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        <span className="ml-3 text-sm font-medium text-slate-700">Feature On Website</span>
                     </label>
                 </div>
              </div>
           </div>
        </section>

        {/* 2. Address Information */}
        <section className="space-y-6">
           <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-4">Address Information</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Address 1</label>
                  <input type="text" className={inputClass} placeholder="Street Address" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Address 2</label>
                  <input type="text" className={inputClass} placeholder="Apartment, Suite, Unit" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Country</label>
                  <select className={inputClass}>
                      <option>Select</option>
                      <option>USA</option>
                      <option>India</option>
                      <option>UK</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">City</label>
                  <select className={inputClass}>
                      <option>Select</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">State</label>
                  <select className={inputClass}>
                      <option>Select</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Pincode</label>
                  <input type="text" className={inputClass} placeholder="ZIP Code" />
               </div>
           </div>
        </section>

        {/* 3. Schedule / Availability */}
        <section className="space-y-6">
            <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-4">Availability Schedule</h3>
            
            {/* Days Tabs */}
            <div className="flex flex-wrap gap-2">
                {weekDays.map(day => (
                    <button 
                        key={day}
                        onClick={() => setActiveDay(day)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            activeDay === day 
                            ? 'bg-indigo-600 text-white shadow-md' 
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full space-y-2">
                    <label className="text-sm font-medium text-slate-700">Session</label>
                    <select className={inputClass}>
                        <option>Select</option>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                    </select>
                </div>
                <div className="flex-1 w-full space-y-2">
                    <label className="text-sm font-medium text-slate-700">From</label>
                    <div className="relative">
                        <input type="text" placeholder="09:00 AM" className={inputClass} />
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                </div>
                <div className="flex-1 w-full space-y-2">
                    <label className="text-sm font-medium text-slate-700">To</label>
                    <div className="relative">
                        <input type="text" placeholder="05:00 PM" className={inputClass} />
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                </div>
                <button className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors h-[42px] w-[42px] flex items-center justify-center shrink-0">
                    <Plus className="w-5 h-5" />
                </button>
            </div>
            
            <div>
               <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                  Apply All
               </button>
            </div>
        </section>

        {/* 4. Appointment Information */}
        <section className="space-y-6">
           <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-4">Appointment Settings</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700">Appointment Type</label>
                  <select className={inputClass}>
                      <option>Select</option>
                      <option>In-Person</option>
                      <option>Online</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Accept bookings (in Advance)</label>
                  <div className="relative">
                      <input type="number" className={inputClass} placeholder="e.g. 7" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">Days</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Appointment Duration</label>
                  <div className="relative">
                      <input type="number" className={inputClass} placeholder="e.g. 30" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">Mins</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Consultation Charge</label>
                  <div className="relative">
                      <input type="number" className={inputClass} placeholder="e.g. 500" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Max Bookings Per Slot</label>
                  <input type="number" className={inputClass} placeholder="e.g. 1" />
               </div>
               <div className="md:col-span-2 flex items-center gap-3">
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        <span className="ml-3 text-sm font-medium text-slate-700">Display on Booking Page</span>
                     </label>
               </div>
           </div>
        </section>

        {/* 5. Educational Information */}
        <section className="space-y-6">
           <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-4">Educational Information</h3>
           <div className="space-y-4">
              {educationList.map((item, index) => (
                 <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end animate-in fade-in slide-in-from-left-2">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Educational Degree</label>
                        <input type="text" className={inputClass} placeholder="e.g. MBBS" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">University</label>
                        <input type="text" className={inputClass} placeholder="University Name" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">From</label>
                        <div className="relative">
                            <input type="text" placeholder="dd/mm/yyyy" className={inputClass} />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>
                     </div>
                     <div className="flex gap-2">
                         <div className="space-y-2 flex-1">
                            <label className="text-sm font-medium text-slate-700">To</label>
                            <div className="relative">
                                <input type="text" placeholder="dd/mm/yyyy" className={inputClass} />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            </div>
                         </div>
                         {index > 0 && (
                             <button onClick={() => removeEducation(item.id)} className="mb-1 p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                                 <Trash2 className="w-5 h-5" />
                             </button>
                         )}
                     </div>
                 </div>
              ))}
              <button onClick={addEducation} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                  <Plus className="w-5 h-5" />
              </button>
           </div>
        </section>

        {/* 6. Awards & Recognition */}
        <section className="space-y-6">
           <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-4">Awards & Recognition</h3>
           <div className="space-y-4">
              {awardList.map((item, index) => (
                 <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end animate-in fade-in slide-in-from-left-2">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Name</label>
                        <input type="text" className={inputClass} placeholder="Award Name" />
                     </div>
                     <div className="flex gap-2">
                         <div className="space-y-2 flex-1">
                            <label className="text-sm font-medium text-slate-700">From</label>
                            <div className="relative">
                                <input type="text" placeholder="dd/mm/yyyy" className={inputClass} />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            </div>
                         </div>
                         {index > 0 && (
                             <button onClick={() => removeAward(item.id)} className="mb-1 p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                                 <Trash2 className="w-5 h-5" />
                             </button>
                         )}
                     </div>
                 </div>
              ))}
              <button onClick={addAward} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                  <Plus className="w-5 h-5" />
              </button>
           </div>
        </section>

        {/* 7. Certifications */}
        <section className="space-y-6">
           <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-4">Certifications</h3>
           <div className="space-y-4">
              {certList.map((item, index) => (
                 <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end animate-in fade-in slide-in-from-left-2">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Name</label>
                        <input type="text" className={inputClass} placeholder="Certification Name" />
                     </div>
                     <div className="flex gap-2">
                         <div className="space-y-2 flex-1">
                            <label className="text-sm font-medium text-slate-700">From</label>
                            <div className="relative">
                                <input type="text" placeholder="dd/mm/yyyy" className={inputClass} />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            </div>
                         </div>
                         {index > 0 && (
                             <button onClick={() => removeCert(item.id)} className="mb-1 p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                                 <Trash2 className="w-5 h-5" />
                             </button>
                         )}
                     </div>
                 </div>
              ))}
              <button onClick={addCert} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                  <Plus className="w-5 h-5" />
              </button>
           </div>
        </section>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
             <button 
               onClick={onCancel}
               className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
             >
                Cancel
             </button>
             <button 
               onClick={onSave}
               className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors flex items-center gap-2"
             >
                <Save className="w-4 h-4" />
                Add Doctor
             </button>
        </div>

      </div>
    </div>
  );
};
