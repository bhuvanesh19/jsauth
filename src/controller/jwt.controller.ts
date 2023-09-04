import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { User,UserDAO } from '../models/user.models';

export async function getJWT(req: express.Request, res: express.Response) {

    let j = jwt.sign({ username: 'bhuvanesh800t@gmail.com' }, "secret")
    let user = new User({ id: 1, username: 'bhuvanesh', 'primary_uid': "bhuvanesh800t@gmail.com", expires_on: new Date(), jwt: j, is_locked: false, is_logged_in: false });
    await UserDAO.createUser(user);
    res.setHeader('Set-Cookie', `jwt-token=${j}`);
    res.status(200);
    res.send();
}




