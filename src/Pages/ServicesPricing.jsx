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
  FiList
} from "react-icons/fi";

const ManageServiceList = () => {
  const [categories, setCategories] = useState([]);
  const [newService, setNewService] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [editingService, setEditingService] = useState({
    category: "",
    index: -1,
    name: "",
    price: "",
  });
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({});
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState({
    id: null,
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories from API on mount
  useEffect(() => {
    fetchCategories();
  }, []);

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

  const toggleCategory = async (categoryName, categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));

    // Fetch subcategories when category is expanded
    if (!expandedCategories[categoryName]) {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://176.119.254.225:80/ServiceCategories/categories/${categoryId}/subcategories`
        );
        if (!res.ok) throw new Error("Failed to fetch subcategories");
        const data = await res.json();
        setSubcategoriesByCategory((prev) => ({
          ...prev,
          [categoryName]: data,
        }));
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const addService = async () => {
    if (!newService.trim() || !selectedCategory || !newServicePrice) return;

    const price = parseFloat(newServicePrice);
    if (isNaN(price)) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `http://176.119.254.225:80/ServiceCategories/categories/${selectedCategory}/subcategories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subcategory_name: newService.trim(),
            price: price,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to add service");

      const newSubcategory = await res.json();

      // Update frontend state
      setCategories((prev) =>
        prev.map((category) =>
          category.category_id === parseInt(selectedCategory)
            ? {
                ...category,
                services: [...(category.services || []), newSubcategory],
              }
            : category
        )
      );

      // Update subcategories list if category is expanded
      const categoryObj = categories.find(c => c.category_id === parseInt(selectedCategory));
      if (categoryObj && expandedCategories[categoryObj.category_name]) {
        setSubcategoriesByCategory(prev => ({
          ...prev,
          [categoryObj.category_name]: [
            ...(prev[categoryObj.category_name] || []),
            newSubcategory
          ]
        }));
      }

      // Reset form
      setNewService("");
      setNewServicePrice("");
      setSelectedCategory("");
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
      name: service.subcategory_name,
      price: service.price.toString(),
    });
  };

  const saveEdit = async () => {
    if (
      editingService.index === -1 ||
      !editingService.name.trim() ||
      !editingService.price
    )
      return;

    const price = parseFloat(editingService.price);
    if (isNaN(price)) return;

    const categoryName = editingService.category;
    const subcategory =
      subcategoriesByCategory[categoryName][editingService.index];

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://176.119.254.225:80/ServiceCategories/services/${subcategory.subcategory_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subcategory_name: editingService.name.trim(),
            price: price,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update service");

      const updated = await response.json();

      // Update frontend state
      setSubcategoriesByCategory((prev) => ({
        ...prev,
        [categoryName]: prev[categoryName].map((s, i) =>
          i === editingService.index ? updated : s
        ),
      }));

      setEditingService({ category: "", index: -1, name: "", price: "" });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteService = async (categoryName, index, subcategoryId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://176.119.254.225:80/ServiceCategories/services/${subcategoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete service");
      }

      setSubcategoriesByCategory((prev) => ({
        ...prev,
        [categoryName]: prev[categoryName].filter((_, i) => i !== index),
      }));
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addCategory = async () => {
    if (!newCategoryName.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "http://176.119.254.225:80/ServiceCategories/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_name: newCategoryName.trim(),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add category");

      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditingCategory = (category) => {
    setEditingCategory({
      id: category.category_id,
      name: category.category_name,
    });
  };

  const saveCategoryEdit = async () => {
    if (!editingCategory.name.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://176.119.254.225:80/ServiceCategories/categories/${editingCategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_name: editingCategory.name.trim(),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update category");

      const updatedCategory = await response.json();

      setCategories((prev) =>
        prev.map((cat) =>
          cat.category_id === updatedCategory.category_id
            ? updatedCategory
            : cat
        )
      );

      // Update subcategoriesByCategory key if name changed
      if (editingCategory.name !== updatedCategory.category_name) {
        const oldSubcategories = subcategoriesByCategory[editingCategory.name];
        if (oldSubcategories) {
          setSubcategoriesByCategory((prev) => {
            const newState = { ...prev };
            delete newState[editingCategory.name];
            newState[updatedCategory.category_name] = oldSubcategories;
            return newState;
          });
        }
      }

      setEditingCategory({ id: null, name: "" });
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (categoryId, categoryName) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this category and all its services?"
      )
    )
      return;

    setIsLoading(true);
    try {
      // First delete all subcategories
      const subcategories = subcategoriesByCategory[categoryName] || [];
      for (const subcategory of subcategories) {
        await fetch(
          `http://176.119.254.225:80/ServiceCategories/services/${subcategory.subcategory_id}`,
          {
            method: "DELETE",
          }
        );
      }

      // Then delete the category
      const response = await fetch(
        `http://176.119.254.225:80/ServiceCategories/categories/${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete category");

      // Update state
      setCategories(categories.filter((cat) => cat.category_id !== categoryId));
      setSubcategoriesByCategory((prev) => {
        const newState = { ...prev };
        delete newState[categoryName];
        return newState;
      });
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
            <h1 className="text-2xl font-bold text-gray-800">Service Management</h1>
            <p className="text-gray-500">Manage your workshop services and pricing</p>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 md:mt-0 px-4 py-2 bg-red-100 border border-red-200 text-red-700 rounded-md flex items-center">
            <FiX className="mr-2" onClick={() => setError(null)} />
            {error}
          </div>
        )}
      </div>

      {/* Add New Category Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center mb-4">
          <FiLayers className="text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Add New Category</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="category-name" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiTag className="text-gray-400" />
              </div>
              <input
                type="text"
                id="category-name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. Engine Services"
                className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={addCategory}
              disabled={!newCategoryName.trim() || isLoading}
              className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all ${
                !newCategoryName.trim() || isLoading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              }`}
            >
              {isLoading ? (
                "Adding..."
              ) : (
                <>
                  <FiPlus /> Add Category
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Add New Service Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center mb-4">
          <FiPackage className="text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Add New Service</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="service-category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiList className="text-gray-400" />
              </div>
              <select
                id="service-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="service-name" className="block text-sm font-medium text-gray-700 mb-1">
              Service Name
            </label>
            <input
              type="text"
              id="service-name"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              placeholder="e.g. Oil Change"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="service-price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDollarSign className="text-gray-400" />
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

          <div className="flex items-end">
            <button
              onClick={addService}
              disabled={
                !newService.trim() || !selectedCategory || !newServicePrice || isLoading
              }
              className={`w-full px-5 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                !newService.trim() || !selectedCategory || !newServicePrice || isLoading
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

      {/* Services List by Category */}
      <div className="space-y-5">
        {isLoading && categories.length === 0 ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
            <FiPackage className="mx-auto text-4xl text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-700">No service categories found</h3>
            <p className="text-gray-500">Add your first category to get started</p>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.category_id}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white"
            >
              {/* Category Header */}
              <div
                className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-200"
                onClick={() =>
                  toggleCategory(category.category_name, category.category_id)
                }
              >
                <div className="flex items-center gap-3">
                  {editingCategory.id === category.category_id ? (
                    <div className="flex items-center gap-2 w-full">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiTag className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={editingCategory.name}
                          onChange={(e) =>
                            setEditingCategory((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveCategoryEdit();
                          }}
                          autoFocus
                        />
                      </div>
                      <button
                        onClick={saveCategoryEdit}
                        className="p-2 text-green-600 hover:text-green-800 rounded-lg hover:bg-green-50 transition-colors"
                        title="Save"
                      >
                        <FiCheck size={18} />
                      </button>
                      <button
                        onClick={() => setEditingCategory({ id: null, name: "" })}
                        className="p-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors"
                        title="Cancel"
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <FiLayers className="text-blue-500 mr-2" />
                      <h3 className="font-semibold text-gray-800">
                        {category.category_name}
                      </h3>
                      <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {(subcategoriesByCategory[category.category_name]?.length || 0)} services
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditingCategory(category);
                    }}
                    className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    title="Edit Category"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCategory(category.category_id, category.category_name);
                    }}
                    className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete Category"
                  >
                    <FiTrash2 size={18} />
                  </button>
                  <span className="text-gray-500 ml-2">
                    {expandedCategories[category.category_name] ? (
                      <FiChevronUp size={20} />
                    ) : (
                      <FiChevronDown size={20} />
                    )}
                  </span>
                </div>
              </div>

              {/* Services List */}
              {expandedCategories[category.category_name] && (
                <div className="divide-y divide-gray-200">
                  {isLoading ? (
                    <div className="flex justify-center py-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : subcategoriesByCategory[category.category_name]?.length > 0 ? (
                    subcategoriesByCategory[category.category_name].map(
                      (sub, index) => (
                        <div
                          key={sub.subcategory_id}
                          className="p-4 hover:bg-gray-50 transition-colors"
                        >
                          {editingService.category === category.category_name &&
                          editingService.index === index ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Service Name
                                </label>
                                <input
                                  type="text"
                                  value={editingService.name}
                                  onChange={(e) =>
                                    setEditingService((prev) => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Service name"
                                  autoFocus
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Price
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiDollarSign className="text-gray-400" />
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
                                  />
                                </div>
                              </div>
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
                                    })
                                  }
                                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                                >
                                  <FiX size={16} /> Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium text-gray-800 flex items-center">
                                  <FiPackage className="text-blue-500 mr-2" />
                                  {sub.subcategory_name}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center text-green-700 font-medium">
                                  <FiDollarSign className="mr-1" />
                                  {Number(sub.price).toFixed(2)}
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() =>
                                      startEditing(
                                        category.category_name,
                                        index,
                                        sub
                                      )
                                    }
                                    className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                    title="Edit"
                                  >
                                    <FiEdit2 size={18} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      deleteService(
                                        category.category_name,
                                        index,
                                        sub.subcategory_id
                                      )
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
                      )
                    )
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <FiPackage className="mx-auto text-3xl mb-2" />
                      No services in this category
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageServiceList;