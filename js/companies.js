// ===== COMPANIES PAGE  =====
const companyGrid=document.getElementById("companyGrid"),companySearch=document.getElementById("companySearch"),companyIndustry=document.getElementById("companyIndustry");

// Isi pilihan industri
[...new Set(companies.map(x=>x.industry))].sort().forEach(x=>companyIndustry.add(new Option(x,x)));

// ---- Cari logo syarikat dalam folder image/Logos ----
const LOGO_EXT=["svg","png","jpg","jpeg","webp"];
const LOGO_DIRS=["image/Logos/","image/logos/"];
const LOGO_ALIAS={celcomdigi:"Celcomedigi"};              // ejaan fail anda: Celcomedigi
const LOGO_COLOR={petronas:"#00a19c",maybank:"#d9a400",cimb:"#7b0c0c",tnb:"#e2001a",tm:"#0066b3",airasia:"#e11b22",maxis:"#00a651",celcomdigi:"#c9a400",grab:"#00b14f",proton:"#1f2a44",simedarby:"#003b71",shopee:"#ee4d2d"};
function logoCandidates(c){
  const base=c.logo.replace(/\.\w+$/,"");
  const raw=[base,c.name.replace(/[^A-Za-z0-9]/g,""),LOGO_ALIAS[base]].filter(Boolean);
  const names=[];
  raw.forEach(n=>[n,n.toLowerCase(),n.charAt(0).toUpperCase()+n.slice(1).toLowerCase(),n.toUpperCase()].forEach(v=>{if(!names.includes(v))names.push(v);}));
  const list=[];
  names.forEach(n=>LOGO_DIRS.forEach(d=>LOGO_EXT.forEach(e=>list.push(d+n+"."+e))));
  return list;
}
// kalau logo tkde sistem akan keluar warna
function logoBadge(c){
  const base=c.logo.replace(/\.\w+$/,""),t=c.name.split(/\s+/).map(w=>w[0]).join("").slice(0,3).toUpperCase();
  const size=t.length===1?46:t.length===2?38:30;
  return "data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="'+(LOGO_COLOR[base]||"#294966")+'"/><text x="50" y="50" dy=".35em" text-anchor="middle" font-family="Arial" font-size="'+size+'" font-weight="700" fill="#fff">'+t+'</text></svg>');
}

function tryLoad(url){return new Promise(res=>{const t=new Image();t.onload=()=>res(url);t.onerror=()=>res(null);t.src=url;});}
const logoPromise={},logoCache={};
function getLogo(i){
  if(!logoPromise[i])logoPromise[i]=(async()=>{
    for(const u of logoCandidates(companies[i])){if(await tryLoad(u))return u;}
    return logoBadge(companies[i]);               // tiada yang jumpa -> lencana
  })().then(u=>logoCache[i]=u);
  return logoPromise[i];
}
const BLANK="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

// ---- Papar syarikat (carian + tapis industri) ----
function renderCompanies(){
  // nama / industri / lokasi / penerangan
  const words=companySearch.value.toLowerCase().split(/\s+/).filter(Boolean);
  const list=companies.filter(c=>{
    const text=(c.name+" "+c.industry+" "+c.location+" "+c.desc).toLowerCase();
    return words.every(w=>text.includes(w)) && (!companyIndustry.value||c.industry===companyIndustry.value);
  });
  companyGrid.innerHTML=list.map(c=>{const i=companies.indexOf(c);return `<div class="col-12 col-md-6 col-xl-4"><article class="company-card"><div class="d-flex align-items-center justify-content-between"><img class="company-logo" src="${logoCache[i]||BLANK}" alt="${c.name} logo" data-idx="${i}"><span class="badge badge-soft">${c.industry}</span></div><h3>${c.name}</h3><p class="mb-3">${c.desc}</p><div class="small text-secondary mb-3"><i class="bi bi-geo-alt me-1"></i>${c.location}</div><a href="${c.website}" target="_blank" rel="noopener" class="text-link">Official website <i class="bi bi-box-arrow-up-right ms-1"></i></a></article></div>`;}).join("")||'<div class="col-12 text-center text-secondary py-5">No company found.</div>';
  // logo muncul lepas kad dipapar
  companyGrid.querySelectorAll("img.company-logo").forEach(img=>{
    const i=+img.dataset.idx;
    if(!logoCache[i])getLogo(i).then(u=>{img.src=u;});
  });
}
companySearch.addEventListener("input",renderCompanies);
companyIndustry.addEventListener("change",renderCompanies);
renderCompanies();
