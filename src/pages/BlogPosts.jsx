import { useEffect, useState } from "react";
import { fetchPosts } from "../api/blogger";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import NotFound from "../components/NotFound";
import { Helmet } from "@dr.pogodin/react-helmet";

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
    <>
      {/* SEO */}
      <Helmet>
        <title>Legal Blog | Legal Codes</title>
        <meta name="description" content="Stay updated with the latest blog posts about Indian laws, legal updates, and how-to guides on LegalCodes.in." />
        <link rel="canonical" href="https://www.legalcodes.in/blog" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {!posts || posts.length === 0 ? (
          <NotFound page="blogs" />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#5c47c4] dark:text-[#c6bdff]">Blogs</h2>
            {posts.map(post => (
              <div key={post.id} className="flex sm:flex-row flex-col border rounded p-2 gap-2 sm:gap-4 bg-slate-50 dark:bg-[#222831] hover:shadow-sm">
                <img
                  src={post.images?.[0]?.url || post.content.match(/<img.*?src="(.*?)"/)?.[1] || "/default-thumbnail.jpg"}
                  // src={extractThumbnail(post.content) || "/default-thumb.jpg"}
                  alt="thumbnail"
                  loading="lazy"
                  className="sm:w-50 w-auto h-auto object-cover rounded"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-[#c6bdff]">{post.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {new Date(post.published).toLocaleDateString()} by {post.author?.displayName}
                  </p>
                  {/* <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) + "..." }}></p> */}
                  <p className="text-gray-600 dark:text-gray-200 text-sm">
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
                  className="px-4 py-2 border rounded text-gray-800 dark:text-gray-200"
                >
                  Previous
                </button>
              )}
              {nextPageToken && (
                <button onClick={() => loadPosts(nextPageToken)} className="px-4 py-2 border rounded text-gray-800 dark:text-gray-200">
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BlogPosts;
