import Hapi from 'hapi';
import Transaction from './DOM/transaction';


const routes = [
    {
        path: '/transaction/:id',
        method: 'GET',
        handler: (request, reply) => {
            const getOperation = Transaction.findById(request.params.id, (err, transaction) => {
                    if (err) return reply.status(500).send("There was a problem finding the users.");
                    if (!transaction) return reply.status(404).send("No user found.");
                    reply.status(200).send(transaction);
                }
            ).catch((err) => {
                reply('server-side error');
            });
        }
    }
];

export default routes;