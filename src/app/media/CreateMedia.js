const Operation = require("src/app/Operation");
const Media = require("src/domain/media/Media");
const multer = require("multer");
const fs = require("fs");

class CreateMedia extends Operation {
  constructor({ mediaRepository, directoriesRepository }) {
    super();
    this.mediaRepository = mediaRepository;
    this.directoriesRepository = directoriesRepository;
  }

  async execute(directoryId, files, currentUserId) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    try {
      const directory = await this.directoriesRepository.getById(directoryId);
      // console.log("directory: ", directory);
      console.log("files: ", files);
      const result = [];
      await files.forEach(async (file, index) => {
        const extension = file.originalname.split(".").pop();
        const src = directory.path + "/" + file.filename + "." + extension;
        await fs.rename(
          file.path,
          src,
          async err => {
            if (err) {
              this.emit(ERROR, err);
            } else {
              const instance = new Media({
                originalName: file.originalname,
                mimetype: file.mimetype,
                destination: file.destination,
                src: src,
                path: directory.path,
                size: file.size,
                extension,
                directoryId: directory.id,
                createdBy: currentUserId,
                updatedBy: currentUserId
              });

              try {
                const newInstance = await this.mediaRepository.add(instance);
                result.push(newInstance);
                if (index === files.length - 1) {
                  this.emit(SUCCESS, result);
                }
              } catch (error) {
                if (error.message === "ValidationError") {
                  return this.emit(VALIDATION_ERROR, error);
                }
                this.emit(ERROR, error);
              }
            }
          }
        );
      });
    } catch (error) {
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

CreateMedia.setOutputs(["SUCCESS", "ERROR", "VALIDATION_ERROR"]);

module.exports = CreateMedia;
