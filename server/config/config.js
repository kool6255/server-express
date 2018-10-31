process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.CADUCIDAD_TOKEN = '48h';

process.env.SEED = process.env.MONGO_SEED || 'este-secret';
let urldb;

if (process.env.NODE_ENV === 'dev') {
    urldb = 'mongodb://localhost:27017/cafe';
} else {
    urldb = process.env.MONGO_URI;
}

process.env.URLDB = urldb;

process.env.CLIENT_ID = process.env.CLIENT_ID || '963374797135-edjuu8oj3c860n1h1n57fimh6vmlsa84.apps.googleusercontent.com';