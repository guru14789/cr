import { Patient, Appointment, Lead, PatientStatus, TagType, Doctor, Campaign, PaymentMode, LeaveRequest, Department, Staff, PayrollRecord, ClinicLocation, Specialization, Transaction, Invoice, ReportItem, Service, Asset, ChatContact, ChatMessage } from '../types';

// Helper to get dates relative to today
const getRelativeDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

const today = getRelativeDate(0);
const tomorrow = getRelativeDate(1);
const yesterday = getRelativeDate(-1);
const lastWeek = getRelativeDate(-7);

export const mockChatContacts: ChatContact[] = [
  { id: '1', name: 'Mark Smith', role: 'Online', avatar: 'https://ui-avatars.com/api/?name=Mark+Smith&background=dcfce7&color=166534', status: 'Online', lastMessage: 'Perfect! That layout will work great...', lastMessageTime: '10:05 AM', unreadCount: 0 },
  { id: '2', name: 'Eugene Sikora', role: 'Away', avatar: 'https://ui-avatars.com/api/?name=Eugene+Sikora&background=dbeafe&color=1e40af', status: 'Busy', lastMessage: 'How are your Today', lastMessageTime: '08:26 AM', unreadCount: 5 },
  { id: '3', name: 'Robert Fassett', role: 'Offline', avatar: 'https://ui-avatars.com/api/?name=Robert+Fassett&background=fee2e2&color=991b1b', status: 'Offline', lastMessage: 'Here are some of ver...', lastMessageTime: 'yesterday', unreadCount: 5 },
  { id: '4', name: 'Andrew Fletcher', role: 'Online', avatar: 'https://ui-avatars.com/api/?name=Andrew+Fletcher&background=ffedd5&color=9a3412', status: 'Online', lastMessage: 'Use tools like Trello...', lastMessageTime: 'yesterday', unreadCount: 0 },
  { id: '5', name: 'Tyron Derby', role: 'Online', avatar: 'https://ui-avatars.com/api/?name=Tyron+Derby&background=f3e8ff&color=6b21a8', status: 'Online', lastMessage: "Let's reconvene next...", lastMessageTime: '12:55 PM', unreadCount: 0 },
  { id: '6', name: 'Anna Johnson', role: 'Online', avatar: 'https://ui-avatars.com/api/?name=Anna+Johnson&background=ccfbf1&color=0f766e', status: 'Online', lastMessage: 'How are your Today', lastMessageTime: '12:54 PM', unreadCount: 0 },
];

export const mockChatMessages: ChatMessage[] = [
  { id: 'm1', senderId: '1', text: 'Hey mark! Did you check out the new logo design?', time: '02:39 PM', isMe: false, status: 'read' },
  { id: 'm2', senderId: 'me', text: 'Not yet. Can you send it here?', time: '02:39 PM', isMe: true, status: 'read' },
  { id: 'm3', senderId: '1', text: 'Sure! Please check the below logo Attached!!!', time: '02:39 PM', isMe: false, status: 'read', attachments: ['logo_v1.png'] },
  { id: 'm4', senderId: 'me', text: 'Looks clean! I like the font. Maybe try a slightly darker blue?', time: '10:00 AM', isMe: true, status: 'read' },
  { id: 'm5', senderId: '1', text: 'Perfect! That layout will work great on the landing page. 👍', time: '10:05 AM', isMe: false, status: 'read' },
];

