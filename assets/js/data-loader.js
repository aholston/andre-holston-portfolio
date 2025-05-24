/**
 * Data Loader Module
 * Loads and renders dynamic content from JSON files
 */

/**
 * Load and display projects
 */
function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    // For now, let's add the projects directly since we have the data
    const projects = [
        {
            title: "🔒 Critical Security Vulnerability Resolution",
            tags: ["Security", "Cross-functional Leadership", "Crisis Management"],
            description: "Led a cross-functional team of 12 engineers to identify and resolve a critical security vulnerability affecting our core platform. Coordinated with security, DevOps, and product teams to implement fixes while maintaining system stability.",
            impact: "Vulnerability patched within 48 hours with zero downtime. Established new security review processes that reduced similar issues by 85%. Mentored junior engineers throughout the process, turning a crisis into a learning opportunity.",
            leadership: "Maintained team morale during high-pressure situation, ensured clear communication across all stakeholders, and used the incident to strengthen team resilience and processes."
        },
        {
            title: "🚀 Platform Integration & Scaling",
            tags: ["System Architecture", "Team Scaling", "Mentorship"],
            description: "Architected and led the integration of multiple legacy systems into a unified platform serving 100K+ users. Grew the engineering team from 4 to 12 members while maintaining code quality and team culture.",
            impact: "40% improvement in system performance, 60% reduction in maintenance overhead, and successful onboarding of 8 new engineers across experience levels.",
            leadership: "Created structured onboarding program, established code review practices, and implemented mentorship pairings that accelerated team member growth."
        },
        {
            title: "📚 Engineering Education Platform",
            tags: ["EdTech", "Teaching", "Community Building"],
            description: "Developed and maintained learning management systems as a Teaching Assistant for edX bootcamps. Created curriculum materials and provided mentorship to 200+ aspiring developers.",
            impact: "95% student satisfaction rate, contributed to 80% completion rate (above industry average), and helped 150+ students transition into tech careers.",
            leadership: "Emphasized inclusive learning environments, created supportive community spaces, and developed scalable mentorship approaches."
        },
        {
            title: "☁️ AWS Infrastructure Modernization",
            tags: ["Cloud Architecture", "DevOps", "Cost Optimization"],
            description: "Led migration from on-premises infrastructure to AWS, implementing best practices for security, scalability, and cost management. Trained team on cloud-native development practices.",
            impact: "35% reduction in infrastructure costs, 99.9% uptime improvement, and enhanced disaster recovery capabilities. Team became fully proficient in AWS services within 6 months.",
            leadership: "Invested in team training and certification, created internal knowledge sharing sessions, and ensured smooth transition with minimal disruption."
        }
    ];
    
    projectsGrid.innerHTML = projects.map(project => `
        <div class="card project-card fade-in">
            <div class="project-content">
                <h3>${project.title}</h3>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <p>${project.description}</p>
                <div class="project-impact">
                    <h4>Impact:</h4>
                    <p>${project.impact}</p>
                </div>
                <div class="project-impact">
                    <h4>Leadership Focus:</h4>
                    <p>${project.leadership}</p>
                </div>
            </div>
        </div>
    `).join('');
    
    // Trigger animations after content is loaded
    if (typeof Animations !== 'undefined') {
        setTimeout(() => {
            Animations.cacheElements();
            Animations.checkInitialViewport();
        }, 100);
    }
}

/**
 * Load and display education
 */
function loadEducation() {
    const educationGrid = document.getElementById('education-grid');
    if (!educationGrid) return;
    
    const education = [
        {
            title: "🎓 Current Education",
            degree: "Bachelor of Science in Software Engineering",
            institution: "Western Governors University",
            description: "Currently pursuing - Focus: Software Engineering, Data Structures, Systems Design"
        },
        {
            title: "🛡️ Cybersecurity Foundation",
            degree: "Associate of Applied Science in Cybersecurity",
            institution: "Tarrant County College",
            description: "Specialized in secure system design, vulnerability assessment, and risk management"
        },
        {
            title: "☁️ AWS Cloud Certifications",
            degree: "AWS Certified Developer, Solutions Architect & Cloud Practitioner",
            institution: "Amazon Web Services",
            description: "Cloud architecture, application development, security best practices, and cost optimization"
        },
        {
            title: "📈 Leadership & Management",
            degree: "Specialization in Leadership & Management",
            institution: "Harvard Business School Online",
            description: "Strategic thinking, organizational behavior, team dynamics, and executive leadership principles"
        },
        {
            title: "🚀 Engineering Leadership",
            degree: "Engineering Leadership for Emerging Leaders",
            institution: "MIT Professional Education",
            description: "Technical leadership, innovation management, and scaling engineering organizations"
        },
        {
            title: "👨‍🏫 Higher Education Teaching",
            degree: "Higher Education Teaching and Learning Certificate",
            institution: "Derek Bok Center, Harvard University",
            description: "Curriculum development, student mentorship, learning assessment, and inclusive teaching practices"
        },
        {
            title: "🔒 Security Certification",
            degree: "CompTIA Security+",
            institution: "CompTIA",
            description: "Cybersecurity fundamentals, risk management, and security implementation best practices"
        }
    ];
    
    educationGrid.innerHTML = education.map(item => `
        <div class="card education-card fade-in">
            <h3>${item.title}</h3>
            <div class="institution">${item.degree}</div>
            <div class="year">${item.institution}</div>
            <div class="description">${item.description}</div>
        </div>
    `).join('');
}

