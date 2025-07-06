
import React, { useState } from 'react';
import './index.css';

function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('http://localhost:5000/business-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location })
    });
    const result = await res.json();
    setData(result);
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    const res = await fetch(`http://localhost:5000/regenerate-headline?name=${name}&location=${location}`);
    const result = await res.json();
    setData(prev => ({ ...prev, headline: result.headline }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Business Info</h1>
        <input type="text" placeholder="Business Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
        <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {data && (
        <div className="bg-white mt-6 p-6 rounded-xl shadow-md w-full max-w-md text-center">
          <p className="text-xl font-semibold">⭐ Rating: {data.rating}</p>
          <p className="text-md text-gray-700">📝 Reviews: {data.reviews}</p>
          <p className="mt-4 text-gray-800 italic">“{data.headline}”</p>
          <button onClick={regenerateHeadline} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Regenerate SEO Headline
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
