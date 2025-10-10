const roadmapData = {
  "Web Development": [
    "Learn HTML, CSS, JS",
    "Understand React or Angular",
    "Backend with Node.js or Django",
    "Learn Database Management",
    "Deploy on Cloud"
  ],
  "Data Science": [
    "Learn Python, Pandas, Numpy",
    "Data Visualization (Matplotlib, Seaborn)",
    "Statistics & Probability",
    "Machine Learning Basics",
    "Build Projects"
  ]
};

const domainSelect = document.getElementById("domainSelect");
const roadmapContainer = document.getElementById("roadmapContainer");

domainSelect.addEventListener("change", () => {
  const domain = domainSelect.value;
  roadmapContainer.innerHTML = "";
  if (!domain) return;
  const steps = roadmapData[domain] || ["No roadmap found"];
  steps.forEach((step, i) => {
    const div = document.createElement("div");
    div.className = "roadmap-step";
    div.innerHTML = `<strong>Step ${i + 1}:</strong> ${step}`;
    roadmapContainer.appendChild(div);
  });
});
