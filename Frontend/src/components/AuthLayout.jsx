import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#121211] via-[#030f27] to-[#000000] flex items-center justify-center">
      {/* MAIN WRAPPER */}
      <div className="flex items-center justify-center gap-10">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src="https://d1w7312wesee68.cloudfront.net/HMN1bHr2YELVnVXnyEq6ndMINVrnwIYAuGI837rVsGQ/ext:webp/quality:85/plain/s3://toast-sites-resources-prod/restaurantImages/4ce7e485-5df8-42a9-b357-c85d0aa16f52/7d34d65a-4d62-4fce-85c8-0ca191cd82b8-1"
            alt="Instagram preview"
            className="w-[450px] h-[450px] object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-[350px] flex items-center justify-center">
          <Outlet />
        </div>

      </div>
    </div>
  );
}




// src/layouts/AuthLayout.jsx
// import { Outlet } from "react-router-dom";

// export default function AuthLayout() {
//   return (
//     <div className="min-h-screen bg-black text-white flex items-center justify-center">
//       <div className="flex gap-20 items-center">

//         {/* LEFT IMAGE SECTION */}
//         <div className="hidden lg:block relative w-[380px] h-[520px]">
//           <img
//             src="/insta-mock.png"
//             alt="Instagram preview"
//             className="absolute inset-0 w-full h-full object-contain"
//           />
//         </div>

//         {/* RIGHT FORM SECTION */}
//         <div className="w-[350px]">
//           <Outlet />
//         </div>

//       </div>
//     </div>
//   );
// }
