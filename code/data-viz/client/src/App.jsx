import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setSubmitted(false); // Reset submitted status when file changes
    submitHandler(event.target.files[0]);
  };

  const submitHandler = (selectedfile) => {
    console.log(selectedfile);
    if (selectedfile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const unparsedData = e.target.result;

        // Redirect to ConeVis.html and send unparsed data using window.postMessage
        const newWindow = window.open("/ConeVis.html", "_blank");
        newWindow.onload = () => {
          newWindow.postMessage(unparsedData, window.location.origin);
        };
      };
      reader.readAsText(selectedfile);
    } else {
      console.error("No file selected");
    }
  };

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen bg-black text-amber-400">
        <div className="flex-col text-center">
          <h1 className="mb-4 text-5xl font-serif">Upload CSV file</h1>
          <div className="p-2">
            <input
              type="file"
              name="file"
              accept=".csv"
              onChange={fileChangeHandler}
              className="p-2 bg-amber-400 text-black rounded"
            />
          </div>
          <button
            onClick={fileChangeHandler}
            className="mt-2 p-2 bg-amber-400 text-black rounded"
          >
            Submit
          </button>
        </div>
        <button
          onClick={fileChangeHandler}
          className="absolute top-4 right-4 bg-amber-400 text-black rounded p-2"
        >
          View Visualisations
        </button>
      </div>
    </main>
  );
}

export default App;
