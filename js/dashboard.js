const totalByIndustry={};internships.forEach(item=>totalByIndustry[item.industry]=(totalByIndustry[item.industry]||0)+1);
document.getElementById("kpiCards").innerHTML=[
statCard("bi-briefcase","Internship opportunities",internships.length),
statCard("bi-buildings","Company profiles",companies.length),
statCard("bi-compass","Career fields",careerFields.length),
statCard("bi-graph-up-arrow","Graduate employment rate","89%")
].join("");
document.getElementById("featuredInternships").innerHTML=internships.slice(0,5).map(item=>`<tr><td><span class="table-title">${item.position}</span></td><td>${item.company}</td><td>${item.location}</td><td>${money(item.allowance)}</td><td>${item.deadline}</td></tr>`).join("");

// ===== Carta tambahan =====

const coNames=[...new Set(internships.map(x=>x.company))];
xChart("allowanceChart","bar",coNames,[{label:"Average allowance (RM)",data:coNames.map(n=>{const l=internships.filter(x=>x.company===n);return Math.round(l.reduce((s,x)=>s+x.allowance,0)/l.length);})}],{indexAxis:"y"});
const durs=[3,4,5,6];
xChart("durationChart","doughnut",durs.map(d=>d+" months"),[{data:durs.map(d=>internships.filter(x=>x.duration===d).length)}]);
const dm=[["2026-12","Dec 2026"],["2027-01","Jan 2027"],["2027-02","Feb 2027"]];
xChart("deadlineChart","line",dm.map(x=>x[1]),[{label:"Deadlines",data:dm.map(x=>internships.filter(i=>i.deadline.startsWith(x[0])).length),fill:true,backgroundColor:"#4f83b544"}],{scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}});
const coInd=[...new Set(companies.map(x=>x.industry))];
xChart("industryCompanyChart","polarArea",coInd,[{data:coInd.map(n=>companies.filter(c=>c.industry===n).length)}]);

// ===== Career tip of the day =====
const tipText=document.getElementById("tipText");
if(tipText){const tips=["Tailor your CV for every internship you apply for.","Add 2-3 projects to your portfolio before applying.","Follow companies on LinkedIn to see openings early.","Practise common interview questions out loud.","Ask your lecturer for a reference letter early.","Apply before the deadline, not on the last day."];
let tn=0;const showTip=()=>tipText.textContent=tips[tn++%tips.length];showTip();document.getElementById("tipBtn").onclick=showTip;}
