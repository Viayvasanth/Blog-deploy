import { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/Footer';

function PostList() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);


  // const API = "https://blog-uvxx.onrender.com";

  const API = "http://localhost:4000";


  const limit = 3;


   // Fetch from your database
   useEffect(() => {
    fetchpost(page);
  }, [page]);

  const fetchpost = async (page) => {
    try {
      const res = await axios.get(`${API}/api/blogs?page=${page}&limit=${limit}`);
      console.log('API Response:', res.data);
      setPosts(res.data.data);
      setPagination(res.data.pagination);
    } catch(err) {
      console.error('API Error:', err.message);
    }
  };
  

 

  const tabs = ['posts', 'about', 'contact'];

  return (
    <>
       <div className="min-h-screen dark:bg-gray-300 ">

      <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tabs={tabs}
      /> 

        {/* Main content */}
         <main>
        <div className="container mx-auto px-4 py-8">
          {activeTab === 'posts' && (
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-8">Latest Post</h1>
              {/* <h1>{slug}</h1> */}

              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.slug} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-2/4">
                        <img className=" mb-2 w-full h-48 md:h-full object-cover "
                          src={`${API}/uploads/${post.image}`}
                        />
                      </div>
                      <div className="p-6 md:w-3/4">
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <p className=''>{post.content.substr(0,50)}...</p>
                        <p className="text-gray-600 mb-4">{post.excerpt}...</p>
                        <Link to={`/blogs/${post.slug}`}                 
                          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              
            {/* Pagination controls */}
            <div className='flex mt-10 gap-4 justify-around items-center'>
              <button className='border-none rounded bg-red-600 p-2 cursor-pointer text-white'
                disabled={page === 1}
                onClick={() => setPage(page - 1)}>
                Previous
              </button>

              <span className='border-none rounded bg-orange-500 p-2 text-white'>
                Page {pagination?.currentPage} of {pagination?.totalPages}
              </span>

              <button className='border-none rounded bg-green-700 p-2 cursor-pointer text-white'
                disabled={!pagination?.hasNextPage}
                onClick={() => setPage(page + 1)}>
                Next
              </button>
            </div>
            </div>
          )}

          

          {activeTab === 'about' && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">About</h2>
              <p className="text-gray-700">Tell your story here.</p>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Contact</h2>
              <p className="text-gray-700">Your contact information goes here.</p>
            </div>
          )}
        </div>
        </main>


          <Footer/>

       
      </div>
       

    
    </>
  );
}

export default PostList;