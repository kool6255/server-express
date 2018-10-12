process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

let urldb;

if (process.env.NODE_ENV === 'dev') {
    urldb = 'mongodb://localhost:27017/cafe';
} else {
    urldb = 'mongodb://cafeuser:vanesa123@ds221258.mlab.com:21258/cafer'
}

process.env.URLDB = urldb;