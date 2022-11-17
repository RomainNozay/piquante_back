const sauces = require("../models/saucesModel");

exports.giveLike = (request, response, next) => {
    sauces
        .findOne({ _id: request.params.id })
        .then((sauce) => {

            if (request.body.like === 1) {
                if (sauce.usersLiked.includes(request.body.userId)) {
                    response.status(401).json({ error: 'Sauce déja liké' });
                }
                else {
                    sauces
                        .updateOne({ _id: request.params.id }, 
                            { $inc: { likes: 1 }, 
                            $push: { usersLiked: request.body.userId } })
                        .then(() => response.status(200).json({ message: 'Like ajouté !' }))
                        .catch(error => response.status(400).json({ error }))
                }

            }
            else if (request.body.like === -1) {
                if (sauce.usersDisliked.includes(request.body.userId)) {
                    response.status(401).json({ error: 'Sauce déja disliké' });
                }
                else {
                    sauces
                        .updateOne({ _id: request.params.id }, 
                            { $inc: { dislikes: 1 }, $push: { usersDisliked: request.body.userId } })
                        .then(() => response.status(200).json({ message: 'Dislike ajouté !' }))
                        .catch(error => response.status(400).json({ error }));
                }
            }
            else {
                if (sauce.usersLiked.includes(request.body.userId)) {
                    sauces
                        .updateOne({ _id: request.params.id }, 
                            { $inc: { likes: -1 }, 
                            $pull: { usersLiked: request.body.userId } })
                        .then(() => { response.status(200).json({ message: 'Like supprimé !' }) })
                        .catch(error => response.status(400).json({ error }));
                }
                else if (sauce.usersDisliked.includes(request.body.userId)) {
                    sauces
                        .updateOne({ _id: request.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                        .then(() => { response.status(200).json({ message: 'Dislike supprimé !' }) })
                        .catch(error => response.status(400).json({ error }));
                }
            }
        })


        .catch(error => response.status(400).json({ error }));
}
