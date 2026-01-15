const { Client } = require("../../models");

// POST crée un client
exports.create = async (req, res, next) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
};

// GET all avec la pagination il a 10 par page
exports.list = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "10", 10), 1), 100);
    const offset = (page - 1) * limit;

    const { rows, count } = await Client.findAndCountAll({
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    res.json({
      page,
      limit,
      total: count,
      results: rows,
    });
  } catch (err) {
    next(err);
  }
};

// GET client par ID
exports.getById = async (req, res, next) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (err) {
    next(err);
  }
};

// PUT un client par ID
exports.update = async (req, res, next) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    await client.update(req.body);
    res.json(client);
  } catch (err) {
    next(err);
  }
};

// DELETE un clent par ID
exports.remove = async (req, res, next) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    await client.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
