import React, { useState, useEffect } from "react";
import { FiMessageSquare, FiFilter, FiSend, FiEye } from "react-icons/fi";
import { toast } from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";

const ManageQueries = ({ userType = "admin" }) => {
  const [queries, setQueries] = useState([]);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [response, setResponse] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    priority: ""
  });

  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    fetchQueries();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [queries, filters]);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const response = await axiosWrapper.get("/query", {
        headers: { Authorization: `Bearer ${userToken}` }
      });

      if (response.data.success) {
        setQueries(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch queries");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...queries];

    if (filters.status) {
      filtered = filtered.filter(query => query.status === filters.status);
    }
    if (filters.type) {
      filtered = filtered.filter(query => query.type === filters.type);
    }
    if (filters.priority) {
      filtered = filtered.filter(query => query.priority === filters.priority);
    }

    setFilteredQueries(filtered);
  };

  const handleRespond = async () => {
    if (!response.trim()) {
      toast.error("Please enter a response");
      return;
    }

    try {
      setLoading(true);
      const result = await axiosWrapper.put(`/query/${selectedQuery._id}/respond`, {
        response: response.trim()
      }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });

      if (result.data.success) {
        toast.success("Response sent successfully!");
        setShowResponseModal(false);
        setResponse("");
        setSelectedQuery(null);
        fetchQueries();
      }
    } catch (error) {
      toast.error("Failed to send response");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>;
      case "in-progress":
        return <div className="w-3 h-3 bg-blue-500 rounded-full"></div>;
      case "resolved":
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
      default:
        return <div className="w-3 h-3 bg-gray-500 rounded-full"></div>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "academic":
        return "bg-purple-100 text-purple-800";
      case "administrative":
        return "bg-indigo-100 text-indigo-800";
      case "technical":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Heading
        title="Manage Student Queries"
        subtitle="View and respond to student queries"
        icon={<FiMessageSquare />}
      />

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <FiFilter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="general">General</option>
            <option value="academic">Academic</option>
            <option value="administrative">Administrative</option>
            <option value="technical">Technical</option>
          </select>

          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Queries List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Student Queries</h3>

          {loading ? (
            <Loading text="Loading queries..." />
          ) : filteredQueries.length === 0 ? (
            <NoData
              title="No queries found"
              description="No queries match the current filters."
            />
          ) : (
            <div className="space-y-4">
              {filteredQueries.map((query) => (
                <div key={query._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(query.status)}
                      <div>
                        <h4 className="font-medium text-gray-900">{query.title}</h4>
                        <p className="text-sm text-gray-500">
                          {query.studentId?.firstName} {query.studentId?.lastName} • {query.studentId?.enrollmentNo}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(query.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}>
                        {query.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(query.priority)}`}>
                        {query.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(query.type)}`}>
                        {query.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{query.description}</p>

                  {query.response && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                      <p className="text-sm font-medium text-green-800 mb-1">Your Response:</p>
                      <p className="text-sm text-green-700">{query.response}</p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    {query.status !== "resolved" && (
                      <CustomButton
                        onClick={() => {
                          setSelectedQuery(query);
                          setResponse(query.response || "");
                          setShowResponseModal(true);
                        }}
                        variant="primary"
                        size="sm"
                        icon={<FiSend />}
                      >
                        {query.response ? "Update Response" : "Respond"}
                      </CustomButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Response Modal */}
      {showResponseModal && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <h3 className="text-xl font-bold">Respond to Query</h3>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">{selectedQuery.title}</h4>
                <p className="text-gray-700 mb-2">{selectedQuery.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>From: {selectedQuery.studentId?.firstName} {selectedQuery.studentId?.lastName}</span>
                  <span>Priority: <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedQuery.priority)}`}>{selectedQuery.priority}</span></span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Response
                </label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your response..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <CustomButton
                  onClick={() => {
                    setShowResponseModal(false);
                    setSelectedQuery(null);
                    setResponse("");
                  }}
                  variant="secondary"
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  onClick={handleRespond}
                  variant="primary"
                  loading={loading}
                  icon={<FiSend />}
                >
                  Send Response
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQueries;
