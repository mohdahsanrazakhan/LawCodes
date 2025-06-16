// import { useEffect, useState } from "react";
// import { fetchBloggerPosts } from "../api/blogger";

// const BlogPosts = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetchBloggerPosts().then(setPosts);
//   }, []);

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Latest Blog Posts</h1>
//       {posts.length === 0 ? (
//         <p>No posts found.</p>
//       ) : (
//         <div className="space-y-4">
//           {posts.map(post => (
//             <div key={post.id} className="border p-4 rounded shadow">
//               <h2 className="text-xl font-semibold">{post.title}</h2>
//               <p className="text-gray-500 text-sm">{new Date(post.published).toLocaleDateString()}</p>
//               <div dangerouslySetInnerHTML={{ __html: post.content }} />
//               <a
//                 href={post.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline mt-2 inline-block"
//               >
//                 Read more
//               </a>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogPosts;

import { useEffect, useState } from "react";
import { fetchPosts } from "../api/blogger";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [prevTokens, setPrevTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async (token = "") => {
    setLoading(true); // 🟢 Start spinner
    const data = await fetchPosts(token);
    setPosts(data.items || []);
    setNextPageToken(data.nextPageToken || "");
    if (token && !prevTokens.includes(token)) {
      setPrevTokens([...prevTokens, token]);
    }
    setLoading(false); // 🔴 Stop spinner
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // const extractThumbnail = (content) => {
  //   const match = content.match(/<img[^>]+src="([^">]+)"/);
  //   return match ? match[1] : "/default-thumbnail.jpg"; // fallback thumbnail
  // };

  const extractShortDescription = (content) => {
    if (!content) return '';

    // Remove <img> tags
    const contentWithoutImages = content.replace(/<img[^>]*>/gi, '');

    // Extract first <p>...</p> block
    const paragraphMatch = contentWithoutImages.match(/<p[^>]*>(.*?)<\/p>/is);
    const paragraphText = paragraphMatch ? paragraphMatch[1] : contentWithoutImages;

    // Remove remaining HTML tags
    const plainText = paragraphText.replace(/<[^>]+>/g, '').trim();

    // Return a shortened version
    return plainText.length > 200 ? plainText.slice(0, 150) + '...' : plainText;
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {posts.map(post => (
        <div key={post.id} className="flex sm:flex-row flex-col border rounded p-2 gap-2 sm:gap-4 bg-white hover:shadow-sm">
          <img
            src={post.images?.[0]?.url || post.content.match(/<img.*?src="(.*?)"/)?.[1] || "/default-thumbnail.jpg"}
            // src={extractThumbnail(post.content) || "/default-thumb.jpg"}
            alt="thumbnail"
            loading="lazy"
            className="sm:w-50 w-auto h-auto object-cover rounded"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 text-sm">
              {new Date(post.published).toLocaleDateString()} by {post.author?.displayName}
            </p>
            {/* <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) + "..." }}></p> */}
            <p className="text-gray-600 text-sm">
              {extractShortDescription(post.content)}
            </p>
            <button className="text-white bg-[#5c47c4] px-3 py-1 rounded sm:w-fit w-auto">
              <Link to={`/post/${post.id}`} >Read More</Link>
            </button>
          </div>
        </div>
      ))}

      <div className="flex gap-4 mt-4">
        {prevTokens.length >= 1 && (
          <button
            onClick={() => {
              const tokens = [...prevTokens];
              tokens.pop(); // remove current
              const prevToken = tokens[tokens.length - 1];
              setPrevTokens(tokens);
              loadPosts(prevToken);
            }}
            className="px-4 py-2 border rounded"
          >
            Previous
          </button>
        )}
        {nextPageToken && (
          <button onClick={() => loadPosts(nextPageToken)} className="px-4 py-2 border rounded">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogPosts;
