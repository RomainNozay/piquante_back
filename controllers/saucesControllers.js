//importation du model sauces
const sauces = require("../models/saucesModel");


// Logiques métiers pour les sauces

// Création d'une nouvelle sauce (Post)
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    // Création d'un nouvel objet Sauce
    const sauce = new sauces({
      ...sauceObject,
      // Création de l'URL de l'image : http://localhost:3000/image/nomdufichier 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // Enregistrement de l'objet sauce dans la base de données
    sauce
      .save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

  // Lecture de toutes les sauces dans la base de données (Get)
 exports.getSauces = (req, res, next) => {
    sauces
      .find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };
  
  // Lecture d'une sauce avec son ID (Get/:id)
  exports.getOneSauce = (req, res, next) => {
    sauces
      .findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };

 //Modifié une sauce
 exports.modifyOneSauce = (req, res, next) => {
    const sauceObject = req.file ?
      // Si il existe déjà une image
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body }; 
      // Si il n'existe pas d'image
      sauces
        .updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
  };

  //Supprimer une sauce
  exports.deleteSauce = (req, res, next) => {
    sauces
    .deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }))
  }
