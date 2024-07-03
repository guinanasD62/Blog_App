import { Request, Response } from "express";
import { Writer } from "../model/writer";
import { comparePassword, generateToken, hashPassword } from "../middleware";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secret = "jwt_secret_key";
// Add a new product
export const addWriter = async (req: Request, res: Response) => {
    try {
        const { name, email, contact, address, password, role, permissions } = req.body;

        //role permission hashedPassword
        //  const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = await hashPassword(password);

        const writer = new Writer({
            name,
            email,
            contact,
            address,
            password: hashedPassword,
            role,
            permissions,
        });

        await writer.save();
        return res.status(201).json({ message: "New writer", data: writer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create writer" });
    }
};

// Get all products
export const getAllWriters = async (req: Request, res: Response) => {
    try {
        const writers = await Writer.find();
        return res.status(200).json({ data: writers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch writers" });
    }
};


//getOne
export const getWriter = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const writer = await Writer.findById(id);
        return res.status(200).json({ data: writer });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateWriter = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const writer = await Writer.findByIdAndUpdate(id, req.body);

        if (!writer) {
            return res.status(404).json({ message: "No writer found." });
        }

        const updatedwriter = await Writer.findById(id);
        res.status(200).json(updatedwriter);

    } catch (error) {
        res.status(500).json({ message: "error updating writer" });
    }

};

export const deleteWriter = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const writer = await Writer.findByIdAndDelete({ _id: id });

        if (!writer) {
            return res.status(404).json({ message: "No writer found." });
        }

        return res.status(200).json({ message: "writer  deleted!", data: writer });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

};

export const loginWriter = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const writer = await Writer.findOne({ email });
        if (!writer) {
            return res.status(401).json({ message: 'invalid email or password' })
        }

        const isMatch = await comparePassword(password, writer.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // generate a token
        const token = generateToken(writer._id.toString(), writer.role);

        // const token = jwt.sign(
        //     {
        //         id: writer._id,
        //         // permissions: user.permissions, // Include permissions in the token payload
        //     },
        //     secret,
        //     { expiresIn: '1h' }
        // );

        res.status(200).json({ message: 'Login successful', token, writer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};