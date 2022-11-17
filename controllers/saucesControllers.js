const sauces = require("../models/saucesModel");
const fs = require("fs");

const regex = /^[^@&"()!_$*€£`+=\/;?#&<>]+$/;

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  if (
    !regex.test(sauceObject.name) ||
    !regex.test(sauceObject.manufacturer) ||
    !regex.test(sauceObject.description) ||
    !regex.test(sauceObject.mainPepper)
  ) {
    const filename = req.file.filename;
    console.log(filename);
    fs.unlink(`images/${filename}`, (error) => {
      if (error) throw error;
    })
    return res
      .status(500)
      .json({ error: "Des champs contiennent des caractères invalides" });
  } else {
    const sauce = new sauces({
      ...sauceObject,
      imageUrl: 
      `${req.protocol}://
      ${req.get('host')}
      /images/${req.file.filename}`
    });
    sauce
      .save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
      .catch(error => res.status(400).json({ error }));
  }
};

exports.getSauces = (req, res, next) => {
  sauces
    .find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  sauces
    .findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.modifyOneSauce = (req, res, next) => {

  if (req.file) {
    sauces
      .findOne({ _id: req.params.id })
      .then((saucesModel) => {
        const filename = saucesModel.imageUrl.split("/images")[1];
        console.log(filename);
        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw error;
        })
      })
      .catch(error => res.status(400).json({ error }));
  } else {
    console.log("false")
  }

  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    : { ...req.body };
  if (
    !regex.test(sauceObject.name) ||
    !regex.test(sauceObject.manufacturer) ||
    !regex.test(sauceObject.description) ||
    !regex.test(sauceObject.mainPepper)
  ) {
    return res
      .status(500)
      .json({ error: "Des champs contiennent des caractères invalides" });
  }
  sauces
    .updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  sauces
    .findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      // userIdUrl = req.originalUrl.split("=")[1];
      fs.unlink(`images/${filename}`, () => {
        sauces
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
}
