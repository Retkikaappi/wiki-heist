import express, { Request, Response } from 'express';
import db from '../db/index.ts';
import * as bcrypt from 'bcrypt';
import { userTable } from '../db/schema.ts';
import { eq } from 'drizzle-orm';
import js from 'jsonwebtoken';
import { SECRET } from '../utils/config.ts';

const router = express.Router();

type User = {
  username: string;
  password: string;
};

// router.post('/', (req: Request<unknown, unknown, User>, resp: Response) => {
//   const { username, password } = req.body;
//   const saltRounds = 10;
//   if (!username || !password) {
//     resp.status(400).json({ error: 'No username or password' });
//     return;
//   }
//   console.log(username, password);
//   bcrypt.hash(password, saltRounds, async (err, hash) => {
//     console.log(hash);
//     await db.insert(userTable).values({ username, password: hash });
//   });
//   resp.status(200).end();
// });

router.post(
  '/',
  async (req: Request<unknown, unknown, User>, resp: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      resp.status(400).json({ error: 'No username or password' });
      return;
    }

    const user = await db.query.userTable.findFirst({
      where: eq(userTable.username, username),
    });

    if (!user) {
      resp.status(401).json({ error: 'No user found' });
      return;
    }

    const correctPass = await bcrypt.compare(password, user.password);

    if (!correctPass) {
      resp.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = js.sign({ username }, SECRET);

    resp.json({ token });
  }
);

router.get('/authenticate', (req, resp) => {
  const token = req.headers.authorization;
  if (!token) {
    resp.status(401).json({ error: 'No auth headers' });
    return;
  }

  try {
    const strippedToken = token.substring(7);
    const validToken = js.verify(strippedToken, SECRET);
    resp.json({ validToken });
  } catch (error) {
    resp.status(401).json({ error });
    return;
  }
  return;
});

export default router;
