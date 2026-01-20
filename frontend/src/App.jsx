import { useState } from 'react';
import axios from 'axios';
import CalendarInput from './components/CalendarInput';
import CalendarPreview from './components/CalendarPreview';
import CalendarView from './components/CalendarView';

function App() {
  const [step, setStep] = useState('input');
  const [parsedData, setParsedData] = useState(null);
  const [savedCalendar, setSavedCalendar] = useState(null);

  const handleParsed = (data) => {
    setParsedData(data);
    setStep('preview');
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/calendar', parsedData);
      
      if (response.data.success) {
        setSavedCalendar(response.data.data);
        setStep('view');
      }
    } catch (error) {
      console.error('Failed to save calendar:', error);
      alert('Failed to save calendar. Please try again.');
    }
  };

  const handleCancel = () => {
    setStep('input');
  };

  const handleNewCalendar = () => {
    setParsedData(null);
    setSavedCalendar(null);
    setStep('input');
  };

  const handleDelete = () => {
    setParsedData(null);
    setSavedCalendar(null);
    setStep('input');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-12 px-4">
      <header className="text-center text-white mb-12">
        <h1 className="text-5xl font-bold mb-3">Tutor Calendar System</h1>
        <p className="text-xl opacity-90">Set your availability with natural language</p>
      </header>

      <main>
        {step === 'input' && (
          <CalendarInput onParsed={handleParsed} />
        )}

        {step === 'preview' && parsedData && (
          <CalendarPreview 
            data={parsedData} 
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}

        {step === 'view' && savedCalendar && (
          <CalendarView 
            calendar={savedCalendar}
            onNewCalendar={handleNewCalendar}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;