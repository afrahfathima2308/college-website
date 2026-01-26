// Knowledge Base for AI College Assistant Chatbot

const knowledgeBase = {
  // Greeting responses
  greetings: {
    patterns: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    responses: [
      "Hello! 👋 I'm your AI College Assistant. I can help you with:\n\n✅ Admission Process\n✅ Fee Details\n✅ Exam Dates\n✅ Faculty Information\n✅ Placement Statistics\n\nWhat would you like to know?",
      "Hi there! Welcome to our college. How can I assist you today? Feel free to ask about admissions, fees, exams, faculty, or placements!",
      "Hey! 😊 I'm here to help you with any questions about our college. What would you like to know?"
    ]
  },

  // Admissions Information
  admissions: {
    patterns: [
      'admission', 'apply', 'application', 'enroll', 'enrollment', 'join',
      'how to get in', 'entrance', 'registration', 'admit', 'eligibility',
      'requirements', 'qualify', 'criteria', 'documents needed'
    ],
    responses: {
      general: `**📚 Admission Process**

Our college offers admissions for various undergraduate and postgraduate programs. Here's how you can apply:

**Step 1: Online Registration**
- Visit our official website
- Fill the application form with personal and academic details
- Upload required documents

**Step 2: Entrance Exam**
- Appear for our college entrance test
- Or submit valid scores from national exams (JEE/NEET/CAT)

**Step 3: Merit List**
- Check your name in the published merit list
- Merit based on entrance exam + 12th grade marks (60:40 ratio)

**Step 4: Document Verification**
- Original certificates required
- Academic transcripts (10th & 12th)
- Identity proof and photographs

**Step 5: Fee Payment & Confirmation**
- Pay the admission fee to confirm your seat

**📅 Important Dates:**
- Application Start: June 1st
- Application Deadline: July 15th
- Entrance Exam: July 25th
- Merit List: August 5th
- Admissions Close: August 20th

Need more specific information? Ask me about eligibility or required documents!`,

      documents: `**📄 Required Documents for Admission:**

1. **Academic Certificates:**
   - 10th Grade Mark Sheet & Certificate
   - 12th Grade Mark Sheet & Certificate
   - Transfer Certificate from previous institution
   - Migration Certificate (if applicable)

2. **Identity Proofs:**
   - Aadhar Card
   - PAN Card (optional)
   - Date of Birth Certificate

3. **Other Documents:**
   - Category Certificate (SC/ST/OBC if applicable)
   - Passport size photographs (6 copies)
   - Domicile Certificate
   - Income Certificate (for scholarship)

4. **Medical Certificate:**
   - Fitness certificate from registered medical practitioner

All documents should be self-attested. Original documents must be presented during verification.`,

      eligibility: `**✅ Eligibility Criteria:**

**For UG Programs (B.Tech/B.Sc/B.Com/BBA):**
- 10+2 or equivalent with minimum 50% marks
- Age: 17-25 years
- Entrance exam mandatory

**For PG Programs (M.Tech/M.Sc/MBA):**
- Bachelor's degree with minimum 55% marks
- Valid GATE/CAT/MAT scores (program specific)
- Age: No upper limit

**For Diploma Programs:**
- 10th pass with minimum 45% marks
- Age: 15-22 years

**Reservation Policy:**
- SC/ST: 5% relaxation in minimum marks
- OBC: 3% relaxation in minimum marks
- PWD: Special provisions available

Each program may have specific subject requirements. Contact admissions office for detailed information!`
    }
  },

  // Fee Structure
  fees: {
    patterns: [
      'fee', 'fees', 'cost', 'tuition', 'price', 'payment', 'scholarship',
      'financial', 'expensive', 'affordable', 'pay', 'money', 'charges'
    ],
    responses: {
      general: `**💰 Fee Structure (Annual)**

**Undergraduate Programs:**
- B.Tech (Engineering): ₹1,20,000/year
- B.Sc (Science): ₹60,000/year
- B.Com (Commerce): ₹50,000/year
- BBA (Management): ₹80,000/year

**Postgraduate Programs:**
- M.Tech: ₹1,50,000/year
- M.Sc: ₹70,000/year
- MBA: ₹2,00,000/year

**Diploma Programs:**
- Polytechnic Diploma: ₹40,000/year

**Additional Charges:**
- Admission Fee (One-time): ₹10,000
- Examination Fee (Annual): ₹5,000
- Library & Lab Fee (Annual): ₹8,000
- Development Fee (Annual): ₹7,000

**Payment Methods:**
✅ Online (Net Banking/UPI/Credit Card/Debit Card)
✅ Demand Draft
✅ Bank Transfer

**Installment Options Available:**
- 1st Installment: 60% (at admission)
- 2nd Installment: 40% (within 3 months)

Ask me about scholarships to reduce your fees!`,

      scholarships: `**🎓 Scholarship Opportunities:**

**Merit-Based Scholarships:**
1. **Gold Medal Scholarship**
   - For top 3 rank holders in entrance exam
   - 100% tuition fee waiver
   
2. **Silver Scholarship**
   - For rank 4-10
   - 50% tuition fee waiver
   
3. **Academic Excellence Award**
   - For 90%+ in 12th grade
   - 25% fee reduction

**Need-Based Scholarships:**
1. **Economic Support Scheme**
   - For family income < ₹3 lakhs/year
   - Up to 40% fee waiver
   
2. **Government Scholarships**
   - SC/ST scholarships
   - Minority scholarships
   - Girl child education support

**Special Scholarships:**
- Sports Excellence: Up to 30% waiver
- Cultural Activities: Up to 20% waiver
- Single Parent Family: 15% waiver

**How to Apply:**
Submit scholarship application along with admission form. Income certificates and relevant documents required.

Scholarships can be combined (max 75% total waiver)!`
    }
  },

  // Exam Information
  exams: {
    patterns: [
      'exam', 'test', 'examination', 'schedule', 'date', 'semester',
      'when is exam', 'result', 'marks', 'grade', 'assessment', 'evaluation'
    ],
    responses: {
      general: `**📅 Examination Schedule**

**Academic Year Pattern:**
- 2 Semesters per year (Odd & Even)
- Each semester: 6 months duration

**Odd Semester (July - December):**
- Mid-Term Exams: October 1st week
- End-Term Exams: December 3rd week
- Results: Mid-January

**Even Semester (January - June):**
- Mid-Term Exams: March 3rd week  
- End-Term Exams: May 3rd week
- Results: Mid-July

**Exam Pattern:**
- Mid-Term: 30 marks (20% theory + 10% practical)
- End-Term: 70 marks (50% theory + 20% practical)
- Total: 100 marks per subject
- Pass Marks: 40%

**Assessment Components:**
- Internal Assessment: 30%
  * Attendance: 5%
  * Assignments: 10%
  * Mid-term exam: 15%
- External Exam: 70%

**Important Dates 2026:**
- Odd Sem Registration: July 1-10
- Classes Begin: July 15
- Mid-term: Oct 5-12
- End-term: Dec 15-28
- Winter Break: Jan 1-14

**Re-examination Policy:**
- For students with <40% in any subject
- Re-exam fee: ₹500 per subject
- Conducted in January (Odd sem) & July (Even sem)

Need specific program exam details? Just ask!`,

      results: `**📊 Result Information:**

**Result Declaration:**
- Results published within 4 weeks of exam completion
- Available on college portal and notice board

**Grading System:**
- O (Outstanding): 90-100% - 10 Grade Points
- A+ (Excellent): 80-89% - 9 Grade Points
- A (Very Good): 70-79% - 8 Grade Points
- B+ (Good): 60-69% - 7 Grade Points
- B (Above Average): 50-59% - 6 Grade Points
- C (Average): 40-49% - 5 Grade Points
- F (Fail): <40% - 0 Grade Points

**CGPA Calculation:**
- Cumulative Grade Point Average
- All semester grades combined
- Weighted by credit hours

**Revaluation Process:**
- Apply within 10 days of result
- Fee: ₹300 per subject
- Result in 15 days
- Marks can increase or decrease

**Transcript/Mark Sheet:**
- Provisional certificate: Free (issued immediately)
- Original degree: After program completion
- Duplicate mark sheet: ₹200 per copy`
    }
  },

  // Faculty Information
  faculty: {
    patterns: [
      'faculty', 'teacher', 'professor', 'staff', 'instructor', 'lecturer',
      'department', 'hod', 'teaching', 'qualification', 'experience'
    ],
    responses: {
      general: `**👨‍🏫 Our Esteemed Faculty**

Our college boasts highly qualified and experienced faculty members dedicated to student success.

**Faculty Strength:**
- Total Faculty: 150+ members
- Professors: 30
- Associate Professors: 50
- Assistant Professors: 70
- Visiting Faculty: 15+

**Departments & HODs:**

**Engineering Department:**
- Computer Science - Dr. Rajesh Kumar (Ph.D., IIT Delhi)
- Mechanical - Prof. Anita Sharma (Ph.D., 20+ years exp)
- Electronics - Dr. Vijay Patel (Ph.D., IISc Bangalore)
- Civil - Prof. Suresh Gupta (Ph.D., NIT)

**Science Department:**
- Physics - Dr. Meera Reddy (Ph.D., Gold Medalist)
- Chemistry - Prof. Arun Krishnan (Ph.D., Published Researcher)
- Mathematics - Dr. Priya Singh (Ph.D., TIFR)
- Biology - Prof. Ramesh Verma (Ph.D., 15+ years exp)

**Commerce & Management:**
- Commerce - Dr. Kavita Joshi (Ph.D., CA)
- MBA - Prof. Amit Malhotra (Ph.D., IIM Alumnus)

**Qualifications:**
- 100% faculty with Master's degrees
- 65% faculty with Ph.D.
- Average teaching experience: 12 years
- Regular industry exposure programs

**Faculty Development:**
- Annual training workshops
- Research publication support
- Conference participation funding
- Industry collaboration projects

Our faculty maintains a strong student-teacher relationship with accessible office hours and mentorship programs!`,

      achievements: `**🏆 Faculty Achievements:**

**Research Publications:**
- 200+ papers in international journals
- 150+ conference presentations
- 50+ books and book chapters

**Awards & Recognition:**
- 15 faculty received National Teaching Awards
- 10 Best Research Paper awards
- 5 patents filed in last 2 years

**Industry Collaboration:**
- Guest lectures from industry experts
- Joint research projects with companies
- Curriculum designed with industry input

**Student Support:**
- Dedicated mentorship program
- Career counseling available
- Project guidance and support
- 24/7 doubt clearing sessions

**Faculty-Student Ratio:** 1:15
This ensures personalized attention and quality education!`
    }
  },

  // Placement Statistics
  placements: {
    patterns: [
      'placement', 'job', 'recruit', 'company', 'salary', 'package',
      'career', 'employment', 'hired', 'campus', 'training', 'internship'
    ],
    responses: {
      general: `**🎯 Placement Statistics 2024-25**

**Overall Placement Record:**
- Students Placed: 850+ (85% placement rate)
- Highest Package: ₹45 LPA
- Average Package: ₹8.5 LPA
- Median Package: ₹6.2 LPA

**Top Recruiters:**
1. **IT & Software:**
   - Microsoft, Google, Amazon
   - TCS, Infosys, Wipro, HCL
   - Adobe, Salesforce, Oracle
   
2. **Core Engineering:**
   - L&T, Siemens, Bosch
   - Tata Motors, Mahindra
   - ABB, Schneider Electric

3. **Finance & Consulting:**
   - Deloitte, EY, PwC, KPMG
   - McKinsey, BCG (select students)
   - ICICI, HDFC, Axis Bank

4. **Product Companies:**
   - Flipkart, PayTM, Zomato
   - Uber, Ola, Swiggy

**Department-wise Placement:**
- Computer Science: 95% (Avg: ₹12 LPA)
- Electronics: 88% (Avg: ₹7.5 LPA)
- Mechanical: 82% (Avg: ₹6.8 LPA)
- MBA: 90% (Avg: ₹10 LPA)

**Internship Opportunities:**
- 100% students get summer internships
- Stipend range: ₹10,000 - ₹50,000/month
- Many internships convert to full-time offers

**Pre-Placement Training:**
✅ Resume building workshops
✅ Mock interviews (technical + HR)
✅ Group discussion practice
✅ Aptitude & coding training
✅ Soft skills development
✅ Industry expert sessions

**Campus Drive Schedule:**
- Starts: September (final year)
- Company visits: 150+ companies annually
- Dream companies (₹15+ LPA): Oct-Nov
- Regular drives: Dec-March
- Off-campus support: Year-round

Our Training & Placement Cell ensures maximum opportunities for every student!`,

      training: `**💼 Placement Training Program:**

**Training Timeline:**
- Pre-Final Year: July-December (Foundation)
- Final Year: January-July (Intensive)

**Technical Training:**
- Programming (C, C++, Java, Python)
- Data Structures & Algorithms
- Database Management (SQL)
- Web Development (Full Stack)
- Domain-specific skills

**Aptitude & Reasoning:**
- Quantitative Aptitude
- Logical Reasoning
- Verbal Ability
- Puzzle Solving

**Communication Skills:**
- English speaking & writing
- Presentation skills
- Business communication
- Email etiquette

**Interview Preparation:**
- Technical interview mock sessions
- HR interview practice
- Group discussions
- Case study analysis
- Behavioral questions

**Soft Skills:**
- Leadership development
- Teamwork & collaboration
- Time management
- Professional etiquette

**Industry Certifications Offered:**
- Cloud Computing (AWS/Azure)
- Data Science & AI/ML
- Cybersecurity essentials
- Digital Marketing
- Project Management (PMP basics)

Training is FREE for all students and attendance is mandatory for final year students!`
    }
  },

  // Facilities and Campus
  facilities: {
    patterns: [
      'facility', 'facilities', 'campus', 'library', 'hostel', 'lab',
      'infrastructure', 'sports', 'accommodation', 'mess', 'wifi'
    ],
    responses: {
      general: `**🏫 Campus Facilities:**

**Academic Infrastructure:**
- 50+ Smart Classrooms with projectors
- 30+ Well-equipped Laboratories
- Central Library: 50,000+ books
- E-Library: 10,000+ e-journals
- 24/7 High-speed WiFi (100 Mbps)

**Hostel Facilities:**
- Separate Boys & Girls Hostels
- Capacity: 1200+ students
- AC & Non-AC rooms available
- 24/7 Security & CCTV
- Mess with nutritious food
- Common rooms with TV
- Medical facility on-campus

**Sports & Recreation:**
- Cricket, Football grounds
- Basketball & Volleyball courts
- Indoor: Table Tennis, Badminton, Chess
- Swimming Pool (Olympic size)
- Gymnasium with modern equipment
- Annual sports fest

**Other Amenities:**
- Cafeteria & Food Court
- ATM & Banking facility
- Medical center with doctor
- Auditorium (1000 capacity)
- Seminar halls (5 nos)
- Parking facility
- Shopping complex
- Laundry services

**Technology Labs:**
- IoT & Robotics Lab
- AI & Machine Learning Lab  
- Cloud Computing Center
- CAD/CAM Lab
- Electronics & Circuit Lab

Our campus provides everything you need for comfortable learning and living!`
    }
  },

  // Programs Offered
  programs: {
    patterns: [
      'program', 'programmes', 'course', 'courses', 'degree', 'branch',
      'stream', 'what can i study', 'subjects', 'btech', 'mba', 'bsc', 'available courses'
    ],
    responses: {
      general: `**🎓 Programs Offered:**

**Undergraduate (UG) Programs:**

**Engineering (B.Tech) - 4 Years:**
- Computer Science & Engineering
- Mechanical Engineering
- Electronics & Communication
- Civil Engineering
- Electrical Engineering
- Information Technology

**Sciences (B.Sc) - 3 Years:**
- Physics
- Chemistry
- Mathematics
- Biology
- Biotechnology
- Environmental Science

**Commerce & Management:**
- B.Com (Commerce) - 3 Years
- BBA (Business Administration) - 3 Years

**Postgraduate (PG) Programs:**

**Engineering (M.Tech) - 2 Years:**
- Computer Science
- VLSI Design
- Structural Engineering
- Power Systems
- Embedded Systems

**Sciences (M.Sc) - 2 Years:**
- Physics
- Chemistry
- Mathematics
- Environmental Science

**Management:**
- MBA (Master of Business Administration) - 2 Years
  * Specializations: Finance, Marketing, HR, Operations

**Diploma Programs:**
- Polytechnic Diploma (3 Years)
  * Mechanical, Civil, Electronics, Computer Science

**All programs are:**
✅ Approved by AICTE/UGC
✅ Affiliated to State University
✅ Industry-oriented curriculum
✅ With placement support`
    }
  },

  // Location and Address
  location: {
    patterns: [
      'location', 'address', 'where', 'find', 'directions', 'map',
      'how to reach', 'situated', 'city', 'area', 'route', 'transport'
    ],
    responses: {
      general: `**📍 College Location & How to Reach:**

**Address:**
XYZ College of Engineering & Technology
123 Education Street, University Area
City Name - 500001
State, India

**Nearby Landmarks:**
- Near City Central Park
- Opposite University Metro Station
- 2 km from City Railway Station
- 15 km from International Airport

**How to Reach:**

**By Metro:**
- Take Metro Line 2
- Get down at University Station
- College is 500m walking distance

**By Bus:**
- Bus Routes: 45, 78, 102, 215
- Get down at "College Bus Stop"
- Direct buses from major city areas

**By Train:**
- Nearest Railway Station: City Central (2 km)
- Take auto or college shuttle bus

**By Air:**
- Airport: 15 km away
- Pre-paid taxi/Uber available
- College shuttle on request

**Private Vehicle:**
- Ample parking space available
- Well-connected by main roads
- GPS Coordinates: [Available on website]

**College Shuttle Service:**
- Available from 15+ pickup points
- Monday to Saturday
- Timings: 7:00 AM to 7:00 PM`
    }
  },

  // Contact Information
  contact: {
    patterns: [
      'contact', 'phone', 'email', 'call', 'reach out', 'talk to',
      'number', 'helpline', 'support', 'enquiry', 'inquiry'
    ],
    responses: {
      general: `**📞 Contact Information:**

**General Enquiries:**
- Phone: +91-123-456-7890
- Email: info@xyzcollege.edu.in
- Website: www.xyzcollege.edu.in

**Admissions Office:**
- Phone: +91-123-456-7891
- Email: admissions@xyzcollege.edu.in
- Timing: 9:00 AM - 5:00 PM (Mon-Sat)

**Placement Cell:**
- Phone: +91-123-456-7892
- Email: placements@xyzcollege.edu.in

**Exam Section:**
- Phone: +91-123-456-7893
- Email: exams@xyzcollege.edu.in

**Hostel Office:**
- Phone: +91-123-456-7894
- Email: hostel@xyzcollege.edu.in

**24/7 Helpline:**
- Emergency: +91-123-456-7895

**Social Media:**
- Facebook: /XYZCollege
- Instagram: @xyzcollege
- Twitter: @XYZCollege
- LinkedIn: XYZ College Official

**Office Hours:**
- Monday to Friday: 9:00 AM - 5:00 PM
- Saturday: 9:00 AM - 2:00 PM
- Sunday: Closed

**Visit Us:**
Walk-in visitors welcome during office hours!`
    }
  },

  // Campus Life and Activities
  campusLife: {
    patterns: [
      'life', 'campus life', 'activities', 'clubs', 'events', 'fests',
      'cultural', 'technical', 'fun', 'extra curricular', 'student life'
    ],
    responses: {
      general: `**🎪 Campus Life & Activities:**

**Student Clubs & Societies:**

**Technical Clubs:**
- Coding Club - Competitive programming
- Robotics Club - Innovation & automation
- Electronics Club - Circuit designing
- AI/ML Club - Machine learning projects

**Cultural Clubs:**
- Music Club (Vocal & Instrumental)
- Dance Club (Classical & Western)
- Drama & Theatre Club
- Photography Club
- Art & Craft Club

**Social & Professional:**
- Literary & Debating Society
- Entrepreneurship Cell
- Environmental Club
- NSS (National Service Scheme)
- Red Cross Society

**Annual Events:**

**Technical Fest (TechnoFest):**
- 3-day technical extravaganza
- Coding competitions, hackathons
- Robotics challenges
- Guest lectures from industry experts
- Prize money: ₹5+ lakhs

**Cultural Fest (Kaleidoscope):**
- 2-day cultural celebration
- Music, dance, fashion shows
- Celebrity performances
- Inter-college competitions
- Food stalls and fun activities

**Sports Week:**
- Annual sports competition
- Inter-department tournaments
- Individual & team events
- Medals and trophies

**Other Regular Activities:**
- Weekly movie screenings
- Monthly workshops & seminars
- Festival celebrations (Diwali, Christmas, etc.)
- Alumni interaction sessions
- Industrial visits

**Student Support:**
- Student Council (elected representatives)
- Anti-ragging committee
- Grievance redressal cell
- Mental health counseling

Campus life is vibrant, inclusive and full of opportunities to grow!`
    }
  },

  // Library
  library: {
    patterns: [
      'library', 'books', 'reading', 'study', 'e-library', 'journals',
      'reference', 'reading room', 'book issue'
    ],
    responses: {
      general: `**📚 Central Library:**

**Collection:**
- 50,000+ printed books
- 10,000+ e-books
- 500+ national & international journals
- 200+ magazines & newspapers
- Reference books for all subjects
- Previous year question papers

**Digital Resources:**
- E-Library with online access
- IEEE, Springer, Elsevier subscriptions
- Digital thesis & dissertations
- Video lectures & tutorials
- Research databases

**Facilities:**
- Air-conditioned reading rooms
- Seating capacity: 300+ students
- Separate reference section
- Discussion rooms for group study
- Computer lab with internet
- Photocopying & printing facility

**Operating Hours:**
- Monday to Saturday: 8:00 AM - 8:00 PM
- Sunday: 9:00 AM - 5:00 PM
- During exams: Extended till 10:00 PM

**Borrowing Rules:**
- Students can issue 5 books at a time
- Issue period: 15 days
- Renewal allowed (once)
- Late return fine: ₹5 per day

**Services:**
- Book reservation system
- New arrival notifications
- Reference assistance
- Research support
- Inter-library loan facility

**Online Portal:**
- Search books online
- Check availability
- Renew books digitally
- Download e-resources

Your gateway to knowledge and research!`
    }
  },

  // Research and Innovation
  research: {
    patterns: [
      'research', 'innovation', 'project', 'phd', 'publication',
      'patents', 'r&d', 'laboratory', 'thesis'
    ],
    responses: {
      general: `**🔬 Research & Innovation:**

**Research Focus Areas:**
- Artificial Intelligence & Machine Learning
- Internet of Things (IoT)
- Renewable Energy
- Nanotechnology
- Biotechnology
- Environmental Engineering
- Data Science & Analytics

**Research Centers:**
- AI & Robotics Research Lab
- Energy Research Center
- Biotech Research Unit
- Materials Science Lab
- Environmental Studies Center

**Ph.D. Programs:**
- Available in Engineering & Sciences
- Full-time and Part-time options
- Research fellowships available
- Stipend: ₹31,000-35,000/month (UGC norms)

**Student Research:**
- Encouraged from 2nd year onwards
- Final year mandatory projects
- Funding support for innovative ideas
- Collaboration with industries
- Participation in competitions

**Publications:**
- 200+ research papers annually
- Published in reputed journals
- International conference presentations
- Student co-authorship encouraged

**Patents & Innovation:**
- 25+ patents filed
- Innovation & Incubation Cell active
- Startup support available
- Prototype development facilities

**Industry Collaboration:**
- Joint research projects
- Sponsored research programs
- Industry-defined problems
- Internship opportunities

**Research Conferences:**
- Annual national conference hosted
- Student paper presentations
- Industry expert talks
- Networking opportunities

**Support:**
- Research methodology courses
- Statistical software training
- Technical writing workshops
- Ethics committee guidance

Fostering innovation and advancing knowledge!`
    }
  },

  // Alumni Network
  alumni: {
    patterns: [
      'alumni', 'passed out', 'former students', 'old students',
      'alumni network', 'graduates', 'successful students'
    ],
    responses: {
      general: `**🎓 Alumni Network:**

**Our Pride:**
- 10,000+ alumni worldwide
- Working in 50+ countries
- Distinguished positions in top companies
- Successful entrepreneurs (100+ startups)

**Notable Alumni:**
- CEOs of major corporations
- IAS/IPS officers
- Scientists at ISRO, DRDO
- University professors globally
- Award-winning innovators

**Alumni in Top Companies:**
- Google, Microsoft, Amazon
- Goldman Sachs, McKinsey
- TATA, Reliant, Wipro
- Government organizations

**Alumni Network Benefits:**

**For Current Students:**
- Mentorship programs
- Industry guidance
- Internship opportunities
- Placement referrals
- Career counseling

**For Alumni:**
- Lifetime membership (free)
- Access to campus facilities
- Networking events
- Continued learning programs
- Reunion celebrations

**Alumni Events:**
- Annual Homecoming (December)
- Alumni meet in major cities
- Webinars by successful alumni
- Industry insights sessions

**Alumni Contributions:**
- Scholarship funding
- Lab equipment donations
- Guest lecturers
- Placement support
- Infrastructure development

**Stay Connected:**
- Alumni portal: alumni.xyzcollege.edu.in
- LinkedIn Alumni Group
- WhatsApp communities
- Quarterly newsletter

**Alumni Association:**
- Registered association
- Elected office bearers
- Various regional chapters
- Active engagement programs

Join our ever-growing family of achievers!`
    }
  },

  // Attendance and Rules
  attendance: {
    patterns: [
      'attendance', 'present', 'absent', 'leave', 'percentage',
      'minimum attendance', 'bunk', 'proxy', 'compulsory'
    ],
    responses: {
      general: `**📋 Attendance Policy:**

**Minimum Requirement:**
- 75% attendance is mandatory
- Applies to theory and practical classes
- Medical cases: 65% with proper certificates

**Attendance Calculation:**
- Classes conducted vs classes attended
- Separate for each subject
- Cumulative for the semester

**Consequences of Low Attendance:**

**Below 75%:**
- Warning letter to parents
- Not eligible for regular exams
- Must apply for condonation

**Condonation Process:**
- Available for 65-75% attendance
- With valid medical certificates
- Fee: ₹500 per subject
- Dean's approval required

**Below 65%:**
- Not allowed to sit for exams
- Must repeat the semester
- No condonation allowed

**Leave Policy:**

**Medical Leave:**
- Submit medical certificate within 3 days
- From registered hospital/doctor
- Allowed for serious illness

**Other Leaves:**
- Need prior permission
- Submit application to HOD
- Valid reasons only

**Late Coming:**
- After 15 minutes not allowed in class
- Marked as absent for that period
- 3 late marks = 1 absence

**Biometric Attendance:**
- Implemented across campus
- Real-time tracking
- Available on student portal
- SMS alerts to parents (below 75%)

**Benefits of Good Attendance:**

**90%+ Attendance:**
- 5 bonus marks in internals
- Certificate of regularity
- Preference in placements

**100% Attendance:**
- Special award & certificate
- Announced in annual function

**Check Attendance:**
- Student portal (daily updates)
- Mobile app available
- HOD notification system

Regular attendance is key to academic success!`
    }
  },

  // Transportation
  transport: {
    patterns: [
      'bus', 'transport', 'shuttle', 'vehicle', 'travel',
      'college bus', 'pick up', 'route', 'timing'
    ],
    responses: {
      general: `**🚌 Transportation Facilities:**

**College Bus Service:**

**Coverage:**
- 15+ routes covering entire city
- 200 km area coverage
- 25 buses in fleet
- AC and Non-AC options available

**Routes & Pickup Points:**
- Major residential areas covered
- Metro station connectivity
- Railway station route
- Fixed pickup/drop times

**Bus Timings:**
- Morning: Multiple trips (6:30 AM - 8:30 AM)
- Evening: Return trips (5:00 PM - 7:00 PM)
- Special trips during exams

**Bus Fees:**
- Annual: ₹15,000 (Non-AC)
- Annual: ₹20,000 (AC)
- Semester-wise payment option
- Distance-based charges

**Facilities in Buses:**
- GPS tracking for safety
- Female attendant in lady buses
- First aid kit
- CCTV cameras
- Comfortable seating

**Safety Features:**
- Trained drivers
- Speed governors installed
- Regular maintenance
- Insurance coverage
- Emergency contacts displayed

**How to Avail:**
1. Fill transport form during admission
2. Select preferred route
3. Pay fees (included in admission process)
4. Receive bus pass with route details

**Bus Pass:**
- ID card cum bus pass issued
- RFID enabled
- Must carry daily
- Transferable within family (with permission)

**Tracking System:**
- Live bus tracking app
- ETA notifications
- Route changes updates
- Driver contact details

**Rules:**
- Maintain discipline in bus
- No standing while moving
- Follow bus timings
- Report issues to transport office

Safe, comfortable, and punctual transportation!`
    }
  },

  // Canteen and Food
  canteen: {
    patterns: [
      'food', 'canteen', 'mess', 'cafeteria', 'eat', 'lunch',
      'breakfast', 'dinner', 'restaurant', 'cafe'
    ],
    responses: {
      general: `**🍽️ Food & Canteen Facilities:**

**Main Canteen:**
- Seating capacity: 500+ students
- Hygienic food preparation
- Quality certified by food department
- Affordable pricing

**Multiple Food Courts:**
- North Indian cuisine
- South Indian corner
- Chinese & Continental
- Fast food section
- Juice & beverage center

**Menu Highlights:**

**Breakfast (7:00 AM - 10:00 AM):**
- Idli, Dosa, Upma, Poha
- Paratha, Sandwich
- Tea, Coffee, Milk
- Price range: ₹20-60

**Lunch (12:00 PM - 2:30 PM):**
- Full meals (₹60-80)
- North & South Indian thalis
- Chinese combos
- Biryani (Specials)
- Salad bar

**Snacks (2:00 PM - 6:00 PM):**
- Samosa, Pakora, Cutlets
- Burgers, Pizza slices
- Sandwiches, Rolls
- Price: ₹15-50

**Dinner (for hostellers):**
- Chapati, Rice, Dal, Sabzi
- Weekly special menus
- Included in hostel fees

**Special Features:**
- Pure vegetarian section
- Jain food available
- Separate non-veg counter
- Weekly dinner specials
- Festival special menus

**Cafes:**
- Coffee Day outlet
- Juice corner
- Ice cream parlor
- Bakery items

**Pricing:**
- Student-friendly rates
- Meal coupons available
- Monthly meal cards with discount
- Digital payment accepted

**Quality & Hygiene:**
- Regular health inspections
- Fresh ingredients daily
- Clean dining area
- Waste segregation
- Purified drinking water

**Timings:**
- Monday to Saturday: 7:00 AM - 8:00 PM
- Sunday: Limited menu (8:00 AM - 6:00 PM)
- Extended hours during exams

**Food Committee:**
- Student representatives
- Monthly menu review
- Feedback system active
- Quality monitoring

Delicious, hygienic, and affordable food on campus!`
    }
  },

  // Student Support Services
  support: {
    patterns: [
      'help', 'support', 'counseling', 'problem', 'issue', 'complaint',
      'mental health', 'stress', 'guidance', 'assistance'
    ],
    responses: {
      general: `**🤝 Student Support Services:**

**Academic Support:**
- Personal mentors assigned
- Doubt clearing sessions
- Extra classes for weak students
- One-on-one faculty interaction
- Study material support

**Counseling Services:**

**Career Counseling:**
- Professional guidance
- Aptitude testing
- Career path planning
- Higher education advice
- Industry mentor connect

**Personal Counseling:**
- Professional psychologist available
- Confidential sessions
- Stress management help
- Work-life balance guidance
- Free of charge

**Medical Facilities:**

**Health Center:**
- Full-time doctor on campus
- Nurse available 24/7
- First aid facility
- Basic medicines free
- Ambulance on call

**Tie-ups:**
- Nearby multi-specialty hospitals
- Health insurance options
- Annual health checkup camps
- Blood donation drives

**Anti-Ragging:**
- Zero tolerance policy
- Anti-ragging committee active
- 24/7 helpline
- Swift action on complaints
- Awareness programs

**Grievance Redressal:**
- Grievance cell functional
- Online complaint portal
- Timely resolution
- Anonymous complaints accepted

**Financial Support:**
- Education loans guidance
- Scholarship assistance
- Fee installment facility
- Emergency financial aid

**For Girls:**
- Women's cell active
- Safety measures strict
- CCTV coverage
- Female security guards
- Self-defense training

**Disability Support:**
- Ramp access throughout
- Disability-friendly washrooms
- Assistive technologies
- Special exam provisions
- Dedicated coordinators

**Legal Aid:**
- Legal awareness programs
- Basic legal consultation
- Rights education

**Student Helpdesk:**
- Information center
- Query resolution
- Form assistance
- General guidance

**24/7 Support:**
- Security control room
- Emergency helpline
- Warden contact

We care for your overall well-being and success!`
    }
  },

  // Scholarships Extended
  scholarshipsExtended: {
    patterns: [
      'more scholarship', 'other scholarship', 'govt scholarship',
      'external scholarship', 'sponsorship', 'financial aid'
    ],
    responses: {
      general: `**🏆 Additional Scholarship Information:**

**Government Scholarships:**

**Central Schemes:**
- Post Matric Scholarship (SC/ST/OBC)
- Pre Matric Scholarship
- Minority Scholarships
- National Means cum Merit Scholarship
- Prime Minister Scholarship Scheme

**State Government:**
- State Merit Scholarship
- BC/MBC Scholarships
- EBC Scholarships
- Disabled Students Scholarship

**National Scholarships:**
- AICTE Pragati (Girls in Technical)
- AICTE Saksham (Disabled Students)
- UGC NET Research Fellowship
- INSPIRE Scholarship (Science students)

**Private & Corporate Scholarships:**
- HDFC Educational Crisis Scholarship
- Reliance Foundation Scholarships
- Tata Trust Scholarships
- Sitaram Jindal Foundation
- Dr. APJ Abdul Kalam Scholarship

**International Scholarships:**
- For students going abroad
- Guidance for applications
- Documentation support

**How to Apply:**
1. Register on National Scholarship Portal
2. Fill application before deadline
3. Upload required documents
4. Submit to college for verification
5. Track application status online

**College's Role:**
- Document verification
- Online submission support
- Direct benefit transfer facilitation
- Regular follow-up

**Documents  Required:**
- Income certificate
- Caste certificate (if applicable)
- Bank account details
- Aadhar card
- Previous year mark sheets

**Scholarship Cell:**
- Dedicated office for guidance
- Help with applications
- Information about new schemes
- Regular workshops

Start early - Apply in time!`
    }
  },

  // About the College
  about: {
    patterns: [
      'about', 'history', 'established', 'founded', 'background',
      'college info', 'tell me about college', 'overview'
    ],
    responses: {
      general: `**🏛️ About Our College:**

**Established:** 1995

**Vision:**
"To be a center of excellence in technical and professional education, research, and innovation."

**Mission:**
- Provide quality education
- Foster research and innovation
- Develop industry-ready professionals
- Promote ethical and social values
- Serve society through knowledge

**Accreditation & Recognition:**
- AICTE Approved
- Affiliated to State University
- NBA Accredited (3 departments)
- NAAC Accredited with 'A' Grade
- ISO 9001:2015 Certified

**Campus:**
- Sprawling 50-acre campus
- Green and eco-friendly
- Modern infrastructure
- State-of-the-art facilities

**Student Strength:**
- 5000+ students
- From 20+ states
- International students from 5+ countries
- Diverse and inclusive community

**Achievements:**
- Ranked among top colleges in state
- 85% placement record consistently
- 200+ research publications/year
- Multiple awards and recognitions

**Collaborations:**
- MoUs with 50+ industries
- International university partnerships
- Research collaborations
- Industry-academia interface

**Leadership:**
- Experienced management committee
- Visionary principal & directors
- Dedicated administrators
- Industry advisory board

**Values We Uphold:**
- Excellence in education
- Integrity and ethics
- Innovation and creativity
- Social responsibility
- Inclusivity and diversity

**Our Commitment:**
Not just degrees, but shaping future leaders, innovators, and responsible citizens!

Proud legacy of 25+ years!`
    }
  },

  // Default fallback responses
  fallback: [
    "I'm here to help with information about our college! I can assist you with:\n\n✅ Admissions & Eligibility\n✅ Fee Structure & Scholarships\n✅ Exam Schedules & Results\n✅ Faculty & Departments\n✅ Placements & Training\n✅ Campus Facilities\n✅ Programs Offered\n✅ Location & Contact\n✅ Campus Life & Clubs\n✅ Library & Research\n✅ Transportation & Food\n✅ Student Support\n\nWhat would you like to know?",

    "I'm your 24/7 college assistant! Ask me anything about:\n📚 Academics | 💰 Fees | 🎯 Placements | 🏫 Campus Life | 📞 Contact Info | 🚌 Transport | 🍽️ Food | 👨‍🏫 Faculty | 📅 Exams\n\nHow can I help you today?",

    "That's an interesting question! While I may not have that exact information, I can definitely help you with comprehensive details about:\n\n• Admission Process & Eligibility\n• Complete Fee Structure\n• Exam Dates & Patterns\n• Faculty Information\n• Placement Statistics & Training\n• All Programs Offered\n• Campus Facilities & Infrastructure\n• Student Life & Activities\n• Location & How to Reach\n• Contact Information\n• Library & Research Options\n• Attendance Policies\n• Support Services\n\nWhat specific information do you need?"
  ],

  // Thank you responses
  thanks: {
    patterns: ['thank', 'thanks', 'thank you', 'appreciate', 'helpful', 'great', 'awesome', 'nice'],
    responses: [
      "You're very welcome! 😊 Feel free to ask if you have any more questions about our college!",
      "Happy to help! If you need anything else about admissions, placements, or campus life, I'm here for you!",
      "Glad I could assist! Don't hesitate to reach out if you have more questions!",
      "My pleasure! Good luck with your college journey! 🎓",
      "You're welcome! I'm always here to help with any college-related queries! 😊"
    ]
  },

  // Goodbye responses
  goodbye: {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'exit', 'quit', 'close'],
    responses: [
      "Goodbye! Best wishes for your future! If you need help again, I'll be here! 👋",
      "Take care! Feel free to return anytime you have questions! 😊",
      "See you later! Good luck with your college journey! 🎓",
      "Thanks for chatting! Come back anytime you need information about our college! 👋"
    ]
  }
};

module.exports = knowledgeBase;
