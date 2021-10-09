const Multer = require("multer");

const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + "."
            + file.originalname.split(".").pop();
        cb(null, filename);
    },
});

const upload = Multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        let allowedTypes = ["image/png", "image/jpeg"];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Tipo do arquivo inválido"));
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
})

module.exports = upload.single("image");