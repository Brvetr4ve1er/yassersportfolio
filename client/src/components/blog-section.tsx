import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@shared/schema";

export default function BlogSection() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/featured"],
  });

  if (isLoading) {
    return (
      <section id="blog" className="py-20 bg-brand-bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-4">
              Latest Thoughts
            </h2>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto">
              Loading blog posts...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
                  <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section id="blog" className="py-20 bg-brand-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-4">
            Latest Thoughts
          </h2>
          <p className="text-xl text-brand-secondary max-w-3xl mx-auto">
            Insights and learnings from my journey in design and development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <article
              key={post.id}
              className="bg-slate-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full mr-3 ${
                      post.category === "Design"
                        ? "bg-brand-accent/10 text-brand-accent"
                        : post.category === "Development"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-brand-secondary text-sm">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-3 hover:text-brand-accent transition-colors duration-200">
                  <a href="#" className="block">
                    {post.title}
                  </a>
                </h3>
                <p className="text-brand-secondary text-sm mb-4">
                  {post.excerpt}
                </p>
                <a
                  href="#"
                  className="text-brand-accent font-medium text-sm hover:underline"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 border-2 border-brand-secondary text-brand-secondary rounded-lg hover:border-brand-accent hover:text-brand-accent transition-colors duration-200 font-medium">
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
