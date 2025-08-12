const { sequelize, User, Service, Product, Blog, Career, Portfolio } = require('./models');
const bcrypt = require('bcryptjs');

async function initializeDatabase() {
  try {
    // Sync all models
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@company.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Admin user created:', adminUser.email);

    // Create sample services
    const services = await Service.bulkCreate([
      {
        title: 'Web Development',
        description: 'Custom web applications built with modern technologies',
        icon: 'web',
        features: JSON.stringify(['Responsive Design', 'API Integration', 'Performance Optimization']),
        isActive: true
      },
      {
        title: 'Mobile Development',
        description: 'Native and cross-platform mobile applications',
        icon: 'phone_android',
        features: JSON.stringify(['iOS & Android', 'React Native', 'Flutter']),
        isActive: true
      },
      {
        title: 'Cloud Solutions',
        description: 'Scalable cloud infrastructure and deployment',
        icon: 'cloud',
        features: JSON.stringify(['AWS', 'Azure', 'Google Cloud']),
        isActive: true
      }
    ]);
    console.log('Sample services created:', services.length);

    // Create sample products
    const products = await Product.bulkCreate([
      {
        name: 'Project Management Suite',
        description: 'Comprehensive project management software',
        price: 99.99,
        category: 'Software',
        features: JSON.stringify(['Task Management', 'Team Collaboration', 'Time Tracking']),
        imageUrl: 'https://via.placeholder.com/300x200',
        isActive: true
      },
      {
        name: 'Analytics Dashboard',
        description: 'Real-time business analytics and reporting',
        price: 149.99,
        category: 'Analytics',
        features: JSON.stringify(['Custom Reports', 'Data Visualization', 'API Access']),
        imageUrl: 'https://via.placeholder.com/300x200',
        isActive: true
      }
    ]);
    console.log('Sample products created:', products.length);

    // Create sample blog posts
    const blogs = await Blog.bulkCreate([
      {
        title: 'The Future of Web Development',
        slug: 'future-of-web-development',
        content: 'Web development is evolving rapidly with new technologies...',
        excerpt: 'Exploring the latest trends in web development',
        authorId: adminUser.id,
        isPublished: true,
        publishedAt: new Date()
      },
      {
        title: 'Building Scalable Applications',
        slug: 'building-scalable-applications',
        content: 'Scalability is crucial for modern applications...',
        excerpt: 'Best practices for building scalable software',
        authorId: adminUser.id,
        isPublished: true,
        publishedAt: new Date()
      }
    ]);
    console.log('Sample blog posts created:', blogs.length);

    // Create sample career listings
    const careers = await Career.bulkCreate([
      {
        title: 'Senior Full Stack Developer',
        department: 'Engineering',
        description: 'We are looking for an experienced full stack developer...',
        requirements: JSON.stringify(['5+ years experience', 'Node.js', 'React', 'PostgreSQL']),
        responsibilities: JSON.stringify(['Develop web applications', 'Lead technical discussions', 'Mentor junior developers']),
        location: 'Remote',
        type: 'Full-time',
        isActive: true
      },
      {
        title: 'UI/UX Designer',
        department: 'Design',
        description: 'Creative designer needed for modern web applications...',
        requirements: JSON.stringify(['3+ years experience', 'Figma', 'Adobe Creative Suite']),
        responsibilities: JSON.stringify(['Create user interfaces', 'Conduct user research', 'Design prototypes']),
        location: 'Hybrid',
        type: 'Full-time',
        isActive: true
      }
    ]);
    console.log('Sample career listings created:', careers.length);

    // Create sample portfolio items
    const portfolios = await Portfolio.bulkCreate([
      {
        title: 'E-commerce Platform',
        description: 'Complete e-commerce solution with payment integration',
        client: 'TechStore Inc',
        category: 'E-commerce',
        technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'Stripe']),
        imageUrl: 'https://via.placeholder.com/400x300',
        projectUrl: 'https://example-ecommerce.com',
        completionDate: new Date('2024-01-15'),
        isFeatured: true
      },
      {
        title: 'Healthcare Management System',
        description: 'Patient management system for healthcare providers',
        client: 'HealthCare Corp',
        category: 'Healthcare',
        technologies: JSON.stringify(['Angular', 'Express', 'MongoDB', 'AWS']),
        imageUrl: 'https://via.placeholder.com/400x300',
        projectUrl: 'https://example-healthcare.com',
        completionDate: new Date('2024-03-20'),
        isFeatured: true
      }
    ]);
    console.log('Sample portfolio items created:', portfolios.length);

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await sequelize.close();
  }
}

initializeDatabase();
