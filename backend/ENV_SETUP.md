# Backend Setup Guide

Complete step-by-step guide to set up the WebBuilder AI backend on Windows.

---

## Prerequisites

Before starting, make sure you have:

- **Python 3.10+** - Download from https://www.python.org/downloads/
- **Git** (optional) - For cloning the repository

To verify Python is installed, open PowerShell and run:
```powershell
python --version
```

---

## Step 1: Open Backend Folder

Open PowerShell and navigate to the backend folder:

```powershell
cd "C:\Users\ganap\OneDrive\Desktop\AV\Design SaaS Website Builder UI (1)\backend"
```

---

## Step 2: Create Virtual Environment

A virtual environment keeps your project dependencies isolated.

```powershell
python -m venv venv
```

This creates a `venv` folder in your backend directory.

---

## Step 3: Activate Virtual Environment

```powershell
.\venv\Scripts\activate
```

You should see `(venv)` at the beginning of your command line. This means the virtual environment is active.

**Note:** You need to activate the virtual environment every time you open a new terminal to work on this project.

---

## Step 4: Install Dependencies

```powershell
pip install -r requirements.txt
```

This installs all required Python packages (Flask, SQLAlchemy, etc.).

---

## Step 5: Create Environment File

The `.env` file stores your configuration settings.

```powershell
copy .env.example .env
```

---

## Step 6: Generate Secret Keys

You need two unique secret keys. Generate them using Python:

**Generate first key (for SECRET_KEY):**
```powershell
python -c "import secrets; print(secrets.token_hex(32))"
```

Copy the output. It looks like this:
```
a7b3c9d2e8f1a4b6c3d9e7f2a1b8c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1
```

**Generate second key (for JWT_SECRET_KEY):**
```powershell
python -c "import secrets; print(secrets.token_hex(32))"
```

Copy this output too (it will be different from the first).

---

## Step 7: Edit .env File

Open the `.env` file in a text editor (Notepad, VS Code, etc.):

```powershell
notepad .env
```

Replace the placeholder values with your generated keys:

```env
# Flask Configuration
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=paste-your-first-key-here

# JWT Configuration
JWT_SECRET_KEY=paste-your-second-key-here
JWT_ACCESS_TOKEN_EXPIRES=3600

# Database (SQLite)
DATABASE_URL=sqlite:///webbuilder.db

# AI Provider: 'auto', 'ollama', or 'gemini'
AI_PROVIDER=auto

# Ollama AI (Local - Optional)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2

# Google Gemini AI (Cloud - Optional but recommended)
GEMINI_API_KEY=paste-your-gemini-api-key-here
GEMINI_MODEL=gemini-1.5-flash

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Save and close the file.**

---

## Step 8: Initialize Database

Create the database tables:

```powershell
flask db upgrade
```

This creates a `webbuilder.db` file (SQLite database) in your backend folder.

---

## Step 9: Seed Demo Data

Add sample templates and a demo user:

```powershell
python seed_db.py
```

---

## Step 10: Start the Server

```powershell
flask run --debug
```

You should see output like:
```
 * Running on http://127.0.0.1:5000
 * Debugger is active!
