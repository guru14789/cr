export enum PatientStatus {
  Active = 'Active',
  Discharged = 'Discharged',
  Lead = 'Lead',
  IPD_Admitted = 'IPD Admitted'
}

export enum TagType {
  VIP = 'VIP',
  Chronic = 'Chronic',
  Insurance = 'Insurance',
  Corporate = 'Corporate',
  International = 'International'
}

export enum PaymentMode {
  UPI = 'UPI',
  Cash = 'Cash',
  Card = 'Card',
  Insurance = 'Insurance',
  TPA = 'TPA'
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: 'Visit' | 'Call' | 'Lab' | 'Surgery' | 'Email' | 'WhatsApp';
  title: string;
  description: string;
  performedBy?: string;
}

export interface PatientDocument {
  id: string;
  name: string;
  type: 'PDF' | 'Image' | 'DICOM';
  date: string;
  size: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  items: string[];
  mode?: PaymentMode | string;
}

export interface Transaction {
  id: string;
  patientName: string;
  date: string;
  amount: number;
  method: 'Credit Card' | 'Cash' | 'Insurance' | 'Bank Transfer';
  status: 'Completed' | 'Failed' | 'Refunded';
  description: string;
}

export interface ReportItem {
  id: string;
  name: string;
  category: 'Financial' | 'Clinical' | 'Operational' | 'HR';
  generatedDate: string;
  format: 'PDF' | 'Excel' | 'CSV';
  size: string;
}

export interface Asset {
  id: string;
  assetId: string;
  name: string;
  user: string;
  userImage: string;
  purchaseDate: string;
  warranty: string;
  warrantyEnd: string;
  amount: number;
  status: 'Approved' | 'Pending' | 'Returned';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isMe: boolean;
  status: 'sent' | 'delivered' | 'read';
  attachments?: string[];
}

export interface ChatContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'Online' | 'Offline' | 'Busy';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Patient {
  id: string;
  abhaId?: string; // Ayushman Bharat Health Account
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  bloodType?: string;
  lastVisit: string;
  status: PatientStatus;
  tags: TagType[];
  condition?: string;
  allergies?: string[];
  medications?: string[];
  insuranceProvider?: string;
  timeline?: TimelineEvent[];
  documents?: PatientDocument[];
  invoices?: Invoice[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  duration: number; // minutes
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show' | 'Checked-In';
  type: 'In-Person' | 'Telemedicine' | 'Follow-up' | 'Walk-In';
  notes?: string;
}

export interface Lead {
  id: string;
  name: string;
  source: 'Website' | 'Referral' | 'Social Media' | 'Walk-In' | 'JustDial' | 'Practo';
  status: 'New' | 'Contacted' | 'Converted' | 'Lost';
  interest: string;
  score: number; // 0-100
  lastContact?: string;
  email?: string;
  phone?: string;
  assignedTo?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Award {
  name: string;
  year: string;
  description: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  rating: number;
  patientsCount: number;
  availability: 'Available' | 'In Surgery' | 'On Leave' | 'Off Duty';
  image: string;
  email: string;
  phone: string;
  regNumber?: string; // Medical Registration Number
  fee?: number;
  availableDate?: string;
  
  // Extended Details
  about?: string;
  education?: Education[];
  awards?: Award[];
  address?: string;
  dob?: string;
  licenseNumber?: string;
  gender?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'Nurse' | 'Receptionist' | 'Pharmacist' | 'Lab Technician' | 'Accountant' | 'Other' | 'HR';
  designation: string;
  department: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Resigned';
  image: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'Email' | 'SMS' | 'WhatsApp';
  status: 'Active' | 'Draft' | 'Completed';
  audience: string;
  sent: number;
  openRate: number; // percentage
  conversionRate: number; // percentage
  startDate: string;
  roi?: number;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  designation: string;
  type: 'Sick Leave' | 'Casual Leave' | 'Emergency' | 'Vacation' | 'Conference';
  status: 'Pending' | 'Approved' | 'Rejected';
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  image: string;
}

export interface Department {
  id: string;
  name: string;
  headOfDept: string;
  headImage?: string;
  doctorCount: number;
  staffCount: number;
  status: 'Active' | 'Inactive';
  description: string;
  icon: string; 
}

export interface Specialization {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

export interface Service {
  id: string;
  name: string;
  department: string;
  price: number;
  status: 'Active' | 'Inactive';
}

export interface PayrollRecord {
  id: string;
  employeeName: string;
  role: string;
  email: string;
  joiningDate: string;
  salary: number;
  status: 'Paid' | 'Pending' | 'Processing';
  image: string;
}

export interface ClinicLocation {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
  image: string;
}

export interface DashboardStats {
  totalPatients: number;
  activeLeads: number;
  todaysAppointments: number;
  revenue: number;
  occupancyRate: number;
  surgeriesToday: number;
}