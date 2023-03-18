import express,{ Router } from "express";

import { isAuthenticated } from "../helper/userManagement.js";
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from "../controller/products.js";


const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", async (req, res) => {
    try {
        const {name,marketPrice,availableQuantity,totalQuantity,description} = req.body;

        if(!name || !marketPrice || !availableQuantity || !totalQuantity || !description){
            res.json({"message": "Please provide all the details"});
        }

        const product = {
            name: name,
            marketPrice: marketPrice,
            availableQuantity: availableQuantity ,
            totalQuantity: totalQuantity ,
            description: description
        }

        const token= req.body.token?req.body.token:null;

        if (await isAuthenticated(token)){
            let docRef = await addProduct(product);
            res.json(docRef);
        } else {
            res.json({"message": "User not authenticated"});
        }
    } catch (err) {
        console.log(err);
        res.json({ "message": err.message })
    }
});
router.put("/:id", async (req, res) => {
    try {
        const { product } = req.body;
        const { token } = req.body.token || null;
        if (await isAuthenticated(token)) {
            let docRef = await updateProduct(req.params.id, product);
            res.json(docRef);
        } else {
            res.json({ "message": "User not authenticated" });
        }
    } catch (err) {
        console.log(err);
        res.json({ "message": err.message })
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { token } = req.body.token || null;
        if (await isAuthenticated(token)) {
            let docRef = await deleteProduct(req.params.id);
            res.json(docRef);
        } else {
            res.json({ "message": "User not authenticated" });
        }
    } catch (err) {
        console.log(err);
        res.json({ "message": err.message })
    }
}
);


export default router;