export const mockPatients: Patient[] = [
  { 
    id: 'UHID-1001', 
    abhaId: '91-2345-6789-0001',
    name: 'Rajesh Kumar', 
    age: 45, 
    gender: 'Male', 
    phone: '+91 98765 43210', 
    email: 'rajesh.k@gmail.com', 
    lastVisit: yesterday, 
    status: PatientStatus.Active, 
    tags: [TagType.VIP, TagType.Insurance], 
    condition: 'Hypertension',
    bloodType: 'O+',
    address: 'B-104, Palm Heights, Andheri West',
    city: 'Mumbai',
    allergies: ['Sulfa Drugs'],
    medications: ['Telma 40mg', 'EcoSprin 75'],
    insuranceProvider: 'Star Health',
    timeline: [
      { id: 't1', date: yesterday, type: 'Visit', title: 'Cardiology Follow-up', description: 'Regular checkup. BP 130/85. Diet control advised.', performedBy: 'Dr. Anjali Desai' },
      { id: 't2', date: getRelativeDate(-2), type: 'WhatsApp', title: 'Appointment Reminder', description: 'Automated reminder sent for 10:00 AM visit.', performedBy: 'System' },
      { id: 't3', date: getRelativeDate(-5), type: 'Lab', title: 'Lipid Profile', description: 'Samples collected via Home Collection.', performedBy: 'Metropolis Lab' }
    ],
    documents: [
      { id: 'd1', name: 'Lab_Report_Lipid.pdf', type: 'PDF', date: getRelativeDate(-5), size: '1.2 MB' },
      { id: 'd2', name: 'ECG_Strip.jpg', type: 'Image', date: getRelativeDate(-30), size: '5 MB' }
    ],
    invoices: [
      { id: 'INV-2023-001', date: yesterday, amount: 1500, status: 'Paid', items: ['Consultation', 'ECG'], mode: PaymentMode.UPI },
      { id: 'INV-2023-055', date: getRelativeDate(-60), amount: 800, status: 'Paid', items: ['Consultation'], mode: PaymentMode.Cash }
    ]
  },
  { 
    id: 'UHID-1002', 
    abhaId: '91-8888-7777-1234',
    name: 'Priya Sharma', 
    age: 28, 
    gender: 'Female', 
    phone: '+91 99887 76655', 
    email: 'priya.s@outlook.com', 
    lastVisit: today, 
    status: PatientStatus.Active, 
    tags: [TagType.Corporate], 
    condition: 'PCOS',
    bloodType: 'B+',
    address: 'Sector 45, Gurgaon',
    timeline: [
        { id: 't4', date: today, type: 'Visit', title: 'Gynaecology Review', description: 'Ultrasound reviewed.', performedBy: 'Dr. Meera Gupta' }
    ],
    invoices: [
      { id: 'INV-2023-090', date: today, amount: 2000, status: 'Pending', items: ['Consultation', 'USG Pelvis'] }
    ]
  },
  { id: 'UHID-1003', name: 'Amit Patel', age: 62, gender: 'Male', phone: '+91 91234 56789', email: 'amit.patel@yahoo.in', lastVisit: getRelativeDate(-10), status: PatientStatus.Discharged, tags: [TagType.Chronic], condition: 'Diabetes Type 2', city: 'Ahmedabad' },
  { id: 'UHID-1004', name: 'Sita Verma', age: 70, gender: 'Female', phone: '+91 90000 11111', email: 'sita.v@gmail.com', lastVisit: today, status: PatientStatus.IPD_Admitted, tags: [TagType.Insurance], condition: 'Knee Replacement Recovery', city: 'Delhi' },
  { id: 'UHID-1005', name: 'Vikram Singh', age: 35, gender: 'Male', phone: '+91 98989 89898', email: 'vikram.singh@tech.com', lastVisit: today, status: PatientStatus.Active, tags: [], condition: 'Viral Fever', city: 'Bangalore' },
];

export const mockAppointments: Appointment[] = [
  { id: 'APT-101', patientId: 'UHID-1001', patientName: 'Rajesh Kumar', doctorName: 'Dr. Anjali Desai', department: 'Cardiology', date: today, time: '09:00 AM', duration: 15, status: 'Completed', type: 'In-Person', notes: 'Review BP logs' },
  { id: 'APT-102', patientId: 'UHID-1004', patientName: 'Sita Verma', doctorName: 'Dr. Kabir Khan', department: 'Orthopedics', date: today, time: '10:30 AM', duration: 30, status: 'Checked-In', type: 'Follow-up', notes: 'Post-op check' },
  { id: 'APT-103', patientId: 'UHID-1002', patientName: 'Priya Sharma', doctorName: 'Dr. Meera Gupta', department: 'Gynaecology', date: today, time: '11:00 AM', duration: 20, status: 'Scheduled', type: 'Telemedicine' },
  { id: 'APT-104', patientId: 'UHID-1005', patientName: 'Vikram Singh', doctorName: 'Dr. Anjali Desai', department: 'General Medicine', date: today, time: '02:00 PM', duration: 15, status: 'Scheduled', type: 'Walk-In' },
  { id: 'APT-105', patientId: 'UHID-1003', patientName: 'Amit Patel', doctorName: 'Dr. Anjali Desai', department: 'Cardiology', date: tomorrow, time: '10:00 AM', duration: 15, status: 'Scheduled', type: 'In-Person' },
];

// Helper to add appointments to the memory store
export const addMockAppointment = (apt: Appointment) => {
    mockAppointments.push(apt);
};

export const mockLeads: Lead[] = [
  { id: 'LD-5001', name: 'Rahul Roy', source: 'JustDial', status: 'New', interest: 'Dental Implants', score: 85, phone: '+91 98765 00001' },
  { id: 'LD-5002', name: 'Sneha Kapoor', source: 'Practo', status: 'Contacted', interest: 'Dermatology Consult', score: 60, phone: '+91 98765 00002' },
  { id: 'LD-5003', name: 'Mohd. Irfan', source: 'Referral', status: 'Converted', interest: 'Knee Surgery', score: 95, phone: '+91 98765 00003' },
  { id: 'LD-5004', name: 'John Doe', source: 'Website', status: 'Lost', interest: 'General Checkup', score: 40, email: 'john@gmail.com' },
  { id: 'LD-5005', name: 'Anita Desai', source: 'Social Media', status: 'New', interest: 'Maternity Package', score: 75, phone: '+91 98765 00005' },
];

