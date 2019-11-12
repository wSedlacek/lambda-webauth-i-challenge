import { Router } from "express";
import { compare, hash } from "bcryptjs";
import { add, findBy } from "../database/users";

export const authRouter = Router();
authRouter.post("/register", async ({ body, session }, res) => {
  try {
    const user = { ...body, password: await hash(body.password, 12) };
    const saved = await add(user);
    session.username = saved.username;
    res.status(201).json({ message: `Welcome ${user.username}!` });
  } catch (error) {
    res.status(500).json(error);
  }
});

authRouter.post("/login", async ({ body, session }, res) => {
  const { username, password } = body;
  try {
    const user = await findBy({ username });
    if (!user) res.status(401).json({ message: "Invalid Credentials" });

    const valid = await compare(password, user.password);
    if (!valid) res.status(401).json({ message: "Invalid Credentials" });

    session.username = user.username;
    res.status(200).json({ message: `Welcome ${user.username}!` });
  } catch (error) {
    res.status(500).json(error);
  }
});

authRouter.post("/logout", async ({ session }, res) => {
  if (session)
    session.destroy(err => {
      if (err)
        res.json({
          message: "Failed to destroy session, it may already be destroyed"
        });
      else res.json({ message: "Cya soon!" });
    });
});
