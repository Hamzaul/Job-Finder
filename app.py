from flask import Flask, request, jsonify, render_template, redirect, url_for, session
from pdfminer.high_level import extract_text
import re
import os

app = Flask(__name__)
app.secret_key = "supersecretkey"

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    user_data = session.get("user_data", {})
    return render_template("dashboard.html", user_data=user_data)

@app.route("/roadmap")
def roadmap():
    return render_template("roadmap.html")

@app.route("/interview")
def interview():
    return render_template("interview.html")

@app.route("/analyze", methods=["POST"])
def analyze_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    resume = request.files["resume"]
    if resume.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, resume.filename)
    resume.save(file_path)

    # Extract text
    text = extract_text(file_path)

    # ---- Simple Parsing Logic ---- #
    name_match = re.search(r"([A-Z][a-z]+\s[A-Z][a-z]+)", text)
    education_match = re.search(r"(B\.?Tech|M\.?Tech|B\.?Sc|M\.?Sc|Bachelor|Master)[^,\n]*", text)
    exp_match = re.search(r"(\d+\+?\s?years?)", text)
    skills_match = re.findall(r"(Python|C\+\+|Java|HTML|CSS|JavaScript|React|Node|SQL|AI|ML|Data Science)", text, re.IGNORECASE)
    projects = re.findall(r"(?i)project[:\- ]+(.*)", text)

    user_data = {
        "name": name_match.group(1) if name_match else "User",
        "education": education_match.group(1) if education_match else "Not Found",
        "experience": exp_match.group(1) if exp_match else "Fresher",
        "skills": list(set([s.title() for s in skills_match])) if skills_match else [],
        "projects": projects[:3] if projects else ["No projects found"]
    }

    session["user_data"] = user_data
    return jsonify({"redirect": url_for("dashboard")})

if __name__ == "__main__":
    app.run(debug=True)
