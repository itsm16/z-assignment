import express from 'express'
import z from 'zod'
import { userModel } from '../models/user.model.js';

const router = express.Router();

//check
router.get("/", (req, res) => {
    res.json({
        message: "/api/"
    })
})


// add new user

router.post("/addUser", async (req, res) => {
    const payload = req.body;

    console.log(payload);

    const schema = z.object({
        name: z.string().min(2, { message: "Too short" }),
        email: z.string().email({ message: "Invalid format" })
    })

    const check = schema.safeParse(payload);

    if (!check.success) {
        return res.status(400).json({
            error: "Validation failed",
            details: check.error.errors
        });
    }

    const { name, email } = payload;

    const userCount = await userModel.countDocuments();
    console.log(userCount);
    const s_id = userCount + 1;

    const newUser = await userModel.create({
        s_id,
        name,
        email
    });

    res.json({
        message: "User created"
    })
})


// get all users

router.get("/fetchUsers", async (req, res) => {
    try {
        const query = await userModel.find();
        res.json({
            message: "Fetched Succesfully",
            data: query
        })
    } catch (error) {
        res.status(400).json({
            message: "Couldn't Fetch",
            details: error
        })
    }

})


// get single user

router.get("/getUser/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id){ return res.status(404).json({message: "Invalid Id"})}

        const user = await userModel.findById(id);
        if (!user){ return res.status(404).json({message: "User not found"})}

        res.json({
            message : user
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
})


// update details using Id

router.put("/", async (req, res) => {
    console.log(req.body);
    console.log()

    try {

    } catch (error) {

    }
})


// delete user using id

router.delete("/deleteUser/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const user = await userModel.findById(id);

        if (!user) {
            res.status(404).json({
                message: "Not found"
            })
            return
        }

        const query = await userModel.findByIdAndDelete(id);

        res.json({
            message: "User deleted"
        })
    } catch (error) {
        return res.status(400).json({
            message: "Couldn't perform operation",
            details: error.message
        })
    }
})


export default router;