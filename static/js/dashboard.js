// Fetch user data from the page (Flask rendered)
const userData = {
  name: document.getElementById("userName").innerText,
  skills: JSON.parse('{{ user_data.skills | tojson }}'.replace(/&quot;/g, '"')),
};

// --- Domain Intelligence ---
const rolesByDomain = {
  "Web Development": ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
  "Data Science": ["Data Analyst", "ML Engineer", "Data Scientist"],
  "AI & ML": ["AI Engineer", "Deep Learning Specialist", "ML Researcher"],
  "Cloud Computing": ["Cloud Engineer", "DevOps Engineer", "Solutions Architect"]
};

const detectedDomain = document.getElementById("detectedDomain");
const rolesList = document.getElementById("rolesList");

// Simple domain detection based on skills
let userDomain = "–";
if (userData.skills.some(skill => ["HTML", "CSS", "JavaScript", "React", "Node"].includes(skill))) {
  userDomain = "Web Development";
} else if (userData.skills.some(skill => ["Python", "R", "SQL", "Data Science"].includes(skill))) {
  userDomain = "Data Science";
} else if (userData.skills.some(skill => ["AI", "ML", "Deep Learning"].includes(skill))) {
  userDomain = "AI & ML";
} else if (userData.skills.some(skill => ["AWS", "Azure", "Cloud"].includes(skill))) {
  userDomain = "Cloud Computing";
}

detectedDomain.innerText = userDomain;

// Populate role cards
rolesList.innerHTML = "";
if (rolesByDomain[userDomain]) {
  rolesByDomain[userDomain].forEach(role => {
    const card = document.createElement("div");
    card.classList.add("role-card");
    card.innerText = role;
    rolesList.appendChild(card);
  });
}

// --- Skill Gap Meter ---
const readinessPercent = document.getElementById("readinessPercent");

// Simple readiness logic: % of domain skills possessed
const domainSkills = {
  "Web Development": ["HTML", "CSS", "JavaScript", "React", "Node"],
  "Data Science": ["Python", "SQL", "Data Science", "R", "ML"],
  "AI & ML": ["Python", "ML", "AI", "Deep Learning", "TensorFlow"],
  "Cloud Computing": ["AWS", "Azure", "Cloud", "Docker", "Kubernetes"]
};

let readiness = 0;
if (userDomain in domainSkills) {
  const required = domainSkills[userDomain];
  const possessed = userData.skills.filter(skill => required.includes(skill));
  readiness = Math.round((possessed.length / required.length) * 100);
}

readinessPercent.innerText = readiness + "%";

// --- Job & Salary Recommendations ---
const jobList = document.getElementById("jobList");
const jobsByDomain = {
  "Web Development": [
    { title: "Frontend Developer", salary: "$50k-$70k" },
    { title: "Fullstack Developer", salary: "$60k-$85k" },
  ],
  "Data Science": [
    { title: "Data Analyst", salary: "$55k-$75k" },
    { title: "Data Scientist", salary: "$70k-$100k" },
  ],
  "AI & ML": [
    { title: "AI Engineer", salary: "$80k-$120k" },
    { title: "ML Researcher", salary: "$85k-$130k" },
  ],
  "Cloud Computing": [
    { title: "Cloud Engineer", salary: "$70k-$100k" },
    { title: "DevOps Engineer", salary: "$75k-$110k" },
  ]
};

jobList.innerHTML = "";
if (jobsByDomain[userDomain]) {
  jobsByDomain[userDomain].forEach(job => {
    const div = document.createElement("div");
    div.classList.add("job-card");
    div.innerHTML = `<strong>${job.title}</strong> - Salary: ${job.salary}`;
    jobList.appendChild(div);
  });
}

// --- Upskilling Recommendations ---
const upskillList = document.getElementById("upskillList");
upskillList.innerHTML = "";
if (userDomain in domainSkills) {
  const missingSkills = domainSkills[userDomain].filter(skill => !userData.skills.includes(skill));
  if (missingSkills.length === 0) {
    upskillList.innerHTML = "<p>✅ You have all core skills for this domain!</p>";
  } else {
    missingSkills.forEach(skill => {
      const span = document.createElement("span");
      span.classList.add("skill-badge");
      span.innerText = skill;
      upskillList.appendChild(span);
    });
  }
}

// Optional: AI Chat Assistant (can be connected later)
