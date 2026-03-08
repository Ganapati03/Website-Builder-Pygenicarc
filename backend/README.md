# WebBuilder AI - Backend

Production-ready Flask backend for the WebBuilder AI website builder application.

## Tech Stack

- **Framework**: Flask 3.0
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT (Flask-JWT-Extended)
- **Password Hashing**: bcrypt
- **Migrations**: Flask-Migrate
- **AI Integration**: Local Ollama endpoint

## Project Structure

```
backend/
├── app.py                 # Application factory
├── config.py              # Configuration settings
├── extensions.py          # Flask extensions
├── requirements.txt       # Python dependencies
├── seed_db.py             # Database seeding script
├── .env.example           # Environment variables template
│
├── models/
│   ├── __init__.py
│   ├── user.py            # User model
│   ├── project.py         # Project model
│   └── template.py        # Template model
│
├── routes/
│   ├── __init__.py
│   ├── auth.py            # Authentication endpoints
│   ├── projects.py        # Project CRUD endpoints
│   ├── templates.py       # Template endpoints
│   └── ai.py              # AI generation endpoints
│
├── services/
│   ├── __init__.py
│   └── ollama_service.py  # Ollama AI integration
│
└── migrations/            # Database migrations (auto-generated)
```

## Quick Start

### 1. Prerequisites

- Python 3.10+
- PostgreSQL 14+
- Ollama (for AI features)

### 2. PostgreSQL Setup

```bash
# Install PostgreSQL (Windows - download from https://www.postgresql.org/download/)
# Or use a package manager

# Create database
psql -U postgres
CREATE DATABASE webbuilder_db;
CREATE USER webbuilder_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE webbuilder_db TO webbuilder_user;
\q
```

### 3. Environment Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Configuration

```bash
# Copy environment template (Windows)
copy .env.example .env

# Or on macOS/Linux:
cp .env.example .env
```

---

## Environment Variables Guide (How to Get Credentials)

Create a `.env` file in the backend folder with the following variables:

### Flask Configuration

| Variable | Description | How to Get |
|----------|-------------|------------|
| `FLASK_APP` | Entry point | Use `app.py` (default) |
| `FLASK_ENV` | Environment | Use `development` for local, `production` for deployment |
| `SECRET_KEY` | Flask session encryption | **Generate a random key** (see below) |

### JWT Configuration

| Variable | Description | How to Get |
|----------|-------------|------------|
| `JWT_SECRET_KEY` | JWT token signing | **Generate a random key** (see below) |
| `JWT_ACCESS_TOKEN_EXPIRES` | Token expiry in seconds | Use `3600` (1 hour) or `86400` (24 hours) |

### How to Generate SECRET_KEY and JWT_SECRET_KEY

**Option 1: Using Python (Recommended)**
```bash
# Open terminal and run:
python -c "import secrets; print(secrets.token_hex(32))"
```
This generates a 64-character random string like: `a1b2c3d4e5f6...`

**Option 2: Using PowerShell (Windows)**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

**Option 3: Online Generator**
- Visit https://randomkeygen.com/
- Use a "Fort Knox Password" or "256-bit WEP Key"

⚠️ **Important**: Generate **different** keys for `SECRET_KEY` and `JWT_SECRET_KEY`. Never share these keys publicly!

### Database Configuration

| Variable | Description | How to Get |
|----------|-------------|------------|
| `DATABASE_URL` | Database connection string | See options below |

**Option A: SQLite (Easiest - No Setup Required)**
```
DATABASE_URL=sqlite:///webbuilder.db
```
This creates a local file `webbuilder.db` - perfect for development!

**Option B: PostgreSQL (Production)**
```
DATABASE_URL=postgresql://username:password@localhost:5432/webbuilder_db
```
Replace `username`, `password` with your PostgreSQL credentials (see PostgreSQL Setup section above).

### Ollama Configuration (AI Features)

| Variable | Description | How to Get |
|----------|-------------|------------|
| `OLLAMA_BASE_URL` | Ollama server URL | `http://localhost:11434` (default) |
| `OLLAMA_MODEL` | AI model to use | `llama2`, `codellama`, `mistral`, etc. |