/**
 * Load and display testimonials
 */
function loadTestimonials() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (!testimonialsGrid) return;
    
    const testimonials = [
        {
            text: "Andre consistently puts his team first and advocates for their growth, removes blockers, and creates an environment where engineers feel trusted, heard, and supported. His approach isn't just talk—it's visible in the way his team thrives under his leadership and the trust he earns across departments.",
            author: "Cole Garien",
            role: "Senior Software Engineer"
        },
        {
            text: "I credit much of my growth as an engineer to his guidance. Andre's leadership style blends trust with support—he gives engineers true ownership of their work, yet cultivates an environment of open, proactive communication so no one feels alone when an issue arises.",
            author: "Ivan Day",
            role: "Software Engineer"
        },
        {
            text: "Andre is, above all else, a people-first leader. He builds trust not just through his words, but through his actions—leading by example, advocating for his team, and creating an environment where individuals feel seen, supported, and empowered to grow.",
            author: "Shaun McClain",
            role: "Support Engineer"
        },
        {
            text: "He creates the space for engineers to step up, own solutions, and drive impact. Andre brings clarity and focus to the process, asking thoughtful questions and offering guidance without micromanaging. He exemplifies what it means to be a people-first, impact-driven leader.",
            author: "Cole Garien",
            role: "Senior Software Engineer"
        },
        {
            text: "Over the years, Andre has helped me stretch beyond my comfort zone, navigate challenges with confidence, and recognize my own potential. He has a rare ability to balance strategic thinking with emotional intelligence—and that combination makes him a standout leader.",
            author: "Shaun McClain",
            role: "Software Engineer"
        },
        {
            text: "Andre's dedication to succeeding and helping others succeed, along with his sharp intellect, make him an excellent candidate for any position and an invaluable teammate. In spite of his heavy workload, he never shied away from helping others.",
            author: "Chris Miller",
            role: "Remote Systems Admin"
        }
    ];
    
    testimonialsGrid.innerHTML = testimonials.map(testimonial => `
        <div class="card testimonial-card fade-in">
            <div class="testimonial-text">${testimonial.text}</div>
            <div class="testimonial-author">${testimonial.author}</div>
            <div class="testimonial-role">${testimonial.role}</div>
        </div>
    `).join('');
}

/**
 * Load and display blog posts
 */
function loadBlogPosts() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return;
    
    const blogPosts = [
        {
            title: "What Management Really Is",
            date: "March 2025",
            excerpt: "Management isn't about controlling people or processes—it's about creating conditions where great work can happen. After years of leading engineering teams, I've learned that the best managers are often invisible to outside observers but invaluable to their teams.",
            content: "The core of management is removing friction. When an engineer can't access the resources they need, when requirements are unclear, when team dynamics create tension—these are management problems. My job is to identify and solve these obstacles before they impact the team's ability to deliver value. Great management is also about amplification. Every person on my team has unique strengths, perspectives, and ideas. My role is to create environments where these strengths shine and ensure good ideas can surface from anywhere in the organization."
        },
        {
            title: "Building Trust in Remote Engineering Teams",
            date: "February 2025",
            excerpt: "Trust is the foundation of high-performing teams, but building it remotely requires intentional strategies. Over the past few years managing distributed teams, I've developed specific practices that create psychological safety and foster genuine connection.",
            content: "First, consistency in communication is crucial. Regular one-on-ones, predictable team meetings, and transparent decision-making processes help team members know what to expect. Second, giving people autonomy while being available for support shows that you trust their judgment while providing a safety net. Most importantly, modeling vulnerability as a leader—admitting when you don't know something, sharing your own learning process, and acknowledging mistakes—gives permission for the team to be authentic and take calculated risks."
        },
        {
            title: "The Intersection of Security and Usability",
            date: "January 2025",
            excerpt: "Having worked extensively in cybersecurity and user-facing systems, I've seen how security and usability are often positioned as competing priorities. This is a false dichotomy that leads to poor outcomes for both security and user experience.",
            content: "The best security measures are those that users barely notice. When security friction is too high, users find workarounds that often compromise the very security we're trying to protect. The key is designing security that aligns with user behavior rather than fighting against it. This requires close collaboration between security, engineering, and UX teams from the earliest stages of product development. Security can't be an afterthought, but it also can't dominate the user experience."
        }
    ];
    
    blogGrid.innerHTML = blogPosts.map(post => `
        <div class="card blog-post fade-in">
            <h3>${post.title}</h3>
            <div class="blog-meta">Published: ${post.date}</div>
            <div class="blog-excerpt">${post.excerpt}</div>
            <div class="blog-content">${post.content}</div>
        </div>
    `).join('');
}