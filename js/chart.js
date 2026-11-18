const chartPalette=["#233f5d","#5c829b","#79aaa5","#9baebe","#c5d0d9","#d8b98c","#7d8fa4"];
function makeChart(id,type,labels,data,label,extra={}){const el=document.getElementById(id);if(!el)return;new Chart(el,{type,data:{labels,datasets:[{label,data,backgroundColor:type==="line"?"#5c829b":chartPalette,borderColor:type==="line"?"#315777":chartPalette,borderWidth:2,borderRadius:type==="bar"?5:0,tension:.35,fill:type==="line"?false:undefined,...extra.dataset}]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:type!=="bar"||extra.legend===true,position:"bottom",labels:{boxWidth:10,usePointStyle:true,font:{size:10}}}},scales:["bar","line"].includes(type)?{y:{beginAtZero:true,grid:{color:Chart.defaults.borderColor},ticks:{font:{size:10}}},x:{grid:{display:false},ticks:{font:{size:10}}}}:{},...extra.options}});}
const industryNames=Object.keys(internships.reduce((a,x)=>(a[x.industry]=(a[x.industry]||0)+1,a),{}));
const industryCounts=industryNames.map(n=>internships.filter(x=>x.industry===n).length);
makeChart("industryChart","bar",industryNames,industryCounts,"Listings");
const locations=["Kuala Lumpur","Petaling Jaya, Selangor","Sepang, Selangor","Shah Alam, Selangor"];
makeChart("locationChart","doughnut",locations,locations.map(l=>internships.filter(x=>x.location===l).length),"Listings");
makeChart("employmentChart","line",employmentYears,employmentRates,"Employment rate (%)",{dataset:{fill:true,backgroundColor:"#dce8ed"}});
makeChart("skillsChart","bar",skillLabels,skillValues,"Skill index",{options:{indexAxis:"y"}});
