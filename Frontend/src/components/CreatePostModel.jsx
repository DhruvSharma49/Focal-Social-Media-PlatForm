// import React, { useState, useRef } from "react";
// import { X, Image as ImageIcon, MapPin, Users, ChevronDown, Smile } from "lucide-react";
// import api from "../utils/api";
// import { useSelector } from "react-redux";


// const CreatePostModal = ({ isOpen, onClose }) => {
//   const [step, setStep] = useState("select");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [caption, setCaption] = useState("");
//   const fileInputRef = useRef(null);
  
//   const token = useSelector((state) => state.auth.token);
//   if (!isOpen) return null;

//   const handleFileSelect = (e) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setSelectedImage(event.target.result);
//         setStep("edit");
//       };
//       reader.readAsDataURL(file);
//     }
//   };

// const handleShare = async () => {
//   try {
//     await api.post(
//       "/post/createPost",
//       { caption, image: selectedImage },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     onClose();
//     setStep("select");
//     setSelectedImage(null);
//     setCaption("");
//   } catch (err) {
//     console.error("Post error", err);
//   }
// };


//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/70" onClick={onClose} />

//       <div className="relative bg-secondary rounded-xl overflow-hidden max-w-[800px] w-full mx-4">
//         <div className="flex items-center justify-between px-4 py-3 border-b border-divider">
//           {step !== "select" && (
//             <button onClick={() => setStep("select")} className="text-foreground">
//               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
//               </svg>
//             </button>
//           )}
//           <h2 className="font-semibold text-center flex-1">Create new post</h2>
//           {step === "caption" ? (
//             <button onClick={handleShare} className="text-primary font-semibold">Share</button>
//           ) : step === "edit" ? (
//             <button onClick={() => setStep("caption")} className="text-primary font-semibold">Next</button>
//           ) : (
//             <div className="w-6" />
//           )}
//         </div>

//         <div className="min-h-[400px]">
//           {step === "select" && (
//             <div className="flex flex-col items-center justify-center h-[400px] gap-4">
//               <ImageIcon className="w-20 h-20 text-muted-foreground" />
//               <p className="text-xl">Drag photos and videos here</p>
//               <button
//                 onClick={() => fileInputRef.current && fileInputRef.current.click()}
//                 className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold"
//               >
//                 Select from computer
//               </button>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*,video/*"
//                 onChange={handleFileSelect}
//                 className="hidden"
//               />
//             </div>
//           )}

//           {step === "edit" && selectedImage && (
//             <div className="aspect-square max-h-[500px]">
//               <img src={selectedImage} alt="Selected" className="w-full h-full object-contain bg-black" />
//             </div>
//           )}

//           {step === "caption" && selectedImage && (
//             <div className="flex">
//               <div className="w-1/2 aspect-square">
//                 <img src={selectedImage} alt="Selected" className="w-full h-full object-contain bg-black" />
//               </div>
//               <div className="w-1/2 p-4 flex flex-col">
//                 <div className="flex items-center gap-3 mb-4">
//                   <img
//                     src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop"
//                     alt="Profile"
//                     className="w-7 h-7 rounded-full object-cover"
//                   />
//                   <span className="font-semibold text-sm">sharma_dhruv49</span>
//                 </div>

//                 <textarea
//                   value={caption}
//                   onChange={(e) => setCaption(e.target.value)}
//                   placeholder="Write a caption..."
//                   className="flex-1 bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground"
//                   maxLength={2200}
//                 />

//                 <div className="flex items-center justify-between text-muted-foreground text-xs mt-2">
//                   <Smile className="w-5 h-5 cursor-pointer" />
//                   <span>{caption.length}/2,200</span>
//                 </div>

//                 <div className="border-t border-divider mt-4 pt-4 space-y-3">
//                   <div className="flex items-center justify-between cursor-pointer">
//                     <span className="text-sm">Add location</span>
//                     <MapPin className="w-4 h-4" />
//                   </div>
//                   <div className="flex items-center justify-between cursor-pointer">
//                     <span className="text-sm">Tag people</span>
//                     <Users className="w-4 h-4" />
//                   </div>
//                   <div className="flex items-center justify-between cursor-pointer">
//                     <span className="text-sm">Accessibility</span>
//                     <ChevronDown className="w-4 h-4" />
//                   </div>
//                   <div className="flex items-center justify-between cursor-pointer">
//                     <span className="text-sm">Advanced settings</span>
//                     <ChevronDown className="w-4 h-4" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <button onClick={onClose} className="absolute top-4 right-4 text-foreground">
//         <X className="w-6 h-6" />
//       </button>
//     </div>
//   );
// };

// export default CreatePostModal;
import { useState, useRef } from "react";
import api from "../utils/api";

const CreatePostModal = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setSelectedImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePost = async () => {
    if (!selectedImage || !caption) return alert("Add image and caption");

    try {
      await api.post(
        "/post/createPost",
        {
          title: "Post",
          body: caption,
        
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Post Created ✅");
      onClose();
      setSelectedImage(null);
      setCaption("");
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <div className="bg-white p-6 rounded-xl w-[500px] space-y-4">
        <input type="file" ref={fileInputRef} onChange={handleFileSelect} />

        {selectedImage && (
          <img src={selectedImage} className="w-full h-64 object-cover rounded" />
        )}

        <textarea
          placeholder="Write caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handlePost}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          🚀 Post Now
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;
