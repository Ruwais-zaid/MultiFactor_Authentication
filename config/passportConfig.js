import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/models.js';
import bcrypt from 'bcryptjs';

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: "Incorrect password" });

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user,done)=>{
    console.log("We are inside serialUser")
    done(null,user._id)
})
passport.deserializeUser(async(_id,done)=>{
    try{
        console.log("We are inside deserializeUser")
        const user = await User.findById(_id);
        done(null,user)
    }catch(error){
        done(error)

    }
})

export default passport;
