/*for only get can send wothout having any action and method for remaing musst submit the form
app.post('/put/:id',(req,res)=>{
    res.send(req.params.id);
})

-----------------------------------
points
1.<a href="only router name cant be file name" for .ejs file>
2.in form action:router,method=post/get  adn for put and delete must be overriden 
3.adding data will be in the file only
4.in schema type must start with caps letter
*/
//const bodyParser = require('body-parser');
var file=require("path")

const express = require('express');
const bodyparser = require('body-parser');
const methodoverride = require("method-override");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('static'));
const modell = require('./connect');
//middle ware for mehtod dependency
//promise---findone,update,data.save()
app.use(methodoverride('_method'));
//saying node as we are using ejs engine

//normally must give path for css for  to link in html file now need not give beacuase we mentioned folder

//middleware for body parser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());


app.get('/about', (req, res) => {

    res.render('about');
})
app.get('/home', (req, res) => {
    res.render('home');//another parame can be optional
})

app.get('/add', (req, res) => {
    res.render('add');
    console.log(req.body);
})
app.post('/data', async(req, res) => {
    // res.send(req.body);
  
    let data = new modell(req.body);
    data.save().then(() => {
        res.redirect('dairy');

    })
   /* modell.insertOne(req.body).then(()=>{
        res.redirect('dairy');
    })*/
    /*then((data)=>{
     res.render('data',{datas:data})
     console.log('data',datas);we dont use this in the post getting data from the database
     means by get method}}
    */
     console.log("data saved succesfully in db");
});
//adding saved dairy to the dairy page
app.get('/dairy', (req, res) => {
  
    modell.find({}).then((data) => {
        res.render('dairy', { data: data })
    }).catch(err => {
        console.log('err', err);

    })
})

//when we click more going to info page with edit and delete button
app.get('/dairy/:id',(req, res) => {
    modell.findOne({
   _id: req.params.id//_id replaces with id
}).then((data) => {
    
     res.render('info',{ data: data })
      
    //res.redirect('info');
    }).catch(err => {
        console.log(err);
      
    })
  

})
app.get('/edit/:id', (req, res) => {
    modell.findOne({
        _id: req.params.id
    }).then((data) => {
        res.render('editt', { datas: data })

    }).catch(err => {
        console.log(err);
    })

});
//edit the data it is when we clik edit button in the form
app.put('/dairy/edit/:id', (req, res) => {/*/dairy/*/
    modell.findOne({
        _id: req.params.id
    }).then((data) => {
       data.title = req.body.title//due to body parser installed can directly access
        data.desc = req.body.desc
        data.date = req.body.date
        data.save().then(() => {
            res.redirect('/dairy');
        }).catch(err => console.log(err));

        //if i use params instead of body it returns validator error
       /* modell.updateOne({_id:data.id},{$set:{title:req.body.title,desc:req.body.desc,
        date:req.body.date}}).then(()=>{
            res.redirect('/dairy');
            console.log("edited successfully");
        }).catch(err=>{
            console.log(err);
        })*/
     
    }).catch(err => {
        console.log(err);

    })

})



//to delete  from db
app.delete('/data/delete/:id', (req, res) => {
    modell.deleteOne({
        _id:req.params.id
    }).then(()=>{
        res.redirect('/dairy')//can use remove also

    }).catch(err=>{
        console.log(err);
    })
});

app.listen(30007, () => {
    console.log("started");
});

