"use client";
import {useRouter} from "next/navigation";

export default function loginForm() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const res=fetch("/api/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password}),
    });

    const confrimation = res.json();
     confrimation.then((data) => {
      if (data.success) {
        alert("Login successful!");
        router.push("/home");
      } else {
        alert("Login failed: " + data.message);
      }});
  };
  return (

    <main className="flex items-center">

      <form className="w-full max-w-sm p-6" onSubmit={handleSubmit}>
        <h2 className="text-2x1 font-semibold mb-4 text-left"> Login </h2>

        <div className="mb-4">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username/Email"
            className="w-full px-3 py-2 rounded-md border border-[#41332A] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-[#FBF3DE]"
          />
          <label htmlFor="username" className="block text-[#FBF3DE] pt-2 mb-2">
            Username or Email
          </label>
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded-md border border-[#41332A] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-[#FBF3DE]"
          />
          <label htmlFor="password" className="block text-[#FBF3DE] pt-2 mb-2">
            Password
          </label>
        </div>

          <button
            type="submit"
            className="w-full bg-[#EEB56E] text-white py-2 px-4 rounded-md hover:bg-[#D26500] transition"
          >
            Login
          </button>

      </form>


    </main>
  );
}

