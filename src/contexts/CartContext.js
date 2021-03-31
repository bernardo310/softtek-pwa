import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase';
import firebase from 'firebase/app';
import { useAuth } from './AuthContext';

export const CartContext = React.createContext();

export function useCart() {
    return useContext(CartContext)
}
export function CartProvider({ children }) {
    const [cart, setCart] = useState();
    const [loading, setLoading] = useState(true)
    const { currentUser } = useAuth();

    function getTotalItems() {
        //gets number total items in cart
        let numItems = 0;
        cart.restaurantes.forEach(restaurant => {
            restaurant.products.forEach(product => numItems++)
        })
        return numItems
    }

    async function addProduct(input_product, input_restaurant, addedOfProduct) {
        console.log('adding product',cart, input_product, input_restaurant, addedOfProduct)
        console.log(        cart.total + (addedOfProduct * input_product.price))
        console.log(        cart.total, '+', addedOfProduct, '*' ,input_product.price)
        //check if product is already in cart
        const filteredRestaurant = cart.restaurantes.find(restaurant => restaurant.restaurantId === input_restaurant.id)
        const filteredProduct = filteredRestaurant ? filteredRestaurant.products.find(product => product.id === input_product.id) : undefined;
        if (filteredProduct != undefined) {
            //already has product in cart
            incrementProduct(input_product.id, input_restaurant.name, addedOfProduct, filteredProduct.costoUnitario)
            console.log('already has')
        } else if (filteredRestaurant) {
            //add new product from existing restaurant to cart
            console.log('new product, same restaurant')
            filteredRestaurant.products.push({
                cantidad: addedOfProduct,
                comentario: "",
                costoTotal: addedOfProduct * input_product.price,
                costoUnitario: input_product.price,
                descripcion: input_product.description,
                id: input_product.id,
                nombre: input_product.name,
                tiempoEntrega: input_product.estimatedTime,
                tiempoEntregaUnitario: input_product.estimatedTime
            })
            cart.noProducts += addedOfProduct;
            cart.total = cart.total + addedOfProduct * Number(input_product.price);    
        } else {
            //add new product from new restaurant to cart
            console.log('new product, NEW restaurant', cart)
            cart.restaurantes.push({
                paymentType: ["Tarjeta"],
                products: [{
                    cantidad: addedOfProduct,
                    comentario: "",
                    costoTotal: addedOfProduct * input_product.price,
                    costoUnitario: input_product.price,
                    descripcion: input_product.description,
                    id: input_product.id,
                    nombre: input_product.name,
                    tiempoEntrega: input_product.estimatedTime,
                    tiempoEntregaUnitario: input_product.estimatedTime
                }],
                restaurantId: input_restaurant.id,
                restaurantName: input_restaurant.name,
                total: addedOfProduct * input_product.price,
                waitingTime: input_product.estimatedTime,
            })
            cart.noProducts += addedOfProduct;
            cart.total = cart.total + (addedOfProduct * input_product.price);    
        }
        await db.collection('carts').doc(cart.cartId).update(cart);
    }

    async function incrementProduct(productId, restaurantName, addedOfProduct, unitaryPrice) {
        console.log('increment',productId, restaurantName, addedOfProduct, unitaryPrice)
        console.log('totalProducs',cart.noProducts)
        cart.noProducts++;
        cart.total = cart.total + Number(unitaryPrice);
        const filteredProduct = cart.restaurantes.find(restaurant => restaurant.restaurantName === restaurantName).products.find(product => product.id === productId);
        filteredProduct.cantidad = addedOfProduct;
        filteredProduct.costoTotal = Number(filteredProduct.costoTotal) + Number(unitaryPrice);
        await db.collection('carts').doc(cart.cartId).update(cart);
    }

    async function decrementProduct(productId, restaurantName, addedOfProduct, unitaryPrice) {
        console.log('decrementing',productId, restaurantName, addedOfProduct, unitaryPrice)

        cart.noProducts--;
        cart.total -= unitaryPrice;
        if(addedOfProduct <= 0) {
            //remove from cart
            const cartProductsFromRestaurant = cart.restaurantes.find(restaurant => restaurant.restaurantName === restaurantName).products
            if(cartProductsFromRestaurant.length === 1) {
                //only product from restaurant, delete restaurant from cart
                cart.restaurantes = cart.restaurantes.filter(restaurant => restaurant.restaurantName != restaurantName)
                console.log('removing restaurant from cart',restaurantName,cart)
            } else {
                //other products in cart from restaurant, delete product from restaurant in cart
                console.log('removing product from restaurant', productId,cartProductsFromRestaurant)
                cart.restaurantes.find(restaurant => restaurant.restaurantName === restaurantName).products = cartProductsFromRestaurant.filter(product => product.id !== productId)
            }

        } else {
            //reduce quantity of product in cart
            const filteredProduct = cart.restaurantes.find(restaurant => restaurant.restaurantName === restaurantName).products.find(product => product.id === productId);
            filteredProduct.cantidad = addedOfProduct;
            filteredProduct.costoTotal -= Number(unitaryPrice);
        }
        console.log('final cart',cart)
        await db.collection('carts').doc(cart.cartId).update(cart);
    }

    async function getCart() {
        //get latest cart data
        const snapshot = await db.collection('carts').where('userId', '==', currentUser.uid).get()
        let cartData;
        snapshot.forEach(cart => {
            cartData = cart.data();
            cartData.cartId = cart.id

        })
        setCart(cartData)
        return cartData
    }

    useEffect(() => {
        if(!currentUser) {
            setCart({})
            setLoading(false)
            return
        }
        db.collection('carts').where('userId', '==', currentUser.uid).get().then(snapshot => {
            snapshot.forEach(cart => {
                const cartData = cart.data();
                cartData.cartId = cart.id
                setCart(cartData)
                setLoading(false)
            })
        })
    }, [])

    const value = {
        cart,
        getCart,
        addProduct,
        incrementProduct,
        decrementProduct,
        getTotalItems
    }

    return (
        <CartContext.Provider value={value}>
            {!loading && children}
        </CartContext.Provider>
    )
}
