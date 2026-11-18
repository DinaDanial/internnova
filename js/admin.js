// ===== ADMIN PAGE: Dashboard, Internships, Applications, Students =====
// Halaman admin
if(sessionStorage.getItem("internovaRole")!=="admin"){window.location.href="dashboard.html";}
else{initAdmin();}

function initAdmin(){
const $=id=>document.getElementById(id);
const STATUS=["Applied","Interview","Approved","Rejected"];
const pill=s=>`<span class="pill pill-${s}">${s}</span>`;
const emptyRow=(cols,text)=>`<tr><td colspan="${cols}" class="text-center text-secondary py-4">${text}</td></tr>`;

// ---------- Log aktiviti ----------
function getLog(){return JSON.parse(localStorage.getItem("internovaAdminLog")||"[]");}
function addLog(text,key){
  const log=getLog();
  log.unshift({text:text,key:key||null,time:new Date().toLocaleString("en-MY",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})});
  localStorage.setItem("internovaAdminLog",JSON.stringify(log.slice(0,30)));
}

function deleteLog(n){
  const log=getLog();if(!log[n]||!confirm("Delete this record from the audit trail?"))return;
  log.splice(n,1);localStorage.setItem("internovaAdminLog",JSON.stringify(log));
  showToast("Audit record deleted.");renderDashboard();
}

function logKey(l,apps){
  if(l.key)return l.key;
  const m=/^(Interview|Approved|Rejected): (.+?) - (.+)$/.exec(l.text);
  const a=m&&apps.find(x=>x.student===m[2]&&x.position===m[3]);
  return a?a.key:null;
}

// ---------- Data permohonan ----------
function sampleApps(){
  let list=JSON.parse(localStorage.getItem("internovaAdminApps")||"null");
  if(!list){
    list=appSeed.map((x,i)=>{
      const item=internships.find(n=>n.id===x[1])||internships[0];
      return {key:"s"+i,student:students[x[0]].name,position:item.position,company:item.company,date:"2026-11-"+String(i+1).padStart(2,"0"),status:x[2]};
    });
    localStorage.setItem("internovaAdminApps",JSON.stringify(list));
  }
  return list;
}
// Gabungkan: permohonan sebenar pelajar Nurdina (dari page Internships) + contoh
function allApps(){
  const mine=getApplications().filter(x=>x.status!=="Saved").map(x=>({key:"live-"+x.id,id:x.id,live:true,student:"Nurdina (demo user)",position:x.position,company:x.company,date:x.date,status:x.status}));
  return [...mine,...sampleApps()];
}
function changeStatus(key,status){
  const app=allApps().find(a=>a.key===key);if(!app)return;
  if(app.live){const list=getApplications();list.find(n=>n.id===app.id).status=status;saveApplications(list);}   // pelajar nampak status baru
  else{const list=sampleApps();list.find(n=>n.key===key).status=status;localStorage.setItem("internovaAdminApps",JSON.stringify(list));}
  addLog(`${status}: ${app.student} - ${app.position}`,key);
  showToast(`Application marked as ${status}.`);
  renderApps();
  if(!location.hash||location.hash==="#dashboard")renderDashboard();   // audit trail dikemas kini
}

