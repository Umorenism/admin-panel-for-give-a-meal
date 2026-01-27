
import { useState } from "react";
import { motion } from "framer-motion";
import { createCampaign } from "../api/apiServices";
import { useNavigate } from "react-router-dom";
import { Upload, Target, FileText, DollarSign } from "lucide-react";

export default function CreateCampaign() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createCampaign({
        title,
        description,
        goalAmount: Number(goalAmount),
        imageFile,
      });
      navigate("/dashboard/campaigns");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8"
    >
      {/* Hero / Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold text-gray-800"
        >
          Launch a New Campaign 🚀
        </motion.h2>
        <p className="text-gray-600 mt-2">
          Inspire change by starting a new fundraising campaign. Fill out the
          details below and watch your vision come alive.
        </p>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={submit}
        className=" p-8 space-y-6 max-w-6xl mx-auto border border-gray-100"
      >
        {error && <p className="text-red-600">{error}</p>}

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 flex items-center gap-2">
            <FileText size={18} /> Campaign Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Help Build a School"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 flex items-center gap-2">
            <Target size={18} /> Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a compelling story..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            rows={5}
          />
        </div>

        {/* Goal */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 flex items-center gap-2">
            <DollarSign size={18} /> Goal Amount
          </label>
          <input
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            placeholder="e.g. 5000"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 flex items-center gap-2">
            <Upload size={18} /> Campaign Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          />

          {/* Image Preview */}
          {previewUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4"
            >
              <img
                src={previewUrl}
                alt="Preview"
                className="rounded-lg shadow-md max-h-60 mx-auto w-full bg-cover"
              />
            </motion.div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            className="px-5 py-2.5 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
            onClick={() => navigate("/dashboard/campaigns")}
          >
            Cancel
          </button>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg shadow transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Campaign"}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

