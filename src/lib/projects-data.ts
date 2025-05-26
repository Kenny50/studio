export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageAiHint: string;
  tags: string[];
  caseStudyMarkdown: string;
  client?: string;
  date?: string;
  services?: string[];
}

export const projectsData: Project[] = [
  {
    id: '1',
    slug: 'project-alpha',
    title: 'Project Alpha: E-commerce Platform',
    summary: 'A cutting-edge e-commerce platform designed for scalability and enhanced user experience, resulting in a 30% sales increase.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'e-commerce website',
    tags: ['Web Development', 'E-commerce', 'React', 'Node.js'],
    client: "Global Retail Inc.",
    date: "2023-05-15",
    services: ["Web Development", "UI/UX Design", "Cloud Integration"],
    caseStudyMarkdown: `
# Case Study: Project Alpha - Revolutionizing Online Retail

## Client Background
Global Retail Inc. is a leading international retailer facing challenges with their outdated e-commerce system. They needed a modern, scalable solution to improve customer experience and boost online sales.

## The Challenge
The existing platform was slow, difficult to navigate, and lacked modern features like personalized recommendations and seamless mobile experience. This resulted in high cart abandonment rates and stagnant growth.

## Our Solution
Ciaodigi Navigator was tasked to design and develop a new e-commerce platform from the ground up. Our solution included:
- A custom-built frontend using React for a fast, responsive user interface.
- A robust backend powered by Node.js and microservices architecture for scalability.
- Integration with advanced analytics and a recommendation engine.
- A fully responsive design optimized for all devices.
- Streamlined checkout process.

## Key Features
- Personalized product recommendations
- Advanced search and filtering capabilities
- One-click checkout
- Mobile-first design
- Admin dashboard for easy product and order management

## Technologies Used
- Frontend: React, Redux, Next.js
- Backend: Node.js, Express.js, PostgreSQL
- Cloud: AWS (EC2, S3, RDS)
- DevOps: Docker, Jenkins

## Results
The new platform, Project Alpha, launched successfully and delivered significant improvements:
- **30% increase in online sales** within the first quarter.
- **50% reduction in cart abandonment rate.**
- **40% improvement in page load times.**
- Enhanced customer satisfaction scores.

## Conclusion
Project Alpha demonstrates Ciaodigi Navigator's ability to deliver complex, high-impact e-commerce solutions that drive business growth and improve user experience. Our strategic approach and technical expertise were key to the project's success.
    `,
  },
  {
    id: '2',
    slug: 'project-beta',
    title: 'Project Beta: Mobile Health App',
    summary: 'An intuitive mobile application connecting patients with healthcare providers, improving access to medical advice and appointment booking.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'mobile health app',
    tags: ['Mobile Development', 'Healthcare', 'iOS', 'Android', 'React Native'],
    client: "Wellness Solutions Ltd.",
    date: "2023-09-01",
    services: ["Mobile App Development", "UI/UX Design", "API Development"],
    caseStudyMarkdown: `
# Case Study: Project Beta - Transforming Patient Care with Mobile Technology

## Client Background
Wellness Solutions Ltd. is a healthcare provider network aiming to improve patient access to care through digital innovation.

## The Challenge
Patients often faced long wait times for appointments and difficulty accessing timely medical advice. The client needed a mobile solution to bridge this gap.

## Our Solution
We developed "HealthConnect," a cross-platform mobile app using React Native. The app offers:
- Secure video consultations with doctors.
- Easy appointment scheduling and reminders.
- Access to medical records and prescriptions.
- A health and wellness content library.

## Key Features
- HIPAA-compliant secure messaging and video calls
- Real-time appointment booking
- Integration with EMR systems
- Personalized health tips
- Emergency contact features

## Technologies Used
- Mobile: React Native, Firebase
- Backend: Python (Django), PostgreSQL
- Security: End-to-end encryption, secure authentication

## Results
HealthConnect has been widely adopted by patients and doctors:
- **Reduced appointment wait times by 60%.**
- **Increased patient engagement by 40%.**
- Positive feedback on ease of use and convenience.
- Streamlined administrative tasks for healthcare providers.

## Conclusion
Project Beta showcases our expertise in creating secure and user-friendly mobile healthcare solutions. HealthConnect has significantly improved access to care and patient satisfaction.
    `,
  },
  {
    id: '3',
    slug: 'project-gamma',
    title: 'Project Gamma: AI-Powered Analytics Dashboard',
    summary: 'A sophisticated B2B analytics dashboard providing actionable insights through advanced data visualization and machine learning.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'analytics dashboard',
    tags: ['Web Development', 'AI/ML', 'Data Visualization', 'SaaS'],
    client: "Insightful Data Corp.",
    date: "2024-01-20",
    services: ["Web Development", "AI/ML Integration", "Data Engineering"],
    caseStudyMarkdown: `
# Case Study: Project Gamma - AI-Powered Analytics for Businesses

## Client Background
Insightful Data Corp. provides B2B data solutions and wanted to offer a cutting-edge analytics dashboard to their clients.

## The Challenge
Existing analytics tools were either too complex or lacked predictive capabilities. The client envisioned a dashboard that was intuitive yet powerful, leveraging AI for forecasting and anomaly detection.

## Our Solution
Ciaodigi Navigator developed "InsightStream," a SaaS analytics platform featuring:
- Interactive data visualizations using D3.js and Chart.js.
- Machine learning models for sales forecasting and trend analysis.
- Customizable dashboards and reporting tools.
- Real-time data ingestion and processing.

## Key Features
- Predictive analytics (forecasting, anomaly detection)
- Customizable dashboards with drag-and-drop widgets
- Automated report generation
- Integration with various data sources (CRM, ERP, etc.)
- Role-based access control

## Technologies Used
- Frontend: Vue.js, D3.js, Chart.js
- Backend: Python (Flask), Celery, Redis, Elasticsearch
- AI/ML: Scikit-learn, TensorFlow
- Database: TimescaleDB, MongoDB

## Results
InsightStream has empowered businesses with data-driven decision-making:
- **Enabled clients to identify new market opportunities, leading to an average 15% revenue growth.**
- **Reduced time spent on manual data analysis by 70%.**
- High adoption rates and positive user feedback on usability and insights provided.

## Conclusion
Project Gamma highlights our capability in building sophisticated AI-driven analytics solutions. InsightStream provides significant value by transforming raw data into actionable intelligence.
    `,
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projectsData.find(project => project.slug === slug);
};
