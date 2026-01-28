import { useState } from "react";
import { motion } from "framer-motion";
import { createBlog } from "../api/apiServices";
import { useNavigate } from "react-router-dom";
import { FileText, Image as ImageIcon, Type } from "lucide-react";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); // stores the URL or base64
  const [preview, setPreview] = useState(""); // preview for display
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setImage(reader.result); // save as base64
    };
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createBlog({ title, content, image });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen dark:text-white dark:bg-gray-900 bg-white p-8"
    >
      {/* Header */}
      <div className="max-w-4xl dark:text-white dark:bg-gray-900 mx-auto text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl dark:text-white dark:bg-gray-900 font-extrabold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent"
        >
          ✍️ Create a Blog Post
        </motion.h1>
        <p className="text-gray-600 mt-2 text-lg dark:text-white dark:bg-gray-900">
          Share your ideas, updates, or stories with your audience.
        </p>
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl dark:text-white dark:bg-gray-900 mx-auto bg-white rounded-3xl shadow-xl p-10"
      >
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={submit}>
          {/* Title */}
          <div>
            <label className="flex items-center gap-2 dark:text-white dark:bg-gray-900 font-semibold text-gray-700 mb-2">
              <Type size={18} /> Blog Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., The Future of Fundraising"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="flex items-center gap-2 font-semibold dark:text-white dark:bg-gray-900 text-gray-700 mb-2">
              <FileText size={18} /> Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post here..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition resize-none"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="flex items-center gap-2 font-semibold dark:text-white dark:bg-gray-900 text-gray-700 mb-2">
              <ImageIcon size={18} /> Featured Image
            </label>

            {/* URL Input */}
            <input
              type="url"
              value={image && !image.startsWith("data:") ? image : ""}
              onChange={(e) => {
                setPreview(e.target.value);
                setImage(e.target.value);
              }}
              placeholder="Paste an image URL here"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition mb-3"
            />

            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
            />

            {/* Preview */}
            {preview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 rounded-xl overflow-hidden border border-gray-200 shadow-md"
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/600x300?text=No+Image")
                  }
                />
              </motion.div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end mt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2.5 rounded-xl border text-gray-600 hover:bg-gray-100 dark:text-white dark:bg-gray-900 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Publish Blog"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
