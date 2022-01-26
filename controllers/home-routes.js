const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      attributes: ["id", "title", "post_content", "created_at"],
      include: [{
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
    },
    {
        model: User,
        attributes: ['username']
    }
]
})

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
 if (req.session.logged_in) {
     res.redirect("dashboard");
     return;
 }
 res.render('login');
});

router.get('/signup',(req,res)=>{
    if(req.session.logged_in){
        res.redirect('dashboard');
        return;
    }
    res.render('signup');
});
// Use withAuth middleware to prevent access to route
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findByPk({
     where: {
         id: req.params.id,
     },
     include: [
         user,
        {
            model: Comment,
            include: [User]
        }
     ],
    });
    if (postData) {
        const post = postData.get({plain: true});
        res.render('single-post',{post, logged_in: req.session.logged_in});
    } else {
        res.status(404).end();
    } 
  } catch (err) {
      res.status(500).json(err);
  }
});



module.exports = router;
