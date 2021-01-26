// requirements
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

// create instance of express as app
const app = express();
const PORT = process.env.PORT || 3001;

// db connection
const sequelize = require('./config/connection');

// requirement for session storage and access
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// create instance of handlebars
const hbs = exphbs.create({
    extname: '.hbs',
    // new helper for date formatting
    helpers: {
        format_date: date => {
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        }
    }
});

// express session
const sess = {
    secret: "AmAzInG$af3",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
};

// register hbs.engine with express app
app.engine('hbs', hbs.engine);

// use handlebars engine
app.set('view engine', 'hbs');

// call express json method as middleware to recognize the incoming Request Object as a JSON Object
app.use(express.json());

// call express method to recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: true }));

// tell express to make public folder statically served
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'post_images')));

// set up express to use sess parameters we declared in sess above
app.use(session(sess));

// require and use controllers
app.use(require('./controllers/'));

// ORM sync to DB
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
});