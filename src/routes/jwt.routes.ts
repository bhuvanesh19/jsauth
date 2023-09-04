import * as express from 'express';
import { getJWT } from '../controller/jwt.controller';

const router = express.Router() 

router.get('',getJWT)

export default router;