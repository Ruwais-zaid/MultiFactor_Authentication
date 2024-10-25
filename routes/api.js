import {Router} from 'express'
import ProfileController from '../controllers/ProfileController.js'
import passport from 'passport'


const routes  = Router()
//Registeration routes

routes.post('/v1/register',ProfileController.register)

//Login Routes
routes.post('/v1/login',passport.authenticate('local'),ProfileController.login)

//Auth Status Route
routes.get('/v1/auth/statue',ProfileController.authStatue)

//2FA setup
routes.post('/v1/2FA/setup',(req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.status(401).json({
            msg:"Unauthorized user"
        })
    }
},ProfileController.twoFsetup)


//2FA verify
routes.post('/v1/2FA/verify',(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.status(401).json({
            msg:"Unauthorized user"
        })
    }

},ProfileController.twoFverify)

//Reset
routes.post('/v1/2FA/reset',(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.status(401).json({
            msg:"Unauthorized user"
        })
    }

},ProfileController.reset)

//Logout Route
routes.post('/v1/logout',ProfileController.logout)

export default routes;