// INTERNOVA demo datasets. 
const companies = [
 {name:"Petronas",industry:"Energy",location:"Kuala Lumpur",website:"https://www.petronas.com",desc:"Energy and solutions company.",logo:"Petronas.svg"},
 {name:"Maybank",industry:"Banking & Finance",location:"Kuala Lumpur",website:"https://www.maybank.com",desc:"Financial services and banking.",logo:"Maybank.svg"},
 {name:"CIMB",industry:"Banking & Finance",location:"Kuala Lumpur",website:"https://www.cimb.com",desc:"Regional banking and financial services.",logo:"Cimb.svg"},
 {name:"Tenaga Nasional Berhad",industry:"Energy & Utilities",location:"Kuala Lumpur",website:"https://www.tnb.com.my",desc:"Electricity and utility services.",logo:"Tnb.svg"},
 {name:"Telekom Malaysia",industry:"Telecommunications",location:"Kuala Lumpur",website:"https://www.tm.com.my",desc:"Connectivity and digital services.",logo:"Tm.svg"},
 {name:"AirAsia",industry:"Aviation",location:"Sepang, Selangor",website:"https://www.airasia.com",desc:"Airline and travel services.",logo:"airasia.svg"},
 {name:"Maxis",industry:"Telecommunications",location:"Kuala Lumpur",website:"https://www.maxis.com.my",desc:"Telecommunications and digital solutions.",logo:"Maxis.svg"},
 {name:"CelcomDigi",industry:"Telecommunications",location:"Petaling Jaya, Selangor",website:"https://www.celcomdigi.com",desc:"Mobile connectivity and digital services.",logo:"Celcomdigi.svg"},
 {name:"Grab Malaysia",industry:"Technology",location:"Petaling Jaya, Selangor",website:"https://www.grab.com/my",desc:"Technology platform for mobility and services.",logo:"Grab.svg"},
 {name:"PROTON",industry:"Automotive",location:"Shah Alam, Selangor",website:"https://www.proton.com",desc:"Automotive manufacturing and mobility.",logo:"Proton.svg"},
 {name:"Sime Darby",industry:"Conglomerate",location:"Petaling Jaya, Selangor",website:"https://www.simedarby.com",desc:"Industrial, motors and related businesses.",logo:"Simedarby.svg"},
 {name:"Shopee Malaysia",industry:"E-commerce",location:"Kuala Lumpur",website:"https://shopee.com.my",desc:"E-commerce and digital marketplace.",logo:"Shopee.svg"}
];

const internships = [
 ["Data Analyst Intern","PETRONAS","Energy","Kuala Lumpur",6,1000,"2026-12-10"],
 ["Finance Intern","Maybank","Banking & Finance","Kuala Lumpur",4,900,"2026-12-15"],
 ["Business Analyst Intern","CIMB","Banking & Finance","Kuala Lumpur",6,1000,"2026-12-18"],
 ["IT Support Intern","Tenaga Nasional Berhad","Energy & Utilities","Kuala Lumpur",5,850,"2026-12-20"],
 ["Web Developer Intern","Telekom Malaysia","Telecommunications","Kuala Lumpur",6,900,"2026-12-22"],
 ["Marketing Intern","AirAsia","Aviation","Sepang, Selangor",4,800,"2026-12-25"],
 ["Cybersecurity Intern","Maxis","Telecommunications","Kuala Lumpur",6,1100,"2027-01-05"],
 ["Data Science Intern","CelcomDigi","Telecommunications","Petaling Jaya, Selangor",6,1000,"2027-01-08"],
 ["Product Operations Intern","Grab Malaysia","Technology","Petaling Jaya, Selangor",5,1200,"2027-01-12"],
 ["Software Engineer Intern","PROTON","Automotive","Shah Alam, Selangor",6,900,"2027-01-15"],
 ["Human Resources Intern","Sime Darby","Conglomerate","Petaling Jaya, Selangor",4,800,"2027-01-18"],
 ["UI/UX Design Intern","Shopee Malaysia","E-commerce","Kuala Lumpur",6,1000,"2027-01-20"],
 ["Graphic Design Intern","AirAsia","Aviation","Sepang, Selangor",3,750,"2027-01-22"],
 ["Software Testing Intern","PETRONAS","Energy","Kuala Lumpur",5,950,"2027-01-25"],
 ["Procurement Intern","Sime Darby","Conglomerate","Petaling Jaya, Selangor",4,850,"2027-01-28"],
 ["Digital Marketing Intern","Shopee Malaysia","E-commerce","Kuala Lumpur",4,900,"2027-02-01"],
 ["Network Intern","Telekom Malaysia","Telecommunications","Kuala Lumpur",5,850,"2027-02-05"],
 ["Operations Intern","Grab Malaysia","Technology","Petaling Jaya, Selangor",4,1000,"2027-02-08"],
 ["Engineering Intern","Tenaga Nasional Berhad","Energy & Utilities","Kuala Lumpur",6,950,"2027-02-10"],
 ["Finance Operations Intern","CIMB","Banking & Finance","Kuala Lumpur",4,900,"2027-02-14"]
].map((x,i)=>({id:i+1,position:x[0],company:x[1],industry:x[2],location:x[3],duration:x[4],allowance:x[5],deadline:x[6]}));

