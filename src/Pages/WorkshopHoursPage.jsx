import { useState, useEffect } from "react";
import {
  Clock,
  Edit2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";

const WorkshopHoursPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempHours, setTempHours] = useState([]);
  const [expandedDay, setExpandedDay] = useState(null);
  const [hours, setHours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Day mapping for API data
  const dayMapping = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };

  // Fetch working hours from API
  useEffect(() => {
    fetchWorkingHours();
  }, []);

  const fetchWorkingHours = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://176.119.254.225:80/mechanic/mechanic/working-hours",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch working hours");
      }

      const data = await response.json();

      // Transform API data to match our component structure
      const transformedHours = data.hours.map((hour) => ({
        day: dayMapping[hour.day_of_week],
        open: convertTo12Hour(hour.start_time),
        close: convertTo12Hour(hour.end_time),
        isOpen: true,
        day_of_week: hour.day_of_week,
      }));

      // Fill in missing days as closed
      const allDays = [];
      for (let i = 1; i <= 7; i++) {
        const existingDay = transformedHours.find((h) => h.day_of_week === i);
        if (existingDay) {
          allDays.push(existingDay);
        } else {
          allDays.push({
            day: dayMapping[i],
            open: "",
            close: "",
            isOpen: false,
            day_of_week: i,
          });
        }
      }

      setHours(allDays);
    } catch (error) {
      console.error("Error fetching working hours:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Get current day and time in AM/PM format
  const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Convert AM/PM time to minutes for comparison
  const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    let total = hours * 60 + minutes;
    if (period === "PM" && hours !== 12) total += 12 * 60;
    if (period === "AM" && hours === 12) total -= 12 * 60;
    return total;
  };

  // Convert AM/PM time to 24-hour format for API
  const convertTo24Hour = (timeStr) => {
    if (!timeStr) return "";
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    let hour24 = hours;
    if (period === "PM" && hours !== 12) hour24 += 12;
    if (period === "AM" && hours === 12) hour24 = 0;
    return `${hour24.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  // Convert 24-hour format to AM/PM for display
  const convertTo12Hour = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = ((hours + 11) % 12) + 1;
    return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Check if workshop is currently open
  const isCurrentlyOpen = () => {
    const today = hours.find((h) => h.day === currentDay);
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

  const saveHours = async () => {
    setIsLoading(true);
    try {
      // Filter only open days and transform to API format
      const openDays = tempHours
        .filter((day) => day.isOpen)
        .map((day) => ({
          day_of_week: day.day_of_week,
          start_time: convertTo24Hour(day.open),
          end_time: convertTo24Hour(day.close),
        }));

      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://176.119.254.225:80/mechanic/mechanic/working-hours",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            hours: openDays,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update working hours");
      }

      const data = await response.json();

      // Update local state with the new hours
      setHours(tempHours);
      setIsEditing(false);

      // Refresh the data from API
      await fetchWorkingHours();
    } catch (error) {
      console.error("Error saving working hours:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDayOpen = (index) => {
    const updated = [...tempHours];
    updated[index].isOpen = !updated[index].isOpen;
    if (!updated[index].isOpen) {
      updated[index].open = "";
      updated[index].close = "";
    } else {
      updated[index].open = "8:00 AM";
      updated[index].close = "5:00 PM";
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
          <div></div>
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
                disabled={isLoading}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm ${
                  isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#086189] text-white hover:bg-[#0a73a1]"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading working hours
                </h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-6 mb-8">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#086189]"></div>
              <span className="ml-3 text-gray-600">
                Loading working hours...
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Current Status Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      isCurrentlyOpen()
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {isCurrentlyOpen() ? "Open Now" : "Closed Now"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {isCurrentlyOpen()
                        ? `Open today until ${
                            hours.find((h) => h.day === currentDay)?.close
                          }`
                        : hours.find((h) => h.day === currentDay)?.isOpen
                        ? `Opens today at ${
                            hours.find((h) => h.day === currentDay)?.open
                          }`
                        : "Closed all day today"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Current time</p>
                  <p className="text-lg font-medium text-gray-900">
                    {currentTime}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Hours Table */}
        {!isLoading && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="divide-y divide-gray-200">
              {(isEditing ? tempHours : hours).map((day, index) => (
                <div
                  key={day.day}
                  className="p-5 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleExpandDay(day.day)}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          day.isOpen ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></span>
                      <span className="font-medium text-gray-900">
                        {day.day}
                      </span>
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
                            <label
                              htmlFor={`open-${index}`}
                              className="text-sm text-gray-700"
                            >
                              Open this day
                            </label>
                          </div>
                          {day.isOpen && (
                            <div className="flex flex-col sm:flex-row gap-4">
                              <div className="flex items-center gap-2">
                                <label
                                  htmlFor={`open-time-${index}`}
                                  className="text-sm text-gray-700"
                                >
                                  Opens at:
                                </label>
                                <select
                                  id={`open-time-${index}`}
                                  value={day.open}
                                  onChange={(e) =>
                                    handleTimeChange(
                                      index,
                                      "open",
                                      e.target.value
                                    )
                                  }
                                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-[#086189] focus:border-[#086189]"
                                >
                                  {Array.from({ length: 24 }, (_, i) => {
                                    const hour = i % 12 || 12;
                                    const period = i < 12 ? "AM" : "PM";
                                    return [
                                      `${hour}:00 ${period}`,
                                      `${hour}:30 ${period}`,
                                    ];
                                  })
                                    .flat()
                                    .map((time) => (
                                      <option key={time} value={time}>
                                        {time}
                                      </option>
                                    ))}
                                </select>
                              </div>
                              <div className="flex items-center gap-2">
                                <label
                                  htmlFor={`close-time-${index}`}
                                  className="text-sm text-gray-700"
                                >
                                  Closes at:
                                </label>
                                <select
                                  id={`close-time-${index}`}
                                  value={day.close}
                                  onChange={(e) =>
                                    handleTimeChange(
                                      index,
                                      "close",
                                      e.target.value
                                    )
                                  }
                                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-[#086189] focus:border-[#086189]"
                                >
                                  {Array.from({ length: 24 }, (_, i) => {
                                    const hour = i % 12 || 12;
                                    const period = i < 12 ? "AM" : "PM";
                                    return [
                                      `${hour}:00 ${period}`,
                                      `${hour}:30 ${period}`,
                                    ];
                                  })
                                    .flat()
                                    .map((time) => (
                                      <option key={time} value={time}>
                                        {time}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          {day.isOpen ? (
                            <p>
                              Open from {day.open} to {day.close}
                            </p>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopHoursPage;
