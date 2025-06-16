const About = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-[#5c47c4]">About LawCodes.in</h1>

      <p className="mb-4">
        <strong>LawCodes.in</strong> is a user-friendly platform created to make Indian legal codes like the IPC, CrPC, and IEA easily accessible to everyone — from students and legal professionals to curious citizens.
      </p>

      <p className="mb-4">
        Our mission is to simplify and modernize the way people search, read, and understand Indian laws. With a fast search engine, intuitive interface, and useful tools like history tracking and bookmarks, we aim to be your go-to legal reference.
      </p>

      <p className="mb-4">
        Whether you're preparing for exams, researching a case, or simply trying to understand your rights, <strong>LawCodes.in</strong> gives you instant access to reliable legal information at your fingertips.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-[#5c47c4]">What We Offer</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Search across IPC, CrPC, and IEA sections instantly</li>
        <li>Bookmark important sections for later reading</li>
        <li>Access your recently viewed sections anytime</li>
        <li>Clean, distraction-free reading experience</li>
        <li>Mobile-friendly and fast loading interface</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-[#5c47c4]">Built With ❤️ for India</h2>

      <p className="mb-2">
        If you have suggestions, spot an error, or just want to say hello — reach out to us at: <a href="mailto:support@lawcodes.in" className="text-blue-600 underline">support@lawcodes.in</a>
      </p>
    </div>
  );
};

export default About;
