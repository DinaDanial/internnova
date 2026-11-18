document.getElementById("employmentKpis").innerHTML=[statCard("bi-people","Employment rate","89%"),statCard("bi-mortarboard","Further study","6%"),statCard("bi-search","Seeking employment","5%"),statCard("bi-cash-stack","Average starting salary",money(3300))].join("");
function empChart(id,type,labels,data,label,options={}){new Chart(document.getElementById(id),{type,data:{labels,datasets:[{label,data,backgroundColor:type==="line"?"#6b9999":["#294966","#64869d","#8eb1b0","#c8d1d9"],borderColor:"#315777",borderWidth:2,borderRadius:5,tension:.35,fill:false}]},options:{responsive:true,plugins:{legend:{display:type==="doughnut"||type==="pie",position:"bottom"}},scales:["bar","line"].includes(type)?{y:{beginAtZero:true},x:{grid:{display:false}}}:{},...options}});}
empChart("employmentRateChart","line",employmentSummary.map(x=>x.year),employmentSummary.map(x=>x.rate),"Employment rate (%)");
empChart("statusChart","doughnut",["Employed","Further study","Seeking employment"],[89,6,5],"Graduate status");
empChart("employmentIndustryChart","bar",["Technology","Banking","Energy","Telecommunications","Business","Creative"],[91,88,86,87,82,79],"Employment index");
empChart("workTypeChart","pie",["Full-time","Part-time","Self-employed","Contract"],[72,10,8,10],"Work type");
document.getElementById("employmentRows").innerHTML=employmentSummary.map(x=>`<tr><td>${x.year}</td><td>${x.rate}%</td><td>${x.study}%</td><td>${x.seeking}%</td><td>${money(x.salary)}</td></tr>`).join("");
document.getElementById("exportEmployment").addEventListener("click",()=>csvDownload("internnova-employment.csv",[["Year","Employment rate","Further study","Seeking employment","Average salary"],...employmentSummary.map(x=>[x.year,x.rate+"%",x.study+"%",x.seeking+"%",x.salary])]));

xChart("statusTrendChart","bar",employmentYears,[{label:"Further study (%)",data:employmentSummary.map(x=>x.study)},{label:"Seeking employment (%)",data:employmentSummary.map(x=>x.seeking)}],{scales:{x:{stacked:true},y:{stacked:true,beginAtZero:true}}});
xChart("salaryTrendChart","line",employmentYears,[{label:"Average salary (RM)",data:employmentSummary.map(x=>x.salary),fill:true,backgroundColor:"#6fb3a844"}]);
xChart("timeToJobChart","bar",["< 3 months","3-6 months","6-12 months","> 12 months"],[{label:"Graduates (%)",data:[46,28,16,10]}]);
xChart("channelChart","bar",["Online job portals","Internship conversion","Career fairs","Referrals","Others"],[{label:"Graduates (%)",data:[38,27,15,12,8]}],{indexAxis:"y"});

xChart("programmeChart","bar",["IT & Computing","Accounting","Engineering","Business","Creative Media"],[{label:"Employment rate (%)",data:[93,91,90,88,82]}]);
xChart("salaryRangeChart","bar",["< RM2,000","RM2,000-2,999","RM3,000-3,999","RM4,000-4,999","RM5,000+"],[{label:"Graduates (%)",data:[8,34,31,17,10]}]);
xChart("regionChart","polarArea",["Klang Valley","Johor","Penang","Sabah & Sarawak","Other states"],[{data:[52,12,10,9,17]}]);
xChart("cgpaChart","line",["2.00-2.49","2.50-2.99","3.00-3.49","3.50-4.00"],[{label:"Employment rate (%)",data:[74,82,89,94],fill:true,backgroundColor:"#4f83b544"}],{scales:{y:{min:60,max:100}}});
