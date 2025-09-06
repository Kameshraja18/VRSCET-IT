const Query = require("../models/query.model");
const ApiResponse = require("../utils/ApiResponse");

// Create a new query
const createQueryController = async (req, res) => {
  try {
    const { title, description, type, priority } = req.body;
    const studentId = req.user.userId;

    const query = new Query({
      title,
      description,
      type: type || "general",
      priority: priority || "medium",
      studentId,
      status: "pending"
    });

    await query.save();

    res.status(201).json(new ApiResponse(true, "Query submitted successfully", query));
  } catch (error) {
    console.error("Create query error:", error);
    res.status(500).json(new ApiResponse(false, "Failed to submit query"));
  }
};

// Get all queries (for admin/faculty)
const getQueriesController = async (req, res) => {
  try {
    const { status, type, priority } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (type) filter.type = type;
    if (priority) filter.priority = priority;

    const queries = await Query.find(filter)
      .populate("studentId", "firstName lastName email enrollmentNo")
      .sort({ createdAt: -1 });

    res.json(new ApiResponse(true, "Queries fetched successfully", queries));
  } catch (error) {
    console.error("Get queries error:", error);
    res.status(500).json(new ApiResponse(false, "Failed to fetch queries"));
  }
};

// Get student's own queries
const getMyQueriesController = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const queries = await Query.find({ studentId }).sort({ createdAt: -1 });

    res.json(new ApiResponse(true, "Your queries fetched successfully", queries));
  } catch (error) {
    console.error("Get my queries error:", error);
    res.status(500).json(new ApiResponse(false, "Failed to fetch your queries"));
  }
};

// Respond to a query
const respondToQueryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;
    const responderId = req.user.userId;
    const responderType = req.user.type;

    const query = await Query.findById(id);
    if (!query) {
      return res.status(404).json(new ApiResponse(false, "Query not found"));
    }

    query.response = response;
    query.responderId = responderId;
    query.responderType = responderType;
    query.status = "resolved";
    query.respondedAt = new Date();

    await query.save();

    res.json(new ApiResponse(true, "Query responded successfully", query));
  } catch (error) {
    console.error("Respond to query error:", error);
    res.status(500).json(new ApiResponse(false, "Failed to respond to query"));
  }
};

// Delete a query
const deleteQueryController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const userType = req.user.type;

    const query = await Query.findById(id);
    if (!query) {
      return res.status(404).json(new ApiResponse(false, "Query not found"));
    }

    // Allow deletion by the student who created it or by admin
    if (query.studentId.toString() !== userId && userType !== "admin") {
      return res.status(403).json(new ApiResponse(false, "Not authorized to delete this query"));
    }

    await Query.findByIdAndDelete(id);

    res.json(new ApiResponse(true, "Query deleted successfully"));
  } catch (error) {
    console.error("Delete query error:", error);
    res.status(500).json(new ApiResponse(false, "Failed to delete query"));
  }
};

module.exports = {
  createQueryController,
  getQueriesController,
  respondToQueryController,
  deleteQueryController,
  getMyQueriesController
};
