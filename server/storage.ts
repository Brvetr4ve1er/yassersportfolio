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
        title: "Artiland Studio Social Media Campaign",
        description: "Designed and created attention-grabbing social media content for student outreach, practicing audience-specific communication and visual teaching.",
        category: "Social Media Design",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Adobe Photoshop", "Adobe Illustrator", "Social Media Marketing"],
        liveUrl: null,
        githubUrl: null,
        featured: true
      },
      {
        title: "Digital Art & NFT Trading Portfolio",
        description: "Built and managed online businesses in crypto/NFT space, created and sold digital artworks, achieving 11 ETH (~$34,000) in earnings from initial $800 investment.",
        category: "Digital Art & Crypto",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Digital Art", "Blockchain", "NFT Trading", "Concept Art"],
        liveUrl: "https://br4vetraveler.exe/behance.com",
        githubUrl: null,
        featured: true
      },
      {
        title: "Chess Club Coordination & Training",
        description: "Facilitated peer learning, logic training, and inclusive competition. Led workshops teaching students to use design software and break language barriers.",
        category: "Education & Training",
        image: "https://images.unsplash.com/photo-1560439514-e960a3ef5019?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Teaching", "Leadership", "Chess Strategy", "Educational Design"],
        liveUrl: null,
        githubUrl: null,
        featured: true
      }
    ];

    // Sample blog posts
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "How Language Can Transform Your Worldview",
        excerpt: "I believe language can change a person's way of thinking and allow them to reframe their character through multiple cultural lenses, opening them up for a universe of opportunity beyond their isolated town.",
        content: "Full article content about multilingual communication and cultural exchange...",
        category: "Language & Culture",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        publishedAt: new Date("2024-11-15"),
        featured: true
      },
      {
        title: "From Zelda to Education: My Creative Journey",
        excerpt: "My journey began with video games like The Legend of Zelda: Ocarina of Time, where I discovered the magic of language and design to evoke emotion...",
        content: "Full article about the intersection of gaming, storytelling, and education...",
        category: "Personal Journey",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        publishedAt: new Date("2024-10-20"),
        featured: true
      },
      {
        title: "Building Cross-Cultural Communication Skills",
        excerpt: "Exploring cultures through language and leveraging digital tools to break language barriers in educational environments...",
        content: "Full article about cross-cultural communication strategies...",
        category: "Education",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        publishedAt: new Date("2024-09-10"),
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
    const project: Project = { 
      ...insertProject, 
      id,
      liveUrl: insertProject.liveUrl || null,
      githubUrl: insertProject.githubUrl || null,
      featured: insertProject.featured || false
    };
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
    const blogPost: BlogPost = { 
      ...insertBlogPost, 
      id,
      featured: insertBlogPost.featured || false
    };
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