const commonEducation = [
  { degree: 'MBBS - Medical Science', institution: 'All India Institute of Medical Sciences (AIIMS), Delhi', year: '2005 - 2010' },
  { degree: 'MD - Specialization', institution: 'Post Graduate Institute of Medical Education and Research, Chandigarh', year: '2011 - 2014' },
];

const commonAwards = [
  { name: 'Top Doctor Award', year: '2023', description: 'Recognized by U.S. News & World Report for outstanding achievements.' },
  { name: 'Patient Choice Award', year: '2022', description: 'Awarded by Vitals.com for consistently high patient satisfaction ratings.' },
];

export const mockDoctors: Doctor[] = [
  { 
    id: 'DOC-001', name: 'Dr. Anjali Desai', specialty: 'Cardiologist', department: 'Cardiology', rating: 4.9, patientsCount: 4200, availability: 'Available', email: 'anjali.d@medicrm.in', phone: '+91 98000 98000',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea860630?auto=format&fit=crop&q=80&w=300&h=300',
    fee: 1500, availableDate: 'Mon, 20 Jan 2025',
    about: 'Dr. Anjali Desai is a renowned Cardiologist with over 12 years of experience. She specializes in interventional cardiology and has a keen interest in preventive heart care. She is known for her patient-centric approach and has treated thousands of complex cardiac cases successfully.',
    education: [...commonEducation, { degree: 'Fellowship in Interventional Cardiology', institution: 'Mount Sinai Hospital, New York', year: '2015' }],
    awards: commonAwards,
    address: '45/2, Green Avenue, Mumbai', dob: '15 Aug 1982', licenseNumber: 'MED-2010-4589', gender: 'Female'
  },
  { 
    id: 'DOC-002', name: 'Dr. Kabir Khan', specialty: 'Orthopedic Surgeon', department: 'Orthopedics', rating: 4.8, patientsCount: 3100, availability: 'In Surgery', email: 'kabir.k@medicrm.in', phone: '+91 98000 98001',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    fee: 2000, availableDate: 'Wed, 22 Jan 2025',
    about: 'Dr. Kabir Khan is a senior Orthopedic Surgeon specializing in joint replacement and sports injuries. With a decade of experience in high-volume trauma centers, he brings expertise in minimally invasive surgical techniques.',
    education: commonEducation,
    awards: [{ name: 'Best Surgeon Award', year: '2021', description: 'Awarded by the National Orthopedic Association.' }],
    address: '12, Civil Lines, Delhi', dob: '02 Mar 1980', licenseNumber: 'MED-2008-1122', gender: 'Male'
  },
  { 
    id: 'DOC-003', name: 'Dr. Meera Gupta', specialty: 'Gynecologist', department: 'Gynaecology', rating: 4.9, patientsCount: 5200, availability: 'Available', email: 'meera.g@medicrm.in', phone: '+91 98000 98002',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
    fee: 1200, availableDate: 'Tue, 21 Jan 2025',
    about: 'Dr. Meera Gupta is a compassionate Gynecologist dedicated to women\'s health. She has extensive experience in high-risk pregnancies and laparoscopic surgeries.',
    education: commonEducation,
    awards: commonAwards,
    address: 'Sector 56, Gurgaon', dob: '10 Dec 1985', licenseNumber: 'MED-2012-3344', gender: 'Female'
  },
  { 
    id: 'DOC-004', name: 'Dr. Suresh Reddy', specialty: 'Neurologist', department: 'Neurology', rating: 4.7, patientsCount: 1500, availability: 'Off Duty', email: 'suresh.r@medicrm.in', phone: '+91 98000 98003',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
    fee: 2500, availableDate: 'Thu, 30 Jan 2025',
    about: 'Dr. Suresh Reddy is a leading Neurologist with expertise in stroke management and epilepsy. He is actively involved in clinical research and has published numerous papers in international journals.',
    education: commonEducation,
    awards: [],
    address: 'Banjara Hills, Hyderabad', dob: '22 May 1978', licenseNumber: 'MED-2005-9988', gender: 'Male'
  },
  {
    id: 'DOC-005', name: 'Dr. Sarah Johnson', specialty: 'Dermatologist', department: 'Dermatology', rating: 4.6, patientsCount: 2200, availability: 'Available', email: 'sarah.j@medicrm.in', phone: '+91 98000 98004',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=300&h=300',
    fee: 900, availableDate: 'Fri, 24 Jan 2025',
    about: 'Dr. Sarah Johnson is a cosmetic dermatologist known for her expertise in anti-aging treatments and laser therapy.',
    education: commonEducation,
    awards: commonAwards,
    address: 'Koramangala, Bangalore', dob: '14 Feb 1988', licenseNumber: 'MED-2015-7766', gender: 'Female'
  },
  {
    id: 'DOC-006', name: 'Dr. John Smith', specialty: 'Pediatrician', department: 'Pediatrics', rating: 4.8, patientsCount: 3800, availability: 'Available', email: 'john.s@medicrm.in', phone: '+91 98000 98005',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    fee: 1000, availableDate: 'Sat, 25 Jan 2025',
    about: 'Dr. John Smith is a caring Pediatrician with over 15 years of experience in child healthcare. He is dedicated to providing comprehensive care for infants, children, and adolescents.',
    education: commonEducation,
    awards: commonAwards,
    address: 'Indiranagar, Bangalore', dob: '05 Jun 1975', licenseNumber: 'MED-2002-5544', gender: 'Male'
  },
  {
    id: 'DOC-007', name: 'Dr. Emily Carter', specialty: 'ENT Specialist', department: 'ENT', rating: 4.5, patientsCount: 1900, availability: 'On Leave', email: 'emily.c@medicrm.in', phone: '+91 98000 98006',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea860630?auto=format&fit=crop&q=80&w=300&h=300',
    fee: 800, availableDate: 'Mon, 27 Jan 2025',
    about: 'Dr. Emily Carter specializes in disorders of the ear, nose, and throat. She has a special interest in endoscopic sinus surgery.',
    education: commonEducation,
    awards: [],
    address: 'Salt Lake, Kolkata', dob: '30 Sep 1983', licenseNumber: 'MED-2009-2233', gender: 'Female'
  },
  {
    id: 'DOC-008', name: 'Dr. Michael Brown', specialty: 'Psychiatrist', department: 'Psychiatry', rating: 4.9, patientsCount: 1200, availability: 'Available', email: 'michael.b@medicrm.in', phone: '+91 98000 98007',
    image: 'https://images.unsplash.com/photo-1537368910025-bc005fbedc99?auto=format&fit=crop&q=80&w=300&h=300',
    fee: 2200, availableDate: 'Wed, 29 Jan 2025',
    about: 'Dr. Michael Brown is a renowned Psychiatrist specializing in cognitive behavioral therapy and mood disorders.',
    education: commonEducation,
    awards: commonAwards,
    address: 'Anna Nagar, Chennai', dob: '12 Apr 1979', licenseNumber: 'MED-2006-1199', gender: 'Male'
  }
];

