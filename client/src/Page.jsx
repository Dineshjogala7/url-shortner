import { useState } from "react";
import axios from "axios";

const Page = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copy, setCopy] = useState(false);

  const handleSubmit = async () => {
    if (!url) {
      alert("URL should not be empty!!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/url/", { url });
      setShortUrl("http://localhost:3000/url/" + response.data.shortid);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        setCopy(true);
        setTimeout(() => setCopy(false), 2000);
      })
      .catch(() => {
        console.log("error in copy");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-indigo-100 to-indigo-100">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <p className="text-[5rem] font-extrabold bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 bg-clip-text text-transparent mb-6 text-center drop-shadow-lg">
          Short-LY
        </p>
        <div className="w-full flex gap-4 mb-8">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your URL"
            className="flex-1 px-4 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 transition-colors"
          >
            SUBMIT
          </button>
        </div>
        {shortUrl && (
          <div className="w-full flex flex-col items-center gap-3 bg-indigo-50 rounded-xl p-6 shadow">
            <p className="text-lg font-semibold text-indigo-700 break-all text-center">
              {shortUrl}
            </p>
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                copy
                  ? "bg-green-400 text-white"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
            >
              {copy ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page