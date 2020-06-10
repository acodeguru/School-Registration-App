import crypto from 'crypto';

const Crypto = {
    encrypt: function(password){
        var mykey = crypto.createCipher('aes-128-cbc', 'Gce6b0iJuh9X8aDSV7tr');
        var mystr = mykey.update(password, 'utf8', 'hex')
        mystr += mykey.final('hex');

        return mystr
    },

    decrypt: function(hashpassword){
        var mykey = crypto.createDecipher('aes-128-cbc', 'Gce6b0iJuh9X8aDSV7tr');
        var mystr = mykey.update(hashpassword, 'hex', 'utf8')
        mystr += mykey.final('utf8');

        return mystr
    }
}

export default Crypto;
