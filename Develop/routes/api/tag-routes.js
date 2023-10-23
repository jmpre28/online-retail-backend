const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


// Finds all tags
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }, { model: ProductTag }]
    })
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Finds a single tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }]
    })
    if (!tag) {
      res.status(404).json({ message: 'Tag does not exist.' });
    }
    res.json(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Creates a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.json(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Updates tag based on ID
router.put('/:id', (req, res) => {
  Tag.put(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});


// Deletes a tag based on ID
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!deleteTag) {
      req.status(404).json({ message: 'Tag does not exist' });
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
