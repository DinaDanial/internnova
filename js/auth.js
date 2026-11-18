// ===== LOGIN: akaun simulasi =====
// Username sama (IMS566). Password menentukan jenis akaun: pelajar atau admin.
const ACCOUNTS={
  student:{username:"IMS566",password:"nurdina1234",name:"Nurdina",page:"dashboard.html"},
  admin:{username:"IMS566",password:"admin123",name:"Admin",page:"admin.html"}
};
const loginForm=document.getElementById("loginForm"),usernameInput=document.getElementById("username"),passwordInput=document.getElementById("password"),loginError=document.getElementById("loginError");

// Butang Show/Hide password
document.getElementById("togglePassword").addEventListener("click",()=>{passwordInput.type=passwordInput.type==="password"?"text":"password";});

// Butang Student / Admin: username & password 
document.querySelectorAll("#roleSwitch button").forEach(btn=>btn.addEventListener("click",()=>{
  const acc=ACCOUNTS[btn.dataset.role];
  usernameInput.value=acc.username;passwordInput.value=acc.password;loginError.classList.add("d-none");
  document.querySelectorAll("#roleSwitch button").forEach(b=>{b.classList.toggle("btn-primary",b===btn);b.classList.toggle("btn-outline-primary",b!==btn);});
}));

// Bila tekan Sign In: semak akaun
loginForm.addEventListener("submit",event=>{
  event.preventDefault();
  const username=usernameInput.value.trim(),password=passwordInput.value;
  const role=Object.keys(ACCOUNTS).find(r=>ACCOUNTS[r].username===username&&ACCOUNTS[r].password===password);
  if(role){
    sessionStorage.setItem("internovaLoggedIn","true");
    sessionStorage.setItem("internovaUser",ACCOUNTS[role].name);
    sessionStorage.setItem("internovaRole",role);
    window.location.href=ACCOUNTS[role].page;   // pelajar -> dashboard, admin -> admin
  }else{loginError.classList.remove("d-none");}
});
