import Hapi from 'hapi';
import Transaction from './DOM/transaction';
import db from './db';
import Boom from 'boom';
import GUID from 'node-uuid';

const routes = [
    {
        path: '/transaction/{id}',
        method: 'GET',
        config: {
            response: {
                emptyStatusCode: 204
            },
            handler: (request, reply) => {
                if (!request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                    reply(Boom.badRequest(request.params.id + ' it\'s not a valide id'));
                    return;
                };
                Transaction.findById(request.params.id, (err, transaction) => {
                    if (err) {
                        reply(Boom.badImplementation('There was a problem finding the transaction: ' + err));
                        return;
                    };
                    if (!transaction && !err) {
                        reply(Boom.notFound('No transaction found'));
                        return;
                    };
                    reply(transaction);
                }
                ).catch((err) => {
                    reply('server-side error');
                });
            }
        }
    },
    {
        path: '/transaction',
        method: 'POST',
        config: {
            response: {
                emptyStatusCode: 204
            },
            handler: (request, reply) => {
                const guid = GUID.v4();
                const trans = new Transaction ({
                    transactionId: guid,
                    amount: {
                        value: request.payload.amount.value,
                        device: request.payload.amount.device
                    },
                    meansPayment: request.payload.meansPayment,
                    description: request.payload.description,
                    type: request.payload.type,
                    categoryId: request.payload.categoryId,
                    creationDate: Date.now(),
                    updateDate: Date.now()
                });
                trans.save((err, trans) => {
                    if (err) Boom.badImplementation("There was a problem adding the information to the database.");
                    reply();
                    return;
                });
            }
        }
    }
];

export default routes;