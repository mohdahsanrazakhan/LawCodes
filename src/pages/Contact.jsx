import { Helmet } from "@dr.pogodin/react-helmet";

const Contact = () => {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Contact Us | Legal Codes</title>
        <meta name="description" content="Reach out to the LegalCodes team for inquiries, support, or feedback." />
        <link rel="canonical" href="https://www.legalcodes.in/contact-us" />
      </Helmet>

      <div className="min-h-screen py-16 px-4 text-textLight dark:text-textDark">
        {/* Contact Info */}
        <p className="text-center mb-2 text-gray-600 dark:text-gray-300 bg-[#f9f9f9] dark:bg-gray-800 border dark:border-slate-600 max-w-2xl mx-auto p-4 rounded-md shadow-md font-mono">
          Need help? Contact us at <a href="mailto:support@legalcodes.in" className="text-[#5c47c4] dark:text-[#afa2ff] underline">support@legalcodes.in</a>
        </p>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">

          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">Give Feedback on LegalCodes 🧾</h2>
          <p className="text-center mb-6 text-gray-800 dark:text-gray-400">
            Your thoughts help us improve LegalCodes and serve the legal community better. We read every submission!
          </p>
          <form
            name="feedback"
            method="POST"
            data-netlify="true"
            className="space-y-5 text-gray-800 dark:text-gray-200"
          >
            {/* Required hidden input */}
            <input type="hidden" name="form-name" value="feedback" />

            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block mb-1 font-medium">How was your experience with LegalCodes?</label>
              <div className="space-x-4 mt-2">
                {["Excellent", "Good", "Average", "Poor"].map((opt) => (
                  <label key={opt}>
                    <input type="radio" name="experience" value={opt} className="mr-1" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* What did you find useful */}
            <div>
              <label className="block mb-1 font-medium">What features did you find most useful?</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {["Search Function", "Section Details", "Bookmarking", "UI Design", "Speed"].map(
                  (opt) => (
                    <label key={opt} className="flex items-center space-x-2">
                      <input type="checkbox" name="liked" value={opt} />
                      <span>{opt}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <label className="block mb-1 font-medium">
                What new features or improvements would you like to see?
              </label>
              <textarea
                name="suggestion"
                rows="3"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              // placeholder="e.g. Add case law references, advanced filters, PDF export, dark mode toggle..."
              ></textarea>
            </div>

            {/* Issues */}
            <div>
              <label className="block mb-1 font-medium">Did you encounter any problems?</label>
              <textarea
                name="issue"
                rows="2"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              // placeholder="e.g. Search not working, mobile layout issues, performance lag..."
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#5c47c4] hover:bg-[#4737a1] text-white py-2 px-4 rounded-md transition"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
