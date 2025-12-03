
import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, MoreVertical, MapPin, Building, Edit2, Trash2, X, CheckCircle, Save, Camera } from 'lucide-react';
import { mockLocations } from '../services/mockData';
import { ClinicLocation } from '../types';

export const Locations: React.FC = () => {
  const [locations, setLocations] = useState<ClinicLocation[]>(mockLocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentLocation, setCurrentLocation] = useState<Partial<ClinicLocation>>({
    name: '', address: '', isDefault: false
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = locations.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    loc.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      setLocations(prev => prev.filter(l => l.id !== id));
    }
    setOpenMenuId(null);
  };

  const handleEditClick = (loc: ClinicLocation) => {
    setModalMode('edit');
    setCurrentLocation({ ...loc });
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleAddClick = () => {
    setModalMode('add');
    setCurrentLocation({ 
        name: '', 
        address: '', 
        isDefault: false,
        image: `https://ui-avatars.com/api/?name=New+Clinic&background=random`
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!currentLocation.name || !currentLocation.address) return;

    if (modalMode === 'add') {
        const newLoc: ClinicLocation = {
            id: Date.now().toString(),
            name: currentLocation.name!,
            address: currentLocation.address!,
            isDefault: currentLocation.isDefault || false,
            image: currentLocation.image || `https://ui-avatars.com/api/?name=${currentLocation.name}&background=random`
        };
        setLocations(prev => [newLoc, ...prev]);
    } else {
        setLocations(prev => prev.map(l => l.id === currentLocation.id ? { ...l, ...currentLocation } as ClinicLocation : l));
    }
    setIsModalOpen(false);
  };

  const inputClass = "w-full p-2.5 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-100 bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-all";
  const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Locations</h1>
           <span className="bg-primary-50 dark:bg-primary-900/30 text-primary dark:text-primary-400 px-3 py-1 rounded-full text-xs font-bold border border-primary-100 dark:border-primary-800">
               Total Location : {locations.length}
           </span>
        </div>
        <button 
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg shadow-md transition-colors"
        >
           <Plus className="w-4 h-4" /> New Location
        </button>
      </div>

      {/* Search & Toolbar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
               type="text" 
               placeholder="Search..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-100 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white"
            />
         </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                     <th className="px-6 py-4">Clinic Name</th>
                     <th className="px-6 py-4">Address</th>
                     <th className="px-6 py-4 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredLocations.map(loc => (
                     <tr key={loc.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <img src={loc.image} alt={loc.name} className="w-10 h-10 rounded-full" />
                              <div className="flex items-center gap-2">
                                 <span className="font-bold text-slate-800 dark:text-white text-sm">{loc.name}</span>
                                 {loc.isDefault && (
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold rounded border border-green-200 dark:border-green-800">Default</span>
                                 )}
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                           {loc.address}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="relative inline-block text-left">
                               <button 
                                 onClick={(e) => {
                                     e.stopPropagation();
                                     setOpenMenuId(openMenuId === loc.id ? null : loc.id);
                                 }}
                                 className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                               >
                                  <MoreVertical className="w-4 h-4" />
                               </button>
                               
                               {openMenuId === loc.id && (
                                  <div 
                                    ref={menuRef}
                                    className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 z-50 animate-in fade-in zoom-in-95 duration-200"
                                  >
                                      <button 
                                        onClick={() => handleEditClick(loc)}
                                        className="w-full text-left px-4 py-2.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 first:rounded-t-lg"
                                      >
                                        <Edit2 className="w-3 h-3" /> Edit
                                      </button>
                                      <button 
                                        onClick={() => handleDelete(loc.id)}
                                        className="w-full text-left px-4 py-2.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 last:rounded-b-lg"
                                      >
                                        <Trash2 className="w-3 h-3" /> Delete
                                      </button>
                                  </div>
                               )}
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredLocations.length === 0 && (
                      <tr>
                          <td colSpan={3} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                              No locations found.
                          </td>
                      </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
              <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                 <h2 className="font-bold text-lg text-slate-800 dark:text-white">
                    {modalMode === 'add' ? 'New Location' : 'Edit Location'}
                 </h2>
                 <button onClick={() => setIsModalOpen(false)} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              <div className="p-6 space-y-4">
                  <div className="flex justify-center mb-4">
                      <div className="relative group cursor-pointer">
                          <img 
                            src={currentLocation.image} 
                            alt="Clinic" 
                            className="w-20 h-20 rounded-full object-cover border-2 border-slate-100 dark:border-slate-600"
                          />
                          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Camera className="w-6 h-6 text-white" />
                          </div>
                      </div>
                  </div>

                  <div className="space-y-2">
                      <label className={labelClass}>Clinic Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        value={currentLocation.name}
                        onChange={(e) => setCurrentLocation(prev => ({...prev, name: e.target.value}))}
                        className={inputClass} 
                        placeholder="e.g. City Care Clinic" 
                      />
                  </div>
                  <div className="space-y-2">
                      <label className={labelClass}>Address <span className="text-red-500">*</span></label>
                      <textarea 
                        value={currentLocation.address}
                        onChange={(e) => setCurrentLocation(prev => ({...prev, address: e.target.value}))}
                        className={`${inputClass} resize-none`} 
                        rows={3} 
                        placeholder="Street, City, State..."
                      ></textarea>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={currentLocation.isDefault}
                            onChange={(e) => setCurrentLocation(prev => ({...prev, isDefault: e.target.checked}))}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">Set as Default Location</span>
                     </label>
                  </div>
              </div>
              <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2 bg-slate-50 dark:bg-slate-900">
                 <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">Cancel</button>
                 <button 
                    onClick={handleSave}
                    className="px-6 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
                 >
                    <Save className="w-4 h-4" />
                    Save Location
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
