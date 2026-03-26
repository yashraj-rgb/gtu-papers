
console.log("student.js loaded ✅");

window.openSubject = function (key) {
  console.log("clicked subject:", key);
  window.location.href = "papers.html?subject=" + key;
};


const params = new URLSearchParams(window.location.search);
const subjectKey = params.get("subject");

const titleEl = document.getElementById("subjectTitle");
const yearsContainer = document.getElementById("yearsContainer");
const winterBtn = document.getElementById("winterBtn");
const summerBtn = document.getElementById("summerBtn");

if (!window.SEM2_DATA) {
  titleEl.innerText = "DATA FILE NOT LOADED";
  console.error("SEM2_DATA missing");
  throw new Error("SEM2_DATA not loaded");
}

if (!subjectKey || !SEM2_DATA[subjectKey]) {
  titleEl.innerText = "NO SUBJECT DATA";
  yearsContainer.innerHTML = "<p>No papers available</p>";
  console.error("Subject key not found:", subjectKey);
  throw new Error("Subject data missing");
}

const subject = SEM2_DATA[subjectKey];
titleEl.innerText = subject.name;

let currentExam = "winter";

winterBtn.addEventListener("click", () => {
  setExam("winter");
});

summerBtn.addEventListener("click", () => {
  setExam("summer");
});

function setExam(type) {
  currentExam = type;

  winterBtn.classList.remove("active");
  summerBtn.classList.remove("active");

  if (type === "winter") winterBtn.classList.add("active");
  else summerBtn.classList.add("active");

  loadYears();
}

function loadYears() {
  yearsContainer.innerHTML = "";

  const examData = subject[currentExam];

  if (!examData || Object.keys(examData).length === 0) {
    yearsContainer.innerHTML = "<p>No papers available</p>";
    return;
  }

  Object.keys(examData)
    .sort((a, b) => b - a)
    .forEach(year => {
      const div = document.createElement("div");
      div.className = "year-card";
      div.innerHTML = `<h3>${year}</h3><p><button class="button">
  View →
</button></p>`;
      div.onclick = () => window.open(examData[year], "_blank");
      yearsContainer.appendChild(div);
    });
}

loadYears();

window.openSubject = function (subjectKey) {
  window.location.href = `papers.html?subject=${subjectKey}`;
};
