import axios from "axios";

const apiKey = import.meta.env.VITE_BLOGGER_API_PROD_KEY;
const blogId = import.meta.env.VITE_BLOGGER_BLOG_ID;

const baseURL = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`;

export const fetchPosts = async (pageToken = "") => {
  try {
    const { data } = await axios.get(baseURL, {
      params: {
        key: apiKey,
        maxResults: 3,
        ...(pageToken && { pageToken }),
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

export const fetchSinglePost = async (postId) => {
  try {
    const { data } = await axios.get(`${baseURL}/${postId}`, {
      params: {
        key: apiKey,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching single post:", error);
    return null;
  }
};
