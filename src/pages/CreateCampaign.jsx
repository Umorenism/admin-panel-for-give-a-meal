import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { createCampaign } from "../api/apiServices";
import { useNavigate } from "react-router-dom";
import { Upload, Target, FileText, Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateCampaign() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");       // user pastes URL here
  const [imageFile, setImageFile] = useState(null);   // optional file upload
  const [preview, setPreview] = useState(null);       // preview source (url or object url)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle file selection → create local preview
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: you can add size/type validation here
    if (file.size > 5 * 1024 * 1024) { // 5MB limit example
      toast.error("Image is too large (max 5MB)");
      return;
    }

    setImageFile(file);
    setImageUrl(""); // clear URL if user switches to file
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  // Handle URL input → preview + clear file
  const handleUrlChange = (e) => {
    const url = e.target.value.trim();
    setImageUrl(url);
    if (url) {
      setImageFile(null); // clear file if user pastes URL
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      setLoading(false);
      return;
    }

    // Decide what to send
    let finalImage = null;
    if (imageUrl.trim()) {
      finalImage = imageUrl.trim();
    } else if (imageFile) {
      // For now: warn that file upload is not yet supported by backend
      toast.error("Direct file upload not supported yet — please use image URL");
      setLoading(false);
      return;

      // Future: upload file here (see comment below)
      // const uploadedUrl = await uploadImageToCloudinary(imageFile);
      // finalImage = uploadedUrl;
    }

    try {
      await createCampaign({
        title: title.trim(),
        description: description.trim(),
        image: finalImage, // always string or undefined
      });

      toast.success("Campaign created successfully!");
      navigate("/dashboard/campaigns");
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Failed to create campaign";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Cleanup object URL on unmount / change
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen dark:text-white dark:bg-gray-900  to-gray-100 p-6 md:p-8"
    >
      <div className="max-w-4xl dark:text-white dark:bg-gray-900 mx-auto">
        <motion.h2 className="text-3xl md:text-4xl dark:text-white dark:bg-gray-900 font-bold text-gray-800 text-center mb-3">
          Create New Campaign
        </motion.h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:text-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-lg space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 flex items-center dark:text-white dark:bg-gray-900 gap-2">
              <FileText size={18} /> Title *
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Food for the Less Privileged this Christmas"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 flex items-center dark:text-white dark:bg-gray-900 gap-2">
              <Target size={18} /> Description *
            </label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Why this campaign matters..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Image – URL or File */}
          <div className="space-y-4">
            <label className="block font-medium text-gray-700 dark:text-white dark:bg-gray-900 flex items-center gap-2">
              <Upload size={18} /> Campaign Image (URL or upload)
            </label>

            {/* URL input */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <LinkIcon size={16} />
                <span className="text-sm text-gray-600 dark:text-white dark:bg-gray-900">Paste image URL</span>
              </div>
              <input
                type="url"
                value={imageUrl}
                onChange={handleUrlChange}
                placeholder="https://example.com/image.jpg"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* OR divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* File upload */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Upload size={16} />
                <span className="text-sm text-gray-600 dark:text-white dark:bg-gray-900">Choose file from device</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={!!imageUrl.trim()} // disable file if URL is filled
                className="block w-full text-sm text-gray-500 
                  file:mr-4 file:py-2 file:px-4 file:rounded-lg 
                  file:border-0 file:text-sm file:font-semibold 
                  file:bg-orange-50 file:text-orange-700 
                  hover:file:bg-orange-100 cursor-pointer"
              />
              <p className="mt-1 text-xs text-gray-500">
                {imageFile ? imageFile.name : "PNG, JPG, max 5MB recommended"}
              </p>
            </div>

            {/* Preview */}
            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={preview}
                  alt="Campaign preview"
                  className="max-h-64 w-full object-cover rounded-xl border shadow-sm"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x300?text=Invalid+Image";
                  }}
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/campaigns")}
              className="px-6 py-3 border rounded-lg dark:text-white dark:bg-gray-900 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-lg text-white font-medium flex items-center gap-2 min-w-[160px] justify-center ${
                loading
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Campaign"
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}