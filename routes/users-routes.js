import express from "express";
import { createUserController } from "../controllers/users-controller.js";
import { userSchema } from "../validations/create-user-validation.js";
import { validateRequest } from "../middlewares/validation-middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/users/create-user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Seerapu"
 *               email:
 *                 type: string
 *                 example: "nehemiah2015s@gmail.com"
 *               password:
 *                 type: string
 *                 example: "Qwerty@1234"
 *     responses:
 *       200:
 *         description: User Created Successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Duplicate User found to create
 *       500:
 *         description: Server error
 */
router.post("/create-user", validateRequest(userSchema), createUserController);

export default router;
