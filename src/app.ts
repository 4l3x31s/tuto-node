import express, {Application} from 'express';
import morgan from 'morgan';
import IndexRoutes from './routes/index.routes';
import IndexUsuarios from './routes/usuario.routes';
import AuthController from './routes/auth.routes';
import cors from 'cors';

export class App {
    private app: Application;
    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set(`port`, this.port || process.env.port || 3000 );
    }
    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(cors({
            exposedHeaders: ['Content-Length', 'token', 'Content-Type'],
          }));
        //this.app.use(body.json());
        //this.app.use(body.urlencoded({extended:true}))
    }
    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/usuarios',IndexUsuarios);
        this.app.use('/api/auth', AuthController);
    }
    listen() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor inicializado', this.app.get('port'));
        })
    }
    async listenAsync() {
        await this.app.listen(this.app.get('port'));
        console.log('Servidor inicializado', this.app.get('port'));
    }
}