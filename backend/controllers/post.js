const models = require("../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");

//Création d'un post
exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;

  if (req.body.title === "" || req.body.content === "") {
    return res.status(400).json({ error: "Merci de remplir tous les champs." });
  }

  models.Post.create({
    idUsers: userId,
    title: req.body.title,
    content: req.body.content,
    image:
      req.body.content && req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : null,
  })
    .then(() => res.status(201).json({ message: "Post enregistré !" }))
    .catch((error) => res.status(400).json({ error : "Merci de remplir les champs."}));
};

// Afficher tous les posts
exports.getAllPost = (req, res, next) => {
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
    include: [
      {
        model: models.User,
        attributes: ["name", "firstname"],
      },
    ],
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

// Afficher un seul post
exports.getOnePost = (req, res, next) => {
  models.Post.findOne({
    attributes: [
      "id",
      "idUsers",
      "title",
      "content",
      "image",
      "createdAt",
      "updatedAt",
    ],
    where: { id: req.params.id },
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
// Modifier un post
exports.modifyPost = (req, res, next) => {
  console.log(req.body.title);
  const token = req.headers.authorization.split(" ")[1]; 

  if (req.body.title == "" || req.body.content == "") {
    return res
      .status(400)
      .json({ error: "Merci de remplir tous les champs !" });
  }
  models.Post.findOne({
    where: { id: req.body.id },
  }).then((post) => {
    if (req.file) {
      post
        .update({
          title: req.body.title,
          content: req.body.content,
          image:
            req.body.content && req.file
              ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
              : null,
        })
        .then(() => res.status(200).json({ message: "Post modifié !" }))
        .catch((error) =>
          res
            .status(400)
            .json({ error: "Impossible de mettre à jour votre profile !" })
        );
    }
    else {
      post
        .update({
          title: req.body.title,
          content: req.body.content          
        })
        .then(() => res.status(200).json({ message: "Post modifié !" }))
        .catch((error) =>
          res
            .status(400)
            .json({ error: "Impossible de mettre à jour votre profile !" })
        );
    }
  });
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;
  const isAdmin = decodedToken.isAdmin;

  models.Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (post.idUsers === userId || isAdmin === true) {
        if (post.image !== null) {
          const filename = post.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            post
              .destroy()
              .then(() =>
                res.status(200).json({ message: "Post supprimé !" })
              )
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          post
            .destroy()
            .then(() => {
              res.status(200).json({
                message: "Post supprimé !",
              });
            })
            .catch((error) => {
              res.status(400).json({
                error: error,
                message: "Le post n'a pas pu être supprimé",
              });
            });
        }
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
