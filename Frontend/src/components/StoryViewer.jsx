import { useEffect, useState } from "react";

export default function StoryViewer({ data, onClose }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < data.stories.length - 1) {
        setIndex(index + 1);
      } else {
        onClose();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [index, data, onClose]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <img
        src={data.stories[index].mediaURL}
        className="max-h-full max-w-full object-contain"
      />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl"
      >
        ✕
      </button>
    </div>
  );
}