export const mockCampaigns: Campaign[] = [
  { id: 'CMP-001', name: 'Diwali Health Package', type: 'WhatsApp', status: 'Active', audience: 'All Patients', sent: 5000, openRate: 88, conversionRate: 15, startDate: lastWeek, roi: 450 },
  { id: 'CMP-002', name: 'Flu Vaccine Alert', type: 'SMS', status: 'Completed', audience: 'Seniors > 60', sent: 1200, openRate: 92, conversionRate: 35, startDate: getRelativeDate(-45), roi: 200 },
  { id: 'CMP-003', name: 'Free Dental Checkup Camp', type: 'WhatsApp', status: 'Draft', audience: 'Leads (Lost)', sent: 0, openRate: 0, conversionRate: 0, startDate: getRelativeDate(15) },
];

export const mockLeaveRequests: LeaveRequest[] = [
    { id: 'LR-001', employeeName: 'James Allaire', designation: 'Nurse', type: 'Casual Leave', days: 4, reason: 'Personal Emergency', status: 'Pending', fromDate: getRelativeDate(1), toDate: getRelativeDate(5), image: 'https://ui-avatars.com/api/?name=JA&background=random' },
    { id: 'LR-002', employeeName: 'Esther Schmidt', designation: 'Receptionist', type: 'Sick Leave', days: 2, reason: 'Viral Fever', status: 'Pending', fromDate: today, toDate: tomorrow, image: 'https://ui-avatars.com/api/?name=ES&background=random' },
    { id: 'LR-003', employeeName: 'Valerie Padgett', designation: 'Lab Tech', type: 'Vacation', days: 1, reason: 'Changing Address', status: 'Pending', fromDate: getRelativeDate(2), toDate: getRelativeDate(2), image: 'https://ui-avatars.com/api/?name=VP&background=random' },
    { id: 'LR-004', employeeName: 'Diane Nash', designation: 'Nurse', type: 'Sick Leave', days: 1, reason: 'Not Well', status: 'Pending', fromDate: today, toDate: today, image: 'https://ui-avatars.com/api/?name=DN&background=random' },
    { id: 'LR-005', employeeName: 'Sally Cavazos', designation: 'Pharmacist', type: 'Casual Leave', days: 2, reason: 'Family Function', status: 'Pending', fromDate: getRelativeDate(5), toDate: getRelativeDate(7), image: 'https://ui-avatars.com/api/?name=SC&background=random' },
    { id: 'LR-006', employeeName: 'Dr. Kabir Khan', designation: 'Surgeon', type: 'Conference', days: 3, reason: 'Medical Conference Dubai', status: 'Approved', fromDate: lastWeek, toDate: getRelativeDate(-4), image: 'https://ui-avatars.com/api/?name=KK&background=random' },
];

