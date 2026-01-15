const db = require("../../models");
const { Reservation, Client, Voyage, Destination } = db;
const { Op } = db.Sequelize;

// POST crée la reservation
exports.create = async (req, res, next) => {
  const t = await db.sequelize.transaction();
  try {
    const { clientId, voyageId, nombrePersonnes } = req.body;

    if (!clientId || !voyageId) {
      await t.rollback();
      return res.status(400).json({ message: "clientId and voyageId are required" });
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
        statut: "En attente",
        clientId,
        voyageId,
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

// GET les reservations par client
exports.listByClient = async (req, res, next) => {
  try {
    const clientId = req.params.clientId;

    const reservations = await Reservation.findAll({
      where: { clientId },
      include: [
        {
          model: Voyage,
          include: [{ model: Destination }],
        },
      ],
      order: [["dateReservation", "DESC"]],
    });

    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

// GET les reservations par voyage
exports.listByVoyage = async (req, res, next) => {
  try {
    const voyageId = req.params.voyageId;

    const reservations = await Reservation.findAll({
      where: { voyageId },
      include: [{ model: Client }],
      order: [["dateReservation", "DESC"]],
    });

    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

// PUT annule la reservation
exports.annuler = async (req, res, next) => {
  const t = await db.sequelize.transaction();
  try {
    const reservation = await Reservation.findByPk(req.params.id, { transaction: t });
    if (!reservation) {
      await t.rollback();
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (reservation.statut === "Annulée") {
      await t.rollback();
      return res.status(400).json({ message: "Reservation already cancelled" });
    }

    const voyage = await Voyage.findByPk(reservation.voyageId, { transaction: t });
    if (!voyage) {
      await t.rollback();
      return res.status(404).json({ message: "Voyage not found" });
    }

    await reservation.update({ statut: "Annulée" }, { transaction: t });

    await voyage.update(
      { placesDisponibles: voyage.placesDisponibles + reservation.nombrePersonnes },
      { transaction: t }
    );

    await t.commit();
    res.json(reservation);
  } catch (err) {
    await t.rollback();
    next(err);
  }
};
