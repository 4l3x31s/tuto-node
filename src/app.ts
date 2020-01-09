import express, {Application} from 'express';
import morgan from 'morgan';
import IndexRoutes from './routes/index.routes';
import body from 'body-parser';
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
        this.app.use(body.json());
        this.app.use(body.urlencoded({extended:true}))
    }
    routes() {
        this.app.use(IndexRoutes);
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