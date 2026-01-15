const db = require("../../models");
const { Voyage, Destination, Activite, Reservation, Client } = db;
const { Op } = db.Sequelize;

// POST crée le voyage
exports.create = async (req, res, next) => {
  try {
    const voyage = await Voyage.create(req.body);
    res.status(201).json(voyage);
  } catch (err) {
    next(err);
  }
};

// GET avec filtres possibles
exports.listWithFilters = async (req, res, next) => {
  try {
    const { destinationId, prixMin, prixMax, dateFrom, dateTo } = req.query;

    const where = {};

    if (destinationId) where.destinationId = destinationId;

    if (prixMin || prixMax) {
      where.prixBase = {};
      if (prixMin) where.prixBase[Op.gte] = Number(prixMin);
      if (prixMax) where.prixBase[Op.lte] = Number(prixMax);
    }

    if (dateFrom || dateTo) {
      where.dateDepart = {};
      if (dateFrom) where.dateDepart[Op.gte] = new Date(dateFrom);
      if (dateTo) where.dateDepart[Op.lte] = new Date(dateTo);
    }

    const voyages = await Voyage.findAll({
      where,
      include: [{ model: Destination }],
      order: [["dateDepart", "ASC"]],
    });

    res.json(voyages);
  } catch (err) {
    next(err);
  }
};

// GET par ID avec les associations
exports.getByIdWithIncludes = async (req, res, next) => {
  try {
    const voyage = await Voyage.findByPk(req.params.id, {
      include: [
        { model: Destination },
        {
          model: Activite,
          through: { attributes: ["jour", "ordre", "estInclus"] },
        },
      ],
    });

    if (!voyage) return res.status(404).json({ message: "Voyage not found" });

    res.json(voyage);
  } catch (err) {
    next(err);
  }
};

// GET les voyages qui arrivent dans les 30 prochains jours
exports.getProchains = async (req, res, next) => {
  try {
    const now = new Date();
    const in30 = new Date();
    in30.setDate(in30.getDate() + 30);

    const voyages = await Voyage.findAll({
      where: {
        dateDepart: {
          [Op.gte]: now,
          [Op.lte]: in30,
        },
      },
      include: [{ model: Destination }],
      order: [["dateDepart", "ASC"]],
    });

    res.json(voyages);
  } catch (err) {
    next(err);
  }
};

// POST crée la reservation du voyage client 
exports.reserver = async (req, res, next) => {
  const t = await db.sequelize.transaction();
  try {
    const voyageId = req.params.id;
    const { clientId, nombrePersonnes } = req.body;

    if (!clientId) {
      await t.rollback();
      return res.status(400).json({ message: "clientId is required" });
    }

    const nb = Math.max(parseInt(nombrePersonnes || "1", 10), 1);

    const voyage = await Voyage.findByPk(voyageId, { transaction: t });
    if (!voyage) {
      await t.rollback();
      return res.status(404).json({ message: "Voyage not found" });
    }

    const client = await Client.findByPk(clientId, { transaction: t });
    if (!client) {
      await t.rollback();
      return res.status(404).json({ message: "Client not found" });
    }

    if (voyage.placesDisponibles < nb) {
      await t.rollback();
      return res.status(400).json({ message: "Not enough places disponibles" });
    }

    const prixTotal = Number(voyage.prixBase) * nb;

    const reservation = await Reservation.create(
      {
        dateReservation: new Date(),
        nombrePersonnes: nb,
        prixTotal,
        clientId: client.id,
        voyageId: voyage.id,
      },
      { transaction: t }
    );

    await voyage.update(
      { placesDisponibles: voyage.placesDisponibles - nb },
      { transaction: t }
    );

    await t.commit();
    return res.status(201).json(reservation);
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

