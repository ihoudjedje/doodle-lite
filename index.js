var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local");

mongoose.connect("mongodb://localhost/doodle_db_3");
var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret : "Ilyes Houdjedje",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// User.create(
//     {
//         username : "yassou",
//         password: "yassou",
//         color: "red"
// }, function(err, user){
//     if(err){
//         console.log(err);
    
//     }else{
//         console.log("it works!!!!!!!!!!!!!!!!!!!!!!!!!!");
//         console.log(user);
//     }
// });



app.get("/", function(req, res){
    res.render("home");
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/home");
}

//show sign up form
app.get("/home", function(req, res){
   res.render("home"); 
});

// here i'm using the middleware model     //this is not working, see the .post belo, to solve it https://goo.gl/mon3Z0    https://goo.gl/ytq95m
app.get("/dashboard",isLoggedIn, function(req, res){
   res.render("dashboard"); 
});

//handling user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('home');
        }
        passport.authenticate("local")(req, res, function(){
        //res.redirect("dashboard", {color: req.body.color });
        res.render("dashboard", {color: req.body.color });
        
        });
    });
});

// LOGIN ROUTES
//render login form
// app.get("/home", function(req, res){
//   res.render("home"); 
// });
//login logic
//middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/home"
}) ,function(req, res){
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("my server has been started...finally!!");
})