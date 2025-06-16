import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchLaw from "./components/SearchLaw";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar";
import History from "./pages/History";
import Bookmark from "./pages/Bookmark";
import BlogPosts from "./pages/BlogPosts";
import SinglePost from "./components/SinglePost";
import Footer from "./components/Footer";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

function App() {
  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="pt-16 flex-1">
      <Routes>
        <Route path="/" element={<SearchLaw />} />
        <Route path="/:source/:section" element={<Detail />} />
        <Route path="/history/:source/:section" element={<Detail />} />
        <Route path="/bookmarks/:source/:section" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/bookmarks" element={<Bookmark />} />
        <Route path="/blog" element={<BlogPosts />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
      </main>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
