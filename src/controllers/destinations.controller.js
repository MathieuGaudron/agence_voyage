const { Destination, Voyage, Hebergement, Activite } = require("../../models");

// POST crée la destination
exports.create = async (req, res, next) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json(destination);
  } catch (err) {
    next(err);
  }
};

// GET all destinations
exports.list = async (req, res, next) => {
  try {
    const destinations = await Destination.findAll({
      order: [["id", "DESC"]],
    });
    res.json(destinations);
  } catch (err) {
    next(err);
  }
};

// GET destination par ID avec les associations
exports.getByIdWithIncludes = async (req, res, next) => {
  try {
    const destination = await Destination.findByPk(req.params.id, {
      include: [
        { model: Voyage },
        { model: Hebergement },
        { model: Activite },
      ],
    });

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.json(destination);
  } catch (err) {
    next(err);
  }
};

// GET voyages par ID de destination
exports.getVoyagesByDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const voyages = await Voyage.findAll({
      where: { destinationId: req.params.id },
      order: [["dateDepart", "ASC"]],
    });

    res.json(voyages);
  } catch (err) {
    next(err);
  }
};

// GET destinations par continent (mais pas de POST continent du coup dans le sujet ????)
exports.getByContinent = async (req, res, next) => {
  try {
    const continent = req.params.continent;

    const destinations = await Destination.findAll({
      where: { continent },
      order: [["nom", "ASC"]],
    });

    res.json(destinations);
  } catch (err) {
    next(err);
  }
};






