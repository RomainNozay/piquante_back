//importation du model sauces
const sauces = require("../models/saucesModel");

exports.giveLike = (req, res, next) => {
    sauces
        .findOne({ _id: req.params.id })
        .then((sauce) => {

            //utilisation de la méthode javascript includes()
            //utilisation opérateur $inc (mongoDB)
            //utilisation opérateur $push (mongoDB)
            //utilisation opérateur $pull (mongoDB)

            //Si je veux aimer
            //Si Identifiant utilisateur non présent dans le tableau de la sauce et strictement 1 dans la requête
            if (req.body.like === 1) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    res.status(401).json({ error: 'Sauce déja liké' });
                }
                else {
                    sauces
                        .updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
                        .then(() => res.status(200).json({ message: 'Like ajouté !' }))
                        .catch(error => res.status(400).json({ error }))
                }

            }
            else if (req.body.like === -1) {
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    res.status(401).json({ error: 'Sauce déja disliké' });
                }
                else {
                    sauces
                        .updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
                        .then(() => res.status(200).json({ message: 'Dislike ajouté !' }))
                        .catch(error => res.status(400).json({ error }));
                }
            }
            else {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    sauces
                        .updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                        .then(() => { res.status(200).json({ message: 'Like supprimé !' }) })
                        .catch(error => res.status(400).json({ error }));
                }
                else if (sauce.usersDisliked.includes(req.body.userId)) {
                    sauces
                        .updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                        .then(() => { res.status(200).json({ message: 'Dislike supprimé !' }) })
                        .catch(error => res.status(400).json({ error }));
                }
            }
        })


        .catch(error => res.status(400).json({ error }));
}
