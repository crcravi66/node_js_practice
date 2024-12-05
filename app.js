const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express();

//connect to MongoDB
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.uexcy.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts';
// const dbURI1 = "mongodb+srv://netninja:Arun@6699@nodetuts.uexcy.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts";
// const dbURI1 = "mongodb+srv://kathirr007:123454321@cluster0.467r698.mongodb.net/selfpromo-db?retryWrites=true&w=majority&appName=Cluster0";
// mongodb+srv://netninja:<db_password>@nodetuts.uexcy.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to DB...')
        app.listen(3000)
    })
    .catch((err) => {
        console.log('error captured :', err)
    })

// register view  engine
app.set('view engine', 'ejs')

// middleware & Static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog ',
//         snippet: 'about my new blog',
//         body: 'more about  my new blog'
//     })

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch(err => console.log(err))
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch(err => console.log(err))
// })
// app.get('/single-blog', (req, res) => {
//     Blog.findById()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch(err => console.log(err))
// })

// routes
app.use("/blogs", blogRoutes)

app.get('/', (req, res) => {
    res.redirect('/blogs');
    // res.send('<p>express app home page</p>')

    // const blogs = [
    //     { title: 'Yoshi find eggs', snippet: 'lorem ipsum dolor sit amet consecteture' },
    //     { title: 'Mario find stars', snippet: 'lorem ipsum dolor sit amet consecteture' },
    //     { title: 'How to defeat browser', snippet: 'lorem ipsum dolor sit amet consecteture' },
    // ]
    // res.render('index', { title: "Home", blogs });
})

app.get('/about', (req, res) => {
    // res.send('<p>express app about page</p>')
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: "About" });
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: "404" })
})