import jwt from 'jsonwebtoken';

const userAuthentication = async (req, res, next) => {
    try {
        
        const token = req.headers['authorization']?.split(' ')[1];

        if(!token) {
            return res.json({success: false, message: 'Not Authorized'});
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = payload.id;

        next();

    } catch (error) {

        console.log(error);

        res.json({success: false, message: error})
    }
}

export default userAuthentication;