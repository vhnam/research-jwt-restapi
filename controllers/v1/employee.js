import { employeeService } from "../../services";

module.exports = {
  getEmployees: async (req, res) => {
    try {
      const page = parseInt(req.query.page || req.query.p || 1);
      const response = await employeeService.getEmployees(page);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
