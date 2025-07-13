import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiDollarSign,
  FiX,
  FiCheck,
  FiLayers,
  FiTag,
  FiPackage,
  FiSettings,
  FiList,
} from "react-icons/fi";

const ManageServiceList = () => {
  const [categories, setCategories] = useState([]);
  const [workshopServices, setWorkshopServices] = useState([]);
  const [categoryServices, setCategoryServices] = useState([]);
  const [newService, setNewService] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [editingService, setEditingService] = useState({
    category: "",
    index: -1,
    name: "",
    price: "",
    is_mobile: false,
    mobile_fee: "",
  });
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({});
  const [isWorkshopService, setIsWorkshopService] = useState(true);
  const [isMobileService, setIsMobileService] = useState(false);
  const [mobileFee, setMobileFee] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories and workshop services from API on mount
  useEffect(() => {
    fetchCategories();
    fetchWorkshopServices();
  }, []);

  // Process workshop services and organize them by category
  useEffect(() => {
    if (workshopServices.length > 0 && categories.length > 0) {
      const servicesByCategory = {};

      // Group workshop services by category
      workshopServices.forEach((service) => {
        const category = categories.find(
          (cat) => cat.category_id === service.category_id
        );
        if (category) {
          if (!servicesByCategory[category.category_name]) {
            servicesByCategory[category.category_name] = [];
          }
          servicesByCategory[category.category_name].push(service);
        }
      });

      // Update subcategoriesByCategory with workshop services
      setSubcategoriesByCategory(servicesByCategory);
    }
  }, [workshopServices, categories]);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "http://176.119.254.225:80/ServiceCategories/categories"
      );
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWorkshopServices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Get workshop ID from localStorage or use a default
      const workshopId = localStorage.getItem("workshopId");

      const token = localStorage.getItem("accessToken");

      const res = await fetch(
        `http://176.119.254.225:80/service/workshops/${workshopId}/services`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch workshop services");
      const data = await res.json();
      setWorkshopServices(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching workshop services:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategoryServices = async (categoryId) => {
    if (!categoryId) {
      setCategoryServices([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://176.119.254.225:80/ServiceCategories/categories/${categoryId}/subcategories`
      );
      if (!res.ok) throw new Error("Failed to fetch category services");
      const data = await res.json();
      setCategoryServices(data);
    } catch (error) {
      console.error("Error fetching category services:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = async (categoryName, categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const addService = async () => {
    if (!newService.trim() || !selectedCategory || !newServicePrice) return;

    const price = parseFloat(newServicePrice);
    if (isNaN(price)) return;

    // Validate that at least one service type is selected
    if (!isWorkshopService && !isMobileService) {
      alert("Please select at least one service type (Workshop or Mobile)");
      return;
    }

    // Validate mobile fee if mobile service is selected
    if (isMobileService && (!mobileFee || parseFloat(mobileFee) < 0)) {
      alert("Please enter a valid mobile fee for mobile services");
      return;
    }

    // Find the selected service from categoryServices
    const selectedService = categoryServices.find(
      (service) => service.subcategory_name === newService
    );
    if (!selectedService) return;

    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    const workshopId = localStorage.getItem("workshopId");
    try {
      // Get workshop ID from localStorage

      const res = await fetch(`http://176.119.254.225:80/service/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          service_name: selectedService.subcategory_name,
          service_description: selectedService.service_description || "",
          category_id: parseInt(selectedCategory),
          subcategory_id: selectedService.subcategory_id,
          price: price,
          workshop_id: workshopId,
          estimated_duration: 60, // Default 1 hour
          is_workshop: isWorkshopService,
          is_mobile: isMobileService,
          mobile_fee: isMobileService ? parseFloat(mobileFee) : 0,
        }),
      });

      if (!res.ok) throw new Error("Failed to add service");

      // Refresh workshop services to show the newly added service
      await fetchWorkshopServices();

      // Reset form
      setNewService("");
      setNewServicePrice("");
      setSelectedCategory("");
      setIsWorkshopService(true);
      setIsMobileService(false);
      setMobileFee("");
    } catch (error) {
      console.error("Error adding service:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (categoryName, index, service) => {
    setEditingService({
      category: categoryName,
      index,
      name: service.service_name,
      price: service.price,
      is_mobile: service.is_mobile,
      mobile_fee: service.mobile_fee || "",
    });
  };

  const saveEdit = async () => {
    if (
      editingService.index === -1 ||
      !editingService.price
    )
      return;

    const price = parseFloat(editingService.price);
    if (isNaN(price)) return;

    // Validate mobile fee if mobile service is selected
    if (editingService.is_mobile && (!editingService.mobile_fee || parseFloat(editingService.mobile_fee) < 0)) {
      alert("Please enter a valid mobile fee for mobile services");
      return;
    }

    const service = workshopServices[editingService.index];

    setIsLoading(true);
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `http://176.119.254.225:80/service/services/${service.service_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            price: price,
            is_mobile: editingService.is_mobile,
            mobile_fee: editingService.is_mobile ? parseFloat(editingService.mobile_fee) : 0,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update service");
      }

      // Refresh workshop services to reflect the update
      await fetchWorkshopServices();

      setEditingService({ category: "", index: -1, name: "", price: "", is_mobile: false, mobile_fee: "" });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteService = async (categoryName, index, serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://176.119.254.225:80/service/services/${serviceId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete service");
      }

      // Refresh workshop services to reflect the deletion
      await fetchWorkshopServices();
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
            <FiSettings className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Service Management
            </h1>
            <p className="text-gray-500">
              Manage your workshop services and pricing
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 md:mt-0 px-4 py-2 bg-red-100 border border-red-200 text-red-700 rounded-md flex items-center">
            <FiX className="mr-2" onClick={() => setError(null)} />
            {error}
          </div>
        )}
      </div>

      {/* Add New Service Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center mb-4">
          <FiPackage className="text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">
            Add New Service
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="service-category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiList className="text-gray-400" />
              </div>
              <select
                id="service-category"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  fetchCategoryServices(e.target.value);
                  setNewService(""); // Reset service selection when category changes
                }}
                className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="service-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Service Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPackage className="text-gray-400" />
              </div>
              <select
                id="service-name"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                disabled={!selectedCategory}
              >
                <option value="">
                  {selectedCategory
                    ? "Select Service"
                    : "Select Category First"}
                </option>
                {categoryServices.map((service) => (
                  <option
                    key={service.subcategory_id}
                    value={service.subcategory_name}
                  >
                    {service.subcategory_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="service-price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">₪</span>
              </div>
              <input
                type="number"
                id="service-price"
                value={newServicePrice}
                onChange={(e) => setNewServicePrice(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Type
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isWorkshopService}
                  onChange={(e) => setIsWorkshopService(e.target.checked)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Workshop Service</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isMobileService}
                  onChange={(e) => setIsMobileService(e.target.checked)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Mobile Service</span>
              </label>
            </div>
          </div>

          {isMobileService && (
            <div>
              <label
                htmlFor="mobile-fee"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Fee
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">₪</span>
                </div>
                <input
                  type="number"
                  id="mobile-fee"
                  value={mobileFee}
                  onChange={(e) => setMobileFee(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div className="flex items-end">
            <button
              onClick={addService}
              disabled={
                !newService.trim() ||
                !selectedCategory ||
                !newServicePrice ||
                (!isWorkshopService && !isMobileService) ||
                (isMobileService && !mobileFee) ||
                isLoading
              }
              className={`w-full px-5 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                !newService.trim() ||
                !selectedCategory ||
                !newServicePrice ||
                (!isWorkshopService && !isMobileService) ||
                (isMobileService && !mobileFee) ||
                isLoading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              }`}
            >
              {isLoading ? (
                "Adding..."
              ) : (
                <>
                  <FiPlus /> Add Service
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-5">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : workshopServices.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
            <FiPackage className="mx-auto text-4xl text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-700">
              No services found
            </h3>
            <p className="text-gray-500">
              Add your first service to get started
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Workshop Services ({workshopServices.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {workshopServices.map((service, index) => (
                <div
                  key={service.service_id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  {editingService.index === index ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400">₪</span>
                          </div>
                          <input
                            type="number"
                            value={editingService.price}
                            onChange={(e) =>
                              setEditingService((prev) => ({
                                ...prev,
                                price: e.target.value,
                              }))
                            }
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            autoFocus
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile Service
                        </label>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingService.is_mobile}
                            onChange={(e) =>
                              setEditingService((prev) => ({
                                ...prev,
                                is_mobile: e.target.checked,
                              }))
                            }
                            className="mr-2 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Mobile Service</span>
                        </div>
                      </div>
                      {editingService.is_mobile && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mobile Fee
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-400">₪</span>
                            </div>
                            <input
                              type="number"
                              value={editingService.mobile_fee}
                              onChange={(e) =>
                                setEditingService((prev) => ({
                                  ...prev,
                                  mobile_fee: e.target.value,
                                }))
                              }
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={saveEdit}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                        >
                          <FiCheck size={16} /> Save
                        </button>
                        <button
                          onClick={() =>
                            setEditingService({
                              category: "",
                              index: -1,
                              name: "",
                              price: "",
                              is_mobile: false,
                              mobile_fee: "",
                            })
                          }
                          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                        >
                          <FiX size={16} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 flex items-center mb-1">
                          <FiPackage className="text-blue-500 mr-2" />
                          {service.service_name}
                          <div className="flex gap-1 ml-2">
                            {service.is_workshop && (
                              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                Workshop
                              </span>
                            )}
                            {service.is_mobile && (
                              <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                                Mobile
                              </span>
                            )}
                          </div>
                        </div>
                        {service.service_description && (
                          <div className="text-sm text-gray-600 mb-2">
                            {service.service_description}
                          </div>
                        )}
                        {service.is_mobile && service.mobile_fee > 0 && (
                          <div className="text-sm text-gray-600">
                            Mobile Fee: ₪{Number(service.mobile_fee).toFixed(2)}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-green-700 font-medium">
                          <span className="mr-1">₪</span>
                          {Number(service.price).toFixed(2)}
                          {service.is_mobile && service.mobile_fee > 0 && (
                            <span className="text-xs text-gray-500 ml-1">
                              +₪{Number(service.mobile_fee).toFixed(2)} mobile
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditing("", index, service)}
                            className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() =>
                              deleteService("", index, service.service_id)
                            }
                            className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
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

export default ManageServiceList;
