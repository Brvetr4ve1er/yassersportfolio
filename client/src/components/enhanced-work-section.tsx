import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Star, GitFork, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Card3D from "@/components/card-3d";
import type { Project } from "@shared/schema";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

interface BehanceProject {
  id: number;
  name: string;
  description: string;
  url: string;
  covers: {
    '404': string;
  };
  stats: {
    views: number;
    appreciations: number;
  };
  fields: string[];
}

// Optimized GitHub API service with better error handling and caching
const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  try {
    // Using a third-party service that doesn't require authentication
    const response = await fetch('https://gh-pinned-repos-5l2i19um3.vercel.app/?username=hamisseyasser', {
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    if (!response.ok) {
      // Fallback to regular repos if pinned repos service fails
      const fallbackResponse = await fetch('https://api.github.com/users/hamisseyasser/repos?sort=updated&per_page=6', {
        signal: AbortSignal.timeout(5000)
      });
      if (!fallbackResponse.ok) throw new Error('Failed to fetch repos');
      return fallbackResponse.json();
    }
    return response.json();
  } catch (error) {
    console.warn('GitHub API failed:', error);
    return [];
  }
};

// Mock Behance data since API is deprecated - Replace with RSS parsing in production
const mockBehanceProjects: BehanceProject[] = [
  {
    id: 1,
    name: "Digital Art Portfolio",
    description: "A collection of my latest digital artwork and concept designs",
    url: "https://br4vetraveler.exe/behance.com",
    covers: {
      '404': "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    stats: {
      views: 2500,
      appreciations: 184
    },
    fields: ["Digital Art", "Concept Art", "NFT Design"]
  },
  {
    id: 2,
    name: "Brand Identity Design",
    description: "Modern branding solutions for international clients",
    url: "https://br4vetraveler.exe/behance.com",
    covers: {
      '404': "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    stats: {
      views: 1800,
      appreciations: 152
    },
    fields: ["Branding", "Logo Design", "Visual Identity"]
  },
  {
    id: 3,
    name: "Social Media Campaign",
    description: "Creative content for student outreach and engagement",
    url: "https://br4vetraveler.exe/behance.com",
    covers: {
      '404': "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    stats: {
      views: 3200,
      appreciations: 267
    },
    fields: ["Social Media", "Campaign Design", "Education"]
  }
];

export default function EnhancedWorkSection() {
  const { data: portfolioProjects, isLoading: portfolioLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });

  const { data: githubRepos, isLoading: githubLoading } = useQuery<GitHubRepo[]>({
    queryKey: ["github-repos"],
    queryFn: fetchGitHubRepos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes cache
    retry: 2,
    retryDelay: 1000,
  });

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  if (portfolioLoading || githubLoading) {
    return (
      <section id="work" className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-4">
              Featured Work
            </h2>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto">
              Loading projects...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-brand-surface"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-brand-surface rounded mb-2"></div>
                  <div className="h-6 bg-brand-surface rounded mb-2"></div>
                  <div className="h-16 bg-brand-surface rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-brand-primary mb-6 tracking-tight">
            Featured Work
          </h2>
          <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed">
            A selection of projects showcasing my expertise in design, development, and creative problem-solving
          </p>
        </div>

        {/* Portfolio Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-black text-brand-primary mb-8 text-center tracking-tight">
            Portfolio Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {portfolioProjects?.map((project) => (
              <Card3D key={project.id} intensity={0.5}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full bg-brand-surface border-brand-accent/20">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                          {project.category}
                        </span>
                        <div className="flex space-x-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-secondary hover:text-brand-accent transition-colors duration-200"
                              aria-label="View live project"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-secondary hover:text-brand-accent transition-colors duration-200"
                              aria-label="View GitHub repository"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-brand-primary mb-2 tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-brand-secondary text-sm mb-4">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-brand-bg-secondary text-brand-secondary rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-brand-bg-secondary text-brand-secondary rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Card3D>
            ))}
          </div>
        </div>

        {/* GitHub Repositories */}
        {githubRepos && githubRepos.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-black text-brand-primary mb-8 text-center tracking-tight">
              GitHub Repositories
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {githubRepos.slice(0, 6).map((repo) => (
                <Card3D key={repo.id} intensity={0.5}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full bg-brand-surface border-brand-accent/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Github className="h-5 w-5 text-brand-accent" />
                          <span className="text-xs font-medium px-2 py-1 bg-brand-accent/10 text-brand-accent rounded-full">
                            {repo.language || 'Code'}
                          </span>
                        </div>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-secondary hover:text-brand-accent transition-colors duration-200"
                          aria-label={`View ${repo.name} on GitHub`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      
                      <h3 className="text-xl font-black text-brand-primary mb-2 tracking-tight">
                        {repo.name}
                      </h3>
                      
                      <p className="text-brand-secondary text-sm mb-4 line-clamp-3">
                        {repo.description || 'No description available'}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-xs text-brand-secondary">{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="h-4 w-4 text-brand-secondary" />
                          <span className="text-xs text-brand-secondary">{repo.forks_count}</span>
                        </div>
                      </div>
                      
                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {repo.topics.slice(0, 3).map((topic, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-brand-bg-secondary text-brand-secondary rounded"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Card3D>
              ))}
            </div>
          </div>
        )}

        {/* Behance Projects */}
        <div>
          <h3 className="text-2xl font-black text-brand-primary mb-8 text-center tracking-tight">
            Design Portfolio
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mockBehanceProjects.map((project) => (
              <Card3D key={project.id} intensity={0.5}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full bg-brand-surface border-brand-accent/20">
                  <img
                    src={project.covers['404']}
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                        Behance
                      </span>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-secondary hover:text-brand-accent transition-colors duration-200"
                        aria-label={`View ${project.name} on Behance`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    
                    <h3 className="text-xl font-black text-brand-primary mb-2 tracking-tight">
                      {project.name}
                    </h3>
                    
                    <p className="text-brand-secondary text-sm mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-brand-secondary" />
                        <span className="text-xs text-brand-secondary">{formatNumber(project.stats.views)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-pink-400">♥</span>
                        <span className="text-xs text-brand-secondary">{project.stats.appreciations}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.fields.slice(0, 3).map((field, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-brand-bg-secondary text-brand-secondary rounded"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Card3D>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-brand-secondary mb-8">
            Want to see more of my work?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/hamisseyasser"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-brand-accent text-brand-accent rounded-lg hover:bg-brand-accent hover:text-brand-bg transition-all duration-200 font-medium"
            >
              <Github className="mr-2 h-5 w-5" />
              View GitHub Profile
            </a>
            <a
              href="https://br4vetraveler.exe/behance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-brand-accent text-brand-bg rounded-lg hover:bg-brand-accent/80 transition-all duration-200 font-medium"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              View Design Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}