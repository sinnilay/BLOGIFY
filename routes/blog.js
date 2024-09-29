const {Router} = require('express')
const multer = require('multer')
const path = require('path')
const blog = require("../models/blog")
const { title } = require('process')

const router= Router()
function removeSpaces(str) {
  return str.replace(/\s+/g, '');
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    
      cb(null,"./public/uploads");
    },
    filename: function (req, file, cb) {
      const spacefreename= removeSpaces(file.originalname)
      const filename = `${Date.now()}-${spacefreename}`;
      cb(null, filename);
    }
  });
  const upload = multer({ storage: storage })
router.get('/add-blog',(req,res)=>{
    res.render('Addzblog',{
        user:req.user
    })
})

router.post('/add-blog',upload.single('coverimage'),async (req,res)=>{
  //  console.log(req.body);
  //  console.log(req.file); 
   const {title,body} = req.body;
   await blog.create({
       title,
       body,
       createdby: req.user.id,
       ImageUrl: req.file.path
   })   
   res.redirect("/")

    
})

router.get("/view/:id",async(req,res)=>{
    const {id}=req.params
  //  console.log(id);
    
    
    const Read_blog= await blog.findById(id)
    // console.log(Read_blog);
   
    
    
    res.render("view_blog",{
      user:req.user,
      Read_blog,
      
    })
})

router.get("/delete/:id",async(req,res)=>{
  const {id}=req.params
//  console.log(id);
  
  
  await blog.deleteOne({_id:id})
  res.redirect('/')
})
router.get('/signblogs',async (req,res)=>{
  const all_blog= await blog.find().populate('createdby')
  res.render('home',{
    user:req.user,
     all_blog
  })
})
module.exports=router