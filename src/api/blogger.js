// export const fetchBloggerPosts = async () => {
//   const apiKey = import.meta.env.VITE_BLOGGER_API_PROD_KEY;
//   const blogId = import.meta.env.VITE_BLOGGER_BLOG_ID;

//   const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) throw new Error('Failed to fetch posts');

//     const data = await response.json();
//     return data.items || [];
//   } catch (error) {
//     console.error('Error fetching blog posts:', error);
//     return [];
//   }
// };

const apiKey = import.meta.env.VITE_BLOGGER_API_PROD_KEY;
const blogId = import.meta.env.VITE_BLOGGER_BLOG_ID;

const baseURL = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`;

export const fetchPosts = async (pageToken = "") => {
  const url = `${baseURL}?key=${apiKey}&maxResults=3${pageToken ? `&pageToken=${pageToken}` : ""}`;
  const res = await fetch(url);
  return res.json();
};

export const fetchSinglePost = async (postId) => {
  const url = `${baseURL}/${postId}?key=${apiKey}`;
  const res = await fetch(url);
  return res.json();
};
