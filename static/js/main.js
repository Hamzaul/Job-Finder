const analyzeBtn = document.getElementById('analyzeBtn');
const resumeUpload = document.getElementById('resumeUpload');
const manualSkills = document.getElementById('manualSkills');
const loginReminder = document.getElementById('loginReminder');

analyzeBtn.addEventListener('click', async () => {
  const resumeFile = resumeUpload.files[0];
  const skills = manualSkills.value.trim();

  // ✅ Validate: Must upload resume or enter skills
  if (!resumeFile && !skills) {
    alert("⚠️ Please upload a resume or enter your skills first!");
    return;
  }

  // 🌀 Start loading animation
  analyzeBtn.classList.add('loading');

  // TODO: Replace with real login state check later
  const isLoggedIn = true; // Temporarily true for testing

  if (!isLoggedIn) {
    analyzeBtn.classList.remove('loading');
    loginReminder.style.display = 'block';
    loginReminder.style.animation = 'pulse 1s infinite';
    return;
  }

  // 🧠 Create form data for Flask backend
  const formData = new FormData();
  if (resumeFile) formData.append("resume", resumeFile);
  if (skills) formData.append("skills", skills);

  try {
    const response = await fetch("/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.redirect) {
      // Smooth transition
      setTimeout(() => {
        window.location.href = data.redirect;
      }, 1200);
    } else if (data.error) {
      alert("❌ " + data.error);
      analyzeBtn.classList.remove('loading');
    } else {
      alert("⚠️ Unexpected response from server!");
      analyzeBtn.classList.remove('loading');
    }
  } catch (error) {
    console.error("Error during analysis:", error);
    alert("⚠️ Something went wrong while analyzing your resume!");
    analyzeBtn.classList.remove('loading');
  }
});

// ✅ Resume Upload Feedback
resumeUpload.addEventListener("change", (e) => {
  if (e.target.files.length > 0) {
    const fileName = e.target.files[0].name;
    alert(`📄 ${fileName} selected successfully!`);
  }
});
