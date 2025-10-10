const startBtn = document.getElementById("startInterview");
const interviewQDiv = document.getElementById("interviewQuestions");

const mockQuestions = {
  "Google": {
    "Data Analyst": ["Explain SQL JOINs.", "How would you clean a dataset?"],
    "Software Engineer": ["Explain OOP concepts.", "What is Big-O notation?"]
  },
  "TCS": {
    "Data Analyst": ["What is data normalization?", "Explain regression analysis."],
    "ML Engineer": ["Explain decision trees.", "Difference between supervised and unsupervised learning?"]
  }
};

startBtn.addEventListener("click", () => {
  const company = document.getElementById("companySelect").value;
  const role = document.getElementById("roleSelect").value;
  interviewQDiv.innerHTML = "";
  if (!company || !role) {
    alert("Select both company and role!");
    return;
  }

  const questions =
    (mockQuestions[company] && mockQuestions[company][role]) ||
    ["No questions available for this selection."];

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "interview-question";
    div.innerHTML = `<strong>Q${i + 1}:</strong> ${q} <input type="text" placeholder="Type your answer here..." />`;
    interviewQDiv.appendChild(div);
  });
});
