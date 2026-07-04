# FinRelief AI

FinRelief AI is a production-ready full-stack platform for debt relief and financial recovery. It combines a React + Vite frontend with a FastAPI backend, SQLite persistence, JWT authentication, and a modular service-oriented architecture.

## Features

- Secure authentication and session handling
- Loan and debt management workflows
- Financial health analysis and settlement prediction
- AI-assisted negotiation email generation
- Borrower-rights education and history tracking
- Responsive fintech-style user experience

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Backend: FastAPI, SQLAlchemy, SQLite, JWT, Passlib
- Tooling: Python, Node.js, npm, pytest

## Project Structure

```text
finrelief-ai/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── tests/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── styles.css
│   └── package.json
├── .gitignore
├── README.md
├── requirements.txt
└── package.json
```

## Quick Start

### 1. Clone and install

```bash
git clone <your-repo-url>
cd finrelief-ai
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
npm install
```

### 2. Configure environment variables

Copy the example environment file and adjust values:

```bash
cp .env.example .env
```

### 3. Run locally

Backend:

```bash
uvicorn backend.app.main:app --reload
```

Frontend:

```bash
cd frontend
npm run dev
```

## Production Build

```bash
npm run build:frontend
```

## Deployment Notes

- Deploy the backend to a Python-friendly host such as Render, Railway, or Fly.io.
- Deploy the frontend to Vercel, Netlify, or Cloudflare Pages.
- Set environment variables for the backend before deploying.

## License

This project is intended for demo and educational use.
