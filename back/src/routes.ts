import { Router } from 'express';
import { cont } from './controller';

class AppRoutes {
    public router: Router = Router();
    
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', cont.index);
        this.router.post('/', cont.leerEntrada)
    }
}

const appRoutes = new AppRoutes();
export default appRoutes.router;