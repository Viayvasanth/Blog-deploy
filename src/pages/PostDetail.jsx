import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/Footer';
import { BsFillPersonFill } from "react-icons/bs";
import { BiLoaderCircle } from "react-icons/bi";
import { BiSolidStar } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import toast  from 'react-hot-toast'



const API = "https://blog-uvxx.onrender.com";

// const API = "http://localhost:4000"


// 

function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showform,setshowform]=useState(false);
  const [comments,setComments]=useState([])
  const [formData,setformData]= useState({
      name:"",
      description:"",
      rating:5
    })
  
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    setshowform(true)
    postcomment() 
  }


  const handleChange = (e)=>{
    const {name,value} = e.target;
    setformData(prev => ({...prev, [name] : name === 'rating' ? parseInt(value) : value }));
  };

    // get post
    const fetchPostDetail = async () => {
      try {
        const res = await axios.get(`${API}/api/blogs/${slug}`);
        setPost(res.data);
      } 
      catch(err) {
        console.error('Error fetching post:', err.message);
      } 
      finally {
        setLoading(false);
      }
    };

      //post comment
      const postcomment = async()=>{

      console.log('formData being sent:', formData);

      try{
        const response = await axios.post(`${API}/api/blogs/${slug}/comments`,formData)
        if (response.status === 201) {
          setPost(response.data.post);
          setformData({ name: '', description: '', rating: '' });      
        console.log("response",response.data)   
      }
    }
      catch(err){
        console.error('Backend error:', err.response?.data)
      }

      finally {
        setLoading(false);
      }
    };

    //delete comments by commentId
    const deleteComment = async (commentId) => {
      try {
        const response = await axios.delete(`${API}/api/blogs/${slug}/comments/${commentId}`);
        setPost(response.data.post);
        toast.success('Comment deleted successfully', {
          duration: 5000,
        });
      } catch (error) {
        console.error('Error:', error.message);
        toast.error(error.response?.data?.message || 'Error deleting comment', {
          duration: 4000
        });      
      }
    };

  useEffect(() => {
    fetchPostDetail();
  },[slug])



  if (loading) return <p className=" flex justify-center items-center py-8 text-4xl"><BiLoaderCircle /></p>;
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

              <h1 className=' text-3xl font-bold mb-2'>Comments</h1>
              <form  className = "flex flex-col gap-1 mb-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name} 
                  onChange={handleChange}
                  required
                  className='border'
                />
                <textarea
                  name="description"
                  placeholder="Your comment"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className='border'
                />
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className='border'
                >
                  <option value =" ">select</option>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Very Poor</option>
                </select>
                <button  className=" text-xl p-1 rounded text-white bg-green-500" type="submit" > Add Comment
                  {/* {loading ? 'Adding...' : 'Add Comment'} */}
                </button>
              </form>

              
              {post?.comments.map((comment)=>(
                <div className='mb-2' key={comment._id}>
                  <div className='flex gap-3'>
                  <p className='text-2xl'><BsFillPersonFill /></p>
                  <p>
                  <strong>{comment.name}</strong></p>
                  <span className='flex justify-center items-center text-yellow-700'>
                    {[...Array(comment.rating)].map((_, i) => (
                      <BiSolidStar key={i} />
                    ))}
                  </span>
               
                  <span className='text-gray-700 italic'>{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p>{comment.description} &nbsp;
                  <button  className=" text-xl p-0.5 rounded cursor-pointer bg-red-500 text-white" onClick={()=>deleteComment(comment._id)}><MdOutlineDelete />
                  </button> </p>                         
                </div>

              ))}
              
          

            </div>
          </div>
        </main>


        <Footer />
      </div>
    </>
  )
};


  
export default PostDetail;