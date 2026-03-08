"""
Database Seed Script
Populates the database with initial template data
"""
from app import create_app, db
from models import User, Template


def seed_templates():
    """Seed default templates matching frontend TemplatesPage"""
    
    templates_data = [
        {
            'name': 'SaaS Landing',
            'category': 'Landing Page',
            'description': 'Modern SaaS product landing page',
            'preview_image': '/templates/saas-landing.png',
            'structure_json': {
                'components': [
                    {'id': '1', 'type': 'heading', 'content': 'Build Something Amazing', 'styles': {'fontSize': '48px', 'fontWeight': '700', 'textAlign': 'center'}},
                    {'id': '2', 'type': 'text', 'content': 'The all-in-one platform for your business', 'styles': {'textAlign': 'center', 'color': '#A0A0A0'}},
                    {'id': '3', 'type': 'button', 'content': 'Get Started Free', 'styles': {'backgroundColor': '#00FF88', 'color': '#0D0D0D', 'padding': '16px 32px', 'borderRadius': '8px'}}
                ]
            },
            'default_files': {
                'index.html': '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaaS Landing Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="hero">
        <h1>Build Something Amazing</h1>
        <p>The all-in-one platform for your business</p>
        <button class="cta-button">Get Started Free</button>
    </header>
    <section class="features">
        <div class="feature">
            <h3>Fast</h3>
            <p>Lightning-fast performance</p>
        </div>
        <div class="feature">
            <h3>Secure</h3>
            <p>Enterprise-grade security</p>
        </div>
        <div class="feature">
            <h3>Scalable</h3>
            <p>Grow without limits</p>
        </div>
    </section>
</body>
</html>''',
                'styles.css': '''* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0D0D0D; color: #E0E0E0; }
.hero { text-align: center; padding: 100px 20px; }
.hero h1 { font-size: 3rem; margin-bottom: 1rem; }
.hero p { color: #A0A0A0; margin-bottom: 2rem; }
.cta-button { background: #00FF88; color: #0D0D0D; border: none; padding: 16px 32px; border-radius: 8px; font-size: 1rem; cursor: pointer; }
.cta-button:hover { background: #00cc66; }
.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; padding: 60px 20px; max-width: 1200px; margin: 0 auto; }
.feature { background: #121212; padding: 2rem; border-radius: 12px; border: 1px solid #1a1a1a; }
.feature h3 { color: #00FF88; margin-bottom: 0.5rem; }''',
                'script.js': '// Add interactivity here\nconsole.log("SaaS Landing Page loaded");'
            }
        },
        {
            'name': 'E-commerce',
            'category': 'E-commerce',
            'description': 'Full-featured online store',
            'preview_image': '/templates/ecommerce.png',
            'structure_json': {
                'components': [
                    {'id': '1', 'type': 'heading', 'content': 'Shop Our Collection', 'styles': {'fontSize': '36px', 'fontWeight': '600'}},
                    {'id': '2', 'type': 'container', 'content': '', 'styles': {'display': 'grid', 'gridTemplateColumns': 'repeat(3, 1fr)', 'gap': '20px'}}
                ]
            },
            'default_files': {
                'index.html': '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Store</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="logo">Store</div>
        <div class="nav-links">
            <a href="#">Products</a>
            <a href="#">Categories</a>
            <a href="#">Cart (0)</a>
        </div>
    </nav>
    <main class="products">
        <h1>Featured Products</h1>
        <div class="product-grid">
            <div class="product-card">
                <div class="product-image"></div>
                <h3>Product Name</h3>
                <p class="price">$99.00</p>
                <button>Add to Cart</button>
            </div>
        </div>
    </main>
</body>
</html>''',
                'styles.css': '''* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0D0D0D; color: #E0E0E0; }
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: #121212; border-bottom: 1px solid #1a1a1a; }
.logo { font-size: 1.5rem; font-weight: bold; color: #00FF88; }
.nav-links a { color: #E0E0E0; text-decoration: none; margin-left: 2rem; }
.products { padding: 2rem; max-width: 1200px; margin: 0 auto; }
.products h1 { margin-bottom: 2rem; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
.product-card { background: #121212; border-radius: 12px; padding: 1rem; border: 1px solid #1a1a1a; }
.product-image { height: 200px; background: #1a1a1a; border-radius: 8px; margin-bottom: 1rem; }
.price { color: #00FF88; font-size: 1.25rem; margin: 0.5rem 0; }
.product-card button { width: 100%; padding: 12px; background: #00FF88; color: #0D0D0D; border: none; border-radius: 8px; cursor: pointer; }''',
                'script.js': '// Cart functionality\nlet cart = [];\nconsole.log("E-commerce store loaded");'
            }
        },
        {
            'name': 'Portfolio',
            'category': 'Portfolio',
            'description': 'Creative portfolio showcase',
            'preview_image': '/templates/portfolio.png',
            'structure_json': {
                'components': [
                    {'id': '1', 'type': 'heading', 'content': 'John Doe', 'styles': {'fontSize': '64px', 'fontWeight': '700'}},
                    {'id': '2', 'type': 'text', 'content': 'Full Stack Developer & Designer', 'styles': {'fontSize': '24px', 'color': '#00FF88'}}
                ]
            },
            'default_files': {
                'index.html': '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="hero">
        <h1>John Doe</h1>
        <p class="title">Full Stack Developer & Designer</p>
        <div class="social-links">
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
        </div>
    </header>
    <section class="projects">
        <h2>Featured Work</h2>
        <div class="project-grid">
            <div class="project">
                <div class="project-image"></div>
                <h3>Project One</h3>
                <p>Web Application</p>
            </div>
        </div>
    </section>
</body>
</html>''',
                'styles.css': '''* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0D0D0D; color: #E0E0E0; }
.hero { text-align: center; padding: 120px 20px; }
.hero h1 { font-size: 4rem; margin-bottom: 0.5rem; }
.title { color: #00FF88; font-size: 1.5rem; margin-bottom: 2rem; }
.social-links a { color: #A0A0A0; margin: 0 1rem; text-decoration: none; }
.social-links a:hover { color: #00FF88; }
.projects { padding: 60px 20px; max-width: 1200px; margin: 0 auto; }
.projects h2 { margin-bottom: 2rem; }
.project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
.project { background: #121212; border-radius: 12px; overflow: hidden; border: 1px solid #1a1a1a; }
.project-image { height: 200px; background: linear-gradient(135deg, #00FF88 0%, #0D0D0D 100%); }
.project h3, .project p { padding: 0 1rem; }
.project h3 { padding-top: 1rem; }
.project p { color: #A0A0A0; padding-bottom: 1rem; }''',
                'script.js': '// Portfolio animations\nconsole.log("Portfolio loaded");'
            }
        },
        {
            'name': 'Blog',
            'category': 'Blog',
            'description': 'Minimal blog template',
            'preview_image': '/templates/blog.png',
            'structure_json': {
                'components': [
                    {'id': '1', 'type': 'heading', 'content': 'My Blog', 'styles': {'fontSize': '48px'}},
                    {'id': '2', 'type': 'text', 'content': 'Thoughts and stories', 'styles': {'color': '#A0A0A0'}}  
                ]
            },
            'default_files': {
                'index.html': '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>My Blog</h1>
        <p>Thoughts and stories</p>
    </header>
    <main class="posts">
        <article class="post">
            <time>Jan 15, 2024</time>
            <h2>Getting Started with Web Development</h2>
            <p>A beginner's guide to building your first website...</p>
            <a href="#">Read more →</a>
        </article>
    </main>
</body>
</html>''',
                'styles.css': '''* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Georgia, serif; background: #0D0D0D; color: #E0E0E0; line-height: 1.6; }
header { text-align: center; padding: 60px 20px; border-bottom: 1px solid #1a1a1a; }
header h1 { font-size: 3rem; }
header p { color: #A0A0A0; }
.posts { max-width: 700px; margin: 0 auto; padding: 40px 20px; }
.post { margin-bottom: 3rem; padding-bottom: 3rem; border-bottom: 1px solid #1a1a1a; }
.post time { color: #00FF88; font-family: system-ui, sans-serif; font-size: 0.875rem; }
.post h2 { margin: 0.5rem 0; }
.post p { color: #A0A0A0; margin-bottom: 1rem; }
.post a { color: #00FF88; text-decoration: none; }''',
                'script.js': '// Blog functionality\nconsole.log("Blog loaded");'
            }
        },
        {
            'name': 'Agency',
            'category': 'Business',
            'description': 'Digital agency website',
            'preview_image': '/templates/agency.png',
            'structure_json': {
                'components': [
                    {'id': '1', 'type': 'heading', 'content': 'We Create Digital Experiences', 'styles': {'fontSize': '56px', 'fontWeight': '700'}},
                    {'id': '2', 'type': 'button', 'content': 'Start a Project', 'styles': {'backgroundColor': '#00FF88'}}
                ]
            },
            'default_files': {
                'index.html': '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Agency</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav>
        <div class="logo">Agency</div>
        <div class="nav-links">
            <a href="#">Work</a>
            <a href="#">Services</a>
            <a href="#">About</a>
            <a href="#" class="btn">Contact</a>
        </div>
    </nav>
    <header class="hero">
        <h1>We Create<br><span>Digital Experiences</span></h1>
        <p>Award-winning digital agency crafting beautiful websites and applications</p>
        <button class="cta">Start a Project</button>
    </header>
    <section class="services">
        <h2>Our Services</h2>
        <div class="service-grid">
            <div class="service">
                <h3>Web Design</h3>
                <p>Beautiful, responsive websites</p>
            </div>
            <div class="service">
                <h3>Development</h3>
                <p>Custom web applications</p>
            </div>
            <div class="service">
                <h3>Branding</h3>
                <p>Identity and brand strategy</p>
            </div>
        </div>
    </section>
</body>
</html>''',
                'styles.css': '''* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0D0D0D; color: #E0E0E0; }
nav { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 3rem; }
.logo { font-size: 1.5rem; font-weight: bold; }
.nav-links a { color: #E0E0E0; text-decoration: none; margin-left: 2rem; }
.nav-links .btn { background: #00FF88; color: #0D0D0D; padding: 10px 20px; border-radius: 6px; }
.hero { text-align: center; padding: 120px 20px; }
.hero h1 { font-size: 4rem; line-height: 1.1; margin-bottom: 1.5rem; }
.hero h1 span { color: #00FF88; }
.hero p { color: #A0A0A0; font-size: 1.25rem; max-width: 600px; margin: 0 auto 2rem; }
.cta { background: #00FF88; color: #0D0D0D; border: none; padding: 16px 40px; font-size: 1rem; border-radius: 8px; cursor: pointer; }
.services { padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
.services h2 { text-align: center; margin-bottom: 3rem; }
.service-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.service { background: #121212; padding: 2rem; border-radius: 12px; border: 1px solid #1a1a1a; text-align: center; }
.service h3 { color: #00FF88; margin-bottom: 0.5rem; }''',
                'script.js': '// Agency interactions\nconsole.log("Agency site loaded");'
            }
        },
        {
            'name': 'Dashboard',
            'category': 'App',
            'description': 'Admin dashboard template',
            'preview_image': '/templates/dashboard.png',
            'structure_json': {
                'components': [
                    {'id': '1', 'type': 'heading', 'content': 'Dashboard', 'styles': {'fontSize': '32px'}},
                    {'id': '2', 'type': 'container', 'content': '', 'styles': {'display': 'grid', 'gridTemplateColumns': 'repeat(4, 1fr)', 'gap': '16px'}}
                ]
            },
            'default_files': {
                'index.html': '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="dashboard">
        <aside class="sidebar">
            <div class="logo">Admin</div>
            <nav>
                <a href="#" class="active">Dashboard</a>
                <a href="#">Analytics</a>
                <a href="#">Users</a>
                <a href="#">Settings</a>
            </nav>
        </aside>
        <main>
            <header>
                <h1>Dashboard</h1>
                <div class="user">John Doe</div>
            </header>
            <div class="stats">
                <div class="stat-card">
                    <h3>Total Users</h3>
                    <p>12,345</p>
                </div>
                <div class="stat-card">
                    <h3>Revenue</h3>
                    <p>$45,678</p>
                </div>
                <div class="stat-card">
                    <h3>Orders</h3>
                    <p>1,234</p>
                </div>
                <div class="stat-card">
                    <h3>Growth</h3>
                    <p>+23%</p>
                </div>
            </div>
        </main>
    </div>
</body>
</html>''',
                'styles.css': '''* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0D0D0D; color: #E0E0E0; }
.dashboard { display: flex; min-height: 100vh; }
.sidebar { width: 250px; background: #121212; border-right: 1px solid #1a1a1a; padding: 1.5rem; }
.logo { font-size: 1.5rem; font-weight: bold; color: #00FF88; margin-bottom: 2rem; }
.sidebar nav { display: flex; flex-direction: column; gap: 0.5rem; }
.sidebar a { color: #A0A0A0; text-decoration: none; padding: 12px; border-radius: 8px; }
.sidebar a:hover, .sidebar a.active { background: #1a1a1a; color: #E0E0E0; }
main { flex: 1; padding: 1.5rem; }
header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.stat-card { background: #121212; padding: 1.5rem; border-radius: 12px; border: 1px solid #1a1a1a; }
.stat-card h3 { color: #A0A0A0; font-size: 0.875rem; margin-bottom: 0.5rem; }
.stat-card p { font-size: 2rem; font-weight: bold; color: #00FF88; }''',
                'script.js': '// Dashboard data\nconsole.log("Dashboard loaded");'
            }
        }
    ]
    
    for template_data in templates_data:
        # Check if template exists
        existing = Template.query.filter_by(name=template_data['name']).first()
        if not existing:
            template = Template(**template_data)
            db.session.add(template)
            print(f"  Added template: {template_data['name']}")
        else:
            print(f"  Template exists: {template_data['name']}")
    
    db.session.commit()
    print("Templates seeded successfully!")


def seed_demo_user():
    """Seed a demo user for testing"""
    
    existing = User.query.filter_by(email='demo@webbuilder.ai').first()
    if not existing:
        user = User(
            name='Demo User',
            email='demo@webbuilder.ai',
            password='demo123'
        )
        db.session.add(user)
        db.session.commit()
        print("  Added demo user: demo@webbuilder.ai / demo123")
    else:
        print("  Demo user already exists")


def seed_database():
    """Run all seed functions"""
    print("\n=== Seeding Database ===\n")
    
    print("Seeding templates...")
    seed_templates()
    
    print("\nSeeding demo user...")
    seed_demo_user()
    
    print("\n=== Database Seeding Complete ===\n")


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        # Create tables
        db.create_all()
        print("Database tables created.")
        
        # Seed data
        seed_database()
