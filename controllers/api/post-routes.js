const router = require('express').Router();
const { Post, User, Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) => {
  try {
      const postData = await Post.findAll({
        attributes: ['id', 'title', 'post_content', 'date_created'],
        include: [{model: User}, 
          {model: Comment}],
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.json(posts);
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
    const {affectedRows} = await Post.update(req.body, {
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
    console.log('Made it to delete route');
    console.log(req.params.id);
    const affectedRows = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(affectedRows);
    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;