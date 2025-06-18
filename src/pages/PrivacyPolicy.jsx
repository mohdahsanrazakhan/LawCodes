const PrivacyPolicy = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-[#5c47c4] dark:text-[#c6bdff]">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>LawCodes.in</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>We do not collect any personal information unless you choose to contact us directly.</li>
        <li>We may store non-identifiable data like recently viewed sections or bookmarks using your browser's local storage.</li>
        <li>We use analytics tools to understand user behavior and improve the site.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
      <p className="mb-4">
        Any information collected is solely used to enhance your experience. We do not share or sell your data to third parties.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Cookies & Local Storage</h2>
      <p className="mb-4">
        We may use browser technologies like cookies or local storage to remember your history or bookmarks. This data stays on your device and is not sent to our servers.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Links</h2>
      <p className="mb-4">
        Our website may contain links to other sites. We are not responsible for their content or privacy practices.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy as needed. Changes will be posted here.
      </p>

      <p>
        For any concerns or questions, contact us at:{" "}
        <a href="mailto:support@lawcodes.in" className="text-[#5c47c4] dark:text-[#afa2ff] underline">
          support@lawcodes.in
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
