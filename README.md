# FinRelief AI – AI Powered Debt Relief & Financial Recovery Platform

## Project Overview

FinRelief AI is a full-stack web application designed to help borrowers manage debts, monitor financial health, predict settlement opportunities, generate AI-powered negotiation emails, and understand borrower rights through an interactive and responsive web platform.

The project combines modern frontend and backend technologies with AI-assisted recommendations to provide a secure and user-friendly financial recovery solution.

---

## Features

### User Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing
- Secure Session Management

### Dashboard
- Monthly Income
- Monthly Expenses
- Monthly Surplus
- Outstanding Loan
- Total EMI
- Debt Ratio
- Stress Level
- Settlement Prediction

### Financial Health
- Financial Health Score
- Monthly Surplus Analysis
- Debt Ratio Calculation
- Financial Suggestions

### Loan Management
- Add Loan
- Edit Loan
- Delete Loan
- View Loan Details
- Loan History

### Settlement Prediction
- AI-based Settlement Percentage
- Recommended Settlement Offer
- Negotiation Suggestions

### AI Negotiation Email
- Generate Professional Settlement Emails
- AI-powered Email Suggestions
- Copy Generated Email

### Know Your Rights
- RBI Guidelines
- Borrower Rights
- Consumer Protection Information
- Loan Recovery Rules

### History Module
- Financial Reports
- Settlement History
- Generated Emails

### Error Handling
- Exception Handling
- Input Validation
- API Error Responses
- AI Fallback Mechanism

---

# Technology Stack

## Frontend

- React.js
- Vite
- HTML5
- CSS3
- JavaScript
- React Router DOM
- Axios

## Backend

- FastAPI
- Python

## Database

- SQLite

## Authentication

- JWT
- Password Hashing

## AI

- Google Gemini API
- Rule-Based AI Fallback

## Version Control

- Git
- GitHub

---

# Project Structure

```
finrelief-ai/
├── README.md
├── .gitignore
├── backend/                  # FastAPI Backend Application
│   ├── app/
│   │   ├── main.py           # Application Entrypoint
│   │   ├── config.py         # App Configurations & Secret Keys
│   │   ├── database.py       # SQLite connection details
│   │   ├── models.py         # SQLAlchemy schemas (Users, Debts, Recommendations)
│   │   ├── schemas.py        # Pydantic validation models
│   │   ├── auth.py           # Password Hashing and JWT token generation
│   │   └── routers/
│   │       ├── auth.py       # Authentication API
│   │       ├── debts.py      # Debt Management CRUD API
│   │       └── advisor.py    # AI Advisor and payoff simulation logic
│   ├── requirements.txt      # Python dependencies
│   ├── .env.example          # Sample environment variables
│   └── .gitignore            # Backend-specific gitignore
└── frontend/                 # React Frontend Application
    ├── index.html            # Main HTML wrapper
    ├── package.json          # Node dependencies
    ├── vite.config.js        # Vite configurations
    ├── .gitignore            # Frontend-specific gitignore
    └── src/
        ├── main.jsx          # React entrypoint
        ├── App.jsx           # Routing & global layouts
        ├── index.css         # Custom stylesheet & theme vars
        ├── components/       # Reusable components
        │   ├── Button.jsx
        │   ├── Card.jsx
        │   ├── Input.jsx
        │   ├── Layout.jsx
        │   ├── Navbar.jsx
        │   └── Sidebar.jsx
        ├── context/          # State providers
        │   └── AuthContext.jsx
        ├── pages/            # View Pages
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   ├── Debts.jsx
        │   └── AIAdvisor.jsx
        └── services/         # Axios API Services
            ├── api.js
            ├── auth.js
            ├── debts.js
            └── advisor.js
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/zainul2005/AI_DEBT.git
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend

python -m venv .venv
```

### Activate Virtual Environment

Windows

```bash
.venv\Scripts\activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Run Backend

```bash
python -m uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# API Modules

## Authentication

- Register
- Login
- JWT Authentication

## Financial Profile

- Income
- Expenses
- Monthly Surplus

## Loan Management

- Add Loan
- Update Loan
- Delete Loan
- View Loans

## AI Services

- Financial Health
- Settlement Prediction
- Negotiation Email
- Borrower Rights

## History

- Reports
- Settlement History
- Generated Emails

---

# Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Secure API Communication
- Exception Handling
- Input Validation

---

# Testing

The project includes:

- Unit Testing
- Integration Testing
- System Testing
- Error Handling Testing
- Performance Testing

---

# Performance Optimizations

- Optimized SQLite Database
- Axios Interceptors
- JWT Session Expiry
- Fast API Responses
- Efficient Backend Processing

---

# Future Enhancements

- MySQL Integration
- Cloud Deployment
- Advanced AI Recommendations
- PDF Report Generation
- Email Notifications
- Mobile Application
- Multi-language Support
- Analytics Dashboard

---

# GitHub Repository

https://github.com/zainul2005/AI_DEBT

---

# Contributors

### Team Lead

**Syed Zainul Abdin**

### Team Members

- Shaik Aslam
- Otikunta Kavya Sri
- Rangappagari Dhanush
- Shaik Adnan

---

# College

Annamacharya Institute of Technology & Sciences

Department of Artificial Intelligence & Data Science

---

# License

This project is developed for academic purposes as part of the **FinRelief AI – AI Powered Debt Relief & Financial Recovery Platform**.









