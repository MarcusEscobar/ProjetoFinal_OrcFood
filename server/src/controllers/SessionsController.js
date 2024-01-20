import jwt from "jsonwebtoken";

import User from "../models/User";
import { checkPassword } from "../services/auth";
import authConfig from "../config/auth";


class SessionController {
    async create (req, res) {
        const { email, password } = req.body;


        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: "Invalid user / password." });
        }

        console.log(`user: ${user}`)
        console.log(`userPass: ${user.password}`)

        console.log(`pass by req: ${password}`)

        checkPassword(user, password).then((e)=>{
            if (!e) {
                return res.status(401).json({ error: "Invalid user / password." });
            }
    
            const { id, name, endereco, scope, moedas, tickets, cupons } = user;
    
            return res.json({
                user: {
                    id,
                    email,
                    password,
                    name,
                    endereco,
                    scope,
                    moedas,
                    tickets,
                    cupons
                },
                token:jwt.sign({ id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn,
                })
            });




        })

        

        
    }
}

export default new SessionController();