const TermsAndConditions = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-[#5c47c4]">Terms & Conditions</h1>

      <p className="mb-4">
        By using <strong>LawCodes.in</strong>, you agree to the following terms and conditions. If you do not agree, please do not use this website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Content</h2>
      <p className="mb-4">
        The content provided on this site, including legal texts from IPC, CrPC, IEA and others, is for informational and educational purposes only. It is not a substitute for legal advice from a qualified professional.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Intellectual Property</h2>
      <p className="mb-4">
        All content, design, and branding on this site are the property of LawCodes.in and may not be reproduced or distributed without permission.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. User Responsibilities</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>You agree not to misuse, alter, or damage the website.</li>
        <li>You agree not to use the content for unlawful purposes.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
      <p className="mb-4">
        We do our best to keep the content accurate, but we make no warranties. We are not responsible for any legal consequences resulting from use of this site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
      <p className="mb-4">
        We may update these terms at any time. Continued use of the site means you accept the changes.
      </p>

      <p>
        Questions? Contact us at:{" "}
        <a href="mailto:support@lawcodes.in" className="text-blue-600 underline">
          support@lawcodes.in
        </a>
      </p>
    </div>
  );
};

export default TermsAndConditions;
