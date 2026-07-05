# FinRelief AI – AI Powered Debt Relief & Financial Recovery Platform

FinRelief AI is a production-ready, full-stack financial technology application designed to help users track, manage, and optimize their path to debt freedom. Integrating modern algorithmic and AI insights, FinRelief AI empowers users to analyze debt paydown options (Debt Snowball vs. Debt Avalanche), view detailed amortizations, and receive interactive, simulated financial advisory guidance.

## Architecture & Structure

The codebase is split into two primary components:
1. **/backend**: A FastAPI service connected to a SQLite database. Powered by SQLAlchemy for ORM and PyJWT for secure user authentication.
2. **/frontend**: A React web application bootstrapped with Vite, configured with React Router, and styled with high-end premium Dark-Mode CSS.

### Project Layout

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

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+ & npm

### Backend Setup

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # On Unix/macOS:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment:
   Copy `.env.example` to `.env` and fill out secret keys.
5. Run the FastAPI development server:
   ```bash
   python -m uvicorn app.main:app --reload
   ```
   The backend API will run at `http://127.0.0.1:8000` with interactive docs at `http://127.0.0.1:8000/docs`.

### Frontend Setup

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`.


   # Author

**Syed Zainul Abdin--Team Lead**<br>
**Shaik Aslam -- Member**<br>
**Otikunta Kavya Sri -- Member**<br> 
**Rangappagari Dhanush -- Member**<br> 
**Shaik Adnan -- Member**

B.Tech – Artificial Intelligence & Data Science

Annamacharya Institute of Technology & Sciences, Kadapa

---

# License

This project is developed for academic purposes as part of the AI-Powered Debt Relief & Financial Recovery Platform.
