import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import expressBrute from 'express-brute';
import xssFilter from 'x-xss-protection';
import chalk from 'chalk';
import session from 'express-session';
import hpp from 'hpp';
import restApiRouters from './routes';
import morgan from 'morgan';

var App = express();

/* Helmet */
App.use(helmet());

/* CORS */
App.use(cors());

/* xssFilter */
App.use(xssFilter());

App.use('*', (request, response, next) => {
    if (!response.locals) {
        response.locals = {};
    }

    next();
});

App.all("/*", (request, response, next) => {
    // Allow cross-origin api requests
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, X-Auth-Token");
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS, DELETE");
    return next();
});

/* Configure body parser */
App.use(bodyParser.json({
    type: 'application/json'
}));
App.use(bodyParser.text({
    type: 'text/html'
}));
App.use(bodyParser.json({
    limit: 1000
}));
App.use(bodyParser.urlencoded({
    extended: true
}));

/* Clean */
App.use(hpp());
/* Configure cookie parser */
App.use(cookieParser());

/* Session */
App.use(session({
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 60000,
        httpOnly: true
    }
}));

/* Set Header */
App.use((request, response, next) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('charset', 'utf-8');
    next();
});

const store = new expressBrute.MemoryStore();
const bruteForce = new expressBrute(store);

App.use(morgan('common'));

if (process.env.NODE_ENV === 'development') {
    console.log(chalk.green('\n -=-=-=-=-=-=-=-= Development Environment -=-=-=-=-=-=-=-='));

    restApiRouters(App, bruteForce);

    App.listen(process.env.API_PORT, () => {
        console.log(chalk.green('\n\n>> ✅ the API backend is listening on port: ') + chalk.yellow(process.env.API_PORT))
    });
}