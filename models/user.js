const   mongoose    = require("mongoose"),
        crypto      = require("crypto"),
        jwt         = require("jsonwebtoken"),
        jwtconfig   = require("../config/jwt");
const Schema = mongoose.Schema;

const userSchema = Schema({
    email: String,
    name: String,
    hash: String,
    salt: String
});

// Set password
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex'); // set the salt
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex'); // set the hash
};

// Check if password is valid
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

// Generate JSON Web Token
userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, jwtconfig.secret); 
};

module.exports = mongoose.model("User", userSchema);
