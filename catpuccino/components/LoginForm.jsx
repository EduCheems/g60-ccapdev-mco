export default function loginForm() {
  return (

    <main className="min-h-screen flex items-center bg-[#5C3727]">

      <form className="w-full max-w-sm p-6 bg-white shadow-md rounded-mb">
        <h2 className="text-2x1 font-semibold mb-4 text-left"> Login </h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Username or Email
          </label>
          
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username/Email"
            className="w-full px-3 py-2 rounded-md border border-[#41332A] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-[#FBF3DE]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded-md border border-[#41332A] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#5F3A28] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>

      </form>


    </main>
  );
}

