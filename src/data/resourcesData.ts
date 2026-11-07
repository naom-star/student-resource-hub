import { ResourceItem, Scholarship, StudentDiscount, WireframeBreakdown, SectionId } from '../types';

export const SECTION_METADATA: Record<SectionId, {
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
}> = {
  academic: {
    name: 'Academic Support & Study Tools',
    tagline: 'Cognitive Science-Backed Learning Systems',
    description: 'Master active recall, time-tested note structures, subject reference sheets, and precision citation workflows.',
    iconName: 'BookOpen',
    image: '/src/assets/images/academic_study_desk_1794039605900.jpg',
  },
  career: {
    name: 'Career & Internship Directory',
    tagline: 'Early Professional Pathways & Recruiting Toolkit',
    description: 'ATS-optimized resumes, STAR interview models, cold outreach scripts, and verified early-career boards.',
    iconName: 'Briefcase',
    image: '/src/assets/images/career_pathways_1794039606007.jpg',
  },
  wellness: {
    name: 'Wellness & Mental Health Corner',
    tagline: 'Sustained Equilibrium & Crisis Navigation',
    description: 'Immediate 24/7 confidential hotlines, somatic breathing visualizers, sleep audits, and anti-burnout protocols.',
    iconName: 'Heart',
    image: '/src/assets/images/mindful_wellness_1794039606004.jpg',
  },
  finance: {
    name: 'Financial Literacy & Scholarships',
    tagline: 'College Affordability, Grants & Debt Literacy',
    description: 'Monthly student cash flow calculator, vetted scholarships without spam, student software discounts, and loan guides.',
    iconName: 'DollarSign',
    image: '/src/assets/images/hero_student_campus_1794039605541.jpg',
  },
  productivity: {
    name: 'Productivity & Time Management',
    tagline: 'Semester Operating Systems & Project Charters',
    description: 'Syllabus reverse-planning, live deadline tracker, clean Notion/Google Drive schemas, and team contracts.',
    iconName: 'Clock',
    image: '/src/assets/images/academic_study_desk_1794039605900.jpg',
  },
};

