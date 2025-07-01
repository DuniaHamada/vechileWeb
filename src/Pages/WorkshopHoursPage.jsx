import { useState } from 'react';
import { Clock, Edit2, Check, X, ChevronDown, ChevronUp, Info } from 'lucide-react';

const WorkshopHoursPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempHours, setTempHours] = useState([]);
  const [expandedDay, setExpandedDay] = useState(null);

  // Initial hours data with AM/PM format
  const initialHours = [
    { day: 'Monday', open: '8:00 AM', close: '5:00 PM', isOpen: true },
    { day: 'Tuesday', open: '8:00 AM', close: '5:00 PM', isOpen: true },
    { day: 'Wednesday', open: '8:00 AM', close: '5:00 PM', isOpen: true },
    { day: 'Thursday', open: '8:00 AM', close: '5:00 PM', isOpen: true },
    { day: 'Friday', open: '8:00 AM', close: '5:00 PM', isOpen: true },
    { day: 'Saturday', open: '9:00 AM', close: '2:00 PM', isOpen: true },
    { day: 'Sunday', open: '', close: '', isOpen: false }
  ];

  const [hours, setHours] = useState(initialHours);

  // Get current day and time in AM/PM format
  const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  // Convert AM/PM time to minutes for comparison
  const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let total = hours * 60 + minutes;
    if (period === 'PM' && hours !== 12) total += 12 * 60;
    if (period === 'AM' && hours === 12) total -= 12 * 60;
    return total;
  };

  // Check if workshop is currently open
  const isCurrentlyOpen = () => {
    const today = hours.find(h => h.day === currentDay);
    if (!today || !today.isOpen) return false;
    
    if (today.open && today.close) {
      const openTime = timeToMinutes(today.open);
      const closeTime = timeToMinutes(today.close);
      const nowTime = timeToMinutes(currentTime);
      
      return nowTime >= openTime && nowTime <= closeTime;
    }
    return false;
  };

  const startEditing = () => {
    setTempHours([...hours]);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveHours = () => {
    setHours(tempHours);
    setIsEditing(false);
  };

  const toggleDayOpen = (index) => {
    const updated = [...tempHours];
    updated[index].isOpen = !updated[index].isOpen;
    if (!updated[index].isOpen) {
      updated[index].open = '';
      updated[index].close = '';
    } else {
      updated[index].open = '8:00 AM';
      updated[index].close = '5:00 PM';
    }
    setTempHours(updated);
  };

  const handleTimeChange = (index, field, value) => {
    const updated = [...tempHours];
    updated[index][field] = value;
    setTempHours(updated);
  };

  const toggleExpandDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
           
          </div>
          {!isEditing ? (
            <button
              onClick={startEditing}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#086189] text-white rounded-lg text-sm font-medium hover:bg-[#0a73a1] transition-colors shadow-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit Hours
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={cancelEditing}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={saveHours}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#086189] text-white rounded-lg text-sm font-medium hover:bg-[#0a73a1] transition-colors shadow-sm"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Current Status Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${isCurrentlyOpen() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {isCurrentlyOpen() ? 'Open Now' : 'Closed Now'}
                </h3>
                <p className="text-sm text-gray-500">
                  {isCurrentlyOpen() 
                    ? `Open today until ${hours.find(h => h.day === currentDay)?.close}`
                    : hours.find(h => h.day === currentDay)?.isOpen 
                      ? `Opens today at ${hours.find(h => h.day === currentDay)?.open}`
                      : 'Closed all day today'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Current time</p>
              <p className="text-lg font-medium text-gray-900">{currentTime}</p>
            </div>
          </div>
        </div>

        {/* Hours Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="divide-y divide-gray-200">
            {(isEditing ? tempHours : hours).map((day, index) => (
              <div key={day.day} className="p-5 hover:bg-gray-50 transition-colors">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExpandDay(day.day)}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-3 h-3 rounded-full ${day.isOpen ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    <span className="font-medium text-gray-900">{day.day}</span>
                    {day.day === currentDay && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {day.isOpen ? (
                      <span className="text-gray-700">
                        {day.open} - {day.close}
                      </span>
                    ) : (
                      <span className="text-gray-400">Closed</span>
                    )}
                    {expandedDay === day.day ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedDay === day.day && (
                  <div className="mt-4 pl-9">
                    {isEditing ? (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`open-${index}`}
                            checked={day.isOpen}
                            onChange={() => toggleDayOpen(index)}
                            className="h-4 w-4 rounded border-gray-300 text-[#086189] focus:ring-[#086189]"
                          />
                          <label htmlFor={`open-${index}`} className="text-sm text-gray-700">
                            Open this day
                          </label>
                        </div>
                        {day.isOpen && (
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center gap-2">
                              <label htmlFor={`open-time-${index}`} className="text-sm text-gray-700">
                                Opens at:
                              </label>
                              <select
                                id={`open-time-${index}`}
                                value={day.open}
                                onChange={(e) => handleTimeChange(index, 'open', e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-[#086189] focus:border-[#086189]"
                              >
                                {Array.from({ length: 24 }, (_, i) => {
                                  const hour = i % 12 || 12;
                                  const period = i < 12 ? 'AM' : 'PM';
                                  return [`${hour}:00 ${period}`, `${hour}:30 ${period}`];
                                }).flat().map(time => (
                                  <option key={time} value={time}>{time}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex items-center gap-2">
                              <label htmlFor={`close-time-${index}`} className="text-sm text-gray-700">
                                Closes at:
                              </label>
                              <select
                                id={`close-time-${index}`}
                                value={day.close}
                                onChange={(e) => handleTimeChange(index, 'close', e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-[#086189] focus:border-[#086189]"
                              >
                                {Array.from({ length: 24 }, (_, i) => {
                                  const hour = i % 12 || 12;
                                  const period = i < 12 ? 'AM' : 'PM';
                                  return [`${hour}:00 ${period}`, `${hour}:30 ${period}`];
                                }).flat().map(time => (
                                  <option key={time} value={time}>{time}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        {day.isOpen ? (
                          <p>Open from {day.open} to {day.close}</p>
                        ) : (
                          <p>Closed all day</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Special Hours Notice */}
          <div className="p-5 bg-gray-50 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-5 w-5 rounded-full bg-[#086189]/10 flex items-center justify-center text-[#086189]">
                  <Info className="w-3 h-3" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Special Hours</p>
                <p className="text-sm text-gray-500 mt-1">
                  Holiday hours may vary from regular business hours. Please check our announcements for holiday schedules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopHoursPage;