const mongoose = require('mongoose')


const Post = require('./models/Post')

mongoose.connect('mongodb://127.0.0.1/nodeblog_test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

/* Post.findByIdAndDelete('64e14b3839fd759669a529fc').then(post =>{
    console.log(post)
}).catch(err =>{
    console.log(err)
})
 */





/* 
Post.find({}).then(post => {
    console.log(post);
})
.catch(err => {
    console.error(err);
  });  */







/* Post.findByIdAndUpdate(('64e149850fb5b6c864ff74c0'), {
    title: "Güncellendi!"
}).then(post => {
    console.log(post);
})
.catch(err => {
    console.error(err);
  });  
 */






 /* Post.findById('64e149850fb5b6c864ff74c0').then(post => {
    console.log(post);
})
.catch(err => {
    console.error(err);
  });  
 */






/* Post.find({}).then(post => {
    console.log(post);
})
.catch(err => {
    console.error(err);
  });  */







/* Post.create({
    title: 'İkinci Post Başlığım',
    content: 'İkinci post içeriği, lorem ipsum'
}).then(post => {
    console.log(post);
})
.catch(err => {
    console.error(err);
  }); */