export const SECTION_WIREFRAMES: Record<SectionId, WireframeBreakdown> = {
  academic: {
    sectionTitle: 'Academic Support & Study Tools',
    pedagogicalRationale: 'Students often suffer from "illusions of competence" caused by passive rereading. This section pairs cognitive science (Bjork\'s Desirable Difficulties, Ebbinghaus Spaced Repetition) with low-friction utilities (Pomodoro, Cornell notes, Citation engine) to shift students from passive consumption to retrieval practice.',
    uxLayoutArchitecture: [
      {
        zone: 'Zone 1: Active Interactive Stage',
        description: 'Focus timer (Pomodoro 25/5 & 50/10 intervals) with session counter alongside active recall flashcard simulator.',
        visualPriority: 'Primary focal anchor with high contrast controls',
      },
      {
        zone: 'Zone 2: Note-Taking Systems Deck',
        description: 'Visual Cornell notes split guide (Cues, Notes, Summary) + Mind Mapping framework comparison with downloadable starter text.',
        visualPriority: 'Secondary structural panel with copy/download CTAs',
      },
      {
        zone: 'Zone 3: Subject Reference & Citation Suite',
        description: 'Subject-specific formula quick reference tabs (Calculus, Chem, Bio, Essay Structure) + instant APA/MLA/Chicago generator.',
        visualPriority: 'Tabbed reference card grid with instant clipboard copy',
      },
    ],
    keyActionableResources: [
      'Cornell Note-Taking Markdown/Docx Template',
      'Leitner 5-Box Spaced Repetition Study Schedule',
      'STEM & Humanities Subject Formula Quick Cards',
      'APA 7th / MLA 9th Citation Reference Sheet',
      'Feynman Technique 4-Step Self-Assessment Rubric',
    ],
    suggestedInteractiveComponents: [
      'Customizable Pomodoro Timer with Audio / Chime feedback',
      'Real-time Multi-Style Citation Generator (Book, Journal, Web)',
      'Active Recall Knowledge Deck Flashcard Tester',
      'Subject Cheat Sheet Switcher & Search Filter',
    ],
  },
  career: {
    sectionTitle: 'Career & Internship Directory',
    pedagogicalRationale: 'Students struggle with early-career inertia because job portals are noisy and applications feel impersonal. This module applies the "STAR" behavioral formula and actionable outreach templates to eliminate imposter syndrome and improve interview callback ratios.',
    uxLayoutArchitecture: [
      {
        zone: 'Zone 1: Resume & Cover Letter Foundry',
        description: 'ATS bullet point calculator (Action Verb + Context + Measurable Result) paired with an interactive 3-paragraph cover letter builder.',
        visualPriority: 'Form-based interactive canvas with instant output preview',
      },
      {
        zone: 'Zone 2: Curated Job & Internship Portal',
        description: 'Filterable board directory segmented by education tier (High School, Undergrad, Grad) and work discipline (Tech, Research, Creative).',
        visualPriority: 'Categorized grid with direct portal links and verified tags',
      },
      {
        zone: 'Zone 3: Networking & Interview Simulator',
        description: 'One-click copy LinkedIn connection messages & informational interview cold emails + STAR method rehearsal cards.',
        visualPriority: 'Compact clipboard-friendly accordions with customizable fill-in fields',
      },
    ],
    keyActionableResources: [
      'Single-Page ATS-Compliant Resume Template (Clean Plaintext/Markdown)',
      '"Why You, Why Me, Why Now" 3-Paragraph Cover Letter Guide',
      'Top 20 Behavioral Interview Questions & Ideal STAR Frameworks',
      '4 High-Converting LinkedIn Alumni Outreach Scripts',
      'Career Fair 30-Second Elevator Pitch Worksheet',
    ],
    suggestedInteractiveComponents: [
      'Dynamic Cover Letter & Cold Email Generator with variable injection',
      'STAR Method Response Drafter with bullet word count gauge',
      'Internship Directory Multi-Tag Filter (Education Level, Industry, Season)',
      'Action Verb Thesaurus with Strong Impact Verbs',
    ],
  },
  wellness: {
    sectionTitle: 'Wellness & Mental Health Corner',
    pedagogicalRationale: 'Academic burnout peaks around midterms and finals due to chronic sympathetic nervous system activation. This corner prioritizes harm reduction: zero-click emergency crisis support, somatic nervous system down-regulation (box breathing), and actionable sleep hygiene diagnostics.',
    uxLayoutArchitecture: [
      {
        zone: 'Zone 1: Urgent Crisis & Hotline Banner',
        description: 'Immediate, unmistakable national and student crisis hotlines (988, Crisis Text Line, Trevor Project, BIPOC resources) with direct tap-to-call / text.',
        visualPriority: 'High visibility calm banner without sensationalism',
      },
      {
        zone: 'Zone 2: Somatic Reset Interactive Stage',
        description: 'Animated 4-7-8 and Box Breathing pacing circle with rhythm visualizer, calming chime, and guided cues.',
        visualPriority: 'Gentle, distraction-free visual centerpiece',
      },
      {
        zone: 'Zone 3: Sleep Hygiene & Burnout Diagnostic Deck',
        description: '10-point evidence-based sleep audit checklist with dynamic score + 3-pillar burnout self-check (Exhaustion, Cynicism, Efficacy).',
        visualPriority: 'Interactive checklist with real-time scoring and actionable feedback',
      },
    ],
    keyActionableResources: [
      '24/7 Verified Student Crisis Hotlines & Campus Support Guide',
      'Sleep Hygiene 10-Point Bedroom & Routine Checklist',
      'Maslach-Inspired Student Burnout Self-Assessment & Boundaries Guide',
      'Cognitive Reframing for Exam Anxiety Worksheets',
      'Campus Accommodations & Disability Services Request Checklist',
    ],
    suggestedInteractiveComponents: [
      'Interactive 4-7-8 & Box Breathing Visualizer with custom pacing',
      'Live Sleep Hygiene Self-Audit Scoring Tool',
      'Emergency Hotline One-Click Copy & Direct Dial Cards',
      'Daily Boundary Setting & Energy Audit Checklist',
    ],
  },
  finance: {
    sectionTitle: 'Financial Literacy & Scholarships',
    pedagogicalRationale: 'Financial anxiety is the leading non-academic reason students drop out. Providing realistic monthly cost projection tools, zero-fee vetted scholarship databases, and unbundled software/hardware discounts empowers students to protect their credit and graduate with minimal debt.',
    uxLayoutArchitecture: [
      {
        zone: 'Zone 1: Interactive Monthly Student Budget Engine',
        description: 'Dual-input cash flow simulator (Income/Grants/Allowance vs Rent/Tuition/Groceries/Transport) with net surplus calculation and 50/30/20 budget breakdown.',
        visualPriority: 'Real-time numerical dashboard with visual status gauge',
      },
      {
        zone: 'Zone 2: Curated Scholarship Directory',
        description: 'Filterable database of legitimate scholarships with clear deadlines, eligibility criteria, and zero fee verification.',
        visualPriority: 'Tabular / card layout with sorting by amount and deadline',
      },
      {
        zone: 'Zone 3: Verified Student Discounts & Loan Navigator',
        description: 'Curated list of verified student discounts ($1,200+ annual savings on GitHub, Spotify, Amazon, Adobe) + Federal vs Private loan primer.',
        visualPriority: 'Quick-access discount catalog with verification steps',
      },
    ],
    keyActionableResources: [
      'Semester Student Budgeting Spreadsheet (CSV / Markdown)',
      'FAFSA & CSS Profile Annual Submission Timeline & Checklist',
      'Top 25 Verified High-Value Scholarships Directory',
      'Student Discounts Master Catalog ($1,200+ in annual savings)',
      'Federal Student Loan Repayment (SAVE/IDR & PSLF) Guide',
    ],
    suggestedInteractiveComponents: [
      'Interactive Student Monthly Budget Calculator with 50/30/20 breakdown',
      'Scholarship Search Filter (by Education Level, Need/Merit, Category)',
      'Student Discount Savings Calculator & Category Filter',
      'Loan Repayment Comparison Matrix',
    ],
  },
  productivity: {
    sectionTitle: 'Productivity & Time Management',
    pedagogicalRationale: 'Executive dysfunction and poor project pacing lead to last-minute cramming and group work breakdowns. This section introduces syllabus decompression, backward milestone planning, and explicit team contracts to institutionalize self-regulation.',
    uxLayoutArchitecture: [
      {
        zone: 'Zone 1: Live Task & Deadline Command Center',
        description: 'Dynamic interactive task list with course tags, priority indicators, completion rate progress bar, and local persistence.',
        visualPriority: 'Active operational table with instant add/complete actions',
      },
      {
        zone: 'Zone 2: Reverse Syllabus Milestone Calculator',
        description: 'User enters assignment due date; tool automatically outputs 5 backward-planned checkpoints (Topic Selection, Research, Rough Draft, Peer Review, Final Submission).',
        visualPriority: 'Interactive milestone generator with automated timeline',
      },
      {
        zone: 'Zone 3: Digital Organization & Group Charter Deck',
        description: 'Copyable Notion & Google Drive folder taxonomy trees + Group Project Team Contract to avoid free-rider problems.',
        visualPriority: 'Structured code/tree blocks with one-click copy buttons',
      },
    ],
    keyActionableResources: [
      'Syllabus Crunching Checklist: Week 1 Prep Routine',
      'Group Project Team Charter & Conflict Resolution Protocol',
      'Notion & Google Drive Course Organization Hierarchy Tree',
      'Time-Blocking Weekly Master Schedule Template (8am-10pm)',
      'Pomodoro Daily Study Log & Accountability Sheet',
    ],
    suggestedInteractiveComponents: [
      'Interactive Course Task & Exam Deadline Tracker with Local Storage',
      'Reverse Syllabus Project Milestone Date Calculator',
      'Notion / Google Drive Folder Hierarchy One-Click Generator',
      'Group Project Contribution & Role Assignment Checklist',
    ],
  },
};

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'sch-1',
    name: 'Dell Scholars Program',
    provider: 'Michael & Susan Dell Foundation',
    amount: '$20,000 + Laptop',
    deadline: 'December 1',
    targetLevel: 'High School',
    category: 'First-Gen',
    description: 'Designed for Pell-eligible high school seniors who demonstrate grit and determination in the face of significant obstacles.',
    eligibility: 'Minimum 2.4 GPA, enrolled in an approved college readiness program, eligible for federal Pell Grant.',
    link: 'https://www.dellscholars.org',
  },
  {
    id: 'sch-2',
    name: 'Gates Scholarship',
    provider: 'The Bill & Melinda Gates Foundation',
    amount: 'Full Cost of Attendance',
    deadline: 'September 15',
    targetLevel: 'High School',
    category: 'Need-Based',
    description: 'Highly selective, full-ride scholarship for outstanding minority high school seniors from low-income households.',
    eligibility: 'High school senior, Pell-eligible, African American, American Indian/Alaska Native, Asian & Pacific Islander American, or Hispanic American, minimum 3.3 GPA.',
    link: 'https://www.thegatesscholarship.org',
  },
  {
    id: 'sch-3',
    name: 'Barry Goldwater Scholarship',
    provider: 'Barry Goldwater Foundation',
    amount: '$7,500 / year',
    deadline: 'Last Friday of January',
    targetLevel: 'Undergraduate',
    category: 'STEM',
    description: 'Prestigious national undergraduate scholarship for sophomores and juniors intending to pursue research careers in mathematics, natural sciences, or engineering.',
    eligibility: 'Sophomore or junior, U.S. citizen/permanent resident, minimum 3.0 GPA with documented undergraduate research experience.',
    link: 'https://goldwaterscholarship.gov',
  },
  {
    id: 'sch-4',
    name: 'QuestBridge National College Match',
    provider: 'QuestBridge',
    amount: 'Full 4-Year Scholarship',
    deadline: 'September 26',
    targetLevel: 'High School',
    category: 'First-Gen',
    description: 'Connects high-achieving high school seniors from low-income backgrounds with full four-year scholarships to top partner universities.',
    eligibility: 'Primarily A\'s in rigorous courses, typically household income under $65,000 for a family of four.',
    link: 'https://www.questbridge.org',
  },
  {
    id: 'sch-5',
    name: 'Society of Women Engineers (SWE) Scholarships',
    provider: 'Society of Women Engineers',
    amount: '$1,000 - $15,000',
    deadline: 'February 15',
    targetLevel: 'Undergraduate',
    category: 'STEM',
    description: 'Supports women, non-binary, and other gender minorities studying ABET-accredited engineering, technology, or computing programs.',
    eligibility: 'Identify as a female or gender minority, enrolled in an ABET-accredited engineering program, minimum 3.0 GPA.',
    link: 'https://swe.org/scholarships',
  },
  {
    id: 'sch-6',
    name: 'Coca-Cola Scholars Program',
    provider: 'Coca-Cola Scholars Foundation',
    amount: '$20,000',
    deadline: 'October 2',
    targetLevel: 'High School',
    category: 'Merit',
    description: 'Achievement-based scholarship awarded to graduating high school seniors recognized for leadership, service, and significant community impact.',
    eligibility: 'High school senior with minimum 3.0 unweighted GPA, planning to pursue degree at accredited U.S. post-secondary institution.',
    link: 'https://www.coca-colascholarsfoundation.org',
  },
  {
    id: 'sch-7',
    name: 'Hispanic Scholarship Fund (HSF)',
    provider: 'Hispanic Scholarship Fund',
    amount: '$500 - $5,000',
    deadline: 'February 15',
    targetLevel: 'All',
    category: 'Diversity',
    description: 'Empowers exceptional Hispanic students with financial aid and access to HSF\'s extensive alumni network and career summits.',
    eligibility: 'Of Hispanic heritage, minimum 3.0 GPA for high school or 2.5 for college, enrolled full-time.',
    link: 'https://www.hsf.net',
  },
  {
    id: 'sch-8',
    name: 'National Science Foundation Graduate Research Fellowship (NSF GRFP)',
    provider: 'National Science Foundation',
    amount: '$37,000 annual stipend + $12,000 tuition allowance',
    deadline: 'Late October (varies by field)',
    targetLevel: 'Graduate',
    category: 'STEM',
    description: 'Five-year fellowship recognizing and supporting outstanding graduate students in STEM disciplines pursuing research-based master\'s and doctoral degrees.',
    eligibility: 'Undergraduate seniors or first/second-year graduate students in NSF-supported STEM disciplines, U.S. citizens.',
    link: 'https://www.nsfgrfp.org',
  },
];

