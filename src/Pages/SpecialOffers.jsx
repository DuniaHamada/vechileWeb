import { useState } from "react";

const SpecialOffers = () => {

  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "Free Oil Change",
      description: "Get a free oil change with every full service booking.",
      button: "Claim Offer",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    button: "Book Now",
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) return;

    if (editingId !== null) {
      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === editingId ? { ...offer, ...formData } : offer
        )
      );
      setEditingId(null);
    } else {
      setOffers((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }

    setFormData({ title: "", description: "", button: "Book Now" });
  };

  const handleEdit = (offer) => {
    setFormData({
      title: offer.title,
      description: offer.description,
      button: offer.button,
    });
    setEditingId(offer.id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#086189] mb-8">
          Special Offers
        </h2>

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-10">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Offer" : "Add New Offer"}
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Offer Title"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Offer Description"
              rows="3"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="button"
              value={formData.button}
              onChange={handleChange}
              placeholder="Button Text"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-[#086189] text-white py-2 rounded  transition"
            >
              {editingId ? "Save Changes" : "Add Offer"}
            </button>
          </div>
        </div>

        {/* Offers List */}
        <div className="space-y-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white p-4 rounded-lg shadow flex flex-col gap-2"
            >
              <h4 className="text-lg font-semibold">{offer.title}</h4>
              <p className="text-gray-700">{offer.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#086189]">{offer.button}</span>
                <button
                  onClick={() => handleEdit(offer)}
                  className="text-sm text-gray-500 underline hover:text-gray-700"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
