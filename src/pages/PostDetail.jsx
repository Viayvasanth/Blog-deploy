import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/Footer';

const API = "https://blog-uvxx.onrender.com";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);


    const fetchPostDetail = async () => {
      try {
        const res = await axios.get(`${API}/api/blogs/${id}`);
        setPost(res.data);
      } 
      catch(err) {
        console.error('Error fetching post:', err.message);
      } 
      finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchPostDetail();
  },[])

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (!post) return <p className="text-center py-8">Post not found</p>;

  console.log(post)
 
  return (
    <>
      <div className="min-h-screen dark:bg-gray-300">
        <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} />

        <main>
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
              <p className="text-gray-600 text-lg mb-4 italic">{post.excerpt}</p>
              
              <div className="flex gap-4 text-sm text-gray-500 mb-6 border-b pb-4">
                <span>By {post.author}</span>
                <span>{post.category}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>

              <img 
                src={`${API}/uploads/${post.image}`} 
                alt={post.title}
                className="w-full md:h-140 object-cover rounded mb-8"
              />

              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-lg text-gray-700 leading-relaxed mb-8">{post.content}</p>
              </div>

              {/* Examples Section */}
              {post.examples && post.examples.length > 0 && (
                <div className="mt-20">
                  <h2 className="text-3xl font-bold mb-6">Practical Examples</h2>
                  <div className="space-y-8">
                    {post.examples.map((example, idx) => (
                      <div key={idx} className="bg-gray-100 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4 text-blue-600">{example.title}</h3>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
};


  
export default PostDetail;