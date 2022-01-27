const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "post_content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard',{posts,loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, (req, res) => {
   
    res.render('new-post', {
     
      layout: 'dashboard',
    });
  });
  
  
  router.get('/edit/:id', withAuth, async (req, res) => {
    try {
   
      const postData = await Post.findByPk(req.params.id);
  
      if (postData) {
   
        const post = postData.get({ plain: true });
        console.log(post);
        
        res.render('edit-post', {
          layout: 'dashboard',
          post,
        });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.redirect('login');
    }
  });

  module.exports = router;