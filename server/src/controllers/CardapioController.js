import Item from "../models/Item";
// import User from "../models/User";

class CardapioController {
  async index(req, res) {
    try {
      const { q } = req.query;

      let query = {};

      if (q) {
        query = { name: { $regex: q } }
      }
      const cardapio = await Item.find({
        ...query}
      );

      
      return res.status(200).json(cardapio);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const item = await Item.findById(id);
      if (!item) {
        return res.status(404).json();
      }

      return res.json(item);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async create(req, res) {
    try {
      const { user_id, id } = req.params;
      const { name, description, price, image, category, serve } = req.body;
      const item = await Item.findById(id);

      if (item) {
        return res
          .status(422)
          .json({ message: `Item ${name} (id: ${id}) already exists.` });
      }

      const newItem = await Item.create({
        name,
        description,
        price,
        image,
        category,
        serve,
      });

      return res.status(201).json(newItem);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async update(req, res) {
    try {
        const { id, name, description, price, image, category, serve } = req.body;

        const item = await Item.findById(id);

        if (!item) {
          return res.status(404).json();
      }

        await item.updateOne({ name, description, price, image, category, serve });

        return res.status(200).json();

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async destroy(req, res) {
    try {
      const { user_id, id } = req.params;
      const item = await Item.findById(id);

      if (!item) {
        console.log("Item não existe.");
        return res.status(404).json();
      }

      await item.deleteOne();

      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default new CardapioController();
