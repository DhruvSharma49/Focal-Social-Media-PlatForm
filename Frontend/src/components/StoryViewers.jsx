import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const StoryViewer = ({ isOpen, onClose, stories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when new stories open
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen, stories]);

  if (!isOpen || !stories || stories.length === 0) return null;

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onClose(); // last story pe close
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentStory = stories[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <button onClick={onClose} className="absolute top-4 right-4">
        <X className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <img
        src={currentStory.mediaURL}
        alt="Story"
        className="max-h-[90%] max-w-[400px] object-contain rounded-lg"
      />
    </div>
  );
};

export default StoryViewer;
