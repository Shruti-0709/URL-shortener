import React, { useState } from 'react';

function App() {
  // State to hold the URL input and the shortened URL response
  const [fullUrl, setFullUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setShortUrl(''); // Clear any previous shortened URLs

    try {
      const response = await fetch('http://localhost:5000/api/shortUrls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullUrl }), // Send the full URL in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(data.shortUrl); // Set the shortened URL from the response
    } catch (err) {
      setError('Error connecting to server');
      console.error(err);
    }
  };

  return (
    <div className="App flex items-center justify-center min-h-screen bg-purple-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">URL Shortener</h1>

      <form onSubmit={handleSubmit}>
        <input
           className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="url"
          placeholder="Enter full URL"
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
          required
        />
        <button  className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300" type="submit">Shorten URL</button>
      </form>

      {/* Display the shortened URL */}
      {shortUrl && (
        <div  className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
          <p>Shortened URL: <a href={shortUrl} className="text-blue-500 underline">{shortUrl}</a></p>
        </div>
      )}

      {/* Display error message if there's an issue */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
}

export default App;
