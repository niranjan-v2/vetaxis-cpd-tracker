import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import { getCpdPeriod, getRegulatoryBody } from "../config/regulatoryBodies.js";

export const completeOnboarding = async(req, res, next) => {
    const {profession, country, state} = req.body;

    if(!profession || !country || !state || profession === '' || country === '' || state ==='') {
        return next(errorHandler(400, 'All fields are required'));
    }

    const body = getRegulatoryBody(state);
    if(!body) {
        return next(errorHandler(400, 'Unrecognized state.'));
    }

    const cpdPeriod = getCpdPeriod(new Date(), state);

    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id,
            {
                $set: {
                    "profile.profession": profession,
                    "profile.country": country,
                    "profile.state": state,
                    "profile.registration.board": body.name,
                    cpd: { ...cpdPeriod, earnedPoints: 0},
                },
            },
            {new: true},
        );
        const {passwordHash, ...rest} = updatedUser._doc;
        res.status(200).json(rest);        
    } catch(error) {
        next(error);
    }
}

export const test = (req, res) => {
    res.json({message: "API is working"});
}