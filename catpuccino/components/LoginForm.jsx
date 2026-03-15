"use client";
import {useRouter} from "next/navigation";

export default function loginForm() {
  //navigates to a different page after a successful login
  const router = useRouter();

  //Handles the form submission when the user attempts to log in
  const handleSubmit = async (e) => {
    //Prevents the default form submission behavior, which would cause a page reload
    e.preventDefault();

    //Extracts the username and password values from the form inputs
    const username = e.target.username.value;
    const password = e.target.password.value;

    //Sends a POST request to the server with the username and password in the request body
    const res=await fetch("/api/auth/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password}),
    });
    
    //Waits for the server's response and processes it as JSON
    console.log("Awaiting server response...");
    const confrimation = await res.json();
    if(confrimation.token){
      console.log("Received token:", confrimation.token);
    }
    if(res.ok&&confrimation.token){
      localStorage.setItem("token", confrimation.token);
      router.push("/home");
      
    }else{
      console.log("Login failed");
    }
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

