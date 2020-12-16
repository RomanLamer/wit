const bcrypt = require('bcryptjs');
const salt = 10;

class passwordHandler {
    async hash(password){
        return new Promise(function(resolve, reject) {
            const hashedPassword = bcrypt.hash(password,salt);
            resolve(hashedPassword);
        })
    }

    async compare(password,userPassword){
        return new Promise(function(resolve, reject) {
            const hashedPassword = bcrypt.compare(password,userPassword);
            resolve(hashedPassword);
        })
    }
}

module.exports = new passwordHandler();