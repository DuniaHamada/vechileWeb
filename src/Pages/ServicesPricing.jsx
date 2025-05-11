import { useState } from "react";

const ServicesPricing = () => {

  const [services, setServices] = useState([
    { id: 1, name: "Oil Change", price: "25" },
    { id: 2, name: "Brake Inspection", price: "40" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price) return;

    if (editingId !== null) {
      setServices((prev) =>
        prev.map((service) =>
          service.id === editingId ? { ...service, ...formData } : service
        )
      );
      setEditingId(null);
    } else {
      setServices((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }

    setFormData({ name: "", price: "" });
  };

  const handleEdit = (service) => {
    setFormData({ name: service.name, price: service.price });
    setEditingId(service.id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#086189] mb-8">
          Services & Pricing  
        </h2>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-10">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Service" : "Add New Service"}
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Service Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price ($)"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-[#086189] text-white py-2 rounded hover:bg-[#086288] transition"
            >
              {editingId ? "Save Changes" : "Add Service"}
            </button>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h4 className="text-lg font-semibold">{service.name}</h4>
                <p className="text-gray-700">${service.price}</p>
              </div>
              <button
                onClick={() => handleEdit(service)}
                className="text-sm text-gray-500 underline hover:text-gray-700"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPricing;
