import Feed from "../Pages/Feed";
import RightSidebar from "./RightSidebar";

const Index = () => {
  return (
    <div className="flex justify-center">
      {/* Feed */}
      <div className="flex-1 max-w-[630px] px-4 py-6">
        <Feed />
      </div>
      
      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default Index;
