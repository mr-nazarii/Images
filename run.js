const sharp = require("sharp");
const fs = require("fs");

// specify the folder containing the images
const folder = "./img/raw";

// specify the desired compression percentage
const percent = 50;

if (!fs.existsSync(`./img/compressed`)) {
  fs.mkdirSync(`./img/compressed`);
}

// get a list of all files in the folder
fs.readdir(folder, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  // iterate through the files and compress each image
  files.forEach((file) => {
    // only process image files
    if (!file.endsWith(".jpg") && !file.endsWith(".png")) {
      return;
    }

    // read the image file
    sharp(`${folder}/${file}`)
      // compress the image
      .jpeg({ quality: percent })
      .toFile(`./img/compressed/${file}`)
      .then(() => {
        console.log(`Successfully compressed ${file}`);
      })
      .catch((err) => {
        console.error(`Error compressing ${file}:`, err);
      });
  });
});
