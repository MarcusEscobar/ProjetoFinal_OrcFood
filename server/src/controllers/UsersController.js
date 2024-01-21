import User from "../models/User";

import { createPasswordHash } from "../services/auth";

class UsersController {
  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }

      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async create(req, res) {
    try {
      const { name, endereco, email, password, scope } =
        req.body;

      const user = await User.findOne({ email });

      if (user) {
        return res
          .status(422)
          .json({ message: `User ${email} already exists.` });
      }

      // Criptografa o password.
      const encryptedPassword = await createPasswordHash(password);

      const newUser = await User.create({
        name,
        endereco,
        email,
        password: encryptedPassword,
        scope,
        moedas: 3,
        tickets: 3,
        cupons: {
          c10: 0,
          c20: 0,
          c30: 0,
        },
      });
      return res.status(201).json(newUser);
      //201: objeto criado com sucesso.
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        endereco,
        email,
        password,
        scope,
        moedas,
        tickets,
        c10,
        c20,
        c30,
      } = req.body;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }

      const encryptedPassword = await createPasswordHash(password);

      await user.updateOne({
        name,
        endereco,
        email,
        password: encryptedPassword,
        scope,
        moedas,
        tickets,
        cupons: {
          c10,
          c20,
          c30,
        },
      });

      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async updateEconomy(req, res) {
    try {
      const { id } = req.params;
      const { moedas, tickets, c10, c20, c30 } = req.body;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }

        await user.updateOne({
          moedas,
          tickets,
          cupons: {
            c10,
            c20,
            c30,
          },
        });

        return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }

      await user.deleteOne();

      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default new UsersController();
