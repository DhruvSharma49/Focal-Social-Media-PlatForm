import { useState, useRef } from "react";
import { X, ImagePlus } from "lucide-react";
import api from "../utils/api";

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile || !caption) {
      return alert("Image aur caption dono chahiye!");
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("caption", caption);

    try {
      const response = await api.post("/post/createPost", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSelectedFile(null);
      setCaption("");
      onClose();
      if (onPostCreated) onPostCreated(response.data.post);
    } catch (err) {
      console.log(err.response?.data);
      alert("Error creating post");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl border border-black/10 dark:border-white/10 p-6 space-y-5 animate-fadeIn">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create New Post</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* IMAGE UPLOAD */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-xl h-44 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition"
        >
          <ImagePlus size={28} />
          <p className="text-sm mt-2">Click to upload image</p>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* PREVIEW */}
        {selectedFile && (
          <div className="relative">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="preview"
              className="w-full h-52 object-cover rounded-xl"
            />
          </div>
        )}

        {/* CAPTION */}
        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full rounded-xl bg-gray-100 dark:bg-zinc-800 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
        />

        {/* ACTION BUTTONS */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition"
        >
          Share Post
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 py-2.5 rounded-xl font-medium transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;