export const STUDENT_DISCOUNTS_DATA: StudentDiscount[] = [
  {
    id: 'disc-1',
    service: 'GitHub Student Developer Pack',
    category: 'Software & Tech',
    discountOffer: 'Free Developer Tools Suite ($200k+ value)',
    regularPrice: '$100+/mo across tools',
    studentPrice: '100% Free',
    verificationMethod: 'School .edu email or student ID upload via GitHub Education',
    link: 'https://education.github.com/pack',
    highlightNotes: 'Includes GitHub Copilot free, free domains on Namecheap/Name.com, JetBrains IDE licenses, digital ocean credits, and Canva Pro.',
  },
  {
    id: 'disc-2',
    service: 'Spotify Premium Student + Hulu',
    category: 'Entertainment & Audio',
    discountOffer: '50% off + bundled Hulu ad-supported',
    regularPrice: '$11.99/mo + $7.99/mo',
    studentPrice: '$5.99/month total',
    verificationMethod: 'SheerID student enrollment verification',
    link: 'https://www.spotify.com/us/student/',
    highlightNotes: 'Includes ad-free music, offline listening, and full access to Hulu streaming catalog.',
  },
  {
    id: 'disc-3',
    service: 'Notion Plus Plan for Students',
    category: 'Software & Tech',
    discountOffer: 'Free Notion Plus with unlimited file uploads',
    regularPrice: '$10/month',
    studentPrice: '100% Free',
    verificationMethod: 'Sign up with an active university .edu address',
    link: 'https://www.notion.so/product/notion-for-education',
    highlightNotes: 'Unlimited blocks, unlimited page history up to 30 days, file uploads up to 5GB, and collaborative workspaces.',
  },
  {
    id: 'disc-4',
    service: 'Adobe Creative Cloud Student Discount',
    category: 'Software & Tech',
    discountOffer: 'Over 60% off full Creative Cloud All Apps',
    regularPrice: '$59.99/month',
    studentPrice: '$19.99/month (first year)',
    verificationMethod: 'School email address or proof of enrollment',
    link: 'https://www.adobe.com/creativecloud/buy/students.html',
    highlightNotes: 'Access to 20+ desktop & mobile apps including Photoshop, Illustrator, Premiere Pro, InDesign, and Acrobat Pro.',
  },
  {
    id: 'disc-5',
    service: 'Apple Education Pricing & Back to School',
    category: 'Retail & Hardware',
    discountOffer: 'Up to $200 off Macs & iPads + Gift Card',
    regularPrice: 'MSRP',
    studentPrice: '5% - 10% educational savings',
    verificationMethod: 'UNiDAYS online or student ID in Apple Store',
    link: 'https://www.apple.com/us-edu/shop',
    highlightNotes: 'Discounted AppleCare+, free engraving, and seasonal bonus gifts (Apple gift card up to $150 during July-September).',
  },
  {
    id: 'disc-6',
    service: 'Amazon Prime Student',
    category: 'Retail & Hardware',
    discountOffer: '6-Month Free Trial, then 50% off Prime',
    regularPrice: '$14.99/month',
    studentPrice: 'Free for 6 months, then $7.49/mo',
    verificationMethod: '.edu email address and graduation year',
    link: 'https://www.amazon.com/amazonprime?plan=student',
    highlightNotes: 'Free 2-day delivery on textbooks & dorm essentials, Prime Video, Grubhub+ student food delivery perks.',
  },
  {
    id: 'disc-7',
    service: 'Amtrak Student Discount',
    category: 'Transit & Travel',
    discountOffer: '15% off train travel across U.S. rail routes',
    regularPrice: 'Full fare rail ticket',
    studentPrice: '15% off coach travel',
    verificationMethod: 'Ages 17-24 with valid student ID booked 1 day in advance',
    link: 'https://www.amtrak.com/student-discounts',
    highlightNotes: 'Ideal for traveling between campus and home for Thanksgiving, winter break, or weekend campus visits.',
  },
  {
    id: 'disc-8',
    service: 'JetBrains All Products Pack',
    category: 'Software & Tech',
    discountOffer: 'Professional IDE Suite (IntelliJ, PyCharm, WebStorm)',
    regularPrice: '$289/year',
    studentPrice: '100% Free renewable annually',
    verificationMethod: 'ISIC card or University .edu email',
    link: 'https://www.jetbrains.com/community/education/#students',
    highlightNotes: 'Full commercial versions of PyCharm Professional, IntelliJ IDEA Ultimate, WebStorm, CLion, and DataGrip.',
  },
];

