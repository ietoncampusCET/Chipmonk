import {database} from '../index.js';

export async function addProduct(product) {
    try {
        let pid = await database.collection('products').doc('id').get();
        pid = await pid.data().currentId;
        console.log(pid);
        const docRef = await database.collection('products').doc(`prod${pid}`).set({product});
        await database.collection('products').doc('id').set({currentId: pid+=1});
        return docRef;
    } catch (err) {
        console.log(err);
    }
}

export async function getProduct(req,res) {
    try {
        const id = req.params.id;
        console.log(id);
        const product = await database.collection('products').doc(id).get();
        res.json(product.data());
    } catch (err) {
        res.json({ "message": err.message })
    }
}

export async function getProducts(req,res) {
    try {
        const products = await database.collection('products').get();
        res.json(products.data());
    } catch (err) {
        res.json({ "message": err.message })
    }
}

export async function updateProduct(id, product) {
    try {
        const docRef = await database.collection('products').doc(id).update(product);
        return docRef;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function deleteProduct(id) {
    try {
        const docRef = await database.collection('products').doc(id).delete();
        return docRef;
    } catch (err) {
        console.log(err);
        return err;
    }
}   
