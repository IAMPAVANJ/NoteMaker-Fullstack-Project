const jwt=require('jsonwebtoken')

const userMiddleware = (req, resp, next) => {
    const token = req.headers.authorization
    try {
        if (token) {
            const { _id } = jwt.verify(token, "secretKey")
            console.log('id from middware', _id)
            if (_id) {
                req.user = _id
                next();
            }
        }
        else {
            resp.json({ success: false, msg: 'token expired, access denied' })
        }
    }
    catch (err) {
        resp.json({ success: false, msg: err })

    }
}

module.exports=userMiddleware