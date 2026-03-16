# 🚀 Placement Intel

**Placement Intel** is an **AI-assisted resume analysis platform** that evaluates resume structure, skill coverage, quantified impact, and job-description alignment.

The system parses uploaded resumes, extracts structured information, analyzes impact signals such as quantified achievements, and generates **actionable feedback** to help candidates improve their resumes for **technical roles**.

---

# 🌐 Live Demo

### Frontend
https://www.resumeintel.in

### Backend API
https://resumeintel-backend.onrender.com

---

# 🖼 Screenshots

(Add screenshots of your dashboard and upload interface)

Example structure:

docs/
 ├── dashboard.png
 ├── upload.png
 └── analysis.png

Embed them:

![Dashboard](docs/dashboard.png)  
![Upload](docs/upload.png)  
![Analysis](docs/analysis.png)

---

# ✨ Features

## 📄 Resume Parsing

Extracts structured resume sections including:

- Skills
- Projects
- Experience
- Education
- Certifications
- Training

The parser is designed to **handle common resume formatting variations**.

---

## 🧠 Skill Extraction & Normalization

Identifies technical skills and maps them to **canonical forms** to avoid duplicates.

| Raw Skill | Normalized |
|-----------|------------|
| ReactJS | react |
| Nodejs | node.js |
| REST APIs | rest api |

---

## 📊 Quantified Impact Detection

Analyzes project and experience bullets for measurable impact signals such as:

- percentages
- numeric improvements
- performance metrics

Example:

Improved API latency by 35%  
Handled 10k daily users  
Reduced response time by 120ms  

---

## 🧮 Resume Scoring System

The resume is evaluated across multiple signals.

| Metric | Description |
|------|-------------|
| Bullet Structure | Use of structured bullets |
| Quantified Impact | Measurable achievements |
| Skills Coverage | Technical stack depth |
| Action Verbs | Strong engineering verbs |
| Resume Length | Optimal word range |

A **weighted scoring system** generates an overall resume score.

---

## 💡 Feedback Generation

Actionable suggestions are automatically generated.

Example feedback:

- Add measurable results such as **% improvements**
- Use stronger action verbs like **Built, Optimized, Reduced**
- Expand technical depth in **project descriptions**

---

## 🎯 Job Description Matching

Optionally compares a resume against a **job description**.

Outputs include:

- Match percentage
- Matched keywords
- Missing keywords

---

# 🏗 Architecture

Browser  
   │  
   ▼  
Next.js Frontend  
   │  
   ▼  
Express Backend API  
   │  
   ▼  
Resume Analysis Engine  
   │  
   ▼  
MongoDB Atlas  

---

# ⚙️ Tech Stack

## 🖥 Frontend

- Next.js (App Router)
- TailwindCSS
- shadcn/ui
- Lucide Icons

## 🔧 Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## ☁️ Infrastructure

- Docker
- Docker Compose
- GitHub Actions CI

## 🧪 Other Tools

- Jest testing framework
- pdf-parse for resume parsing

---

# 🖥 Running Locally

## 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/placement-intel.git
cd placement-intel
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

Example:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

# ▶️ Run Without Docker

## Backend

```bash
cd server
npm install
npm run dev
```

## Frontend

```bash
cd client
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🐳 Run With Docker

Build and run the entire system:

```bash
docker compose up --build
```

Frontend:
```
http://localhost:3000
```

Backend API:
```
http://localhost:5000
```

---

# 🧪 Testing

The backend includes unit tests for the resume analysis pipeline.

Run tests:

```bash
cd server
npm test
```

Covered modules include:

- section parser
- skill extractor
- skill normalization
- quantification detector
- resume scoring
- pipeline integration

---

# 📂 Project Structure

```
placement-intel
│
├── client
│   ├── app
│   ├── components
│   └── Dockerfile
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   ├── tests
│   └── Dockerfile
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

# 📈 Example Analysis Output

Resume Score: **65**

### Strengths

- Strong bullet structure  
- Good skill coverage  

### Improvements

- Add measurable impact metrics  
- Use stronger action verbs  
- Expand project depth  

---

# 🔮 Future Improvements

Planned enhancements include:

- 🤖 AI generated resume improvement suggestions
- 🎯 ATS keyword optimization
- 🧠 semantic skill detection using NLP
- 📊 resume comparison across job descriptions
- 📈 analytics dashboard for resume performance

---

# 📜 License

MIT License

---

# 👨‍💻 Author

**Satyajeet Satyam**

GitHub:  
https://github.com/Satyajeetbh