export const CRISIS_HOTLINES = [
  {
    name: '988 Suicide & Crisis Lifeline',
    number: '988',
    textOption: 'Text 988',
    description: 'Free, confidential 24/7 support for anyone in distress, mental health crisis, or suicidal thoughts in the United States and Canada.',
    available: '24/7/365',
    tags: ['Crisis', 'Free', 'Confidential', 'Call or Text'],
    emergencyLevel: 'urgent',
  },
  {
    name: 'Crisis Text Line',
    number: 'Text HOME to 741741',
    textOption: 'Text 741741',
    description: 'Free, 24/7 crisis counseling via SMS. A live trained volunteer crisis counselor will respond to help de-escalate anxiety, depression, and overwhelm.',
    available: '24/7/365',
    tags: ['Text-Only', 'Free', 'Confidential'],
    emergencyLevel: 'urgent',
  },
  {
    name: 'The Trevor Project (LGBTQ+ Youth)',
    number: '1-866-488-7386',
    textOption: 'Text START to 678-678',
    description: 'Leading national crisis intervention and suicide prevention organization dedicated to LGBTQ young people under 25.',
    available: '24/7/365',
    tags: ['LGBTQ+', 'Youth', 'Call or Text', 'Confidential'],
    emergencyLevel: 'supportive',
  },
  {
    name: 'The Steve Fund (Students of Color)',
    number: 'Text STEVE to 741741',
    textOption: 'Text 741741',
    description: 'Dedicated to supporting the mental health and emotional well-being of young people of color across high schools and colleges.',
    available: '24/7/365',
    tags: ['Students of Color', 'BIPOC', 'Text-Based'],
    emergencyLevel: 'supportive',
  },
  {
    name: 'SAMHSA National Helpline',
    number: '1-800-662-4357',
    textOption: 'Call 24/7',
    description: 'Substance Abuse and Mental Health Services Administration. Provides confidential treatment referrals and local support options.',
    available: '24/7/365 (English & Spanish)',
    tags: ['Substance Support', 'Referrals', 'Free'],
    emergencyLevel: 'supportive',
  },
  {
    name: 'International Resources (Befrienders Worldwide)',
    number: 'befrienders.org',
    textOption: 'Visit Directory',
    description: 'Global directory of confidential emotional support and suicide prevention hotlines operating in 32 countries.',
    available: 'Worldwide',
    tags: ['International', 'Multilingual'],
    emergencyLevel: 'directory',
  },
];

