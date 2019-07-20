const path = require('path');

export default {
    port: 5555,
    hostName: '192.168.0.98',

    root: __dirname,
    public: path.join(__dirname, 'public'),
    database: path.join(__dirname, 'database')
}