const careerFields = [
 {field:"Data Analytics",industry:"Technology",demand:92,skill:"SQL & Data Visualisation",salary:3800},
 {field:"Software Development",industry:"Technology",demand:95,skill:"Programming",salary:4000},
 {field:"Cybersecurity",industry:"Technology",demand:88,skill:"Network Security",salary:4200},
 {field:"Digital Marketing",industry:"Marketing",demand:82,skill:"Digital Campaigns",salary:3200},
 {field:"Finance",industry:"Banking & Finance",demand:78,skill:"Financial Analysis",salary:3500},
 {field:"Human Resources",industry:"Management",demand:68,skill:"Communication",salary:3000},
 {field:"UI/UX Design",industry:"Creative",demand:80,skill:"Figma & Prototyping",salary:3400},
 {field:"Business Analysis",industry:"Business",demand:86,skill:"Problem Solving",salary:3700},
 {field:"Engineering",industry:"Engineering",demand:84,skill:"Technical Design",salary:3600},
 {field:"Supply Chain",industry:"Operations",demand:73,skill:"Logistics Planning",salary:3300}
];

const skillLabels=["Communication","Problem Solving","Data Analysis","Digital Literacy","Teamwork","Adaptability"];
const skillValues=[90,88,84,92,86,82];
const employmentYears=[2021,2022,2023,2024,2025];
const employmentRates=[82,84,85,87,89];
const employmentSummary=[
 {year:2021,rate:82,study:9,seeking:9,salary:2800},
 {year:2022,rate:84,study:8,seeking:8,salary:2950},
 {year:2023,rate:85,study:8,seeking:7,salary:3050},
 {year:2024,rate:87,study:7,seeking:6,salary:3150},
 {year:2025,rate:89,study:6,seeking:5,salary:3300}
];

// ===== DATA ADMIN =====
// [id, nama, no. matrik, program, CGPA, status, syarikat] 
const students = [
 [1,"Nasrullah","2024100001","Information Management",3.62,"Applied","-"],
 [2,"Aiman Hakim","2024100002","Computer Science",3.45,"Interview","-"],
 [3,"Siti Aminah","2024100003","Accounting",3.78,"Placed","Maybank"],
 [4,"Farhan Iskandar","2024100004","Engineering",3.21,"Seeking","-"],
 [5,"Nur Izzati","2024100005","Information Management",3.55,"Placed","Telekom Malaysia"],
 [6,"Hafiz Rahman","2024100006","Business Administration",3.10,"Applied","-"],
 [7,"Aisyah Zainal","2024100007","Computer Science",3.88,"Placed","Petronas"],
 [8,"Danish Irfan","2024100008","Mass Communication",3.30,"Seeking","-"],
 [9,"Balqis Hanani","2024100009","Accounting",3.67,"Interview","-"],
 [10,"Khairul Anwar","2024100010","Engineering",2.95,"Seeking","-"],
 [11,"Mei Ling Tan","2024100011","Business Administration",3.72,"Placed","CIMB"],
 [12,"Arjun Kumar","2024100012","Computer Science",3.40,"Applied","-"]
].map(x=>({id:x[0],name:x[1],matric:x[2],programme:x[3],cgpa:x[4],status:x[5],company:x[6]}));

// Permohonan contoh pelajar lain: [indeks pelajar, id internship, status]
const appSeed = [[1,5,"Interview"],[2,2,"Approved"],[3,1,"Applied"],[4,9,"Rejected"],[5,7,"Applied"],[6,3,"Applied"],[7,10,"Interview"],[8,12,"Applied"],[9,6,"Approved"],[10,4,"Rejected"],[11,15,"Applied"],[1,8,"Applied"],[5,16,"Interview"],[7,14,"Approved"]];

// Jika admin pernah tambah/edit/padam internship, guna senarai yang disimpan (semua page ikut berubah)
try{const saved=JSON.parse(localStorage.getItem("internovaInternships")||"null");if(saved){internships.length=0;internships.push(...saved);}}catch(e){}

// Jika admin pernah tambah/padam syarikat, guna senarai yang disimpan (page Companies pelajar ikut berubah)
try{const savedCo=JSON.parse(localStorage.getItem("internovaCompanies")||"null");if(savedCo){companies.length=0;companies.push(...savedCo);}}catch(e){}
