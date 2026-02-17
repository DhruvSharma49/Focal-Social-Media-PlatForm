export default function About() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 border-b border-gray-800 pb-4">
          About Our Platform
        </h1>

        <p className="text-gray-300 leading-7 mb-6">
          Our platform is designed to provide a secure and interactive social
          experience. Users can connect, manage privacy settings, send follow
          requests, and receive real-time notifications.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-3">Privacy Control</h2>
            <p className="text-gray-400">
              Switch between public and private accounts and control who can
              view your content.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-3">Real-Time Updates</h2>
            <p className="text-gray-400">
              Receive instant notifications for new interactions and follow
              requests.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-3">Secure System</h2>
            <p className="text-gray-400">
              Authentication-based access ensures your account stays protected.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-3">User Friendly</h2>
            <p className="text-gray-400">
              Clean interface designed for smooth navigation and experience.
            </p>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-12">
          © {new Date().getFullYear()} YourAppName. All rights reserved.
        </p>
      </div>
    </div>
  );
}
