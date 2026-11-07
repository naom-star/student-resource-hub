export type UniModuleId = 
  | 'academic'
  | 'campus'
  | 'career'
  | 'safety'
  | 'finance';

export interface StudentProfile {
  id: string;
  name: string;
  studentIdNumber: string;
  email: string;
  avatarUrl: string;
  classYear: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate';
  major: string;
  minor: string;
  college: string;
  gpa: number;
  creditsEarned: number;
  creditsRequired: number;
  dormBuilding: string;
  dormRoom: string;
  diningDollars: number;
  mealSwipesLeft: number;
  workStudyEligible: boolean;
}

export interface DegreeAuditCategory {
  id: string;
  title: string;
  creditsCompleted: number;
  creditsTotal: number;
  courses: {
    code: string;
    name: string;
    credits: number;
    status: 'completed' | 'in_progress' | 'remaining';
    grade?: string;
    term?: string;
    prereqs?: string[];
  }[];
}

export interface CourseOffering {
  id: string;
  code: string;
  title: string;
  credits: number;
  instructor: string;
  schedule: string;
  location: string;
  seatsOpen: number;
  totalSeats: number;
  waitlistLength: number;
  prerequisites: string[];
  prerequisitesSatisfied: boolean;
  status: 'open' | 'waitlist' | 'closed';
  enrolled?: boolean;
}

export interface ShuttleRoute {
  id: string;
  name: string;
  color: string;
  status: 'Normal Service' | 'Slight Delay';
  currentEtaMinutes: number;
  currentStop: string;
  nextStops: { stopName: string; etaMins: number }[];
}

export interface DiningHall {
  id: string;
  name: string;
  status: 'Open' | 'Closing Soon' | 'Closed';
  hours: string;
  occupancy: number; // percentage
  featuredMenu: string[];
}

export interface CampusJob {
  id: string;
  title: string;
  department: string;
  type: 'Federal Work-Study' | 'Departmental' | 'TA / RA';
  wage: string;
  hoursPerWeek: string;
  deadline: string;
  applied?: boolean;
}

export interface TimesheetEntry {
  id: string;
  date: string;
  jobTitle: string;
  hoursWorked: number;
  hourlyRate: number;
  notes: string;
  status: 'Draft' | 'Submitted' | 'Approved';
}

export interface TechnicalIntegrationSpec {
  module: string;
  systemName: string;
  enterpriseVendor: string;
  protocol: 'REST JSON' | 'GraphQL' | 'LTI 1.3 Advantage' | 'WebSockets / GTFS-RT' | 'SAML 2.0 / OIDC';
  endpoints: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'WSS';
    path: string;
    description: string;
    payloadOrParams?: string;
  }[];
  pushNotificationTriggers: {
    event: string;
    priority: 'P0 Urgent' | 'P1 Time-Sensitive' | 'P2 Informational';
    copyPreview: string;
  }[];
}
