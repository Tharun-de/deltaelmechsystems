import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';

const BlogsPage = () => {
  const blogPosts = [
    {
      id: 'industrial-automation-trends-2024',
      title: 'Industrial Automation Trends in 2024',
      excerpt: 'Explore the latest trends shaping the future of industrial automation, from AI integration to smart manufacturing.',
      author: 'John Smith',
      date: 'March 15, 2024',
      category: 'Automation',
      image: '/images/blog/automation-trends.jpg',
      tags: ['Automation', 'Industry 4.0', 'AI', 'IoT']
    },
    {
      id: 'sustainable-manufacturing-practices',
      title: 'Sustainable Manufacturing Practices',
      excerpt: 'Learn how modern manufacturing facilities are adopting sustainable practices to reduce environmental impact.',
      author: 'Sarah Johnson',
      date: 'March 10, 2024',
      category: 'Sustainability',
      image: '/images/blog/sustainable-manufacturing.jpg',
      tags: ['Sustainability', 'Manufacturing', 'Green Energy']
    },
    {
      id: 'electrical-system-optimization',
      title: 'Optimizing Industrial Electrical Systems',
      excerpt: 'Best practices for optimizing electrical systems in industrial facilities for maximum efficiency.',
      author: 'Michael Brown',
      date: 'March 5, 2024',
      category: 'Electrical',
      image: '/images/blog/electrical-systems.jpg',
      tags: ['Electrical', 'Energy Efficiency', 'Industrial']
    },
    {
      id: 'predictive-maintenance-guide',
      title: 'A Guide to Predictive Maintenance',
      excerpt: 'Understanding predictive maintenance and its role in modern industrial operations.',
      author: 'Emily Davis',
      date: 'March 1, 2024',
      category: 'Maintenance',
      image: '/images/blog/predictive-maintenance.jpg',
      tags: ['Maintenance', 'Industry 4.0', 'IoT']
    }
  ];

  // SEO Meta Tags are typically handled by a helmet component or similar
  React.useEffect(() => {
    document.title = 'Industrial Engineering Insights | Delta Elmech Systems Blog';
    // Additional meta tags would be managed by a proper SEO component
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-blue-900 text-white pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Industrial Engineering Insights</h1>
              <p className="text-xl text-blue-100">
                Stay updated with the latest trends, insights, and best practices in industrial engineering.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {blogPosts.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.1}>
                  <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="aspect-w-16 aspect-h-9">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 mr-1" />
                          {post.category}
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        <Link to={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link 
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700"
                      >
                        Read More <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Subscribe to Our Newsletter</h2>
                <p className="text-gray-600 mb-8">
                  Get the latest industrial engineering insights delivered to your inbox.
                </p>
                <form className="max-w-md mx-auto">
                  <div className="flex gap-4">
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default BlogsPage; 