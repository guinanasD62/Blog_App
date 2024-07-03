// bcrypt.genSalt(10): Generates a salt with a cost factor of 10. The salt is used to enhance the security of the hashed password.
// bcrypt.hash(password, salt): Hashes the password using the generated salt and returns the hashed password.

import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Writer } from "../model/writer";

const secret = process.env.secret || 'your_secret_key';

interface AuthRequest extends Request {
    user?: any;
}

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export const comparePassword = async (candidatePassword: string, userPassword: string): Promise<boolean> => {
    return bcrypt.compare(candidatePassword, userPassword);
};

export const generateToken = (userId: string, role: any): string => {

    return jwt.sign({ id: userId, role }, secret, { expiresIn: '1h' });
}

export const auth = (roles: string[] = []) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            console.log('req.headers.authorization -->', req.headers.authorization);

        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        try {
            const decoded: any = jwt.verify(token, secret);
            console.log('Decoded token--->', decoded);

            const writer = await Writer.findById(decoded.id);
            console.log('writer--->', writer);

            if (!writer) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            if (roles.length && !roles.includes(writer.role)) {
                console.log('writer.role --->', writer.role)

                return res.status(403).json({ message: 'Forbidden' });
            }

            req.user = writer;
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server errorr' });
        }
    }
}


