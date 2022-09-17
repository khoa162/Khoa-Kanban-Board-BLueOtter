import { Request, Response, NextFunction, } from 'express';
import fs from 'fs';
import cards from '../../BoardData/cards';
import columns from '../../BoardData/columns';

export default {
    getCards: (request: Request, response: Response) => {
        try {
            return response.json( cards );
        } catch (error) {
            throw (error);
        }
    },
    getColumns: (request: Request, response: Response) => {
        try {
            return response.json( columns );
        } catch (error) {
            throw (error);
        }
    },
    updateColumns: (request: Request, response: Response) => { 
        try {
            const data = JSON.stringify({ columns: request.body.columns }, null, 2);
            fs.writeFile(__dirname + '/../../BoardData/columns.json', data, (error) => {
                if (!error) return response.json({ result: 'success' });
                else response.json({ result: 'fail' });
            });
        } catch (error) {
            throw (error);
        }
    },
    addCards: (request: Request, response: Response) => {
        try {
            if (request.body.cards) {
                cards['cards'].push(request.body.cards)
                const data = JSON.stringify(cards, null, 2);
                fs.writeFile(__dirname + '/../../BoardData/cards.json', data, (error) => {
                    if (!error) {
                        columns['columns'].forEach((col) => {
                            if (col.id === request.body.cards.status) {
                                col.cardsIds.push(request.body.cards.id);
                                return;
                            }
                        });
                        const columnData = JSON.stringify(columns, null, 2);
                        fs.writeFile(__dirname + '/../../BoardData/columns.json', columnData, (error) => {
                            if (!error) return response.json({ result: 'success' });
                            else response.json({ result: 'fail' });
                        });
                    }
                    else response.json({ result: 'fail' }); 
                });
            }
        } catch (error) {
            throw (error)
        }
    },
    updateCard: (request: Request, response: Response) => {
        try {
            if (request.body.card) {
                cards['cards'].forEach(card => {
                    if (card.id === request.body.card.id) {
                        card.title = request.body.card.title;
                        card.description = request.body.card.description;
                        card.category = request.body.card.category;
                        return;
                    }
                });
                const data = JSON.stringify(cards, null, 2);
                fs.writeFile(__dirname + '/../../BoardData/cards.json', data, (error) => {
                    if (!error) return response.json({ result: 'success' });
                    else response.json({ result: 'fail' });
                });
            }
        } catch (error) {
            throw (error)
        }
    }
}