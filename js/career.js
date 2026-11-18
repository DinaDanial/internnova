function careerChart(id,type,labels,data,label,options={}){const el=document.getElementById(id);new Chart(el,{type,data:{labels,datasets:[{label,data,backgroundColor:type==="line"?"#6b9999":["#294966","#64869d","#8eb1b0","#aab9c7","#c8d1d9"],borderColor:"#315777",borderWidth:2,borderRadius:5,tension:.35,fill:false}]},options:{responsive:true,plugins:{legend:{display:type==="radar",position:"bottom"}},scales:type==="radar"?{r:{beginAtZero:true,max:100,ticks:{display:false}}}:{y:{beginAtZero:true},x:{grid:{display:false}}},...options}});}
careerChart("careerDemandChart","bar",careerFields.map(x=>x.field),careerFields.map(x=>x.demand),"Demand index",{indexAxis:"y"});
careerChart("careerSkillsChart","polarArea",skillLabels,skillValues,"Skill index");
careerChart("salaryChart","bar",careerFields.map(x=>x.field),careerFields.map(x=>x.salary),"Average salary (RM)",{indexAxis:"y"});
careerChart("radarChart","radar",["Communication","Technical","Analysis","Teamwork","Adaptability"],[90,82,88,86,84],"Skill profile");
document.getElementById("careerRows").innerHTML=careerFields.map(x=>`<tr><td class="table-title">${x.field}</td><td>${x.industry}</td><td>${x.demand}/100</td><td>${x.skill}</td><td>${money(x.salary)}</td></tr>`).join("");

// ===== Carta tambahan =====

xChart("demandSalaryChart","bubble",[],careerFields.map((f,i)=>({label:f.field,data:[{x:f.demand,y:f.salary,r:9}],backgroundColor:xc[i%8]+"cc"})),{scales:{x:{min:60,max:100,title:{display:true,text:"Demand index"}},y:{title:{display:true,text:"Salary (RM)"}}}});
const cInd=[...new Set(careerFields.map(x=>x.industry))];
xChart("careerIndustryChart","doughnut",cInd,[{data:cInd.map(n=>careerFields.filter(c=>c.industry===n).length)}]);
xChart("skillGapChart","radar",skillLabels,[{label:"Your skills",data:skillValues,backgroundColor:"#4f83b533"},{label:"Employer expectation",data:[95,93,90,95,90,88],backgroundColor:"#e0b46c33"}],{scales:{r:{beginAtZero:true,max:100,ticks:{display:false}}}});
xChart("salaryGrowthChart","line",["Fresh graduate","2 years","5 years","8 years"],[{label:"Software Development",data:[4000,5200,7500,10000]},{label:"Data Analytics",data:[3800,5000,7200,9500]},{label:"Finance",data:[3500,4600,6500,8800]}]);

// ===== 4 carta tambahan lagi =====
xChart("roleTrendChart","line",employmentYears,[{label:"Software Development",data:[84,87,90,93,95]},{label:"Data Analytics",data:[78,82,86,89,92]},{label:"Cybersecurity",data:[70,75,80,85,88]},{label:"Digital Marketing",data:[74,76,79,81,82]}],{scales:{y:{min:60,max:100}}});
xChart("languageChart","bar",["Python","SQL","JavaScript","Java","C#","PHP"],[{label:"Job ads (%)",data:[88,85,82,70,55,48]}]);
xChart("workModeChart","pie",["Hybrid","Onsite","Remote"],[{data:[52,28,20]}]);
xChart("growthChart","bar",careerFields.map(x=>x.field),[{label:"Growth by 2030 (%)",data:[28,25,32,14,12,8,18,15,13,10]}],{indexAxis:"y"});

// ===== Starting Salary Estimator =====
const estField=document.getElementById("estField");
if(estField){careerFields.forEach((f,i)=>estField.add(new Option(f.field,i)));
const calcSalary=()=>{const m=+document.getElementById("estMonths").value;document.getElementById("estMonthsLbl").textContent=m;document.getElementById("estResult").textContent=money(Math.round(careerFields[estField.value].salary*(1+m*0.01)));};
estField.onchange=calcSalary;document.getElementById("estMonths").oninput=calcSalary;calcSalary();}
