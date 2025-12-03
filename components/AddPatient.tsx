
import React, { useState } from 'react';
import { 
  User, Calendar, Phone, Mail, MapPin, Shield, AlertCircle, 
  Activity, Save, X, Plus, Heart, FileText, CheckCircle
} from 'lucide-react';

interface AddPatientProps {
  onCancel?: () => void;
  onSave?: () => void;
}

export const AddPatient: React.FC<AddPatientProps> = ({ onCancel, onSave }) => {
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = () => {
    // In a real app, validation and API call here
    setNotification('Patient registered successfully!');
    setTimeout(() => {
        if (onSave) onSave();
    }, 1500);
  };

  const inputClass = "w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-all bg-slate-50/50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400";
  const sectionHeaderClass = "font-bold text-slate-800 dark:text-white text-lg border-b border-slate-100 dark:border-slate-800 pb-4 mb-6 flex items-center gap-2";
  const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-right-10 duration-300">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
           <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 transition-colors" onClick={onCancel}>
             <span className="text-sm">Patients</span>
             <span className="text-xs">/</span>
             <span className="text-sm font-medium text-primary">Registration</span>
           </div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Register New Patient</h1>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-6 md:p-8 space-y-8">
        
        {/* 1. Demographic Info */}
        <section>
           <h3 className={sectionHeaderClass}>
              <User className="w-5 h-5 text-primary" /> Patient Demographics
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                 <label className={labelClass}>First Name <span className="text-rose-500">*</span></label>
                 <input type="text" className={inputClass} placeholder="John" />
              </div>
              <div>
                 <label className={labelClass}>Last Name <span className="text-rose-500">*</span></label>
                 <input type="text" className={inputClass} placeholder="Doe" />
              </div>
              <div>
                 <label className={labelClass}>Date of Birth <span className="text-rose-500">*</span></label>
                 <div className="relative">
                    <input type="date" className={inputClass} />
                 </div>
              </div>
              <div>
                 <label className={labelClass}>Gender <span className="text-rose-500">*</span></label>
                 <select className={inputClass}>
                    <option>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                 </select>
              </div>
               <div>
                 <label className={labelClass}>Marital Status</label>
                 <select className={inputClass}>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                    <option>Widowed</option>
                 </select>
              </div>
              <div>
                 <label className={labelClass}>Occupation</label>
                 <input type="text" className={inputClass} placeholder="Software Engineer" />
              </div>
           </div>
        </section>

        {/* 2. Contact Information */}
        <section>
           <h3 className={sectionHeaderClass}>
              <Phone className="w-5 h-5 text-emerald-500" /> Contact Information
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className={labelClass}>Primary Phone <span className="text-rose-500">*</span></label>
                 <div className="relative">
                    <input type="tel" className={inputClass} placeholder="+91 98765 43210" />
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 </div>
              </div>
              <div>
                 <label className={labelClass}>Email Address</label>
                 <div className="relative">
                    <input type="email" className={inputClass} placeholder="john.doe@example.com" />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 </div>
              </div>
              <div className="md:col-span-2">
                 <label className={labelClass}>Residential Address</label>
                 <textarea className={`${inputClass} resize-none h-24`} placeholder="Full address including flat/house number"></textarea>
              </div>
              <div>
                 <label className={labelClass}>City</label>
                 <input type="text" className={inputClass} placeholder="Mumbai" />
              </div>
              <div>
                 <label className={labelClass}>State</label>
                 <input type="text" className={inputClass} placeholder="Maharashtra" />
              </div>
              <div>
                 <label className={labelClass}>Pincode</label>
                 <input type="text" className={inputClass} placeholder="400001" />
              </div>
              <div>
                 <label className={labelClass}>Emergency Contact Name</label>
                 <input type="text" className={inputClass} placeholder="Relative Name" />
              </div>
              <div>
                 <label className={labelClass}>Emergency Contact Phone</label>
                 <input type="tel" className={inputClass} placeholder="+91 98765 43210" />
              </div>
           </div>
        </section>

        {/* 3. Medical Profile */}
        <section>
           <h3 className={sectionHeaderClass}>
              <Activity className="w-5 h-5 text-rose-500" /> Medical Profile
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className={labelClass}>Blood Group</label>
                 <select className={inputClass}>
                    <option>Unknown</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                 </select>
              </div>
              <div>
                 <label className={labelClass}>Height (cm)</label>
                 <input type="number" className={inputClass} placeholder="175" />
              </div>
              <div>
                 <label className={labelClass}>Weight (kg)</label>
                 <input type="number" className={inputClass} placeholder="70" />
              </div>
              <div>
                 <label className={labelClass}>Known Allergies</label>
                 <input type="text" className={inputClass} placeholder="Peanuts, Penicillin..." />
              </div>
              <div className="md:col-span-2">
                 <label className={labelClass}>Chronic Conditions / Medical History</label>
                 <textarea className={`${inputClass} resize-none h-24`} placeholder="Diabetes, Hypertension, previous surgeries..."></textarea>
              </div>
           </div>
        </section>

        {/* 4. Insurance Details */}
        <section>
           <h3 className={sectionHeaderClass}>
              <Shield className="w-5 h-5 text-sky-500" /> Insurance & Billing
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className={labelClass}>Insurance Provider</label>
                 <input type="text" className={inputClass} placeholder="e.g. Star Health" />
              </div>
              <div>
                 <label className={labelClass}>Policy Number</label>
                 <input type="text" className={inputClass} placeholder="Policy #123456789" />
              </div>
              <div>
                 <label className={labelClass}>Referral Source</label>
                 <select className={inputClass}>
                    <option>Direct Walk-in</option>
                    <option>Doctor Referral</option>
                    <option>Website</option>
                    <option>Social Media</option>
                 </select>
              </div>
           </div>
        </section>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-slate-100 dark:border-slate-800 sticky bottom-0 bg-white dark:bg-slate-800 pb-0 z-10">
             <button 
               onClick={onCancel}
               className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
             >
                Cancel
             </button>
             <button 
               onClick={handleSave}
               className="px-6 py-2.5 bg-primary hover:bg-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/30 transition-all hover:scale-105 flex items-center gap-2"
             >
                <Save className="w-4 h-4" />
                Register Patient
             </button>
        </div>

      </div>
    </div>
  );
};