// ---------- TAB 1: Dashboard ----------
function redraw(id,type,labels,sets,opt){const old=Chart.getChart(id);if(old)old.destroy();xChart(id,type,labels,sets,opt);}
function renderDashboard(){
  const apps=allApps(),count=(arr,fn)=>arr.filter(fn).length;
  const approved=count(apps,x=>x.status==="Approved"),rejected=count(apps,x=>x.status==="Rejected");
  $("adminKpis").innerHTML=[
    statCard("bi-people","Total students",students.length),
    statCard("bi-briefcase","Active internships",internships.length),
    statCard("bi-hourglass-split","Pending applications",count(apps,x=>x.status==="Applied")),
    statCard("bi-check2-circle","Approval rate",(approved+rejected?Math.round(approved/(approved+rejected)*100):0)+"%")
  ].join("");
  redraw("adminStatusChart","doughnut",STATUS,[{data:STATUS.map(s=>count(apps,x=>x.status===s))}]);
  const co=[...new Set(apps.map(x=>x.company))];
  redraw("adminCompanyChart","bar",co,[{label:"Applications",data:co.map(c=>count(apps,x=>x.company===c))}],{indexAxis:"y"});
  const pr=[...new Set(students.map(s=>s.programme))];
  redraw("adminProgrammeChart","polarArea",pr,[{data:pr.map(p=>count(students,s=>s.programme===p))}]);
  const st=["Seeking","Applied","Interview","Placed"];
  redraw("adminPlacementChart","bar",st,[{label:"Students",data:st.map(s=>count(students,x=>x.status===s))}]);
  // Audit trail: rekod terbaru setiap permohonan boleh diubah semula (Interview / Approve / Reject)
  const seen=new Set(),all=allApps(),btnClass={Interview:"primary",Approved:"success",Rejected:"danger"},btnText={Interview:"Interview",Approved:"Approve",Rejected:"Reject"};
  $("activityList").innerHTML=getLog().slice(0,10).map((l,n)=>{
    const key=logKey(l,all),app=key&&!seen.has(key)?all.find(a=>a.key===key):null;
    if(key)seen.add(key);
    const controls=app?`${pill(app.status)} `+["Interview","Approved","Rejected"].filter(s=>s!==app.status).map(s=>`<button class="btn btn-sm btn-outline-${btnClass[s]}" data-act="status" data-id="${key}" data-status="${s}">${btnText[s]}</button>`).join(" "):"";
    return `<li style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding:10px 0;border-bottom:1px solid rgba(128,144,160,.25)"><div><span>${l.text}</span><br><small class="text-secondary">${l.time}</small></div><div class="text-nowrap">${controls} <button class="btn btn-sm btn-outline-secondary" data-act="deleteLog" data-id="${n}" title="Delete this record"><i class="bi bi-trash"></i> Delete</button></div></li>`;
  }).join("")||'<li style="list-style:none" class="text-secondary">No activity yet. Actions you take will appear here.</li>';
}

// ---------- TAB 2: Manage internships ----------
const internModal=new bootstrap.Modal($("internModal"));
let editingId=null;
fillCompanySelect();
function saveInterns(){localStorage.setItem("internovaInternships",JSON.stringify(internships));}
function renderInterns(){
  const q=$("adminInternSearch").value.toLowerCase();
  const rows=internships.filter(x=>(x.position+" "+x.company).toLowerCase().includes(q));
  $("adminInternCount").textContent=`Showing ${rows.length} of ${internships.length} internships`;
  $("adminInternRows").innerHTML=rows.map(x=>`<tr><td><span class="table-title">${x.position}</span></td><td>${x.company}</td><td>${x.industry}</td><td>${x.duration} months</td><td>${money(x.allowance)}</td><td>${x.deadline}</td><td class="text-nowrap"><button class="btn btn-sm btn-outline-primary" data-act="edit" data-id="${x.id}"><i class="bi bi-pencil"></i> Edit</button> <button class="btn btn-sm btn-outline-danger" data-act="delete" data-id="${x.id}"><i class="bi bi-trash"></i></button></td></tr>`).join("")||emptyRow(7,"No internships found.");
}
function openIntern(id){
  editingId=id;
  const x=id?internships.find(n=>n.id===id):{};
  const company=companies.find(c=>c.name.toLowerCase()===(x.company||"").toLowerCase())||companies[0];
  $("internModalTitle").textContent=id?"Edit internship":"Add internship";
  $("fPosition").value=x.position||"";$("fCompany").value=company.name;
  $("fDuration").value=x.duration||6;$("fAllowance").value=x.allowance||1000;$("fDeadline").value=x.deadline||"2027-03-01";
  internModal.show();
}
$("internForm").addEventListener("submit",e=>{
  e.preventDefault();
  const c=companies.find(n=>n.name===$("fCompany").value);
  const data={position:$("fPosition").value.trim(),company:c.name,industry:c.industry,location:c.location,duration:+$("fDuration").value,allowance:+$("fAllowance").value,deadline:$("fDeadline").value};
  if(editingId){Object.assign(internships.find(n=>n.id===editingId),data);addLog("Edited internship: "+data.position);}
  else{data.id=Math.max(0,...internships.map(n=>n.id))+1;internships.push(data);addLog("Added internship: "+data.position);}
  saveInterns();internModal.hide();renderInterns();showToast("Internship saved.");
});
function deleteIntern(id){
  const i=internships.findIndex(n=>n.id===id);if(i<0||!confirm("Delete this internship?"))return;
  addLog("Deleted internship: "+internships[i].position);
  internships.splice(i,1);saveInterns();renderInterns();showToast("Internship deleted.");
}
$("addIntern").addEventListener("click",()=>openIntern(null));
$("adminInternSearch").addEventListener("input",renderInterns);
$("resetInterns").addEventListener("click",()=>{if(confirm("Restore the original internship list?")){localStorage.removeItem("internovaInternships");addLog("Internship list reset");location.reload();}});
$("exportAdminInterns").addEventListener("click",()=>csvDownload("internnova-admin-internships.csv",[["Position","Company","Industry","Location","Duration","Allowance","Deadline"],...internships.map(x=>[x.position,x.company,x.industry,x.location,x.duration,x.allowance,x.deadline])]));

