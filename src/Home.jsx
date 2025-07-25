import React, { useState } from 'react';

function Home() {
  const [name, setName] = useState("");
/*  const apiUrl = process.env.VITE_BACKEND_URL;
 console.log(apiUrl); */

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter your name");
      return;
    }

    const response = await fetch(`https://backend-certificate-ygqz.onrender.com/generate-certificate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}-certificate.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1> 🎓 Certificate Generator
        </h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base px-2 sm:px-6">
          Enter your name below to generate your custom certificate.
        </p>
            <form onSubmit={handleGenerate}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: '10px', width: '300px' }}
                />
                <br /><br />
                <button type="submit" style={{ padding: '10px 20px' }}>
                    Generate Certificate
                </button>
            </form>
        </div>
    );
}

export default Home;
