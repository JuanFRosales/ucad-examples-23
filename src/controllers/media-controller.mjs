import mediaItems from '../mock-data/media.json' assert {type: 'json'};
import { addMedia, fetchAllMedia, fetchMediaById } from '../models/media-model.mjs';

const getMedia = async (req, res) => {
  const mediaItems = await fetchAllMedia();
  res.json(mediaItems);
};

const getMediaById = async (req, res) => {
  const result = await fetchMediaById(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(500)
    res.json({ message: "Media not found." });
  }
};

const postMedia = async (req, res) => {
  //console.log('uploaded file', req.file);
  //console.log('uploaded form data', req.body);
  const {title, description} = req.body;
  const {filename, mimetype, size} = req.file;
  const user_id = req.user.user_id;
  if (filename && title && user_id) {
    const newMedia = {title, description, user_id, filename, mimetype, size}
    const result = await addMedia(); 
    res.status(201);
    res.json({message: 'New media item added.', ...result});
  } else {
    res.sendStatus(400);
  }
};

const putMedia = (req, res) =>{
  const media = mediaItems.find((element) => element.media_id == req.params.id);
  if (media) {
    media.filename = req.body.filename;
    media.title = req.body.title;
    media.description = req.body.description;
    media.user_id = req.body.user_id;
    media.media_type = req.body.media_type;
    res.status(200).json({ message: "Media item updated successfully." });
  } else {
    res.status(404).json({ message: "Media not found." });
  }
}

const deleteMedia = (req, res) => {
  const media = mediaItems.find((element) => element.media_id == req.params.id);
  if (media) {
    const index = mediaItems.indexOf(media);
    mediaItems.splice(index, 1);
    res.status(200).json({ message: "Media item deleted successfully." });
  } else {
    res.status(404).json({ message: "Media not found." });
  }
}

export { getMedia, getMediaById, postMedia, putMedia, deleteMedia };