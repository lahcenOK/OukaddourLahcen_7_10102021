const models = require("../models/");
const jwt = require("jsonwebtoken");

//Editer un profil
exports.getOneProfile = (req, res, next) => {
  models.User.findOne({
    attributes: ["id", "email", "name", "firstname"],
    where: { id: req.params.id },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
        message: "Utilisateur non trouvé !",
      });
    });
};
// Modifier le profil
exports.modifyProfile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  const isAdmin = decodedToken.isAdmin;

  if (req.body.name == "" || req.body.firstname == "") {
    return res
      .status(400)
      .json({ error: "Merci de remplir tous les champs !" });
  }

  models.User.findOne({
    where: { id: req.params.id },
  }).then((user) => {
    if (user.id === userId || isAdmin === true) {
      user
        .update({
          name: req.body.name,
          firstname: req.body.firstname,
        })
        .then(() => res.status(200).json({ message: "Profile modifié !" }))
        .catch((error) =>
          res
            .status(400)
            .json({ error: "Impossible de mettre à jour votre profile !" })
        );
    }
  });
};

// Supprimer un profil
exports.deleteProfile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  const isAdmin = decodedToken.isAdmin;

  models.User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (user.id === userId || isAdmin === true) {
        user
          .destroy()
          .then(() => {
            res.status(200).json({
              message: "Utilisateur supprimé !",
            });
          })
          .catch((error) => {
            res.status(400).json({
              error: "L'utilisateur n'a pas pu être supprimé !",
            });
          });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: "L'utilisateur n'a pas pu être supprimé !",
      });
    });
};
//Afficher les postes d'un profil
exports.getAllPostsProfile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  models.Post.findAll({
    order: [["updatedAt", "DESC"]],
    attributes: [
      "id",
      "idUsers",
      "title",
      "content",
      "image",
      "createdAt",
      "updatedAt",
    ],
    where: { idUsers: userId },
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};