// ---------- TAB 3: Review applications ----------
function renderApps(){
  const q=$("appSearch").value.toLowerCase(),f=$("appFilter").value;
  const rows=allApps().filter(x=>(x.student+" "+x.position+" "+x.company).toLowerCase().includes(q)&&(!f||x.status===f));
  $("appCount").textContent=`Showing ${rows.length} applications`;
  $("appRows").innerHTML=rows.map(x=>`<tr><td><span class="table-title">${x.student}</span></td><td>${x.position}</td><td>${x.company}</td><td>${x.date}</td><td>${pill(x.status)}</td><td class="text-nowrap"><button class="btn btn-sm btn-outline-primary" data-act="status" data-id="${x.key}" data-status="Interview">Interview</button> <button class="btn btn-sm btn-outline-success" data-act="status" data-id="${x.key}" data-status="Approved">Approve</button> <button class="btn btn-sm btn-outline-danger" data-act="status" data-id="${x.key}" data-status="Rejected">Reject</button></td></tr>`).join("")||emptyRow(6,"No applications found.");
}
[$("appSearch"),$("appFilter")].forEach(el=>el.addEventListener("input",renderApps));
$("exportAdminApps").addEventListener("click",()=>csvDownload("internnova-admin-applications.csv",[["Student","Position","Company","Date","Status"],...allApps().map(x=>[x.student,x.position,x.company,x.date,x.status])]));

// ---------- TAB 4: Students ----------
function renderStudents(){
  const q=$("stuSearch").value.toLowerCase(),f=$("stuFilter").value;
  const rows=students.filter(s=>(s.name+" "+s.matric+" "+s.programme).toLowerCase().includes(q)&&(!f||s.status===f))
    .sort((a,b)=>$("stuSort").value==="cgpa"?b.cgpa-a.cgpa:a.name.localeCompare(b.name));
  $("stuCount").textContent=`Showing ${rows.length} of ${students.length} students`;
  $("stuRows").innerHTML=rows.map(s=>`<tr><td><span class="table-title">${s.name}</span></td><td>${s.matric}</td><td>${s.programme}</td><td>${s.cgpa.toFixed(2)}</td><td>${pill(s.status)}</td><td>${s.company}</td></tr>`).join("")||emptyRow(6,"No students found.");
}
[$("stuSearch"),$("stuFilter"),$("stuSort")].forEach(el=>el.addEventListener("input",renderStudents));
$("exportStudents").addEventListener("click",()=>csvDownload("internnova-students.csv",[["Name","Matric","Programme","CGPA","Status","Company"],...students.map(s=>[s.name,s.matric,s.programme,s.cgpa,s.status,s.company])]));

