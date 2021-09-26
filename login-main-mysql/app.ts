import express from 'express';
import session from 'express-session';
import mysql from 'mysql';
import passport from 'passport';
import {Strategy} from 'passport-local'
import bcrypt from 'bcrypt';
import path from 'path';
const __dirname = path.resolve();
declare var next: any;

const app = express();
const port = 3000;
const con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "user",
    database: "soulbanco"
});


// callback params (err, response)
function query(query: any, callback: any) {
    con.query(query, function (err, result) {
        if (err) {
            callback(err, null);
        }
        console.log(result);
        callback(null, result);
    });
};


//Middleware
app.set('view engine', "ejs");
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user:any, done) {
    let username = user.username;
    //setup user model
    query(`SELECT * FROM login_cliente WHERE login_cliente.username = '${username}'`, function (err:any, userlist:any) {
        let user = userlist[0];
        done(err, user);
    });
});

passport.use(new Strategy(function (username, password, done) {
    query(`SELECT * FROM login_cliente WHERE login_cliente.username = '${username}'`, function (err:any, userlist:any) {
        if (err) {
            return done(err);
        }
        if (!userlist || userlist.length == 0) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        let user = userlist[0];
        let pass = userlist[0].password;

        bcrypt.compare(password, pass, function (err, res) {
            if (err) {
                return done(err);
            }
            if (res === false) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            else {
                return done(null, user);
            }
        });
    });
}));

function isLoggedIn(req:any, res:any, next:any) {
    if (req.isAuthenticated()) {
        res.locals.user = req.session.passport.user;
    }
    else {
        if (req.path != '/login') {
            return res.redirect('/login')
        }
    }
    return next();
}




//Routes
app.get('/', (req:any, res:any) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.session.passport.user;
    }
    const response = {
        title: 'Home',
    }
    res.render('pages/index', response);
});

app.get('/register', isLoggedIn, (req, res) => {
    res.render('pages/register', { title: 'Register', error: false });
});

//Setup  user
app.post('/register', isLoggedIn, async (req, res) => {
    

    let user = req.body.username;
    let pass = req.body.password


    query(`SELECT * FROM login_cliente where username = '${user}'`, (err:any, response:any)=>{
        if (err) {
            return res.status(500).send("Erro ao consultar livros!")
        }
        if (response && response.length >= 1) {
            res.redirect('/login');
            return;
        }
    
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(pass, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
    
                query(`INSERT INTO login_cliente
                (username, password)
                VALUES
                ('${user}','${hash}')`, (req:any, res:any) => {
                    if (err) {
                        return res.status(500).send("Erro ao cadastrar usuário!")
                    }
                });
                res.redirect('/login')
            });
        });

    })
    
});



app.get('/login', isLoggedIn, (req, res) => {
    const response = {
        title: 'Login',
        error: req.query.error
    }
    res.render('pages/login', response)
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?error=true'
}))

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});