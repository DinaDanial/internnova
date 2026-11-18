requireLogin();
const isAdmin=sessionStorage.getItem("internovaRole")==="admin";   // true jika akaun admin
const active=document.getElementById("sidebarMount").dataset.active||location.pathname.split("/").pop().replace(".html","");
const navItems=[["dashboard.html","Dashboard","bi-grid-1x2"],["internship.html","Internships","bi-briefcase"],["companies.html","Companies","bi-buildings"],["careeranalytics.html","Career Analytics","bi-graph-up-arrow"],["employment-analytics.html","Employment Analytics","bi-bar-chart-line"],["application.html","My Applications","bi-clipboard-check"]];
// Menu untuk admin (tab dalam admin.html)
const adminItems=[["admin.html#dashboard","Admin Dashboard","bi-speedometer2"],["admin.html#internships","Manage Internships","bi-briefcase"],["admin.html#companies","Manage Companies","bi-buildings"],["admin.html#applications","Review Applications","bi-clipboard-check"],["admin.html#students","Students","bi-people"]];
document.getElementById("sidebarMount").innerHTML=`<div class="sidebar" id="mainSidebar"><div class="sidebar-brand"><img src="image/internova-logo.svg" alt="INTERNOVA" data-kind="logo" onerror="imgNext(this)"><div><strong>INTERNOVA</strong><small>${isAdmin?"ADMIN PANEL":"STUDENT CAREER PORTAL"}</small></div></div><div class="nav-caption">${isAdmin?"ADMIN MENU":"MAIN MENU"}</div>${(isAdmin?adminItems:navItems).map(([url,label,icon])=>`<a class="side-link ${active===url.replace(".html","")?"active":""}" href="${url}"><i class="bi ${icon}"></i><span>${label}</span></a>`).join("")}<div class="sidebar-bottom"><a class="side-link" href="#" id="darkModeButton"><i class="bi bi-moon-stars"></i><span>Dark Mode</span></a><a class="side-link" href="#" id="logoutButton"><i class="bi bi-box-arrow-left"></i><span>Log Out</span></a></div></div><div class="sidebar-backdrop" id="sidebarBackdrop"></div>`;
document.getElementById("topbarMount").innerHTML=`<header class="topbar"><div class="topbar-left"><button class="menu-toggle" id="menuToggle" aria-label="Open navigation"><i class="bi bi-list fs-5"></i></button><span class="topbar-label">INTERNOVA / ${active.replaceAll("-"," ").toUpperCase()}</span></div><div class="user-mini">${isAdmin?'<div><strong>Welcome Admin</strong><small>Administrator</small></div>':'<img src="image/user-profile.svg" alt="Nurdina" data-kind="user" onerror="imgNext(this)"><div><strong>Welcome Nurdina</strong><small>Student account</small></div>'}</div></header>`;
const sidebar=document.getElementById("mainSidebar"),backdrop=document.getElementById("sidebarBackdrop");
document.getElementById("menuToggle").addEventListener("click",()=>{sidebar.classList.add("show");backdrop.classList.add("show");});
backdrop.addEventListener("click",()=>{sidebar.classList.remove("show");backdrop.classList.remove("show");});
document.getElementById("logoutButton").addEventListener("click",e=>{e.preventDefault();sessionStorage.removeItem("internovaLoggedIn");sessionStorage.removeItem("internovaRole");window.location.href="index.html";});
document.getElementById("darkModeButton").addEventListener("click",e=>{e.preventDefault();document.body.classList.toggle("dark-mode");localStorage.setItem("internovaDark",document.body.classList.contains("dark-mode")?"on":"off");updateDarkLabel();});
if(localStorage.getItem("internovaDark")==="on")document.body.classList.add("dark-mode");
// Tukar tulisan & ikon butang: Dark Mode <-> Light Mode
function updateDarkLabel(){
  const dark=document.body.classList.contains("dark-mode"),btn=document.getElementById("darkModeButton");
  btn.querySelector("span").textContent=dark?"Light Mode":"Dark Mode";
  btn.querySelector("i").className="bi "+(dark?"bi-sun":"bi-moon-stars");
}
updateDarkLabel();

// Warna carta ikut mod gelap/cerah
(function(){const dark=localStorage.getItem("internovaDark")==="on";
if(window.Chart){Chart.defaults.color=dark?"#e6edf5":"#253448";Chart.defaults.borderColor=dark?"#3a4d62":"#e5eaef";
if(dark){const M={"#233f5d":"#6fa8dc","#294966":"#6fa8dc","#5c829b":"#8ec5e8","#64869d":"#8ec5e8","#79aaa5":"#7fd1c7","#8eb1b0":"#7fd1c7","#9baebe":"#b6c6d6","#aab9c7":"#b6c6d6","#c5d0d9":"#e0e8ef","#c8d1d9":"#e0e8ef","#d8b98c":"#f0cf9c","#7d8fa4":"#9fb3c8","#6b9999":"#7fd1c7","#315777":"#9ec5e6","#dce8ed":"#2b4a63"};
const f=x=>Array.isArray(x)?x.map(f):(M[x]||x);
Chart.register({id:"darkColors",beforeUpdate(c){c.data.datasets.forEach(d=>{if(!d._lit){d.backgroundColor=f(d.backgroundColor);d.borderColor=f(d.borderColor);d._lit=1;}});}});}}
document.getElementById("darkModeButton").addEventListener("click",()=>setTimeout(()=>location.reload(),120));})();

// ===== Fungsi tambahan (semua page) =====
(function(){
  const um=document.querySelector(".user-mini");
  if(um){const c=document.createElement("span");c.className="live-clock";um.before(c);
    const tick=()=>{const d=new Date();c.innerHTML='<i class="bi bi-clock me-1"></i>'+d.toLocaleDateString("en-MY",{weekday:"short",day:"numeric",month:"short",year:"numeric"})+" | "+d.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit"});};
    tick();setInterval(tick,30000);}
  const up=document.createElement("button");up.className="to-top";up.setAttribute("aria-label","Back to top");up.innerHTML='<i class="bi bi-arrow-up"></i>';
  up.onclick=()=>scrollTo({top:0,behavior:"smooth"});document.body.appendChild(up);
  addEventListener("scroll",()=>up.classList.toggle("show",scrollY>300));
  addEventListener("load",()=>{
    // nombor kad statistik naik perlahan-lahan
    document.querySelectorAll(".stat-card strong").forEach(el=>{
      const m=el.textContent.match(/^(\D*)([\d,]+)(\D*)$/);if(!m)return;
      const end=+m[2].replace(/,/g,""),t0=performance.now();
      (function f(t){const p=Math.min((t-t0)/900,1);el.textContent=m[1]+Math.round(end*p).toLocaleString("en-MY")+m[3];if(p<1)requestAnimationFrame(f);})(t0);});
    // butang muat turun carta (PNG)
    document.querySelectorAll("canvas").forEach(cv=>{
      const head=cv.closest(".content-card")?.querySelector(".card-heading");if(!head)return;
      const b=document.createElement("button");b.className="btn btn-sm btn-outline-primary chart-dl";b.title="Download chart as PNG";b.innerHTML='<i class="bi bi-image"></i>';
      b.onclick=()=>{const ch=window.Chart&&Chart.getChart(cv);if(!ch)return;const a=document.createElement("a");a.href=ch.toBase64Image();a.download=(cv.id||"chart")+".png";a.click();showToast("Chart downloaded");};
      head.appendChild(b);});
  });
})();
