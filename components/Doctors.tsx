
import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreVertical, Calendar, Plus, Filter, LayoutGrid, List, 
  X, CheckCircle, Search, Mail, Phone, User, Stethoscope, 
  Trash2, Edit, ChevronDown, Star
} from 'lucide-react';
import { mockDoctors } from '../services/mockData';
import { Doctor } from '../types';

interface DoctorsProps {
  onScheduleClick?: (doctorId: string) => void;
  onDoctorClick?: (doctorId: string) => void;
  onAddDoctor?: () => void;
}

export const Doctors: React.FC<DoctorsProps> = ({ onScheduleClick, onDoctorClick, onAddDoctor }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Filter State
  const [showFilters, setShowFilters] = useState(false);
  const [filterSpecialty, setFilterSpecialty] = useState('All');
  const [filterAvailability, setFilterAvailability] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Add/Edit Modal State (Keeping for Edit, but Add now goes to page)
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentDoctor, setCurrentDoctor] = useState<Partial<Doctor>>({
    name: '', specialty: '', department: '', email: '', phone: '', availability: 'Available', fee: 500
  });

  // Action Menu State
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Handlers ---

  const handleAddNew = () => {
    if (onAddDoctor) {
      onAddDoctor();
    } else {
      setModalMode('add');
      setCurrentDoctor({
        name: '', specialty: '', department: '', email: '', phone: '', availability: 'Available', fee: 500,
        image: `https://ui-avatars.com/api/?name=New+Doc&background=random`
      });
      setShowModal(true);
    }
  };

  const handleEdit = (doc: Doctor) => {
    setModalMode('edit');
    setCurrentDoctor({ ...doc });
    setShowModal(true);
    setOpenMenuId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this doctor?')) {
      setDoctors(prev => prev.filter(d => d.id !== id));
    }
    setOpenMenuId(null);
  };

  const handleSave = () => {
    if (!currentDoctor.name || !currentDoctor.specialty) return;

    if (modalMode === 'add') {
      const newDoc: Doctor = {
        id: `DOC-${Date.now()}`,
        name: currentDoctor.name,
        specialty: currentDoctor.specialty,
        department: currentDoctor.department || 'General',
        email: currentDoctor.email || '',
        phone: currentDoctor.phone || '',
        availability: (currentDoctor.availability as any) || 'Available',
        rating: 5.0,
        patientsCount: 0,
        image: currentDoctor.image || `https://ui-avatars.com/api/?name=${currentDoctor.name}&background=random`,
        fee: currentDoctor.fee,
        availableDate: 'Tomorrow'
      };
      setDoctors(prev => [newDoc, ...prev]);
    } else {
      setDoctors(prev => prev.map(d => d.id === currentDoctor.id ? { ...d, ...currentDoctor } as Doctor : d));
    }
    setShowModal(false);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const moreDoctors = mockDoctors.map((d, i) => ({
        ...d,
        id: `DOC-MORE-${Date.now()}-${i}`,
        name: `${d.name} (Copy)`
      }));
      setDoctors(prev => [...prev, ...moreDoctors]);
      setIsLoadingMore(false);
    }, 1000);
  };

  // --- Filtering ---
  
  const specialties = ['All', ...Array.from(new Set(mockDoctors.map(d => d.specialty)))];
  const availabilities = ['All', 'Available', 'In Surgery', 'On Leave', 'Off Duty'];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSpecialty = filterSpecialty === 'All' || doc.specialty === filterSpecialty;
    const matchAvailability = filterAvailability === 'All' || doc.availability === filterAvailability;
    return matchesSearch && matchSpecialty && matchAvailability;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          {/* Left Side */}
          <div className="flex items-center gap-4 mt-1">
             <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Doctors Directory</h1>
             <span className="bg-primary-50 dark:bg-primary-900/30 text-primary dark:text-primary-400 px-4 py-1.5 rounded-full text-sm font-bold border border-primary-100 dark:border-primary-800">
               Total: {doctors.length}
             </span>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-4 w-full lg:w-auto">
             <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 lg:flex-none">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <input
                     type="text"
                     placeholder="Search doctors..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full lg:w-64 pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 shadow-sm transition-all"
                   />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-colors ${showFilters ? 'bg-primary-50 border-primary-200 text-primary' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                   <Filter className="w-4 h-4" /> Filters
                </button>

                <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm">
                   <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary-50 dark:bg-slate-700 text-primary dark:text-primary-400 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                   >
                      <LayoutGrid className="w-4 h-4" />
                   </button>
                   <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary-50 dark:bg-slate-700 text-primary dark:text-primary-400 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                   >
                      <List className="w-4 h-4" />
                   </button>
                </div>
             </div>

             <div className="flex justify-start">
                 <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-700 text-white rounded-xl text-sm font-medium shadow-lg shadow-primary-500/20 transition-all transform hover:scale-105"
                 >
                   <Plus className="w-4 h-4 stroke-[3]" /> New Doctor
                 </button>
             </div>
          </div>
      </div>

      {/* Expandable Filter Bar */}
      {showFilters && (
           <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-soft animate-in fade-in slide-in-from-top-2 flex flex-wrap gap-4 items-center">
              <div className="flex flex-col gap-1">
                 <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Specialty</label>
                 <select 
                   value={filterSpecialty}
                   onChange={(e) => setFilterSpecialty(e.target.value)}
                   className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary-500 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
                 >
                   {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
              </div>
              <div className="flex flex-col gap-1">
                 <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Availability</label>
                 <select 
                   value={filterAvailability}
                   onChange={(e) => setFilterAvailability(e.target.value)}
                   className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary-500 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
                 >
                   {availabilities.map(a => <option key={a} value={a}>{a}</option>)}
                 </select>
              </div>
              
              <button 
                onClick={() => { setFilterSpecialty('All'); setFilterAvailability('All'); setSearchQuery(''); }}
                className="mt-auto px-3 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors ml-auto"
              >
                Reset
              </button>
           </div>
        )}

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <div 
              key={doctor.id} 
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-5 hover:shadow-lg transition-all flex gap-5 items-start group relative cursor-pointer hover:-translate-y-1 duration-300"
              onClick={() => onDoctorClick?.(doctor.id)}
            >
              {/* Left Image */}
              <div className="w-24 h-28 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden shrink-0 relative shadow-sm group-hover:shadow-md transition-shadow">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  <div className={`absolute top-2 left-2 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 shadow-sm
                    ${doctor.availability === 'Available' ? 'bg-emerald-500' : 
                      doctor.availability === 'In Surgery' ? 'bg-blue-500' : 'bg-slate-400'}`} 
                  />
              </div>
              
              {/* Right Content */}
              <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0">
                        <h3 className="font-bold text-slate-800 dark:text-white text-base truncate pr-2 group-hover:text-primary transition-colors">{doctor.name}</h3>
                        <p className="text-primary-600 dark:text-primary-400 text-xs font-medium truncate uppercase tracking-wide">{doctor.specialty}</p>
                    </div>
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === doctor.id ? null : doctor.id)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 -mt-1 -mr-2 p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                          <MoreVertical className="w-4 h-4" />
                      </button>
                      {/* Dropdown Menu */}
                      {openMenuId === doctor.id && (
                        <div ref={menuRef} className="absolute right-0 top-8 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                          <button onClick={() => handleEdit(doctor)} className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors">
                            <Edit className="w-3 h-3" /> Edit
                          </button>
                          <button onClick={() => handleDelete(doctor.id)} className="w-full text-left px-4 py-2.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2 transition-colors">
                            <Trash2 className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="text-xs">
                        <div className="flex items-center gap-1 mb-1.5">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-slate-800 dark:text-white">{doctor.rating}</span>
                          <span className="text-slate-400">({doctor.patientsCount}+ Patients)</span>
                        </div>
                        <p className="text-slate-400 font-medium text-[10px] uppercase tracking-wide">Next Available</p>
                        <p className="text-slate-700 dark:text-slate-300 font-bold">{doctor.availableDate || 'Mon, 20 Jan 2025'}</p>
                    </div>
                    
                    <div className="flex justify-between items-end border-t border-dashed border-slate-100 dark:border-slate-700 pt-3">
                        <div>
                          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wide">Consultation</p>
                          <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">${doctor.fee}</p>
                        </div>
                        <button 
                          onClick={(e) => {
                             e.stopPropagation();
                             onScheduleClick?.(doctor.id);
                          }}
                          className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-primary dark:hover:bg-primary hover:scale-110 transition-all shadow-sm"
                          title="View Schedule"
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 overflow-hidden">
           {filteredDoctors.map((doctor, idx) => (
             <div 
               key={doctor.id} 
               onClick={() => onDoctorClick?.(doctor.id)}
               className={`p-4 flex flex-col md:flex-row items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group ${idx !== filteredDoctors.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}
             >
                 <div className="flex items-center gap-4 flex-1 w-full">
                    <img src={doctor.image} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700" />
                    <div>
                       <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">{doctor.name}</h4>
                       <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{doctor.specialty} • {doctor.department}</p>
                    </div>
                 </div>
                 
                 <div className="flex items-center justify-between w-full md:w-auto gap-8">
                    <div className="text-center md:text-left w-24">
                       <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Rating</p>
                       <p className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 justify-center md:justify-start">
                         <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {doctor.rating}
                       </p>
                    </div>
                    <div className="text-center md:text-left w-24">
                       <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Fee</p>
                       <p className="font-bold text-slate-700 dark:text-slate-300">${doctor.fee}</p>
                    </div>
                    <div className="text-center md:text-left w-28">
                       <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide mb-1">Status</p>
                       <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          doctor.availability === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                          doctor.availability === 'In Surgery' ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-400'
                       }`}>
                          {doctor.availability}
                       </span>
                    </div>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                       <button onClick={() => onScheduleClick?.(doctor.id)} className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-primary-400 transition-colors">
                          <Calendar className="w-4 h-4" />
                       </button>
                       <button onClick={() => handleDelete(doctor.id)} className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
             </div>
           ))}
        </div>
      )}

      {/* Load More Button */}
      {filteredDoctors.length > 0 && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all disabled:opacity-70"
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
            {isLoadingMore ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
      
      {filteredDoctors.length === 0 && (
         <div className="text-center py-16 text-slate-500">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-300 dark:text-slate-600" />
            </div>
            <p className="font-medium">No doctors found matching your filters.</p>
         </div>
      )}

      {/* Edit Modal (Still useful for quick edits) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 dark:border-slate-800">
              <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
                 <h2 className="font-bold text-lg text-slate-800 dark:text-white">{modalMode === 'add' ? 'Add New Doctor' : 'Edit Doctor'}</h2>
                 <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
                 <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name <span className="text-rose-500">*</span></label>
                       <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="text" 
                            value={currentDoctor.name} 
                            onChange={e => setCurrentDoctor(prev => ({...prev, name: e.target.value}))}
                            className="w-full pl-9 p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 bg-slate-50/50 dark:bg-slate-900 text-slate-800 dark:text-white transition-all text-sm"
                            placeholder="Dr. Name"
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Specialty <span className="text-rose-500">*</span></label>
                       <div className="relative">
                          <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <select
                            value={currentDoctor.specialty}
                            onChange={e => setCurrentDoctor(prev => ({...prev, specialty: e.target.value}))}
                            className="w-full pl-9 p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 bg-slate-50/50 dark:bg-slate-900 text-slate-800 dark:text-white transition-all text-sm"
                          >
                             <option value="">Select...</option>
                             {specialties.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                             <option value="General Physician">General Physician</option>
                             <option value="Surgeon">Surgeon</option>
                          </select>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-5 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-900 mt-auto">
                 <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm font-bold transition-colors">Cancel</button>
                 <button 
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-primary hover:bg-primary-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-500/20 transition-all hover:scale-105 flex items-center gap-2"
                 >
                    <CheckCircle className="w-4 h-4" />
                    Save Doctor
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
