import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchData } from "../utils/api";

export default function Home() {
  const [data, setData] = useState(null); // State to hold the problem data
  const [problemId, setProblemId] = useState("1"); // Example problem ID
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState(null);
  const [textContent, setTextContent] = useState(""); // State for textarea content
  const [savedContent, setSavedContent] = useState(""); // State for saved content

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      router.push("/login");
    } else {
      // Fetch the problem data when the component mounts
      fetchData(problemId)
        .then((fetchedData) => {
          setData(fetchedData); // Set fetched data in state
        })
        .catch(console.error);
    }
  }, [router, problemId]);

  const handleLogoutClick = () => {
    localStorage.setItem("loggedIn", "false");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleTextChange = (event) => {
    setTextContent(event.target.value);
  };

  const handleButtonClick = async () => {
    setSavedContent(textContent); // Save the content locally if needed

    // Save the solution to the PostgreSQL DB via Flask
    const response = await fetch(
      `http://localhost:5000/flask/solution/${problemId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ solution: textContent }), // Send the user's solution in the request body
      },
    );

    if (response.ok) {
      console.log("Solution saved successfully!");
    } else {
      console.error("Failed to save solution");
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  return (
    <div className="grid grid-rows-8 grid-cols-8 gap-4 h-screen p-4 bg-gray-800">
      <div className="col-span-4 row-span-7 bg-gray-600 border border-gray-500 rounded-md drop-shadow-xl">
        <div className="bg-gray-500 w-[96%] h-10 border border-gray-600 rounded-md drop-shadow-xl text-white font-semibold mx-auto mt-4 flex items-center justify-center">
          This is the problem you want to solve
        </div>
        <textarea
          className="bg-gray-600 resize-none focus:outline-none focus:ring-0 text-white h-[90%] w-full p-4"
          value={data ? data.description : "Loading problem..."}
          readOnly
        ></textarea>
      </div>
      <div className="col-span-4 row-span-6 bg-gray-600 border border-gray-500 rounded-md drop-shadow-xl">
        <div className="bg-gray-500 w-[96%] h-10 border border-gray-600 rounded-md drop-shadow-xl text-white font-semibold mx-auto mt-4 flex items-center justify-center">
          Start typing your code in this box!
        </div>
        <textarea
          className="bg-gray-600 resize-none focus:outline-none focus:ring-0 text-white h-[90%] w-full p-4"
          value={textContent}
          onChange={handleTextChange}
        ></textarea>
      </div>
      <div className="col-span-4 row-span-2 bg-gray-600 border border-gray-500 rounded-md drop-shadow-xl">
        <div className="bg-gray-500 w-[96%] h-10 border border-gray-600 rounded-md drop-shadow-xl text-white font-semibold mx-auto mt-4 flex items-center justify-center">
          Testcases used
        </div>
        <textarea className="bg-gray-600 rounded-md resize-none focus:outline-none focus:ring-0 text-white h-[70%] w-full p-4"></textarea>
      </div>
      <button
        className="col-span-1 row-span-1 bg-red-600 border border-gray-500 rounded-md resize-none focus:outline-none focus:ring-0 text-white font-extrabold text-xl p-2 drop-shadow-xl hover:bg-red-500 active:bg-black active:text-white transition-all"
        onClick={handleLogoutClick}
      >
        Log out
      </button>
      <button
        className="col-span-3 row-span-1 bg-green-600 border border-gray-500 rounded-md resize-none focus:outline-none focus:ring-0 text-white font-extrabold text-xl p-2 drop-shadow-xl hover:bg-green-500 active:bg-green-700 active:text-white transition-all"
        onClick={handleButtonClick}
      >
        Check my code out!
      </button>
    </div>
  );
}
