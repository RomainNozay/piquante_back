const sauces = require("../models/saucesModel");
const fs = require("fs");

const regex = /^[^@&"()!_$*€£`+=\/;?#&<>]+$/;

exports.createSauce = (request, response, next) => {
  const sauceObject = JSON.parse(request.body.sauce);
  delete sauceObject._id;
  if (
    !regex.test(sauceObject.name) ||
    !regex.test(sauceObject.manufacturer) ||
    !regex.test(sauceObject.description) ||
    !regex.test(sauceObject.mainPepper)
  ) {
    const filename = request.file.filename;
    fs.unlink(`images/${filename}`, (error) => {
      if (error) throw error;
    })
    return response
      .status(500)
      .json({ error: "Des champs contiennent des caractères invalides" });
  } else {
    const sauce = new sauces({
      ...sauceObject,
      imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`
    });
    sauce
      .save()
      .then(() => response.status(201).json({ message: 'Objet enregistré !' }))
      .catch(error => response.status(400).json({ error }));
  }
};

exports.getSauces = (request, response, next) => {
  sauces
    .find()
    .then(sauces => response.status(200).json(sauces))
    .catch(error => response.status(400).json({ error }));
};

exports.getOneSauce = (request, response, next) => {
  sauces
    .findOne({ _id: request.params.id })
    .then(sauce => response.status(200).json(sauce))
    .catch(error => response.status(404).json({ error }));
};

exports.modifyOneSauce = (request, response, next) => {

  if (request.file) {
    sauces
      .findOne({ _id: request.params.id })
      .then((saucesModel) => {
        const filename = saucesModel.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw error;
        })
      })
      .catch(error => response.status(400).json({ error }));
  } else {
  }

  const sauceObject = request.file ?
    {
      ...JSON.parse(request.body.sauce),
      imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`
    }
    : { ...request.body };
  if (
    !regex.test(sauceObject.name) ||
    !regex.test(sauceObject.manufacturer) ||
    !regex.test(sauceObject.description) ||
    !regex.test(sauceObject.mainPepper)
  ) {
    return response
      .status(500)
      .json({ error: "Des champs contiennent des caractères invalides" });
  }
  sauces
    .updateOne({ _id: request.params.id }, { ...sauceObject, _id: request.params.id })
    .then(() => response.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => response.status(400).json({ error }));
};

exports.deleteSauce = (request, response, next) => {
  sauces
    .findOne({ _id: request.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        sauces
          .deleteOne({ _id: request.params.id })
          .then(() => response.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => response.status(400).json({ error }));
      });
    })
    .catch(error => response.status(500).json({ error }));
}
