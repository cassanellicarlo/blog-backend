const auth = {
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
};

module.exports = auth;