export const LINKEDIN_TEMPLATES = [
  {
    id: 'tmpl-1',
    title: 'University Alumni Cold Outreach',
    target: 'Networking with alumni in your dream field',
    context: 'Use when connecting with an alum from your school working at a company you admire.',
    content: `Hi [Alum Name],

I noticed you also attended [Your School/University] and are currently working as a [Their Role] at [Company Name]. As a current [Year, e.g. sophomore] studying [Your Major], I've been closely following your team's recent work on [Specific project or product].

I would love to learn about your transition from campus to [Company Name]. Would you be open to a brief 15-minute virtual coffee chat in the next couple of weeks? 

No pressure either way—thank you for your time and Go [School Mascot]!

Best regards,
[Your Name]
[Your Major & University]`,
  },
  {
    id: 'tmpl-2',
    title: 'Post-Career Fair Follow-Up',
    target: 'Cementing a recruiter connection within 24 hours',
    context: 'Send within 24 hours of speaking to a recruiter or engineering lead at a career fair.',
    content: `Hi [Recruiter Name],

Thank you so much for taking the time to speak with me at yesterday's [University Name] Career Fair! I really enjoyed our conversation regarding [Specific topic you discussed, e.g., how the engineering intern cohort deploys microservices].

Following our discussion, I submitted my application for the [Role Name, e.g. Summer 2027 Software Engineering Internship] (Req ID: [Job ID]). I've attached my updated resume here for your convenience.

Please let me know if there are any additional materials I can provide. I would be thrilled to contribute to [Company Name]!

Warm regards,
[Your Name]
[LinkedIn Profile Link] · [Portfolio Link]`,
  },
  {
    id: 'tmpl-3',
    title: 'Informational Interview Request (Cold Lead)',
    target: 'Industry professional not connected through school',
    context: 'Use when reaching out to an industry professional whose career trajectory you admire.',
    content: `Hi [Name],

I came across your profile while researching [Specific industry topic, e.g., computational biology pipelines]. Your recent piece/work on [Specific project or article] was incredibly insightful, especially your perspective on [Key insight].

I am an aspiring [Your desired field, e.g., bioinformatics researcher] currently in my [Year/Level] at [Your School]. I'm working to bridge the gap between academic lab methods and industry practice.

Could I ask you 2-3 quick questions about the skills your team values most, either over email or a 10-minute call? I know your time is valuable, and I would be deeply grateful for any pointers.

Sincerely,
[Your Name]`,
  },
  {
    id: 'tmpl-4',
    title: 'Inquiring About Unadvertised Research / Lab Openings',
    target: 'Professors & Principal Investigators (PIs)',
    context: 'Sent to a university professor to join their undergraduate research lab.',
    content: `Dear Professor [Professor Last Name],

My name is [Your Name], and I am a [Year, e.g. second-year] undergraduate majoring in [Major]. I read your recent paper on "[Paper Title]" in [Journal Name] and was particularly intrigued by how you addressed [Specific finding or methodology].

I am writing to inquire if there might be an opening for an undergraduate research assistant in your laboratory this upcoming [Semester/Summer]. I have coursework background in [Course 1] and [Course 2], and practical experience with [Tools/Languages, e.g. Python, R, PCR].

I have attached my unofficial transcript and CV. Would you be available for 10 minutes during your office hours next week to discuss potential contributions I could make to the lab?

Thank you for your time and mentorship,
[Your Name]
[Student ID]`,
  },
];

