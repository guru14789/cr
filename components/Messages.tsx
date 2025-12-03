import React, { useState } from 'react';
import { 
  Search, Plus, Phone, Video, Info, MoreVertical, 
  Smile, Paperclip, Send, Image as ImageIcon, Check, CheckCheck
} from 'lucide-react';
import { mockChatContacts, mockChatMessages } from '../services/mockData';
import { ChatContact, ChatMessage } from '../types';

export const Messages: React.FC = () => {
  const [contacts, setContacts] = useState<ChatContact[]>(mockChatContacts);
  const [activeContactId, setActiveContactId] = useState<string>(mockChatContacts[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: ChatMessage = {
      id: `m-${Date.now()}`,
      senderId: 'me',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Left Sidebar - Contact List */}
      <div className="w-full md:w-80 lg:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden shrink-0">
         <div className="p-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                  <img src="https://ui-avatars.com/api/?name=James+Hong&background=0d9488&color=fff" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm" />
                  <div>
                     <h3 className="font-bold text-slate-800 dark:text-white text-sm">James Hong</h3>
                     <p className="text-xs text-slate-500 dark:text-slate-400">Admin</p>
                  </div>
               </div>
               <button className="bg-[#3e49cd] hover:bg-[#323bb8] text-white p-2 rounded-lg transition-colors shadow-sm">
                  <Plus className="w-4 h-4" />
               </button>
            </div>
            
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="Search Keyword" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-100 dark:text-white"
               />
            </div>
         </div>

         <div className="flex-1 overflow-y-auto custom-scrollbar">
            <h4 className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">All Messages</h4>
            <div className="space-y-1 px-3">
               {filteredContacts.map(contact => (
                  <div 
                    key={contact.id} 
                    onClick={() => setActiveContactId(contact.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${activeContactId === contact.id ? 'bg-primary-50 dark:bg-primary-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                  >
                     <div className="relative shrink-0">
                        <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-xl" />
                        <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white dark:border-slate-800 rounded-full ${contact.status === 'Online' ? 'bg-emerald-500' : contact.status === 'Busy' ? 'bg-amber-500' : 'bg-slate-400'}`}></span>
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                           <h4 className={`text-sm ${activeContactId === contact.id ? 'font-bold text-primary-900 dark:text-primary-400' : 'font-semibold text-slate-800 dark:text-white'}`}>{contact.name}</h4>
                           <span className="text-[10px] text-slate-400">{contact.lastMessageTime}</span>
                        </div>
                        <p className={`text-xs truncate ${activeContactId === contact.id ? 'text-primary-700 dark:text-primary-300' : 'text-slate-500 dark:text-slate-400'}`}>
                           {contact.lastMessage}
                        </p>
                     </div>
                     {contact.unreadCount > 0 && (
                        <div className="shrink-0 flex items-center justify-center">
                           <span className="bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">{contact.unreadCount}</span>
                        </div>
                     )}
                     {contact.unreadCount === 0 && activeContactId !== contact.id && (
                        <CheckCheck className="w-4 h-4 text-primary-500 mt-1" />
                     )}
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Main Chat Area */}
      <div className="hidden md:flex flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex-col overflow-hidden">
         {/* Chat Header */}
         <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
               <div className="relative">
                  <img src={activeContact.avatar} alt="" className="w-10 h-10 rounded-xl" />
                  <span className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white dark:border-slate-800 rounded-full ${activeContact.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
               </div>
               <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">{activeContact.name}</h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {activeContact.status}
                  </p>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><Phone className="w-4 h-4" /></button>
               <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><Video className="w-4 h-4" /></button>
               <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><Info className="w-4 h-4" /></button>
            </div>
         </div>

         {/* Chat Messages */}
         <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 dark:bg-slate-900/30">
            {/* Date Separator */}
            <div className="flex justify-center">
               <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">Today</span>
            </div>

            {messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} group`}>
                  {!msg.isMe && (
                     <img src={activeContact.avatar} alt="" className="w-8 h-8 rounded-full mr-3 mt-auto shadow-sm" />
                  )}
                  <div className={`max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                     <div className={`p-4 rounded-2xl shadow-sm relative ${
                        msg.isMe 
                        ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-br-none border border-slate-100 dark:border-slate-600' 
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-bl-none border border-slate-100 dark:border-slate-700'
                     }`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        {msg.attachments && (
                           <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-600 flex items-center gap-3">
                              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-500">
                                 <ImageIcon className="w-5 h-5" />
                              </div>
                              <div className="text-xs">
                                 <p className="font-bold text-slate-700 dark:text-slate-200">Logo_Design.png</p>
                                 <p className="text-slate-400">2.4 MB</p>
                              </div>
                           </div>
                        )}
                        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-black/5 rounded text-slate-400 transition-all">
                           <MoreVertical className="w-3 h-3" />
                        </button>
                     </div>
                     <div className={`flex items-center gap-1 mt-1 text-[10px] font-medium text-slate-400 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                        {msg.isMe && (
                           msg.status === 'read' 
                           ? <CheckCheck className="w-3 h-3 text-primary-500" /> 
                           : <Check className="w-3 h-3" />
                        )}
                        <span>{msg.time}</span>
                        <span>•</span>
                        <span>{msg.isMe ? 'You' : activeContact.name.split(' ')[0]}</span>
                     </div>
                  </div>
                  {msg.isMe && (
                     <img src="https://ui-avatars.com/api/?name=James+Hong&background=0d9488&color=fff" alt="" className="w-8 h-8 rounded-full ml-3 mt-auto shadow-sm" />
                  )}
               </div>
            ))}
         </div>

         {/* Input Area */}
         <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-end gap-3">
               <div className="flex gap-1 mb-2.5 text-slate-400">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><Plus className="w-5 h-5" /></button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><ImageIcon className="w-5 h-5" /></button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><Paperclip className="w-5 h-5" /></button>
               </div>
               <div className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center p-2 focus-within:ring-2 focus-within:ring-primary-100 focus-within:border-primary-300 transition-all">
                  <input 
                     type="text" 
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                     placeholder="Type Something..." 
                     className="w-full bg-transparent border-none outline-none text-sm px-3 text-slate-700 dark:text-white placeholder:text-slate-400"
                  />
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                     <Smile className="w-5 h-5" />
                  </button>
               </div>
               <button 
                  onClick={handleSendMessage}
                  className="bg-[#3e49cd] hover:bg-[#323bb8] text-white p-3.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 mb-0.5"
               >
                  <Send className="w-5 h-5" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};