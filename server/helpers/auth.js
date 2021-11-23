import bcrypt from 'bcrypt';

export const hasPassword = (password) => {
    return new Promise((resolve, reject) => {
        // generate salt
        bcrypt.genSalt(12,(err, salt) => {
            if(err) {
                //console.log('genSalt err', err)
                reject(err)
            }

            bcrypt.hash(password, salt, (err, hash) =>{
                if(err) {
                    // console.log('salt', salt)
                    // console.log('hash', hash)
                    reject(err)
                }
                //console.log('resolve', hash)
                resolve(hash)
            })
        })
    })
}

export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);//true or false
}
