import React, { useState, useEffect } from "react";
import { FiSend, FiMessageSquare, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { toast } from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";

const StudentQueries = () => {
  const [queries, setQueries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "general",
    priority: "medium"
  });

  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    fetchMyQueries();
  }, []);

  const fetchMyQueries = async () => {
    try {
      setLoading(true);
      const response = await axiosWrapper.get("/query/my");

      if (response.data.success) {
        setQueries(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch queries");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuery = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosWrapper.post("/query", formData);

      if (response.data.success) {
        toast.success("Query submitted successfully!");
        setFormData({ title: "", description: "", type: "general", priority: "medium" });
        setShowForm(false);
        fetchMyQueries();
      }
    } catch (error) {
      toast.error("Failed to submit query");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock className="w-5 h-5 text-yellow-500" />;
      case "in-progress":
        return <FiAlertCircle className="w-5 h-5 text-blue-500" />;
      case "resolved":
        return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <FiMessageSquare className="w-5 h-5 text-gray-500" />;
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="My Queries" subtitle="Submit and track your queries" />
        <CustomButton
          onClick={() => setShowForm(!showForm)}
          variant="primary"
          icon={<FiMessageSquare />}
        >
          {showForm ? "Cancel" : "New Query"}
        </CustomButton>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Submit New Query</h3>
          <form onSubmit={handleSubmitQuery} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief title for your query"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed description of your query"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="academic">Academic</option>
                  <option value="administrative">Administrative</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <CustomButton
                type="button"
                onClick={() => setShowForm(false)}
                variant="secondary"
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                variant="primary"
                loading={loading}
                icon={<FiSend />}
              >
                Submit Query
              </CustomButton>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Query History</h3>

          {loading ? (
            <Loading text="Loading queries..." />
          ) : queries.length === 0 ? (
            <NoData
              title="No queries found"
              description="You haven't submitted any queries yet."
              actionButton={
                <CustomButton
                  onClick={() => setShowForm(true)}
                  variant="primary"
                  icon={<FiMessageSquare />}
                >
                  Submit Your First Query
                </CustomButton>
              }
            />
          ) : (
            <div className="space-y-4">
              {queries.map((query) => (
                <div key={query._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(query.status)}
                      <div>
                        <h4 className="font-medium text-gray-900">{query.title}</h4>
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
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{query.description}</p>

                  {query.response && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-800 mb-1">Response:</p>
                      <p className="text-sm text-green-700">{query.response}</p>
                      {query.respondedAt && (
                        <p className="text-xs text-green-600 mt-1">
                          Responded on {new Date(query.respondedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentQueries;
