import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSinglePost, fetchPosts } from "../api/blogger";
import Spinner from "./Spinner";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    fetchSinglePost(id).then(setPost);
    fetchPosts().then(data => setRelatedPosts(data.items || []));
  }, [id]);

  const currentIndex = relatedPosts.findIndex(p => p.id === id);
  const prevPost = relatedPosts[currentIndex - 1];
  const nextPost = relatedPosts[currentIndex + 1];

  if (!post) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 text-[#5c47c4] dark:text-[#c6bdff]">{post.title}</h1>
      <img
        src={post.images?.[0]?.url || post.content.match(/<img.*?src="(.*?)"/)?.[1] || "/default-thumbnail.jpg"}
        alt="thumbnail"
        className="w-full h-64 object-cover rounded mb-4"
      />
      <div className="text-gray-600 dark:text-gray-400 mb-6">
        {new Date(post.published).toLocaleDateString()} by {post.author.displayName}
      </div>
      <div className="text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* <div className="mt-8 flex justify-between text-blue-600">
        {prevPost && <Link to={`/post/${prevPost.id}`}>← {prevPost.title}</Link>}
        {nextPost && <Link to={`/post/${nextPost.id}`}>{nextPost.title} →</Link>}
      </div> */}

      {post && (
        <div className="flex items-center gap-4 my-6 p-4 rounded-lg bg-[#f2f2f2] dark:bg-[#222831] text-gray-800 dark:text-gray-200">
          <img src={post.author.image.url} className="w-16 h-16 rounded-full" alt={`Avatar of ${post.author.displayName}`} />
          <div>
            <h3 className="font-semibold">{post.author.displayName}</h3>
            <a href={post.author.url} target="_blank">View Profile</a>
          </div>
        </div>
      )}
      {/* <h4>Related Posts by Author</h4>
      {relatedPosts.filter(p => p.author.id === post.author.id && p.id !== post.id)
        .map(p => <Link to={`/post/${p.id}`}>{p.title}</Link>)} */}


      {/* <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        <p className="text-sm text-gray-500">Blogger API doesn't support comment reading directly without OAuth. Use Disqus or Facebook plugin instead.</p>
      </div> */}
    </div>
  );
};

export default SinglePost;
