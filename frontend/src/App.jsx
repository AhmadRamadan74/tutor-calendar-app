import { useState } from 'react';
import axios from 'axios';
import CalendarInput from './components/CalendarInput';
import CalendarPreview from './components/CalendarPreview';
import CalendarView from './components/CalendarView';
import img from './assets/bg.jpg';
import { toast, ToastContainer } from 'react-toastify';

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
      toast.error('Failed To Save The Calendar');
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
  <>
  <ToastContainer position="top-right" autoClose={3000} /><div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-12 px-4 opacity-90"
      style={{
        backgroundImage: `url(${img})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}>
      <div className="min-h-screen bg-black/40 absolute inset-0 -z-10"></div>

      <header className="text-center text-white mb-12 relative z-10">
        <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">Tutor Calendar System</h1>
        <p className="text-xl opacity-90 drop-shadow-md">Set your availability with natural language</p>
      </header>

      <main className="relative z-10">
        {step === 'input' && (
          <CalendarInput onParsed={handleParsed} />
        )}

        {step === 'preview' && parsedData && (
          <CalendarPreview
            data={parsedData}
            onConfirm={handleConfirm}
            onCancel={handleCancel} />
        )}

        {step === 'view' && savedCalendar && (
          <CalendarView
            calendar={savedCalendar}
            onNewCalendar={handleNewCalendar}
            onDelete={handleDelete} />
        )}
      </main>
    </div>
      </>
  );
}

export default App;