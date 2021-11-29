var nodeBase64 = require("nodejs-base64-converter");

const convertBase64Image = (req, res, next) => {
  console.log(nodeBase64.urlDecode(req.body.bade64));

  return next();
};

module.exports = convertBase64Image;
