import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';

const BlogPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  // This would typically come from an API or CMS
  const blogPost = {
    id: 'industrial-automation-trends-2024',
    title: 'Industrial Automation Trends in 2024',
    content: `
      <h2>The Evolution of Industrial Automation</h2>
      <p>As we move further into 2024, the industrial automation landscape continues to evolve at an unprecedented pace. The integration of artificial intelligence and machine learning has revolutionized how manufacturing facilities operate, leading to increased efficiency and reduced downtime.</p>
      
      <h3>Key Trends Shaping the Industry</h3>
      <ul>
        <li>Artificial Intelligence and Machine Learning Integration</li>
        <li>Industrial Internet of Things (IIoT) Adoption</li>
        <li>Collaborative Robots (Cobots)</li>
        <li>Edge Computing in Manufacturing</li>
        <li>Predictive Maintenance Solutions</li>
      </ul>

      <h3>The Role of AI in Modern Manufacturing</h3>
      <p>Artificial Intelligence is no longer just a buzzword in manufacturing. It's becoming an integral part of operations, from quality control to process optimization. AI-powered systems can now predict equipment failures before they occur, optimize production schedules in real-time, and ensure consistent product quality.</p>

      <h3>IIoT and Connected Manufacturing</h3>
      <p>The Industrial Internet of Things (IIoT) continues to be a driving force in manufacturing innovation. Connected devices and sensors provide real-time data that helps optimize operations, reduce waste, and improve overall equipment effectiveness (OEE).</p>
    `,
    author: 'John Smith',
    date: 'March 15, 2024',
    category: 'Automation',
    image: '/images/blog/automation-trends.jpg',
    tags: ['Automation', 'Industry 4.0', 'AI', 'IoT'],
    authorImage: '/images/team/john-smith.jpg',
    authorRole: 'Senior Automation Engineer'
  };

  const relatedPosts = [
    {
      id: 'predictive-maintenance-guide',
      title: 'A Guide to Predictive Maintenance',
      excerpt: 'Understanding predictive maintenance and its role in modern industrial operations.',
      image: '/images/blog/predictive-maintenance.jpg'
    },
    {
      id: 'electrical-system-optimization',
      title: 'Optimizing Industrial Electrical Systems',
      excerpt: 'Best practices for optimizing electrical systems in industrial facilities for maximum efficiency.',
      image: '/images/blog/electrical-systems.jpg'
    }
  ];

  React.useEffect(() => {
    document.title = `${blogPost.title} | Delta Elmech Systems Blog`;
  }, [blogPost.title]);

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <button
            onClick={() => navigate('/blogs')}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Link 
                to="/blogs"
                className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Blog
              </Link>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-[400px] object-cover"
                />
                
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {blogPost.date}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {blogPost.author}
                    </div>
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {blogPost.category}
                    </div>
                  </div>

                  <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    {blogPost.title}
                  </h1>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {blogPost.tags.map(tag => (
                      <span 
                        key={tag}
                        className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: blogPost.content }}
                  />

                  {/* Share Section */}
                  <div className="border-t border-gray-200 mt-12 pt-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={blogPost.authorImage}
                          alt={blogPost.author}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{blogPost.author}</h3>
                          <p className="text-gray-600 text-sm">{blogPost.authorRole}</p>
                        </div>
                      </div>
                      <button className="flex items-center text-gray-600 hover:text-blue-600">
                        <Share2 className="w-5 h-5 mr-2" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedPosts.map(post => (
                    <Link 
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="aspect-w-16 aspect-h-9">
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600">{post.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default BlogPostPage; 