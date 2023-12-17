import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.handle';
import { type JwtPayload } from 'jsonwebtoken';

interface RequestExt extends Request {
	user?: string | JwtPayload;
}
const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.header('Authorization');
		if (!authHeader) return res.status(401).json({ message: 'HEADER_NOT_FOUND' });

		const [bearer, token] = authHeader.split(' ');

		if (bearer !== 'Bearer' || !token)
			return res.status(401).json({ message: 'TOKEN_INVALID' });

		const decoded = verifyToken(token);

		if (!decoded) {
			res.status(401);
			res.json({ message: 'JWT_INVALID' });
		}

		req.body.usertoken = decoded;
		next();
	} catch (e) {
		res.status(401);
		res.json({ message: 'INVALID_SESSION' });
	}
};

export { checkJwt };