// db.js
import Mongoose from 'mongoose';
Mongoose.connect('mongodb://must:110986@ds111885.mlab.com:11885/monogodb-db',
    {
        useMongoClient: true
    });

export default Mongoose;