import { 
  projects, 
  blogPosts, 
  contactSubmissions,
  type Project, 
  type BlogPost, 
  type ContactSubmission,
  type InsertProject, 
  type InsertBlogPost, 
  type InsertContactSubmission 
} from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getFeaturedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private blogPosts: Map<number, BlogPost>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentProjectId: number;
  private currentBlogPostId: number;
  private currentContactId: number;

  constructor() {
    this.projects = new Map();
    this.blogPosts = new Map();
    this.contactSubmissions = new Map();
    this.currentProjectId = 1;
    this.currentBlogPostId = 1;
    this.currentContactId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample projects
    const sampleProjects: InsertProject[] = [
      {
        title: "ShopAnalytics Pro",
        description: "A comprehensive analytics dashboard for e-commerce platforms with real-time insights and predictive analytics.",
        category: "E-commerce",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["React", "TypeScript", "D3.js"],
        liveUrl: "https://demo.shopanalytics.com",
        githubUrl: "https://github.com/alexmorgan/shopanalytics",
        featured: true
      },
      {
        title: "FitTracker Mobile",
        description: "A beautiful, intuitive fitness tracking app with social features and personalized workout recommendations.",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["React Native", "Figma", "Firebase"],
        liveUrl: "https://fittracker.app",
        githubUrl: "https://github.com/alexmorgan/fittracker",
        featured: true
      },
      {
        title: "PayFlow Platform",
        description: "A modern payment processing platform with advanced security features and seamless integration capabilities.",
        category: "FinTech",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Next.js", "Tailwind", "Stripe"],
        liveUrl: "https://payflow.platform",
        githubUrl: "https://github.com/alexmorgan/payflow",
        featured: true
      }
    ];

    // Sample blog posts
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "The Future of Design Systems: Beyond Components",
        excerpt: "Exploring how design systems are evolving beyond simple component libraries to become comprehensive design languages...",
        content: "Full article content here...",
        category: "Design",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        publishedAt: new Date("2023-12-15"),
        featured: true
      },
      {
        title: "Building Accessible React Components from Scratch",
        excerpt: "A comprehensive guide to creating React components that work for everyone, with practical examples and testing strategies...",
        content: "Full article content here...",
        category: "Development",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        publishedAt: new Date("2023-12-08"),
        featured: true
      },
      {
        title: "Remote User Testing: Tools and Best Practices for 2024",
        excerpt: "How remote work has changed user research and the new tools that are making remote testing more effective than ever...",
        content: "Full article content here...",
        category: "UX Research",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        publishedAt: new Date("2023-11-30"),
        featured: true
      }
    ];

    // Initialize projects
    sampleProjects.forEach(project => {
      this.createProject(project);
    });

    // Initialize blog posts
    sampleBlogPosts.forEach(post => {
      this.createBlogPost(post);
    });
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.featured);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.featured)
      .sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = { ...insertBlogPost, id };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id, 
      submittedAt: new Date() 
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
