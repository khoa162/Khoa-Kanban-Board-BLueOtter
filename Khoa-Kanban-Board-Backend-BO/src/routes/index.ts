import { Express } from 'express';
import ExpressBrute from 'express-brute';
import * as BoardController from '../api/Test/Board';


const routers = ((ExpressRouter: Express, bruteForce: ExpressBrute) => {

    /* Columns and Cards */
    ExpressRouter.get('/get/cards', BoardController.default.getCards);
    ExpressRouter.get('/get/columns', BoardController.default.getColumns);
    ExpressRouter.post('/update/columns', BoardController.default.updateColumns);
    ExpressRouter.post('/add/cards', BoardController.default.addCards); //updateCard
    ExpressRouter.post('/update/card', BoardController.default.updateCard);

    return ExpressRouter;
});

export default routers;