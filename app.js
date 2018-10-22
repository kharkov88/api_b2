import express from 'express';
import logger from 'morgan';
import users from "./routes/users";
import templates from "./routes/templates";
import passport from "passport";
import initPassport from  "./passport";
import login from "./routes/login";
import checkAuthenticate from "./middlewares/checkAuthenticate";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(require('cors')());

initPassport(passport);

app.use('/api/v1/user', users);
//app.use('/api/v1/templates', checkAuthenticate, templates);
app.use('/api/v1/templates', templates);
app.use('/api/v1/template', templates);
app.use('/login', login);

app.use((req, res) => res.status(404).json({message: '404 not found'}));
app.use((err, req, res) => res.status(err.status || 500).json({'error': err}));

const port = process.env.PORT || 4040;
app.listen(port, () => console.log('listening on ' + port));