// ---------- TAB: Manage companies ----------
const companyModal=new bootstrap.Modal($("companyModal"));
let editingCompany=null;
const sameName=(a,b)=>String(a).toLowerCase()===String(b).toLowerCase();
function saveCompanies(){localStorage.setItem("internovaCompanies",JSON.stringify(companies));}
// Isi pilihan syarikat dalam borang internship & senarai industri
function fillCompanySelect(){
  const old=$("fCompany").value;$("fCompany").innerHTML="";
  companies.forEach(c=>$("fCompany").add(new Option(c.name,c.name)));
  if(old)$("fCompany").value=old;
  $("industryList").innerHTML=[...new Set(companies.map(c=>c.industry))].map(i=>`<option value="${i}">`).join("");
}
function renderCompanies(){
  const q=$("adminCompanySearch").value.toLowerCase();
  const rows=companies.map((c,i)=>({c,i})).filter(x=>(x.c.name+" "+x.c.industry).toLowerCase().includes(q));
  $("adminCompanyCount").textContent=`Showing ${rows.length} of ${companies.length} companies`;
  $("adminCompanyRows").innerHTML=rows.map(({c,i})=>`<tr><td><span class="table-title">${c.name}</span></td><td>${c.industry}</td><td>${c.location}</td><td><a class="text-link" href="${c.website}" target="_blank" rel="noopener">${c.website.replace(/^https?:\/\//,"")}</a></td><td class="text-nowrap"><button class="btn btn-sm btn-outline-primary" data-act="editCompany" data-id="${i}"><i class="bi bi-pencil"></i> Edit</button> <button class="btn btn-sm btn-outline-danger" data-act="deleteCompany" data-id="${i}"><i class="bi bi-trash"></i></button></td></tr>`).join("")||emptyRow(5,"No companies found.");
}
function openCompany(i){
  editingCompany=i;
  const c=i===null?{}:companies[i];
  $("companyModalTitle").textContent=i===null?"Add company":"Edit company";
  $("cName").value=c.name||"";$("cIndustry").value=c.industry||"";$("cLocation").value=c.location||"";$("cWebsite").value=c.website||"";$("cDesc").value=(c.desc&&c.desc!=="Company profile.")?c.desc:"";
  companyModal.show();
}
$("companyForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("cName").value.trim();
  if(companies.some((c,i)=>i!==editingCompany&&sameName(c.name,name))){showToast("A company with this name already exists.");return;}
  const data={name:name,industry:$("cIndustry").value.trim(),location:$("cLocation").value.trim(),website:$("cWebsite").value.trim(),desc:$("cDesc").value.trim()||"Company profile."};
  if(editingCompany===null){
    data.logo=name.replace(/[^A-Za-z0-9]/g,"")+".svg";   // nama fail logo mengikut nama syarikat
    companies.push(data);addLog("Added company: "+name);
  }else{
    const old=companies[editingCompany].name;
    Object.assign(companies[editingCompany],data);
    if(!sameName(old,name)){internships.forEach(x=>{if(sameName(x.company,old))x.company=name;});saveInterns();}   // kemas kini nama pada internship
    addLog("Edited company: "+name);
  }
  saveCompanies();fillCompanySelect();renderCompanies();renderInterns();companyModal.hide();showToast("Company saved.");
});
function deleteCompany(i){
  const c=companies[i];if(!c)return;
  const related=internships.filter(x=>sameName(x.company,c.name)).length;
  if(!confirm(`Delete ${c.name}?`+(related?` Its ${related} internship listing(s) will also be removed.`:"")))return;
  for(let k=internships.length-1;k>=0;k--){if(sameName(internships[k].company,c.name))internships.splice(k,1);}
  companies.splice(i,1);saveInterns();saveCompanies();
  addLog("Deleted company: "+c.name);
  fillCompanySelect();renderCompanies();renderInterns();showToast("Company deleted.");
}
$("addCompany").addEventListener("click",()=>openCompany(null));
$("adminCompanySearch").addEventListener("input",renderCompanies);
$("resetCompanies").addEventListener("click",()=>{if(confirm("Restore the original company list?")){localStorage.removeItem("internovaCompanies");addLog("Company list reset");location.reload();}});

// ---------- Butang Edit / Delete / Approve (satu pendengar untuk semua) ----------
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-act]");if(!b)return;
  if(b.dataset.act==="edit")openIntern(+b.dataset.id);
  if(b.dataset.act==="delete")deleteIntern(+b.dataset.id);
  if(b.dataset.act==="status")changeStatus(b.dataset.id,b.dataset.status);
  if(b.dataset.act==="editCompany")openCompany(+b.dataset.id);
  if(b.dataset.act==="deleteCompany")deleteCompany(+b.dataset.id);
  if(b.dataset.act==="deleteLog")deleteLog(+b.dataset.id);
});

// ---------- tab ikut menu sidebar ----------
const tabs=["dashboard","internships","companies","applications","students"];
function showTab(){
  const t=tabs.includes(location.hash.slice(1))?location.hash.slice(1):"dashboard";
  tabs.forEach(n=>$("tab-"+n).classList.toggle("d-none",n!==t));
  document.querySelectorAll("#mainSidebar .side-link").forEach(a=>{const h=a.getAttribute("href")||"";if(h.startsWith("admin.html#"))a.classList.toggle("active",h.endsWith("#"+t));});
  $("mainSidebar").classList.remove("show");$("sidebarBackdrop").classList.remove("show");   // tutup menu di telefon
  if(t==="dashboard")renderDashboard();
  window.scrollTo(0,0);
}
window.addEventListener("hashchange",showTab);
renderInterns();renderCompanies();renderApps();renderStudents();showTab();
}
