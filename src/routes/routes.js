import express from "express";
import z from "zod";
import { userModel } from "../models/user.model.js";

const router = express.Router();

//check
router.get("/", (req, res) => {
  res.json({
    message: "/api/",
  });
});

// add new User

router.post("/addUser", async (req, res) => {
  const payload = req.body;
  const { name, email, age } = payload;

  console.log(payload);

  const schema = z.object({
    name: z.string().min(2, { message: "Too short" }),
    email: z.string().email({ message: "Invalid format" }),
    age: z.preprocess(
      (val) => (val ? Number(val) : undefined),
      z.number().int().positive().optional()
    )
  });

  // check if payload is valid
  const check = schema.safeParse(payload);

  if (!check.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: check.error.errors,
    });
  }

  const userCount = await userModel.countDocuments(); // can use a counter document to assign s_id incrementing by 1
  console.log(userCount);
  const s_id = userCount + 1;

  // create user
  const newUser = await userModel.create({
    s_id,
    name,
    email,
    age: Number(age)
  });

  res.json({
    message: "User created",
  });
});

// get all users

router.get("/fetchUsers", async (req, res) => {
  try {

    // fetch all users
    const query = await userModel.find();
    res.json({
      message: "Fetched Succesfully",
      data: query,
    });
  } catch (error) {
    res.status(400).json({
      message: "Couldn't Fetch",
      details: error,
    });
  }
});

// get single user

router.get("/getUser/:id", async (req, res) => {
  try {

    // get id
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({ message: "Invalid Id" });
    }

    // find using id
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

// update details using Id

router.put("/updateUser/:id", async (req, res) => {
  try {
    // get id
    const id = req.params.id;
    const updates = req.body;

    const schema = z.object({
      name: z.string().min(2, { message: "Too short" }),
      email: z.string().email({ message: "Invalid format" }),
    });

    const existingUser = await userModel.findById(id);
    console.log(existingUser)
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!updates.email) {
      updates.email = existingUser.email;
    }

    if (!updates.name) {
      updates.name = existingUser.name;
    }

    // check payload
    const check = schema.safeParse(updates);

    if (!check.success) {
      return res.status(404).json({ message: "Validation failed" });
    }

    // checking if the user with id exists or not
    // pass id and updates
    const updatedUser = await userModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {

    res.status(500).json({ message: "Internal server error" });
  }
});

// delete user using id

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userModel.findById(id);

    if (!user) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }

    const query = await userModel.findByIdAndDelete(id);

    res.json({
      message: "User deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't perform operation",
      details: error.message,
    });
  }
});

// auto inc

export default router;
