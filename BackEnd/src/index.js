import express from 'express';
import {PORT} from './config.js';
import cotizacionesRouter from './routes/cotizaciones.routes.js';
import morgan from 'morgan';
import cors from 'cors'; // Importar CORS

const app = express();

// Configurar CORS para permitir todas las solicitudes
app.use(cors({
    origin: '*', // Permite todas las URLs
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS', // Permite todos los métodos HTTP
    allowedHeaders: 'Content-Type,Authorization', // Permite estos headers
    credentials: true, // Permite enviar cookies y headers de autenticación
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cotizacionesRouter);

app.listen(PORT);
console.log('Server on port', PORT);
