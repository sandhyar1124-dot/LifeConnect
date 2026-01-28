document.querySelectorAll(".respond").forEach(btn => {
  btn.onclick = () => alert("Response sent successfully!");
});

document.querySelectorAll(".outline").forEach(btn => {
  btn.onclick = () => alert("Request details page");
});
