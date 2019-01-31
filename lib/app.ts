import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from '../lib/routes/crmRoutes';
import * as mongoose from 'mongoose';

class App {
    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public mongoUrl: string =
        'mongodb://typenode:CP002360@ds119548.mlab.com:19548/typenode';

    constructor() {
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}

export default new App().app;