export const CORNELL_NOTE_TEMPLATE = `# Topic / Lecture Title: 
Date: [YYYY-MM-DD] | Course: [Course Code] | Instructor: [Name] | Page: 1/1

--------------------------------------------------------------------------------
CUES & QUESTIONS (Left 30% Column)   | CLASS NOTES & DETAILS (Right 70% Column)
--------------------------------------------------------------------------------
[Prompt 1: What is the main thesis?] | - Bullet 1: Core definition using your own words
                                     | - Bullet 2: Concrete example or case study
[Prompt 2: Key formula or mechanism] | - Bullet 3: Exception or boundary condition
                                     | - Visual: Diagram / flow schematic
[Prompt 3: How does this connect to  | 
 the previous lecture?]              | - Warning / Common misconception highlighted by prof
                                     |
[Exam Question: How could this be   | - Application: When X occurs, system shifts to Y
 tested on the midterm?]             |
--------------------------------------------------------------------------------
SUMMARY & SYNTHESIS (Bottom 20% Section)
--------------------------------------------------------------------------------
In 2-3 sentences, what is the single biggest takeaway? If you had to explain 
this concept to a 10-year-old in plain language, what would you say?

Key action item for next study session:
1. Active recall check on Cue #2 within 48 hours.
2. Complete Practice Problems 4-9 in chapter.
`;

