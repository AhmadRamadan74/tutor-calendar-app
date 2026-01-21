import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CalendarView = ({ calendar, onNewCalendar, onDelete }) => {
  const { _id, availabilityDescription, timeSlots } = calendar;

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const getSlotForDay = (day) => {
    return timeSlots.find((slot) => slot.day === day);
  };

  const handleDelete = async () => {
    
    toast.info(
      <div>
        <p>Are you sure you want to delete this calendar?</p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(); 
              try {
                await axios.delete(`http://localhost:5000/api/calendar/${_id}`);
                toast.success('Calendar deleted successfully!');
                onDelete();
              } catch (error) {
                console.error('Failed to delete calendar:', error);
                toast.error('Failed to delete calendar. Please try again.');
              }
            }}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Confirm
          </button>

          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 bg-gray-200 text-black rounded"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false, 
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-8 mb-8 text-center">
          <h2 className="text-3xl font-bold mb-3">
            Calendar Saved Successfully!
          </h2>
          <p className="text-lg opacity-95 italic">
            "{availabilityDescription}"
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Weekly Schedule
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {daysOfWeek.map((day) => {
              const slot = getSlotForDay(day);
              return (
                <div
                  key={day}
                  className={`rounded-lg overflow-hidden shadow-md ${
                    slot
                      ? 'border-2 border-green-500'
                      : 'border-2 border-gray-200'
                  }`}
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 font-semibold text-center">
                    {day}
                  </div>

                  <div
                    className={`p-4 min-h-[120px] flex flex-col justify-center items-center ${
                      slot ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    {slot ? (
                      <>
                        <div className="text-center mb-3">
                          <div className="text-lg font-semibold text-green-700">
                            {formatTime(slot.startTime)}
                          </div>
                          <div className="text-sm text-gray-500 my-1">to</div>
                          <div className="text-lg font-semibold text-green-700">
                            {formatTime(slot.endTime)}
                          </div>
                        </div>
                        <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Available
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-400 text-sm">
                        Not Available
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onNewCalendar}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            Create New Calendar
          </button>

          <button
            onClick={handleDelete}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg"
          >
            Delete Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
