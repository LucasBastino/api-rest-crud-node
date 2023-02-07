import express from 'express';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { router } from './routes/routes.js';


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));



//setings
app.set('port', 3000);
app.use('/public', express.static(join(__dirname, '/public'))); // .static indica donde van a estar los archivos de scripts, css.. los publicos
// el primer public es lo que queres que escriban en la url, el segundo es donde se encuentra ubicado
app.set('view engine', 'ejs');
app.set('views', join(__dirname, '/views'));

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended : false }));
app.use(router);

app.listen(app.get('port'));
console.log(`Server on port ${app.get('port')}`);