**How to Set Up Ollama:**
1. Download Ollama from https://ollama.ai/download
2. Install and run Ollama
3. Open terminal and pull a model:
   ```bash
   ollama pull llama2
   ```
4. Ollama automatically runs on `http://localhost:11434`

**Available Models:**
- `llama2` - General purpose (7B parameters, ~4GB)
- `codellama` - Better for code generation
- `mistral` - Fast and efficient
- `llama2:13b` - Larger, more capable (needs 16GB+ RAM)

### CORS Configuration

| Variable | Description | How to Get |
|----------|-------------|------------|
| `CORS_ORIGINS` | Allowed frontend URLs | Your frontend URL(s), comma-separated |

**Development:**
```
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

### Complete .env Example (Ready to Use for Development)

```env
# Flask Configuration
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-generated-secret-key-paste-here

# JWT Configuration  
JWT_SECRET_KEY=your-generated-jwt-secret-paste-here
JWT_ACCESS_TOKEN_EXPIRES=3600

# Database - SQLite for easy development
DATABASE_URL=sqlite:///webbuilder.db

# Ollama AI (install Ollama first)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

### 5. Database Migration

```bash
# Initialize migrations
flask db init

# Create migration
flask db migrate -m "Initial migration"

# Apply migration
flask db upgrade

# Seed database with templates
python seed_db.py
```

### 6. Run the Server

```bash
# Development mode
flask run --debug

# Or with host/port
flask run --host=0.0.0.0 --port=5000

# Production (use gunicorn)
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (auth required) |
| POST | `/api/auth/oauth/callback` | OAuth login/register |
| PUT | `/api/auth/change-password` | Change password (auth required) |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects` | Create project |
| GET | `/api/projects` | List user projects |
| GET | `/api/projects/<id>` | Get project details |
| PUT | `/api/projects/<id>` | Update project |
| DELETE | `/api/projects/<id>` | Delete project |
| POST | `/api/projects/<id>/deploy` | Deploy project |
| PUT | `/api/projects/<id>/files/<filename>` | Update file |

### Templates

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/templates` | List templates |
| GET | `/api/templates/<id>` | Get template details |
| GET | `/api/templates/categories` | Get categories |

### AI

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/generate` | Generate code |
| POST | `/api/ai/modify` | Modify existing code |
| POST | `/api/ai/chat` | Chat with AI assistant |
| POST | `/api/ai/suggest` | Get improvement suggestions |
| GET | `/api/ai/health` | Check Ollama status |

## Request/Response Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

Response:
```json
{
  "message": "Registration successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "access_token": "eyJ0eXAiOiJKV1..."
}
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1..." \
  -d '{
    "name": "My Landing Page",
    "description": "A beautiful landing page",
    "template_id": 1
  }'
```

### Generate Code with AI
```bash
curl -X POST http://localhost:5000/api/ai/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1..." \
  -d '{
    "prompt": "Create a hero section with a gradient background",
    "file_type": "html"
  }'
```

## Ollama Setup (AI Features)

```bash
# Install Ollama (https://ollama.ai)
# Windows: Download installer from website
# macOS: brew install ollama
# Linux: curl -fsSL https://ollama.ai/install.sh | sh

# Pull a model
ollama pull llama2

# Start Ollama server (runs on port 11434)
ollama serve

# Verify it's running
curl http://localhost:11434/api/tags
```

## Security Notes

1. **Change default secrets** - Generate strong random keys for `SECRET_KEY` and `JWT_SECRET_KEY`
2. **HTTPS in production** - Always use HTTPS in production
3. **CORS origins** - Set specific origins in production
4. **Rate limiting** - Consider adding Flask-Limiter for API rate limiting
5. **Input validation** - All inputs are validated, but review for your use case

## Demo User

After running `seed_db.py`, a demo user is available:
- **Email**: demo@webbuilder.ai
- **Password**: demo123

## License

MIT
