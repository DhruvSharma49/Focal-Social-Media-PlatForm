// import { useState } from "react";
// import StoryRing from "./StoryRing";
// import { ChevronRight } from "lucide-react";
// import { stories } from "@/data/mockData";
// import StoryViewer from "./StoryViewer";

// const Stories = () => {
//   const [showStoryViewer, setShowStoryViewer] = useState(false);
//   const [selectedStoryId, setSelectedStoryId] = useState<string | undefined>();

//   const handleStoryClick = (storyId: string) => {
//     setSelectedStoryId(storyId);
//     setShowStoryViewer(true);
//   };

//   return (
//     <>
//       <div className="relative flex items-center py-4 px-2">
//         <div className="flex gap-4 overflow-x-auto scrollbar-hide">
//           {stories.map((story) => (
//             <div key={story.id} onClick={() => handleStoryClick(story.id)}>
//               <StoryRing
//                 username={story.username}
//                 imageUrl={story.imageUrl}
//                 seen={story.seen}
//               />
//             </div>
//           ))}
//         </div>
        
//         {/* Next button */}
//         <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-foreground rounded-full flex items-center justify-center shadow-lg">
//           <ChevronRight className="w-4 h-4 text-background" />
//         </button>
//       </div>

//       <StoryViewer
//         isOpen={showStoryViewer}
//         onClose={() => setShowStoryViewer(false)}
//         initialStoryId={selectedStoryId}
//       />
//     </>
//   );
// };

// export default Stories;




import { useState } from "react";
import StoryRing from "./StoryRing";
import { ChevronRight } from "lucide-react";
import { stories } from "../data/mockData";
import StoryViewer from "./StoryViewers";

const Stories = () => {
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState();

  const handleStoryClick = (storyId) => {
    setSelectedStoryId(storyId);
    setShowStoryViewer(true);
  };

  return (
    <>
      <div className="relative flex items-center py-4 px-2 ">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {stories.map((story) => (
            <div key={story.id} onClick={() => handleStoryClick(story.id)}>
              <StoryRing
                username={story.username}
                imageUrl={story.imageUrl}
                seen={story.seen}
              />
            </div>
          ))}
        </div>

        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-foreground rounded-full flex items-center justify-center shadow-lg">
          <ChevronRight className="w-4 h-4 text-background" />
        </button>
      </div>

      <StoryViewer
        isOpen={showStoryViewer}
        onClose={() => setShowStoryViewer(false)}
        initialStoryId={selectedStoryId}
      />
    </>
  );
};

export default Stories;

