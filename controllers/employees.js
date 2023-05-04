const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET api/employee
 */
const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "failed to fetch employees" });
  }
};

/**
 * @route POST api/employee/add
 */
const add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: "fill all the blanks" });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        // req.user is added from middleware
        userId: req.user.id,
      },
    });
    return res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "failed to create employee" });
  }
};

/**
 * @route POST api/employee/remove/:id
 */
const remove = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.employee.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "employee removed" });
  } catch (error) {
    res.status(500).json({ message: "failed to remove employee" });
  }
};

/**
 * @route PUT api/employee/edit/:id
 */
const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;
  try {
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    res.status(200).json({ message: "employee edited" });
  } catch (error) {
    res.status(500).json({ message: "failed to edit employee" });
  }
};

/**
 * @route GET api/employee/:id
 */
const findEmployee = async (req, res) => {
  // getting id from params not from the body as it is get req
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "failed to find employee" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  findEmployee,
};
