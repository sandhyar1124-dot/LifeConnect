
let selectedRole = "donor"; // default

const donorBtn = document.getElementById("donorBtn");
const needBtn = document.getElementById("needBtn");

if (donorBtn) {
  donorBtn.addEventListener("click", () => {
    selectedRole = "donor";
    donorBtn.classList.add("active");
    needBtn.classList.remove("active");
  });
}

if (needBtn) {
  needBtn.addEventListener("click", () => {
    selectedRole = "need";
    needBtn.classList.add("active");
    donorBtn.classList.remove("active");
  });
}

function Signin() {
  if (selectedRole === "donor") {
    window.location.href = "dashboard1.html";
  } else {
    window.location.href = "request.html";
  }
}



function logout(){
  alert("Logged out successfully");
}

function schedule(){
  alert("Redirecting to appointment scheduling...");
}