```

**Your backend is now running at http://localhost:5000**

---

## Test the API

Open a new PowerShell window and test:

```powershell
curl http://localhost:5000/api/templates
```

You should see a JSON response with template data.

---

## Demo Login Credentials

Use these credentials to test authentication:

| Field | Value |
|-------|-------|
| Email | `demo@webbuilder.ai` |
| Password | `demo123` |

---

## Optional: Set Up Ollama (AI Features)

Ollama enables AI code generation features. Skip this if you don't need AI.

### 1. Download Ollama

Go to https://ollama.ai/download and download the Windows installer.

### 2. Install Ollama

Run the installer and follow the prompts.

### 3. Download an AI Model

Open PowerShell and run:

```powershell
ollama pull llama2
```

This downloads the Llama 2 model (~4GB).

### 4. Verify Ollama is Running

```powershell
curl http://localhost:11434/api/tags
```

If you see JSON output with model info, Ollama is working.

---

## Optional: Set Up Google Gemini (Cloud AI - Recommended)

Gemini is a cloud AI that works as a fallback when Ollama is not available. **This is the easiest way to enable AI features.**

### 1. Get Your Free API Key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated API key

### 2. Add to .env File

Open your `.env` file and add:

```env
GEMINI_API_KEY=your-api-key-here
GEMINI_MODEL=gemini-1.5-flash
```

### 3. That's It!

No installation needed. The app will automatically use Gemini when:
- Ollama is not installed
- Ollama is not running
- Ollama request fails

### AI Provider Options

Set `AI_PROVIDER` in your `.env`:

| Value | Behavior |
|-------|----------|
| `auto` | Tries Ollama first, falls back to Gemini (default) |
| `ollama` | Only uses Ollama (fails if unavailable) |
| `gemini` | Only uses Gemini (requires API key) |

---

## Environment Variables Reference

| Variable | Required | Default Value | Description |
|----------|----------|---------------|-------------|
| `FLASK_APP` | Yes | `app.py` | Flask entry point |
| `FLASK_ENV` | Yes | `development` | Environment mode |
| `SECRET_KEY` | Yes | - | Flask session encryption key |
| `JWT_SECRET_KEY` | Yes | - | JWT token signing key |
| `JWT_ACCESS_TOKEN_EXPIRES` | No | `3600` | Token expiry in seconds |
| `DATABASE_URL` | Yes | `sqlite:///webbuilder.db` | Database connection string |
| `AI_PROVIDER` | No | `auto` | AI provider: auto, ollama, gemini |
| `OLLAMA_BASE_URL` | No | `http://localhost:11434` | Ollama server URL |
| `OLLAMA_MODEL` | No | `llama2` | Ollama model to use |
| `GEMINI_API_KEY` | No | - | Google Gemini API key |
| `GEMINI_MODEL` | No | `gemini-1.5-flash` | Gemini model to use |
| `CORS_ORIGINS` | No | `http://localhost:5173` | Allowed frontend origins |

---

## Common Commands

| Command | Description |
|---------|-------------|
| `.\venv\Scripts\activate` | Activate virtual environment |
| `deactivate` | Deactivate virtual environment |
| `flask run --debug` | Start development server |
| `flask db upgrade` | Apply database migrations |
| `python seed_db.py` | Seed database with demo data |

---

## Troubleshooting

### "python is not recognized"
Python is not in your PATH. Reinstall Python and check "Add Python to PATH" during installation.

### "venv\Scripts\activate cannot be loaded"
Run this command first to allow scripts:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "No module named flask"
Make sure your virtual environment is activated (you should see `(venv)` in your terminal).

### "Address already in use"
Another process is using port 5000. Either stop it or run Flask on a different port:
```powershell
flask run --debug --port 5001
```

### "UNIQUE constraint failed" during seed
The database already has demo data. Delete `webbuilder.db` and run migrations again:
```powershell
Remove-Item webbuilder.db
flask db upgrade
python seed_db.py
```

### "Ollama connection refused"
Ollama is not running. Start it by running `ollama serve` in a separate terminal.

### "AI not working / No AI provider available"
You need either Ollama OR a Gemini API key. Easiest fix:
1. Go to https://aistudio.google.com/app/apikey
2. Create a free API key
3. Add `GEMINI_API_KEY=your-key` to your `.env` file
4. Restart the server

---

## Next Steps

1. Start the frontend: Open a new terminal, navigate to `frontend` folder, and run `npm run dev`
2. Open http://localhost:5173 in your browser
3. Log in with demo credentials or create a new account

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│                    QUICK START                          │
├─────────────────────────────────────────────────────────┤
│  1. cd backend                                          │
│  2. python -m venv venv                                 │
│  3. .\venv\Scripts\activate                             │
│  4. pip install -r requirements.txt                     │
│  5. copy .env.example .env                              │
│  6. Generate keys and edit .env                         │
│  7. Add Gemini API key (easiest AI setup)               │
│  8. flask db upgrade                                    │
│  9. python seed_db.py                                   │
│ 10. flask run --debug                                   │
│                                                         │
│  Server: http://localhost:5000                          │
│  Demo: demo@webbuilder.ai / demo123                     │
│                                                         │
│  AI: Get free Gemini key at:                            │
│  https://aistudio.google.com/app/apikey                 │
└─────────────────────────────────────────────────────────┘
```
