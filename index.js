const express = require('express');
const app = express();


const indexRouter = require('./router');
const authRouter = require('./router/auth');
const flash = require('connect-flash');
const methodOverride = require('method-override')

const session = require('express-session');
const res = require('express/lib/response');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs');
app.use(methodOverride('_method'))

const MySQLStore = require('express-mysql-session')(session);

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'api-auth-express'
};
const sessionStore = new MySQLStore(options);

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

const cookieParser = require('cookie-parser')
app.use(cookieParser('keyboard cat'));
app.use(flash());

app.use(function(req, res, next){
    res.locals.emailUser = req.session.user?.email;
    res.locals.success = req.flash('success');

    next()
});


app.use('/', authRouter);

app.use(function(req, res, next){
    if(req.session.user){
        next();
    }else{
        res.send('anda belom login!');
    }
});

app.use('/', indexRouter);




app.listen(3000, function(){
    console.log("Server berjalan di port 3000");
});