export const NOTION_DRIVE_HIERARCHY = `ACADEMIC OPERATING SYSTEM (Recommended Folder Structure)

Google Drive / Cloud Root:
└── 🎓 Academic_Hub_2026-2027/
    ├── 00_Admin_&_Financials/
    │   ├── FAFSA_Tax_Documents_2026/
    │   ├── Financial_Aid_Award_Letters/
    │   ├── Transcripts_Unofficial_Official/
    │   └── Health_Immunizations_Insurance/
    ├── 01_Current_Semester_Fall_2026/
    │   ├── CS_201_Data_Structures/
    │   │   ├── 01_Syllabus_&_Grading_Rubric/
    │   │   ├── 02_Lecture_Notes_Cornell/
    │   │   ├── 03_Weekly_Problem_Sets/
    │   │   └── 04_Exam_Prep_Cheat_Sheets/
    │   ├── MATH_240_Linear_Algebra/
    │   ├── ECON_101_Microeconomics/
    │   └── WRIT_150_Research_Writing/
    ├── 02_Career_&_Professional/
    │   ├── Resumes_Master_&_Tailored/
    │   ├── Cover_Letters_By_Company/
    │   ├── Portfolio_Projects_Artifacts/
    │   └── Letters_of_Recommendation/
    └── 03_Extracurricular_&_Leadership/
        ├── Student_Club_Minutes/
        └── Hackathon_Projects/

Notion Workspace Architecture:
├── 📌 Dashboard (Daily Schedule, Pomodoro Log, High-Priority Deadlines)
├── 📚 Course Directory Database (Properties: Credits, Professor, Office Hours, Syllabus link)
├── 📝 Master Notes Database (Relation to Course, Tagged by Week and Topic)
├── ✅ Master Tasks & Milestones (Views: Kanban by status, Calendar by due date)
└── 💼 Internship CRM (Company, Role, Date Applied, Referral Alum, Interview Stage)`;
