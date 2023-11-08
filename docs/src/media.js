import mediaItems from './mock-data/media.json' assert {type: 'json'};

const getMedia = (req, res) => {
  res.json(mediaItems);
};

const getMediaById = (req, res) => {
  const media = mediaItems.find((element) => element.media_id == req.params.id);
  if (media) {
    res.json(media);
  } else {
    res.status(404).json({ message: "Media not found." });
  }
};

const postMedia = (req, res) => {
  console.log('new media posted', req.body,);
  const newId = Math.floor(Math.random() * 9000 + 1000);
  if (req.body.filename) {
    mediaItems.push({
      media_id: newId,
      filename: req.body.filename,
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.user_id,
      media_type: req.body.media_type,
    });
    res.sendStatus(201);
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