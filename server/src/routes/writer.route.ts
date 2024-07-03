import express from "express"
import { addWriter, deleteWriter, getAllWriters, getWriter, loginWriter, updateWriter } from "../controller/writer.controller";
import { auth } from "../middleware";

const router = express.Router();

router.post('/register', addWriter)
router.post('/login', loginWriter);

router.get('/getAllWriters', getAllWriters)
router.get('/getWriter', getWriter)

router.put('/updateWriter/:id', auth(['admin']), updateWriter)
router.delete('/writer/:id', deleteWriter)

export default router;