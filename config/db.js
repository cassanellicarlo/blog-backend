require('dotenv').config();

const config = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        cluster: process.env.DB_CLUSTER,
        name: process.env.DB_NAME,
    }
};

module.exports = config;