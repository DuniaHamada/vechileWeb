import { 
  Printer,
  Download,
  ArrowLeft,
  MoreVertical,
  Mail,
  Calendar,
  User,
  Car,
  Wrench,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Plus,
  ChevronDown,
  Search,
  Filter,
  X
} from "lucide-react";
import { useState } from 'react';

const InvoicesPage = () => {
  // Sample invoice data
  const initialInvoices = [
    {
      id: "INV-2023-001",
      customer: "Ahmad Ali",
      vehicle: "Toyota Camry 2020",
      date: "May 15, 2023",
      dueDate: "May 30, 2023",
      status: "paid",
      amount: 320,
      services: [
        { name: "Oil Change", price: 120 },
        { name: "Brake Inspection", price: 80 },
        { name: "Tire Rotation", price: 120 }
      ]
    },
    {
      id: "INV-2023-002",
      customer: "Mohammed Salem",
      vehicle: "Nissan Altima 2019",
      date: "May 18, 2023",
      dueDate: "June 2, 2023",
      status: "pending",
      amount: 275,
      services: [
        { name: "Full Diagnostic", price: 150 },
        { name: "Battery Replacement", price: 125 }
      ]
    },
    {
      id: "INV-2023-003",
      customer: "Sarah Johnson",
      vehicle: "Honda Accord 2021",
      date: "May 20, 2023",
      dueDate: "June 4, 2023",
      status: "overdue",
      amount: 420,
      services: [
        { name: "Transmission Service", price: 220 },
        { name: "Coolant Flush", price: 120 },
        { name: "Air Filter Replacement", price: 80 }
      ]
    },
    {
      id: "INV-2023-004",
      customer: "David Wilson",
      vehicle: "Ford F-150 2022",
      date: "June 5, 2023",
      dueDate: "June 20, 2023",
      status: "paid",
      amount: 380,
      services: [
        { name: "Engine Tune-up", price: 200 },
        { name: "Wheel Alignment", price: 180 }
      ]
    },
    {
      id: "INV-2023-005",
      customer: "Emily Chen",
      vehicle: "Hyundai Tucson 2021",
      date: "June 10, 2023",
      dueDate: "June 25, 2023",
      status: "pending",
      amount: 195,
      services: [
        { name: "Oil Change", price: 120 },
        { name: "Cabin Air Filter Replacement", price: 75 }
      ]
    }
  ];

  const [invoices, setInvoices] = useState(initialInvoices);
  const [filteredInvoices, setFilteredInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateSort, setDateSort] = useState('newest');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    customer: '',
    vehicle: '',
    services: [{ name: '', price: 0 }]
  });
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // Status colors and icons
  const statusStyles = {
    paid: { bg: "bg-emerald-50", text: "text-emerald-700", icon: <CheckCircle className="w-4 h-4" /> },
    pending: { bg: "bg-amber-50", text: "text-amber-700", icon: <Loader2 className="w-4 h-4 animate-spin" /> },
    overdue: { bg: "bg-rose-50", text: "text-rose-700", icon: <XCircle className="w-4 h-4" /> }
  };

  // Custom color variables
  const primaryColor = 'bg-[#086189]';
  const primaryHoverColor = 'hover:bg-[#0a73a1]';
  const primaryTextColor = 'text-[#086189]';
  const primaryBorderColor = 'border-[#086189]';

  // Filter and sort functions
  const applyFiltersAndSort = () => {
    let result = [...initialInvoices];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(invoice => 
        invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(invoice => invoice.status === statusFilter);
    }
    
    // Apply date sort
    result.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredInvoices(result);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    applyFiltersAndSort();
  };

  // Handle status filter change
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setShowFilterDropdown(false);
    applyFiltersAndSort();
  };

  // Handle date sort change
  const handleDateSort = (sort) => {
    setDateSort(sort);
    setShowDateDropdown(false);
    applyFiltersAndSort();
  };

  // Handle print
  const handlePrint = () => {
    window.print();
    setSuccessMessage('Invoice printed successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Handle send
  const handleSend = () => {
    setSuccessMessage('Invoice sent to customer successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Handle create new invoice
  const handleCreateNew = () => {
    setIsCreatingNew(true);
  };

  // Handle save new invoice
  const handleSaveNewInvoice = () => {
    const newId = `INV-2023-${String(initialInvoices.length + 1).padStart(3, '0')}`;
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);
    const dueDateStr = dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const totalAmount = newInvoice.services.reduce((sum, service) => sum + service.price, 0);

    const invoiceToAdd = {
      id: newId,
      customer: newInvoice.customer,
      vehicle: newInvoice.vehicle,
      date: currentDate,
      dueDate: dueDateStr,
      status: "pending",
      amount: totalAmount,
      services: newInvoice.services
    };

    const updatedInvoices = [invoiceToAdd, ...initialInvoices];
    setInvoices(updatedInvoices);
    initialInvoices.unshift(invoiceToAdd); // Add to initial array
    setIsCreatingNew(false);
    setNewInvoice({
      customer: '',
      vehicle: '',
      services: [{ name: '', price: 0 }]
    });

    setSuccessMessage('New invoice created successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // Reapply filters after adding new invoice
    applyFiltersAndSort();
  };

  // Service field functions
  const addServiceField = () => {
    setNewInvoice({
      ...newInvoice,
      services: [...newInvoice.services, { name: '', price: 0 }]
    });
  };

  const removeServiceField = (index) => {
    const updatedServices = newInvoice.services.filter((_, i) => i !== index);
    setNewInvoice({
      ...newInvoice,
      services: updatedServices
    });
  };

  const updateServiceField = (index, field, value) => {
    const updatedServices = [...newInvoice.services];
    updatedServices[index][field] = field === 'price' ? Number(value) : value;
    setNewInvoice({
      ...newInvoice,
      services: updatedServices
    });
  };

  // Calculate stats
  const totalRevenue = initialInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingInvoices = initialInvoices.filter(invoice => invoice.status === 'pending');
  const overdueInvoices = initialInvoices.filter(invoice => invoice.status === 'overdue');
  const paidInvoices = initialInvoices.filter(invoice => invoice.status === 'paid');

  return (
    <div className="p-6 min-h-screen ">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`${primaryColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between`}>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>{successMessage}</span>
            </div>
            <button 
              onClick={() => setShowSuccess(false)}
              className="ml-4 text-white hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
           
          </div>
          <button 
            onClick={handleCreateNew}
            className={`flex items-center gap-2 px-4 py-2.5 ${primaryColor} text-white rounded-lg ${primaryHoverColor} transition-colors text-sm font-medium shadow-sm`}
          >
            <Plus className="w-4 h-4" />
            Create New
          </button>
        </div>

        {/* Create New Invoice Form */}
        {isCreatingNew && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs mb-6">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Create New Invoice</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsCreatingNew(false)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveNewInvoice}
                  className={`px-3 py-1.5 ${primaryColor} text-white rounded-lg ${primaryHoverColor} transition-colors text-sm font-medium shadow-sm`}
                >
                  Save Invoice
                </button>
              </div>
            </div>

            <div className="p-5 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={newInvoice.customer}
                    onChange={(e) => setNewInvoice({...newInvoice, customer: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#086189] focus:border-[#086189] outline-none transition-all"
                    placeholder="Enter customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                  <input
                    type="text"
                    value={newInvoice.vehicle}
                    onChange={(e) => setNewInvoice({...newInvoice, vehicle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#086189] focus:border-[#086189] outline-none transition-all"
                    placeholder="Enter vehicle details"
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Services</h3>
                  <button 
                    onClick={addServiceField}
                    className={`text-xs ${primaryTextColor} hover:underline`}
                  >
                    + Add Service
                  </button>
                </div>
                
                {newInvoice.services.map((service, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-3">
                    <div className="md:col-span-3">
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => updateServiceField(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#086189] focus:border-[#086189] outline-none transition-all"
                        placeholder="Service name"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={service.price}
                        onChange={(e) => updateServiceField(index, 'price', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#086189] focus:border-[#086189] outline-none transition-all"
                        placeholder="Price"
                      />
                    </div>
                    <div className="flex items-center">
                      {newInvoice.services.length > 1 && (
                        <button 
                          onClick={() => removeServiceField(index)}
                          className="p-2 text-gray-400 hover:text-rose-500 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filters and Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#086189] focus:border-[#086189] outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            {/* Status Filter Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <Filter className="w-4 h-4" />
                {statusFilter === 'all' ? 'Filter' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showFilterDropdown && (
                <div className="absolute z-10 mt-1 w-40 bg-white shadow-lg rounded-lg border border-gray-200">
                  <div className="py-1">
                    <button
                      onClick={() => handleStatusFilter('all')}
                      className={`block w-full text-left px-4 py-2 text-sm ${statusFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      All Statuses
                    </button>
                    <button
                      onClick={() => handleStatusFilter('paid')}
                      className={`block w-full text-left px-4 py-2 text-sm ${statusFilter === 'paid' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      Paid
                    </button>
                    <button
                      onClick={() => handleStatusFilter('pending')}
                      className={`block w-full text-left px-4 py-2 text-sm ${statusFilter === 'pending' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleStatusFilter('overdue')}
                      className={`block w-full text-left px-4 py-2 text-sm ${statusFilter === 'overdue' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      Overdue
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Date Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowDateDropdown(!showDateDropdown)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <Calendar className="w-4 h-4" />
                {dateSort === 'newest' ? 'Newest First' : 'Oldest First'}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showDateDropdown && (
                <div className="absolute z-10 mt-1 w-40 bg-white shadow-lg rounded-lg border border-gray-200">
                  <div className="py-1">
                    <button
                      onClick={() => handleDateSort('newest')}
                      className={`block w-full text-left px-4 py-2 text-sm ${dateSort === 'newest' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      Newest First
                    </button>
                    <button
                      onClick={() => handleDateSort('oldest')}
                      className={`block w-full text-left px-4 py-2 text-sm ${dateSort === 'oldest' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      Oldest First
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold mt-1">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              <span className="text-emerald-600">{paidInvoices.length} paid</span>, {pendingInvoices.length} pending
            </p>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold mt-1">${pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)}</p>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              <span className="text-amber-600">{pendingInvoices.length} invoices</span> awaiting payment
            </p>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <p className="text-2xl font-semibold mt-1">${overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)}</p>
              </div>
              <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
                <XCircle className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              <span className="text-rose-600">{overdueInvoices.length} invoices</span> past due date
            </p>
          </div>
        </div>

        {/* Invoice List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrint}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  onClick={handlePrint}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Printer className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#086189] hover:text-[#0a73a1] transition-colors cursor-pointer">
                        {invoice.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#086189]/10 flex items-center justify-center text-[#086189]">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{invoice.customer}</div>
                          <div className="text-xs text-gray-500">{invoice.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Car className="w-4 h-4 mr-2 text-gray-400" />
                        <div className="text-sm text-gray-500">{invoice.vehicle}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{invoice.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${invoice.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles[invoice.status].bg} ${statusStyles[invoice.status].text}`}>
                        {statusStyles[invoice.status].icon}
                        <span className="ml-1.5 capitalize">{invoice.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center gap-1">
                        <button 
                          onClick={handlePrint}
                          className="p-1.5 text-gray-400 hover:text-[#086189] hover:bg-[#086189]/10 rounded-lg transition-colors"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-[#086189] hover:bg-[#086189]/10 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={handleSend}
                          className="p-1.5 text-gray-400 hover:text-[#086189] hover:bg-[#086189]/10 rounded-lg transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredInvoices.length}</span> of <span className="font-medium">{filteredInvoices.length}</span> results
            </div>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Preview */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Invoice Preview</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Edit
              </button>
              <button 
                onClick={handleSend}
                className={`px-3 py-1.5 ${primaryColor} text-white rounded-lg ${primaryHoverColor} transition-colors text-sm font-medium shadow-sm`}
              >
                Send to Customer
              </button>
            </div>
          </div>

          <div className="p-5 md:p-8">
            {/* Invoice Header */}
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-10 w-10 rounded-lg ${primaryColor} flex items-center justify-center text-white`}>
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">AutoFix Workshop</h3>
                    <p className="text-sm text-gray-500">123 Garage Street, Workshop City</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Phone: (123) 456-7890</p>
              </div>
              <div className="mt-6 md:mt-0">
                <h1 className="text-2xl font-bold text-gray-900">INV-2023-001</h1>
                <div className="flex items-center mt-3 text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Issued: May 15, 2023</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Due: May 30, 2023</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Bill To</h4>
                <p className="font-medium">Ahmad Ali</p>
                <p className="text-sm text-gray-500">123 Customer Street</p>
                <p className="text-sm text-gray-500">Riyadh, Saudi Arabia</p>
                <p className="text-sm text-gray-500">Phone: (555) 123-4567</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Vehicle Info</h4>
                <p className="font-medium">Toyota Camry 2020</p>
                <p className="text-sm text-gray-500">VIN: JT2BF22K3W0123456</p>
                <p className="text-sm text-gray-500">Mileage: 45,320 km</p>
                <p className="text-sm text-gray-500">License Plate: ABC 1234</p>
              </div>
            </div>

            {/* Services Table */}
            <div className="mb-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Oil Change</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Full synthetic oil change with filter</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">$120.00</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Brake Inspection</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Complete brake system inspection</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">$80.00</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tire Rotation</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Four tire rotation and balance</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">$120.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full md:w-1/3">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="text-sm font-medium">$320.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tax (15%):</span>
                    <span className="text-sm font-medium">$48.00</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between">
                    <span className="text-base font-semibold">Total:</span>
                    <span className="text-base font-semibold">$368.00</span>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;