import "./App.css";
import { useState } from "react";

async function requestToSend(data) {
  try {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (error) {
    return false;
  }
}

function App() {
  const [loading, setLoading] = useState(false);

  async function handleClick(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const success = await requestToSend(data);

      if (success) {
        alert("Form submitted successfully!");
        e.target.reset(); // Reset the form after successful submission
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <>
      <div className=" bg-amber-200 text-xl lg:text-3xl lg:min-w-[700px] p-4 rounded-4xl shadow-lg shadow-gray-500/50">
        <div className=" text-5xl my-[30px] font-semibold">Form</div>

        <form action="submit" onSubmit={handleClick}>
          {/* first name */}
          <div className=" flex flex-col sm:flex-row sm:justify-between justify-center items-start sm:items-center my-4">
            <label htmlFor="fname" className=" m-2 p-1">
              First Name
            </label>

            <input
              id="fname"
              name="fname"
              type="text"
              className=" border-2 mx-2 p-[0.3rem] rounded-sm bg-gray-100"
              placeholder="Enter Your First Name"
              required
            />
          </div>

          {/* last name */}
          <div className=" flex flex-col sm:flex-row sm:justify-between justify-center items-start sm:items-center my-4">
            <label htmlFor="lname" className=" m-2 p-1">
              Last Name
            </label>

            <input
              id="lname"
              name="lname"
              type="text"
              className=" border-2 mx-2 p-[0.3rem] rounded-sm bg-gray-100"
              placeholder="Enter Your Last Name"
              required
            />
          </div>

          {/* age */}
          <div className=" flex flex-col sm:flex-row sm:justify-between justify-center items-start sm:items-center my-4">
            <label htmlFor="age" className=" m-2 p-1">
              Age
            </label>

            <input
              id="age"
              name="age"
              type="number"
              className=" border-2 mx-2 p-[0.3rem] rounded-sm bg-gray-100"
              placeholder="Enter Your Age"
              required
            />
          </div>

          {/* mail */}
          <div className=" flex flex-col sm:flex-row sm:justify-between justify-center items-start sm:items-center my-4">
            <label htmlFor="email" className=" m-2 p-1">
              E-Mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              className=" border-2 mx-2 p-[0.3rem] rounded-sm bg-gray-100"
              placeholder="email@example.com"
              autoComplete="email"
              required
            />
          </div>

          {/* relation */}
          <div className=" flex flex-col sm:flex-row sm:justify-between justify-center items-start sm:items-center my-4">
            <label htmlFor="relation" className=" m-2 p-1">
              Relation
            </label>

            <select
              required
              id="relation"
              name="relation"
              className="border-2 mx-2 p-[0.3rem] rounded-sm bg-gray-100"
            >
              <option value="">Select Relation</option>
              <option value="friend">Friend</option>
              <option value="brother">Brother</option>
              <option value="sister">Sister</option>
              <option value="none">None</option>
            </select>
          </div>

          {/* Submit button */}
          <div className=" m-2 p-2">
            <button className="" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
              {/* Button text changes based on loading state */}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
