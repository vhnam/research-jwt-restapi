import { Employee } from "../models";

module.exports = {
  getEmployees: async page => {
    const limit = parseInt(process.env.API_OFFSET);
    let offset = 0;

    const pagination = await Employee.count();
    const pages = Math.ceil(pagination / limit);
    offset = limit * (page - 1);

    const employees = await Employee.findAll({
      limit: limit,
      offset: offset
    });

    const response = {
      data: employees,
      total: pagination,
      per_page: limit,
      last_page: pages,
      current_page: page
    };

    return response;
  }
};
