import Pedido from "../models/Pedido";
import User from "../models/User";

class PedidoController{
    async create(req, res){
        try {
            const {idCliente ,cliente, pedidos, status} = req.body

            const newPedido = await Pedido.create({idCliente ,cliente, pedidos , status})
            return res.status(201).json(newPedido)


        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }

    }

    async update(req, res){
        try {
            const {id, idCliente, cliente, pedidos, status } = req.body
            const item = await Pedido.findById(id);

            if (!item) {
                return res.status(404).json();
            }

            await item.updateOne({ idCliente, cliente, pedidos, status });

            return res.status(200).json();
        } catch (error) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }

    }

    async show(req, res){
        try {
            const { id } = req.params;
            console.log(id)

            const pedido = await Pedido.find({ idCliente: id }); 
            console.log(pedido)

            if (!pedido) {
              return res.status(404).json();
            }
      
            return res.json(pedido);
          } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error." });
          }

    }
    
    async index(req, res){
        try {
            const pedidos = await Pedido.find()
            return res.json(pedidos);
        } catch (error) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error." });
            
        }
    
    }

    async destroy(req, res){

        try {
            const { id } = req.params;

            const pedido = await Pedido.findById(id)
            if (!pedido) {
                console.log("pedido não existe.");
                return res.status(404).json();
            }

            await pedido.deleteOne();
            return res.status(200).json();
            
        } catch (error) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
        

    }

    


}

export default new PedidoController();