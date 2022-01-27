const router = require('express').Router();
const { Post, User } = require('../../models/');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) => {
  try {
      const postData = await Post.findAll({
        include: [User],
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
})

router.post('/', withAuth, async (req, res) => {
  const body = req.body;
    console.log(body);
  try {
    const createPost = await Post.create({ ...body, user_id: req.session.user_id });
    console.log("Here is the new post: ",  createPost);
    res.json(createPost);
     } catch (err) {
       console.log('IT FAILED!', err);
    res.status(500).json(err);
  }
});


router.put('/:id', withAuth, async (req, res) => {
  try {
    console.log('here is the req.body', req.body);
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).json(affectedRows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;