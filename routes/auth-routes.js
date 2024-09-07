import express from "express";
import { loginUser } from "../controllers/auth-controller.js";
import { validateRequest } from "../middlewares/validation-middleware.js";
import { loginSchema } from "../validations/login-validation.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login of the User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "nehemiah2015s@gmail.com"
 *               password:
 *                 type: string
 *                 example: "Qwerty@1234"
 *     responses:
 *       200:
 *         description: User Authenticated Successfully
 *       401:
 *         description: Incorrect password provided
 *       404:
 *         description: User not found with the email given
 *       500:
 *         description: Server is allocated at the moment
 */
router.post("/login", validateRequest(loginSchema), loginUser);

export default router;