export const mockDepartments: Department[] = [
  { id: 'DEP-001', name: 'Cardiology', headOfDept: 'Dr. Anjali Desai', headImage: 'https://images.unsplash.com/photo-1559839734-2b71ea860630?auto=format&fit=crop&q=80&w=150&h=150', doctorCount: 8, staffCount: 15, status: 'Active', description: 'Comprehensive heart care including diagnostics, interventional cardiology, and rehabilitation.', icon: 'HeartPulse' },
  { id: 'DEP-002', name: 'Neurology', headOfDept: 'Dr. Suresh Reddy', headImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150&h=150', doctorCount: 5, staffCount: 10, status: 'Active', description: 'Expert care for disorders of the nervous system, brain, spinal cord, and nerves.', icon: 'Brain' },
  { id: 'DEP-003', name: 'Orthopedics', headOfDept: 'Dr. Kabir Khan', headImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150', doctorCount: 6, staffCount: 12, status: 'Active', description: 'Specialized in treating musculoskeletal conditions, trauma, and joint replacements.', icon: 'Bone' },
  { id: 'DEP-004', name: 'Gynaecology', headOfDept: 'Dr. Meera Gupta', headImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150&h=150', doctorCount: 7, staffCount: 14, status: 'Active', description: 'Comprehensive women’s health services including maternity, infertility, and wellness.', icon: 'Baby' },
  { id: 'DEP-005', name: 'Pediatrics', headOfDept: 'Dr. John Smith', headImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150', doctorCount: 4, staffCount: 9, status: 'Active', description: 'Dedicated medical care for infants, children, and adolescents.', icon: 'Smile' },
  { id: 'DEP-006', name: 'Dermatology', headOfDept: 'Dr. Sarah Johnson', headImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=150&h=150', doctorCount: 3, staffCount: 5, status: 'Active', description: 'Advanced skin care treatments, cosmetic dermatology, and laser therapies.', icon: 'Sun' },
  { id: 'DEP-007', name: 'ENT', headOfDept: 'Dr. Emily Carter', headImage: 'https://images.unsplash.com/photo-1559839734-2b71ea860630?auto=format&fit=crop&q=80&w=150&h=150', doctorCount: 3, staffCount: 6, status: 'Active', description: 'Diagnosis and treatment of ear, nose, and throat disorders.', icon: 'Ear' },
  { id: 'DEP-008', name: 'Psychiatry', headOfDept: 'Dr. Michael Brown', headImage: 'https://images.unsplash.com/photo-1537368910025-bc005fbedc99?auto=format&fit=crop&q=80&w=150&h=150', doctorCount: 2, staffCount: 4, status: 'Inactive', description: 'Mental health services including therapy, counseling, and psychiatric care.', icon: 'BrainCircuit' },
];

export const mockStaffs: Staff[] = [
  { id: 'ST-001', name: 'Sarah Jenkins', role: 'Nurse', designation: 'Head Nurse', department: 'Cardiology', email: 'sarah.j@medicrm.in', phone: '+91 98765 43210', joinDate: '2020-05-15', status: 'Active', image: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random' },
  { id: 'ST-002', name: 'Mike Ross', role: 'Receptionist', designation: 'Front Desk Executive', department: 'Administration', email: 'mike.r@medicrm.in', phone: '+91 98765 43211', joinDate: '2021-08-20', status: 'Active', image: 'https://ui-avatars.com/api/?name=Mike+Ross&background=random' },
  { id: 'ST-003', name: 'Jessica Pearson', role: 'Accountant', designation: 'Finance Manager', department: 'Finance', email: 'jessica.p@medicrm.in', phone: '+91 98765 43212', joinDate: '2019-01-10', status: 'On Leave', image: 'https://ui-avatars.com/api/?name=Jessica+Pearson&background=random' },
  { id: 'ST-004', name: 'Harvey Specter', role: 'Lab Technician', designation: 'Senior Lab Tech', department: 'Pathology', email: 'harvey.s@medicrm.in', phone: '+91 98765 43213', joinDate: '2018-03-25', status: 'Active', image: 'https://ui-avatars.com/api/?name=Harvey+Specter&background=random' },
  { id: 'ST-005', name: 'Rachel Zane', role: 'Pharmacist', designation: 'Junior Pharmacist', department: 'Pharmacy', email: 'rachel.z@medicrm.in', phone: '+91 98765 43214', joinDate: '2022-11-05', status: 'Active', image: 'https://ui-avatars.com/api/?name=Rachel+Zane&background=random' },
  { id: 'ST-006', name: 'Louis Litt', role: 'HR', designation: 'HR Manager', department: 'HR', email: 'louis.l@medicrm.in', phone: '+91 98765 43215', joinDate: '2017-06-30', status: 'Active', image: 'https://ui-avatars.com/api/?name=Louis+Litt&background=random' },
  { id: 'ST-007', name: 'Donna Paulsen', role: 'Receptionist', designation: 'Senior Receptionist', department: 'Administration', email: 'donna.p@medicrm.in', phone: '+91 98765 43216', joinDate: '2016-09-12', status: 'Resigned', image: 'https://ui-avatars.com/api/?name=Donna+Paulsen&background=random' },
  { id: 'ST-008', name: 'Katrina Bennett', role: 'Nurse', designation: 'Staff Nurse', department: 'Pediatrics', email: 'katrina.b@medicrm.in', phone: '+91 98765 43217', joinDate: '2023-02-14', status: 'Active', image: 'https://ui-avatars.com/api/?name=Katrina+Bennett&background=random' },
];

export const mockPayrolls: PayrollRecord[] = [
  { id: 'EMP-001', employeeName: 'James Adair', role: 'Admin', email: 'james@gmail.com', joiningDate: '01 Jan 2024', salary: 1200, status: 'Paid', image: 'https://ui-avatars.com/api/?name=JA&background=random' },
  { id: 'EMP-002', employeeName: 'Adam Milne', role: 'Reception', email: 'adam@gmail.com', joiningDate: '04 Jan 2023', salary: 2000, status: 'Paid', image: 'https://ui-avatars.com/api/?name=AM&background=random' },
  { id: 'EMP-003', employeeName: 'Richard Clark', role: 'Admin', email: 'richard@gmail.com', joiningDate: '26 Jan 2022', salary: 1500, status: 'Pending', image: 'https://ui-avatars.com/api/?name=RC&background=random' },
  { id: 'EMP-004', employeeName: 'Robert Reid', role: 'Admin', email: 'robert@gmail.com', joiningDate: '04 Feb 2022', salary: 1200, status: 'Paid', image: 'https://ui-avatars.com/api/?name=RR&background=random' },
  { id: 'EMP-005', employeeName: 'Dottie Jeny', role: 'Nurse', email: 'dottie@gmail.com', joiningDate: '03 Mar 2021', salary: 1500, status: 'Paid', image: 'https://ui-avatars.com/api/?name=DJ&background=random' },
  { id: 'EMP-006', employeeName: 'Cheryl Bilodeau', role: 'Nurse (RN)', email: 'cheryl@gmail.com', joiningDate: '08 May 2021', salary: 2500, status: 'Pending', image: 'https://ui-avatars.com/api/?name=CB&background=random' },
  { id: 'EMP-007', employeeName: 'Valerie Padgett', role: 'Nurse Practitioner', email: 'valerie@gmail.com', joiningDate: '29 Mar 2021', salary: 1000, status: 'Paid', image: 'https://ui-avatars.com/api/?name=VP&background=random' },
  { id: 'EMP-008', employeeName: 'Diane Nash', role: 'Nurse', email: 'diane@gmail.com', joiningDate: '01 Apr 2020', salary: 1250, status: 'Paid', image: 'https://ui-avatars.com/api/?name=DN&background=random' },
  { id: 'EMP-009', employeeName: 'Sally Cavazos', role: 'Nurse', email: 'sally@gmail.com', joiningDate: '01 May 2020', salary: 1550, status: 'Processing', image: 'https://ui-avatars.com/api/?name=SC&background=random' },
  { id: 'EMP-010', employeeName: 'Forest Heath', role: 'Reception', email: 'forest@gmail.com', joiningDate: '27 May 2020', salary: 1250, status: 'Paid', image: 'https://ui-avatars.com/api/?name=FH&background=random' },
];

export const mockLocations: ClinicLocation[] = [
  { id: '1', name: 'Harmony Health Clinic', address: 'California', isDefault: true, image: 'https://ui-avatars.com/api/?name=Harmony+Health&background=0ea5e9&color=fff' },
  { id: '2', name: 'WellCare Medical Center', address: 'Texas', isDefault: false, image: 'https://ui-avatars.com/api/?name=WellCare&background=0f172a&color=fff' },
  { id: '3', name: 'VitalLife Clinic', address: 'Florida', isDefault: false, image: 'https://ui-avatars.com/api/?name=VitalLife&background=4f46e5&color=fff' },
  { id: '4', name: 'BrightPath Family Clinic', address: 'New York', isDefault: false, image: 'https://ui-avatars.com/api/?name=BrightPath&background=f59e0b&color=fff' },
  { id: '5', name: 'Greeny Medical Clinic', address: 'Illinois', isDefault: false, image: 'https://ui-avatars.com/api/?name=Greeny&background=22c55e&color=fff' },
  { id: '6', name: 'CureWell Medical Hub', address: 'Ohio', isDefault: false, image: 'https://ui-avatars.com/api/?name=CureWell&background=ef4444&color=fff' },
  { id: '7', name: 'NovaCare Medical', address: 'Washington', isDefault: false, image: 'https://ui-avatars.com/api/?name=NovaCare&background=64748b&color=fff' },
];

export const mockSpecializations: Specialization[] = [
  { id: 'SPEC-001', name: 'Cardiology', description: 'Heart and cardiovascular system', status: 'Active' },
  { id: 'SPEC-002', name: 'Neurology', description: 'Nervous system disorders', status: 'Active' },
  { id: 'SPEC-003', name: 'Orthopedics', description: 'Musculoskeletal system', status: 'Active' },
  { id: 'SPEC-004', name: 'Pediatrics', description: 'Medical care of infants, children, and adolescents', status: 'Active' },
  { id: 'SPEC-005', name: 'Dermatology', description: 'Skin, hair, and nail conditions', status: 'Inactive' },
];

export const mockServices: Service[] = [
  { id: 'SRV-001', name: 'General Consultation', department: 'General Medicine', price: 200, status: 'Active' },
  { id: 'SRV-002', name: 'Dental Cleaning', department: 'Dentistry', price: 180, status: 'Inactive' },
  { id: 'SRV-003', name: 'Eye Checkup', department: 'Ophthalmology', price: 150, status: 'Active' },
  { id: 'SRV-004', name: 'X-Ray', department: 'Radiology', price: 80, status: 'Active' },
  { id: 'SRV-005', name: 'Physiotherapy Session', department: 'Physiotherapy', price: 130, status: 'Active' },
  { id: 'SRV-006', name: 'Cardiac Screening', department: 'Cardiology', price: 300, status: 'Active' },
  { id: 'SRV-007', name: 'Skin Allergy Test', department: 'Dermatology', price: 220, status: 'Inactive' },
  { id: 'SRV-008', name: 'Blood Test', department: 'Pathology', price: 150, status: 'Active' },
  { id: 'SRV-009', name: 'ENT Consultation', department: 'ENT', price: 230, status: 'Active' },
  { id: 'SRV-010', name: 'Nutrition Counseling', department: 'Nutrition', price: 250, status: 'Active' },
];

export const mockAssets: Asset[] = [
  { id: '1', assetId: '#AST001', name: 'VitalScan Monitor', user: 'James Adair', userImage: 'https://ui-avatars.com/api/?name=JA&background=random', purchaseDate: '30 Mar 2025', warranty: '3 Years', warrantyEnd: '30 Mar 2028', amount: 2587, status: 'Approved' },
  { id: '2', assetId: '#AST002', name: 'MediScope', user: 'Adam Milne', userImage: 'https://ui-avatars.com/api/?name=AM&background=random', purchaseDate: '28 Mar 2025', warranty: '10 Years', warrantyEnd: '28 Mar 2028', amount: 47810, status: 'Approved' },
  { id: '3', assetId: '#AST003', name: 'ThermoTrack', user: 'Richard Clark', userImage: 'https://ui-avatars.com/api/?name=RC&background=random', purchaseDate: '20 Mar 2025', warranty: '1 Years', warrantyEnd: '20 Mar 2028', amount: 54789, status: 'Pending' },
  { id: '4', assetId: '#AST004', name: 'InjecSure', user: 'Robert Reid', userImage: 'https://ui-avatars.com/api/?name=RR&background=random', purchaseDate: '15 Mar 2025', warranty: '3 Years', warrantyEnd: '15 Mar 2029', amount: 21770, status: 'Pending' },
  { id: '5', assetId: '#AST005', name: 'LabMate', user: 'Dottie Jeny', userImage: 'https://ui-avatars.com/api/?name=DJ&background=random', purchaseDate: '07 Mar 2025', warranty: '5 Years', warrantyEnd: '07 Mar 2028', amount: 32580, status: 'Approved' },
  { id: '6', assetId: '#AST006', name: 'MicroView', user: 'Cheryl Bilodeau', userImage: 'https://ui-avatars.com/api/?name=CB&background=random', purchaseDate: '27 Feb 2025', warranty: 'Up to 5Years', warrantyEnd: '27 Feb 2028', amount: 32547, status: 'Approved' },
  { id: '7', assetId: '#AST007', name: 'First Aid Hub', user: 'Valerie Padgett', userImage: 'https://ui-avatars.com/api/?name=VP&background=random', purchaseDate: '20 Feb 2025', warranty: '2 Years', warrantyEnd: '20 Feb 2027', amount: 54100, status: 'Returned' },
  { id: '8', assetId: '#AST008', name: 'MediCart', user: 'Diane Nash', userImage: 'https://ui-avatars.com/api/?name=DN&background=random', purchaseDate: '12 Feb 2025', warranty: '10 Years', warrantyEnd: '12 Feb 2035', amount: 246798, status: 'Approved' },
  { id: '9', assetId: '#AST009', name: 'SterilBox', user: 'Sally Cavazos', userImage: 'https://ui-avatars.com/api/?name=SC&background=random', purchaseDate: '21 Jan 2025', warranty: '5 Years', warrantyEnd: '21 Jan 2028', amount: 12011, status: 'Approved' },
  { id: '10', assetId: '#AST010', name: 'MediLogix', user: 'Forest Heath', userImage: 'https://ui-avatars.com/api/?name=FH&background=random', purchaseDate: '15 Jan 2025', warranty: '2 Years', warrantyEnd: '15 Jan 2028', amount: 35421, status: 'Pending' },
];

export const mockInvoicesList: Invoice[] = [
  { id: 'INV-001', date: '25 Oct 2025', amount: 450, status: 'Paid', items: ['Consultation', 'Blood Test'], mode: 'Credit Card' },
  { id: 'INV-002', date: '24 Oct 2025', amount: 120, status: 'Pending', items: ['X-Ray'], mode: 'Insurance' },
  { id: 'INV-003', date: '22 Oct 2025', amount: 850, status: 'Overdue', items: ['MRI Scan', 'Consultation'], mode: 'Cash' },
  { id: 'INV-004', date: '20 Oct 2025', amount: 200, status: 'Paid', items: ['Dental Cleaning'], mode: 'Debit Card' },
  { id: 'INV-005', date: '18 Oct 2025', amount: 1500, status: 'Paid', items: ['Surgery Advance'], mode: 'Bank Transfer' },
];

export const mockTransactions: Transaction[] = [
  { id: 'TRX-789012', patientName: 'John Doe', date: '25 Oct 2025, 10:30 AM', amount: 450, method: 'Credit Card', status: 'Completed', description: 'Consultation Fee' },
  { id: 'TRX-789013', patientName: 'Sarah Smith', date: '24 Oct 2025, 02:15 PM', amount: 120, method: 'Insurance', status: 'Completed', description: 'X-Ray Copay' },
  { id: 'TRX-789014', patientName: 'Mike Johnson', date: '23 Oct 2025, 11:00 AM', amount: 850, method: 'Cash', status: 'Failed', description: 'MRI Scan' },
  { id: 'TRX-789015', patientName: 'Emily Davis', date: '22 Oct 2025, 09:45 AM', amount: 200, method: 'Credit Card', status: 'Refunded', description: 'Overcharge Adjustment' },
  { id: 'TRX-789016', patientName: 'Robert Wilson', date: '21 Oct 2025, 04:30 PM', amount: 1500, method: 'Bank Transfer', status: 'Completed', description: 'Surgery Advance Payment' },
];

export const mockReports: ReportItem[] = [
  { id: 'RPT-101', name: 'Oct 2025 Financial Summary', category: 'Financial', generatedDate: '01 Nov 2025', format: 'PDF', size: '2.4 MB' },
  { id: 'RPT-102', name: 'Q3 Patient Demographics', category: 'Clinical', generatedDate: '15 Oct 2025', format: 'Excel', size: '4.1 MB' },
  { id: 'RPT-103', name: 'Staff Attendance Log', category: 'HR', generatedDate: '28 Oct 2025', format: 'CSV', size: '850 KB' },
  { id: 'RPT-104', name: 'Inventory Status Report', category: 'Operational', generatedDate: '30 Oct 2025', format: 'PDF', size: '1.2 MB' },
  { id: 'RPT-105', name: 'Department Revenue Analysis', category: 'Financial', generatedDate: '25 Oct 2025', format: 'Excel', size: '3.5 MB' },
];