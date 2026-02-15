// import { X, ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
// import { useState, useEffect } from "react";
// import { stories as storiesData, users } from "../data/mockData";

// const StoryViewer = ({ isOpen, onClose, initialStoryId }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);

//   const storyImages = [
//     "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=1000&fit=crop",
//     "https://images.unsplash.com/photo-1682687221038-404670f09561?w=600&h=1000&fit=crop",
//     "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=600&h=1000&fit=crop",
//   ];

//   // Set initial index from id (optional safety)
//   useEffect(() => {
//     if (initialStoryId && storiesData?.length) {
//       const idx = storiesData.findIndex((s) => s.id === initialStoryId);
//       if (idx >= 0) setCurrentIndex(idx);
//     }
//   }, [initialStoryId]);

//   useEffect(() => {
//     if (!isOpen || isPaused) return;

//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           if (currentIndex < storyImages.length - 1) {
//             setCurrentIndex((i) => i + 1);
//             return 0;
//           } else {
//             onClose();
//             return 0;
//           }
//         }
//         return prev + 2;
//       });
//     }, 100);

//     return () => clearInterval(interval);
//   }, [isOpen, isPaused, currentIndex, onClose]);

//   useEffect(() => {
//     setProgress(0);
//   }, [currentIndex]);

//   if (!isOpen) return null;

//   const currentStory = storiesData[currentIndex] || storiesData[0];
//   const storyUser = users.find((u) => u.id === currentStory?.userId) || users[0];

//   const goToPrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((i) => i - 1);
//       setProgress(0);
//     }
//   };

//   const goToNext = () => {
//     if (currentIndex < storyImages.length - 1) {
//       setCurrentIndex((i) => i + 1);
//       setProgress(0);
//     } else {
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
//       <button onClick={onClose} className="absolute top-4 right-4 z-10">
//         <X className="w-6 h-6 text-foreground" />
//       </button>

//       {currentIndex > 0 && (
//         <button
//           onClick={goToPrevious}
//           className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center z-10"
//         >
//           <ChevronLeft className="w-5 h-5 text-foreground" />
//         </button>
//       )}

//       {currentIndex < storyImages.length - 1 && (
//         <button
//           onClick={goToNext}
//           className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center z-10"
//         >
//           <ChevronRight className="w-5 h-5 text-foreground" />
//         </button>
//       )}

//       <div className="relative w-full max-w-[420px] h-full max-h-[750px] bg-secondary rounded-lg overflow-hidden">
//         {/* Progress */}
//         <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
//           {storyImages.map((_, i) => (
//             <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-foreground transition-all duration-100"
//                 style={{
//                   width: i < currentIndex ? "100%" : i === currentIndex ? `${progress}%` : "0%",
//                 }}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Header */}
//         <div className="absolute top-6 left-4 right-4 flex items-center justify-between z-10">
//           <div className="flex items-center gap-3">
//             <img src={storyUser.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
//             <span className="font-semibold text-sm text-foreground">{storyUser.username}</span>
//             <span className="text-xs text-muted-foreground">2h</span>
//           </div>

//           <div className="flex items-center gap-4">
//             <button onClick={() => setIsPaused(!isPaused)}>
//               {isPaused ? <Play className="w-5 h-5 text-foreground" /> : <Pause className="w-5 h-5 text-foreground" />}
//             </button>
//             <button onClick={() => setIsMuted(!isMuted)}>
//               {isMuted ? <VolumeX className="w-5 h-5 text-foreground" /> : <Volume2 className="w-5 h-5 text-foreground" />}
//             </button>
//           </div>
//         </div>

//         <img
//           src={storyImages[currentIndex]}
//           alt="Story"
//           className="w-full h-full object-cover"
//           onClick={() => setIsPaused(!isPaused)}
//         />

//         <div className="absolute bottom-4 left-4 right-4">
//           <input
//             type="text"
//             placeholder={`Reply to ${storyUser.username}...`}
//             className="w-full bg-transparent border border-foreground/50 rounded-full py-2 px-4 text-sm placeholder:text-muted-foreground focus:outline-none"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoryViewer;


// import { X } from "lucide-react";

// const StoryViewer = ({ isOpen, onClose, story }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
//       <button onClick={onClose} className="absolute top-4 right-4">
//         <X className="w-6 h-6 text-white" />
//       </button>
//       <img src={story.mediaURL} alt="Story" className="max-h-[90%] max-w-[400px] object-contain rounded-lg" />
//     </div>
//   );
// };

// export default StoryViewer;



import { X, ChevronLeft, ChevronRight } from "lucide-react";

const StoryViewer = ({ isOpen, onClose, story, onNext, onPrev }) => {
  if (!isOpen || !story) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Close */}
      <button onClick={onClose} className="absolute top-4 right-4">
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Prev */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Next */}
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <img
        src={story.mediaURL}
        alt="Story"
        className="max-h-[90%] max-w-[400px] object-contain rounded-lg"
      />
    </div>
  );
};

export default StoryViewer;
