import { useState } from 'react';

const CalendarPreview = ({ data, onConfirm, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const { availabilityDescription, timeSlots } = data;

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getDayColor = (day) => {
    const colors = {
      'Monday': 'border-blue-500 bg-blue-50',
      'Tuesday': 'border-purple-500 bg-purple-50',
      'Wednesday': 'border-red-500 bg-red-50',
      'Thursday': 'border-orange-500 bg-orange-50',
      'Friday': 'border-teal-500 bg-teal-50',
      'Saturday': 'border-green-500 bg-green-50',
      'Sunday': 'border-yellow-500 bg-yellow-50'
    };
    return colors[day] || 'border-gray-500 bg-gray-50';
  };

  const getTextColor = (day) => {
    const colors = {
      'Monday': 'text-blue-700',
      'Tuesday': 'text-purple-700',
      'Wednesday': 'text-red-700',
      'Thursday': 'text-orange-700',
      'Friday': 'text-teal-700',
      'Saturday': 'text-green-700',
      'Sunday': 'text-yellow-700'
    };
    return colors[day] || 'text-gray-700';
  };

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Preview Your Schedule
        </h2>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-700 mb-2">Your Description:</h3>
          <p className="text-gray-600 italic">"{availabilityDescription}"</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {timeSlots.map((slot, index) => (
            <div 
              key={index} 
              className={`border-l-4 ${getDayColor(slot.day)} rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className={`text-lg font-semibold mb-2 ${getTextColor(slot.day)}`}>
                {slot.day}
              </div>
              <div className="text-gray-700">
                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={onCancel} 
            disabled={loading}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={handleConfirm} 
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
          >
            {loading ? 'Saving...' : 'Confirm & Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarPreview;