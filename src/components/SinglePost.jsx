import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSinglePost, fetchPosts } from "../api/blogger";
import Spinner from "./Spinner";
import { Helmet } from "@dr.pogodin/react-helmet";
import DOMPurify from "dompurify";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    fetchSinglePost(id).then(setPost);
    fetchPosts().then(data => setRelatedPosts(data.items || []));
  }, [id]);

  if (!post) return <Spinner />;

  // Sanitize and style content after post is available
  let cleanHTML = post.content;

  // Headings
  cleanHTML = cleanHTML.replace(/<h1>/g, '<h1 class="text-3xl font-bold my-4 text-gray-800 dark:text-slate-200">');
  cleanHTML = cleanHTML.replace(/<h2>/g, '<h2 class="text-2xl font-semibold my-3 text-gray-800 dark:text-slate-200">');
  cleanHTML = cleanHTML.replace(/<h3>/g, '<h3 class="text-xl font-medium my-2 text-gray-800 dark:text-slate-200">');

  // Paragraphs
  cleanHTML = cleanHTML.replace(/<p>/g, '<p class="my-2 leading-relaxed text-gray-800 dark:text-slate-200">');

  // Lists
  cleanHTML = cleanHTML.replace(/<ul>/g, '<ul class="list-disc pl-6 my-2 text-gray-800 dark:text-slate-200">');
  cleanHTML = cleanHTML.replace(/<ol>/g, '<ol class="list-decimal pl-6 my-2 text-gray-800 dark:text-slate-200">');
  cleanHTML = cleanHTML.replace(/<li>/g, '<li class="mb-1 text-gray-800 dark:text-slate-200">');

  // Links
  cleanHTML = cleanHTML.replace(/<a /g, '<a class="underline hover:text-[#534695] text-[#5c47c4] dark:text-[#c6bdff]" ');

  // Bold/Italic
  cleanHTML = cleanHTML.replace(/<strong>/g, '<strong class="font-bold text-gray-800 dark:text-slate-200">');
  cleanHTML = cleanHTML.replace(/<b>/g, '<b class="font-bold text-gray-800 dark:text-slate-200">');
  cleanHTML = cleanHTML.replace(/<em>/g, '<em class="italic text-gray-800 dark:text-slate-200">');
  cleanHTML = cleanHTML.replace(/<i>/g, '<i class="italic text-gray-800 dark:text-slate-200">');

  // Images
  cleanHTML = cleanHTML.replace(/<img /g, '<img class="my-4 rounded-md w-full max-w-screen-sm text-gray-800 dark:text-slate-200" ');

  // Blockquotes
  cleanHTML = cleanHTML.replace(/<blockquote>/g, '<blockquote class="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600">');

  // Code blocks
  cleanHTML = cleanHTML.replace(/<pre>/g, '<pre class="bg-gray-100 p-4 rounded-md overflow-x-auto my-4 text-gray-800 dark:text-slate-200">');
  cleanHTML = cleanHTML.replace(/<code>/g, '<code class="font-mono text-sm text-gray-800 dark:text-slate-200">');

  const currentIndex = relatedPosts.findIndex(p => p.id === id);
  const prevPost = relatedPosts[currentIndex - 1];
  const nextPost = relatedPosts[currentIndex + 1];

  return (
    <>
      <Helmet>
        <title>{post.title} | Legal Codes Blog</title>
        <meta name="description" content={post.description || post.content.slice(0, 150)} />
        <link rel="canonical" href={`https://www.legalcodes.in/post/${post.id}`} />
      </Helmet>

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-[#5c47c4] dark:text-[#c6bdff]">{post.title}</h1>
        <img
          src={post.images?.[0]?.url || post.content.match(/<img.*?src="(.*?)"/)?.[1] || "/default-thumbnail.jpg"}
          alt="thumbnail"
          className="w-full h-full object-cover rounded mb-2"
        />
        <div className="text-gray-600 dark:text-gray-400 mb-3">
          {new Date(post.published).toLocaleDateString()} by {post.author.displayName}
        </div>

        <div
          className="prose prose-lg dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cleanHTML) }}
        />

        {post && (
          <div className="flex items-center gap-4 my-6 p-4 rounded-lg bg-[#f2f2f2] dark:bg-[#222831] text-gray-800 dark:text-gray-200">
            <img src={post.author.image.url} className="w-16 h-16 rounded-full" alt={`Avatar of ${post.author.displayName}`} />
            <div>
              <h3 className="font-semibold">{post.author.displayName}</h3>
              <a href={post.author.url} target="_blank">View Profile</a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SinglePost;
