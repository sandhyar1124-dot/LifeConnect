let step = 0;
let role = "donor";

const steps = document.querySelectorAll(".step");
const bars = document.querySelectorAll(".progress span");

/* INPUT REFERENCES */
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const err1 = document.getElementById("err1");

/* STEP NAVIGATION */
function show() {
  steps.forEach(s => s.classList.remove("active"));
  bars.forEach((b, i) => {
    if (i <= step) b.classList.add("active");
    else b.classList.remove("active");
  });
  steps[step].classList.add("active");
}

function nextStep() {
  // Step 1 Validation
  if (step === 0) {
    if (nameInput.value === "" || emailInput.value === "" || phoneInput.value === "") {
      err1.innerText = "Please fill all basic details";
      return;
    }
    err1.innerText = "";
  }

  // Move to next step
  if (step < steps.length - 1) {
    step++;
    show();
  }
}

function goBack() {
  if (step > 0) {
    step--;
    show();
  }
}

/* ELIGIBILITY & DATA SUBMISSION */
function checkEligibility() {
  const age = document.getElementById("age").value;
  const weight = document.getElementById("weight").value;
  const resultMsg = document.getElementById("resultMsg");

  // Basic Eligibility Check
  let isEligible = true;
  if (age < 18 || weight < 45) isEligible = false;

  const medicalChecks = ["past1year", "past6months", "past3months", "presentIllness", "chronic"];
  medicalChecks.forEach(id => {
    if (document.getElementById(id).value === "yes") isEligible = false;
  });

  if (isEligible) {
    resultMsg.style.color = "green";
    resultMsg.innerText = "✅ Eligible! Creating your account...";

    // BACKEND CONNECTION (app.py-ku data anupputhu)
    const formData = new FormData();
    formData.append('username', nameInput.value);
    formData.append('email', emailInput.value);
    formData.append('phone', phoneInput.value);
    formData.append('password', 'default123'); // Custom password field illathathaal
    formData.append('role', role);

    fetch('/signup', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        window.location.href = "/signin"; // Success aana signin page-ku pogum
      } else {
        resultMsg.innerText = "❌ Error: Account already exists or server error.";
      }
    });

  } else {
    resultMsg.style.color = "red";
    resultMsg.innerText = "❌ Sorry, you are not eligible to donate blood.";
  }
}