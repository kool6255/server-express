process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

process.env.SEED = process.env.MONGO_SEED || 'este-secret';
let urldb;

if (process.env.NODE_ENV === 'dev') {
    urldb = 'mongodb://localhost:27017/cafe';
} else {
    urldb = process.env.MONGO_URI;
}

process.env.URLDB = urldb;