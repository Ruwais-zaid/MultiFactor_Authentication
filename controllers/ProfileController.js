import User from '../models/models.js'
import bcrypt from 'bcryptjs'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import jwt from 'jsonwebtoken'
class ProfileController{
    static async register(req,res){
        try{

            const {username,password} = req.body;
            const hashPassword = await bcrypt.hash(password,10);
            const newUser = await User({
                username:username,
                password:hashPassword,
                isMFAActive:false,

            })
            console.log(newUser);
            await newUser.save();
            res.status(201).json({
                msg:"User created Sucessfully",
                username:username,
                password:hashPassword
            })


        }catch(error){
            res.status(500).json({
                msg:"Error creating user" + error,
            })
            

        }
    }
    static async login(req,res){
        try{

            console.log("The authenticated user is :" , req.user)
            res.status(200).json({
                msg:"UserLogin SucessFUlly",
                User:req.user.username,
                isMFAActive:req.user.isMFAActive
            });


        }catch(error){
            res.status(500).json({
                msg:"Error logging in user" + error,
            })

        }
    }
    static async authStatue(req,res){
        try{

            if(req.user){
                res.status(200).json({
                    status:200,
                    username:req.user.username,
                    isMFAActive:req.user.isMFAActive
                })
            }
            else{
                res.status(401).json({
                    status:401,
                    msg:'Unauthorized user'

                })
            }
        }catch(error){
            res.status(500).json({
                msg:"Error checking user status" + error,
            })

        }
    }
    static async twoFsetup(req,res){
        try {
           const user  = req.user;
           var secret = speakeasy.generateSecret();
           user.twoFactorSecret = secret.base32;
           user.isMFAActive = true;

           await user.save();

           const otpAuthUrl = speakeasy.otpauthURL({
            secret: secret.base32,
            label: user.username,
            encoding: "base32",
        });
        const qrCodeUrl = await qrcode.toDataURL(otpAuthUrl);
        res.status(200).json({
            msg: "Two-Factor Authentication setup successfully",
            qrCode: qrCodeUrl,
            secret: secret.base32,
        });

          }
        catch (error) {

            res.status(500).json({
                error:"Error setting up 2FA" + error
            })
            
        }
    }
    static async twoFverify(req,res){
        try {
          
            const{token}  = req.body;
            const user = req.user;

            const verified = speakeasy.totp.verify({
                secret:user.twoFactorSecret,
                encoding:"base32",
                token:token
            })

            if(verified){
                const acessToken  = jwt.sign(user.username,process.env.JWT_SECRET,
                    {expiresIn: "1h"}
                )
                res.status(200).json({
                    statue:200,
                    msg:"2FA Verified SucessFull",
                    token: `Bearer ${acessToken}`
    
                })
            }
            else{
                res.status(400).json({
                    error:"Invalid 2FA token"
                })

            }

        } catch (error) {
            res.statue(500).json({
                error:"Error verifying 2FA" + error
            })
           
            
        }
    }
    static async reset(req,res){
        try{

          const user =  req.user;
          user.twoFactorSecret = "",
          user.isMFAActive = false,

          await user.save();

          res.status(200).json({
            statue:200,
            msg:"2FA Reset SucessFull"
          })
        }catch(error){
            res.statue(500).json({
                error:"Error resetting 2FA" + error
            })

        }
    }
    static async logout(req,res){
        try{
            if(!req.user){
                res.status(401).json({
                    msg:"Unauthorized User"
                })
            }
            req.logout((err)=>{
                if(err){
                    return res.status(400).json({
                        msg:"User not Logged In"
                    })
                }
                else{
                    res.status(200).json({
                        msg:"Logout SucessFull"
                    })
                }
            })
        }catch(error){

        }
    }
}
export default ProfileController;