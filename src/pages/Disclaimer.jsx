const Disclaimer = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-[#5c47c4] dark:text-[#c6bdff]">Disclaimer</h1>

      <p className="mb-4 text-gray-600 dark:text-gray-500">Effective Date: <strong>{new Date().toLocaleDateString()}</strong></p>

      <p className="mb-4">
        Welcome to <strong>LawCodes</strong> (https://www.lawcodes.com). By using this website, you agree to the terms of this Disclaimer.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">📌 General Information Only</h2>
      <p className="mb-4">
        The information provided on <strong>LawCodes</strong> is for <strong>general informational and educational purposes only</strong>. All content, including text, graphics, questions, answers, and other material, is intended for awareness and reference — <strong>not as legal advice</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">⚠️ Not Legal Advice</h2>
      <p className="mb-4">
        LawCodes is <strong>not a law firm</strong>, and our content does <strong>not create an attorney-client relationship</strong>. If you need legal advice for your specific situation, please consult with a <strong>qualified legal professional</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🔍 Accuracy of Information</h2>
      <p className="mb-4">
        While we strive to keep our content accurate and updated, we do not guarantee the completeness, reliability, or correctness of any information. Legal statutes and interpretations may change over time.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🛡️ Limitation of Liability</h2>
      <p className="mb-4">
        Under no circumstances shall <strong>LawCodes</strong>, its creators, contributors, or partners be held liable for any loss, injury, claim, or damages arising from your use of or reliance on the information provided.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">📎 External Links</h2>
      <p className="mb-4">
        Our website may contain links to external websites for additional resources. We are not responsible for the content or practices of these third-party sites.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🤝 User Responsibility</h2>
      <p className="mb-4">
        Users are solely responsible for how they use the content on LawCodes. Actions taken based on this site’s information are at your own risk.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">✉️ Contact Us</h2>
      <p className="mb-4">
        If you have any questions regarding this disclaimer, feel free to contact us at <a href="mailto:support@lawcodes.com" className="text-[#5c47c4] dark:text-[#afa2ff] underline">support@lawcodes.com</a>.
      </p>

      <p className="mt-6 italic text-sm text-gray-600 dark:text-gray-400">
        We recommend verifying legal information with official sources or consulting legal professionals directly.
      </p>
    </div>
  );
};

export default Disclaimer;
