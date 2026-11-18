function requireLogin(){if(!sessionStorage.getItem("internovaLoggedIn")){window.location.href="index.html";}}
function money(value){return "RM"+Number(value).toLocaleString("en-MY");}
function csvDownload(filename, rows){const csv=rows.map(row=>row.map(value=>'"'+String(value??"").replaceAll('"','""')+'"').join(",")).join("\n");const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download=filename;link.click();URL.revokeObjectURL(link.href);}
function getApplications(){return JSON.parse(localStorage.getItem("internovaApplications")||"[]");}
function saveApplications(items){localStorage.setItem("internovaApplications",JSON.stringify(items));}
function addApplication(item,status="Saved"){const list=getApplications();if(!list.some(x=>x.id===item.id)){list.push({...item,status,date:new Date().toISOString().slice(0,10)});saveApplications(list);}return list;}
function showToast(message){let toast=document.getElementById("appToast");if(!toast){toast=document.createElement("div");toast.id="appToast";toast.className="toast-container position-fixed bottom-0 end-0 p-3";document.body.appendChild(toast);}toast.innerHTML=`<div class="toast text-bg-dark border-0" role="alert"><div class="d-flex"><div class="toast-body">${message}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div></div>`;new bootstrap.Toast(toast.querySelector(".toast"),{delay:2600}).show();}
function statCard(icon,label,value){return `<div class="col-6 col-xl-3"><div class="stat-card"><div class="stat-icon"><i class="bi ${icon}"></i></div><div><small>${label}</small><strong>${value}</strong></div></div></div>`;}

// ===== Cari gambar secara automatik ikut nama fail & format boleh berbeza =====
const IMG_EXT=["svg","png","jpg","jpeg","webp","jfif","gif"];
function nameVariants(n){return[...new Set([n,n.toLowerCase(),n.toUpperCase(),n[0].toUpperCase()+n.slice(1).toLowerCase()])];}
function imgList(names,dirs){const o=[];names.forEach(n=>nameVariants(n).forEach(m=>dirs.forEach(d=>IMG_EXT.forEach(e=>o.push(d+m+"."+e)))));return[...new Set(o)];}
function companyNames(c){const b=c.logo.replace(/\.\w+$/,""),alias={celcomdigi:"Celcomedigi"};return[b,c.name.replace(/\s+/g,""),alias[b]].filter(Boolean).join("|");}
function badgeSvg(t,bg){return"data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="'+bg+'"/><text x="50" y="50" dy=".35em" text-anchor="middle" font-family="Arial" font-size="42" font-weight="700" fill="#fff">'+t+'</text></svg>');}
// Dipanggil bila gambar gagal dimuat: cuba gambar seterusnya, kalau habis guna lencana ganti
function imgNext(img){
  if(img.dataset.alt===undefined){const k=img.dataset.kind;let l=[];
    if(k==="logo")l=imgList(["Logo","internova-logo","internnova-logo"],["image/"]);
    if(k==="user")l=imgList(["user","user-profile","profile"],["image/"]);
    if(k==="company")l=imgList(img.dataset.names.split("|"),["image/Logos/","image/logos/","image/"]);
    img.dataset.alt=l.join("|");}
  const a=img.dataset.alt.split("|").filter(Boolean);
  if(!a.length){img.onerror=null;const k=img.dataset.kind;img.src=badgeSvg(k==="company"?(img.dataset.initial||"?"):k==="user"?"N":"IN","#294966");return;}
  img.src=a.shift();img.dataset.alt=a.join("|");
}
// ===== carta tambahan =====
const xc=["#4f83b5","#6fb3a8","#e0b46c","#8d7fc0","#d98b8b","#5fa5c9","#9bb86a","#c98fb5"];
function xChart(id,type,labels,sets,opt={}){
  const el=document.getElementById(id);if(!el)return;
  const many=["doughnut","pie","polarArea"].includes(type);
  new Chart(el,{type,data:{labels,datasets:sets.map((s,i)=>({backgroundColor:many?xc:xc[i%8],borderColor:many?"transparent":xc[i%8],borderWidth:2,borderRadius:type==="bar"?5:0,tension:.35,...s}))},
   options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:many||sets.length>1,position:"bottom",labels:{usePointStyle:true,boxWidth:10}}},...opt}});
}
