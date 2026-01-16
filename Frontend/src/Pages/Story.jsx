// import Navbar from "../components/Navbar";
// import api from "../utilities/api";
// import { useState } from "react";

// export default function Stories() {
//   const [file, setFile] = useState(null);

//   const uploadStory = async () => {
//     if (!file) return alert("Choose image");
//     try {
//       // for simplicity we assume frontend provides full URL string or you could upload to cloudinary
//       const body = { storyPic: file };
//       await api.post("/createstory/story", body);
//       alert("Story created");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create story");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <Navbar />
//       <div className="bg-white mt-6 p-6 rounded shadow">
//         <h2 className="text-lg font-semibold mb-3">Create Story</h2>
//         <p className="text-sm text-gray-500 mb-3">Paste image URL here (or integrate file upload later)</p>
//         <input value={file || ""} onChange={(e) => setFile(e.target.value)} placeholder="Image URL" className="w-full px-3 py-2 border rounded" />
//         <div className="mt-4">
//           <button onClick={uploadStory} className="px-4 py-2 bg-blue-400 rounded">Upload Story</button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import API from "../utilities/api";
// import { authHeader } from "../utilities/authHeader";

// export default function Stories() {
//   const [file, setFile] = useState("");

//   const uploadStory = async () => {
//     if (!file) return alert("Enter image URL");

//     try {
//       await API.post(
//         "/createstory/story",
//         { mediaURL: file },
//         { headers: authHeader() }
//       );
//       alert("Story created");
//       setFile("");
//     } catch (err) {
//       alert("Failed");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <Navbar />
//       <div className="bg-white mt-6 p-6 rounded">
//         <input
//           value={file}
//           onChange={(e) => setFile(e.target.value)}
//           placeholder="Story image URL"
//           className="w-full border px-3 py-2"
//         />
//         <button
//           onClick={uploadStory}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white"
//         >
//           Upload Story
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utilities/api";
import { authHeader } from "../utilities/authHeader";

export default function Stories() {
  const [file, setFile] = useState("");

  const uploadStory = async () => {
    if (!file) {
      alert("Choose image URL");
      return;
    }

    try {
      // ✅ EXACTLY like old working code
      const body = {
        storyPic: file,   // 🔥 SAME KEY AS BACKEND
      };

      await API.post(
        "/createstory/story",
        body,
        { headers: authHeader() } // manual token
      );

      alert("Story created successfully");
      setFile("");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to create story");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Navbar />

      <div className="bg-white mt-6 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Create Story</h2>

        <input
          value={file}
          onChange={(e) => setFile(e.target.value)}
          placeholder="Paste image URL"
          className="w-full px-3 py-2 border rounded"
        />

        <button
          onClick={uploadStory}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Upload Story
        </button>
      </div>
    </div>
  );
}
