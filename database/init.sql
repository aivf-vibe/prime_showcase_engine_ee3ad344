

-- Create database
CREATE DATABASE software_company;

-- Use the database
\c software_company;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(255),
    features JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    features JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image_url VARCHAR(500),
    tags JSONB DEFAULT '[]',
    author_id INTEGER REFERENCES users(id),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create careers table
CREATE TABLE IF NOT EXISTS careers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('full-time', 'part-time', 'contract', 'internship')),
    description TEXT NOT NULL,
    requirements JSONB DEFAULT '[]',
    responsibilities JSONB DEFAULT '[]',
    salary_range JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    client VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    technologies JSONB DEFAULT '[]',
    image_url VARCHAR(500),
    project_url VARCHAR(500),
    completion_date DATE,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_published ON blogs(is_published);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_careers_active ON careers(is_active);
CREATE INDEX idx_portfolios_featured ON portfolios(is_featured);

-- Insert sample admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@softwarecompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample services
INSERT INTO services (title, description, icon, features) VALUES 
('Web Development', 'Custom web applications built with modern technologies', 'code', '["Responsive Design", "API Integration", "Performance Optimization", "Security Implementation"]'),
('Mobile Development', 'Native and cross-platform mobile applications', 'smartphone', '["iOS Development", "Android Development", "React Native", "Flutter"]'),
('Cloud Solutions', 'Scalable cloud infrastructure and deployment', 'cloud', '["AWS/Azure Setup", "CI/CD Pipeline", "Auto-scaling", "Cost Optimization"]'),
('UI/UX Design', 'User-centered design solutions', 'palette', '["User Research", "Wireframing", "Prototyping", "Usability Testing"]');

-- Insert sample products
INSERT INTO products (name, description, price, category, features) VALUES 
('Project Management Tool', 'Comprehensive project management solution', 99.99, 'SaaS', '["Task Management", "Team Collaboration", "Time Tracking", "Reporting"]'),
('E-commerce Platform', 'Complete e-commerce solution for businesses', 299.99, 'E-commerce', '["Product Catalog", "Payment Processing", "Inventory Management", "Analytics"]'),
('Analytics Dashboard', 'Real-time business analytics and insights', 149.99, 'Analytics', '["Custom Dashboards", "Real-time Data", "Export Reports", "API Access"]');

-- Insert sample portfolio items
INSERT INTO portfolios (title, description, client, category, technologies, project_url, completion_date, is_featured) VALUES 
('E-commerce Redesign', 'Complete redesign of major e-commerce platform', 'TechCorp Inc', 'E-commerce', '["React", "Node.js", "PostgreSQL", "AWS"]', 'https://example.com', '2024-01-15', true),
('Healthcare App', 'Mobile app for patient management', 'HealthPlus', 'Healthcare', '["React Native", "Firebase", "Node.js"]', 'https://example.com', '2024-02-20', true),
('FinTech Dashboard', 'Real-time financial analytics dashboard', 'FinanceCo', 'Finance', '["Angular", "Python", "Redis", "PostgreSQL"]', 'https://example.com', '2024-03-10', false);

-- Insert sample career listings
INSERT INTO careers (title, department, location, type, description, requirements, responsibilities, salary_range) VALUES 
('Senior Full Stack Developer', 'Engineering', 'Remote', 'full-time', 'We are looking for an experienced full-stack developer to join our team', '["5+ years experience", "Node.js expertise", "React/Angular experience", "PostgreSQL knowledge"]', '["Develop new features", "Code reviews", "Mentor junior developers", "Architecture decisions"]', '{"min": 120000, "max": 180000, "currency": "USD"}'),
('UI/UX Designer', 'Design', 'Hybrid', 'full-time', 'Creative designer to create amazing user experiences', '["3+ years experience", "Figma proficiency", "User research skills", "Portfolio required"]', '["Create wireframes", "User testing", "Design systems", "Collaborate with developers"]', '{"min": 80000, "max": 120000, "currency": "USD"}'),
('DevOps Engineer', 'Operations', 'Remote', 'full-time', 'DevOps engineer to manage our cloud infrastructure', '["AWS/Azure experience", "Docker/Kubernetes", "CI/CD pipelines", "Monitoring tools"]', '["Infrastructure management", "Deployment automation", "Performance optimization", "Security implementation"]', '{"min": 100000, "max": 150000, "currency": "USD"}');
