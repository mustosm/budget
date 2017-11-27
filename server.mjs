import Hapi from 'hapi';
import routes from './routes';

const server = new Hapi.Server();

server.connection({
    port: 8080
});

server.start(err => {   
    routes.forEach((route) => {
        console.log(`attaching ${route.path} - ${route.method}`);
        server.route(route);
    });
    if (err) {
        // Fancy error handling here
        console.error('Error was handled!');
        console.error(err);
    };
    console.log(`Server started at ${server.info.uri}`);
});