

function setFilter(btn){
  document.querySelectorAll(".filter button")
    .forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
}
function download(){
  alert("Certificate downloaded successfully!");
}
function logout(){
  alert("Logged out");
}
