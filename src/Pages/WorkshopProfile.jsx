import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Importing icons for expand/collapse

export default function WorkshopProfile() {
  const [formData, setFormData] = useState({
    name: "Ahmadworkshop",
    location: "Ramallah",
    workingHours: {
      Monday: { from: "09:00", to: "17:00", available: true },
      Tuesday: { from: "09:00", to: "17:00", available: true },
      Wednesday: { from: "09:00", to: "17:00", available: true },
      Thursday: { from: "09:00", to: "17:00", available: true },
      Friday: { from: "09:00", to: "17:00", available: true },
      Saturday: { from: "", to: "", available: false },
      Sunday: { from: "", to: "", available: false },
    },
  });

  const [showSchedule, setShowSchedule] = useState(false);

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHourChange = (day, field, value) => {
    setFormData((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value,
        },
      },
    }));
  };

  const handleAvailabilityChange = (day) => {
    setFormData((prev) => {
      const isNowAvailable = !prev.workingHours[day].available;
      return {
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [day]: {
            from: isNowAvailable ? "09:00" : "",
            to: isNowAvailable ? "17:00" : "",
            available: isNowAvailable,
          },
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Workshop Info:", formData);
  };

  const toggleSchedule = () => {
    setShowSchedule(!showSchedule);
  };

  const days = Object.keys(formData.workingHours);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-[#086189] mb-6 text-center">Edit Workshop Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div>
          <label className="block mb-2 text-[#086189] font-semibold ">Workshop Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleTextChange}
            className="w-full px-4 py-2 border border-[#086189] rounded-md focus:outline-none focus:ring-2 focus:ring-[#086189]"
          />
        </div>

        <div>
          <label className="block mb-2 text-[#086189] font-semibold ">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleTextChange}
            className="w-full px-4 py-2 border border-[#086189] rounded-md focus:outline-none focus:ring-2 focus:ring-[#086189]"
          />
        </div>

        {/* Working Hours Section */}
        <div>
          <h3
            onClick={toggleSchedule}
            className="text-xl font-semibold text-[#086189] mb-4 cursor-pointer flex items-center justify-between"
          >
            Working Hours
            {showSchedule ? (
              <FiChevronUp className="text-[#086189]" />
            ) : (
              <FiChevronDown className="text-[#086189]" />
            )}
          </h3>
          {showSchedule && (
            <div className="grid grid-cols-1 gap-3">
              {days.map((day) => {
                const dayData = formData.workingHours[day];
                return (
                  <div key={day} className="flex items-center justify-between gap-4 bg-gray-50 p-3 rounded-md shadow-sm">
                    <div className="flex items-center gap-2 w-1/2">
                      <input
                        type="checkbox"
                        checked={dayData.available}
                        onChange={() => handleAvailabilityChange(day)}
                        className="accent-[#086189]"
                      />
                      <label className="font-medium ">{day}</label>
                    </div>

                    {dayData.available ? (
                      <div className="flex items-center gap-2 w-1/2 justify-end">
                        <input
                          type="time"
                          value={dayData.from}
                          onChange={(e) => handleHourChange(day, "from", e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={dayData.to}
                          onChange={(e) => handleHourChange(day, "to", e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm w-1/2 text-right">Closed</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-[#086189] text-white px-8 py-2 mt-4 rounded-lg shadow-md hover:bg-[#064a6e] transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
