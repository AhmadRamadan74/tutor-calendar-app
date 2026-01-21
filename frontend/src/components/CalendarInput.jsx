import { useState } from 'react';
import axios from 'axios';
const CalendarInput = ({ onParsed }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleParse = async () => {
    if (!text.trim()) {
      setError('Please enter your availability');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/parse-availability', {
        text: text
      });

      if (response.data.success) {
        onParsed(response.data.data);
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to parse availability');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Enter Your Availability
        </h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Example:</span> "I am available between noon and 4pm on weekends, after 7 pm to midnight on Monday and Wednesday, and after 9pm otherwise"
          </p>
        </div>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe your availability in natural language..."
          rows="5"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none text-gray-700"
        />

        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button 
          onClick={handleParse} 
          disabled={loading}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {loading ? 'Parsing...' : 'Parse Availability'}
        </button>
      </div>
    </div>
  );
};

export default CalendarInput;