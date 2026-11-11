let score = 0;
let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
  attempts = 0;
} else {
  attempts = Number(attempts);
}

function isFormValid() {
  let isValid = true;
  const q1Response = document.querySelector("#q1").value;
  const validationFdbk = document.querySelector("#validationFdbk");

  if (q1Response === "") {
    isValid = false;
    validationFdbk.textContent = "Question 1 was not answered";
  }

  return isValid;
}

function setMarkImage(index, imageName, altText) {
  const markContainer = document.querySelector(`#markImg${index}`);
  markContainer.textContent = "";

  const img = document.createElement("img");
  const imageData = imageName === "checkmark.png"
    ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='15' fill='%2316a34a'/%3E%3Cpath d='m8 16 5 5 11-11' fill='none' stroke='white' stroke-width='4'/%3E%3C/svg%3E"
    : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='15' fill='%23dc2626'/%3E%3Cpath d='m10 10 12 12m0-12L10 22' fill='none' stroke='white' stroke-width='4'/%3E%3C/svg%3E";
  img.src = imageData;
  img.alt = altText;
  img.width = 28;
  markContainer.appendChild(img);
}

function rightAnswer(index) {
  const feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Correct!";
  feedback.className = "bg-success text-white mb-3 p-2";
  setMarkImage(index, "checkmark.png", "Checkmark");
  score += 20;
}

function wrongAnswer(index) {
  const feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Incorrect!";
  feedback.className = "bg-warning text-white mb-3 p-2";
  setMarkImage(index, "xmark.png", "X mark");
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function displayQ4Choices() {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  shuffleArray(q4ChoicesArray);

  let choicesContainer = document.querySelector("#q4Choices");
  choicesContainer.textContent = "";

  for (let choice of q4ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q4";
    input.id = choice.replaceAll(" ", "");
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = choice;
    label.className = "me-3";

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
  }
}

function gradeQuiz() {
  document.querySelector("#validationFdbk").textContent = "";

  if (!isFormValid()) {
    return;
  }

  score = 0;
  let q1Response = document.querySelector("#q1").value.toLowerCase();
  let q2Response = document.querySelector("#q2").value;

  if (q1Response === "sacramento") {
    rightAnswer(1);
  } else {
    wrongAnswer(1);
  }

  if (q2Response === "mo") {
    rightAnswer(2);
  } else {
    wrongAnswer(2);
  }

  if (document.querySelector("#Jefferson").checked &&
      document.querySelector("#Roosevelt").checked &&
      !document.querySelector("#Jackson").checked &&
      !document.querySelector("#Franklin").checked) {
    rightAnswer(3);
  } else {
    wrongAnswer(3);
  }

  let selectedQ4 = document.querySelector("input[name=q4]:checked");

  if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
    rightAnswer(4);
  } else {
    wrongAnswer(4);
  }

  const totalScore = document.querySelector("#totalScore");
  totalScore.textContent = `Total Score: ${score}`;
  totalScore.className = score < 80
    ? "bg-danger text-white fs-4 mt-3 p-2"
    : "bg-success text-white fs-4 mt-3 p-2";

  attempts++;
  document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
  localStorage.setItem("total_attempts", attempts);

  document.querySelector("#congratsMessage").textContent = score > 80
    ? "Congratulations! Excellent work!"
    : "";
}

document.querySelector("#lesson2Button").addEventListener("click", gradeQuiz);
displayQ4Choices();
document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
