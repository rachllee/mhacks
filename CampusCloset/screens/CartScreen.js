import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser.uid}/cart`));
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCartItems(items);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveItem = async (itemId) => {
        try {
            await deleteDoc(doc(db, `users/${auth.currentUser.uid}/cart`, itemId));
            const updatedCart = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedCart);
        } catch (error) {
            console.error("Error removing cart item:", error);
        }
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent quantity from going below 1

        try {
            const itemRef = doc(db, `users/${auth.currentUser.uid}/cart`, itemId);
            await updateDoc(itemRef, { quantity: newQuantity });

            const updatedCart = cartItems.map(item => {
                if (item.id === itemId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            setCartItems(updatedCart);
        } catch (error) {
            console.error("Error updating cart item:", error);
        }
    };

    const getTotalPrice = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.quantity - 1)}>
                    <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.quantity + 1)}>
                    <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                <Text style={styles.removeItemButton}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListFooterComponent={() => (
                    <Text style={styles.totalPrice}>Total: ${getTotalPrice()}</Text>
                )}
            />
            <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    itemName: {
        fontSize: 16,
    },
    itemPrice: {
        fontSize: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 20,
        marginHorizontal: 10,
    },
    quantity: {
        fontSize: 16,
    },
    removeItemButton: {
        fontSize: 16,
        color: 'red',
    },
    totalPrice: {
        fontSize: 20,
        textAlign: 'right',
        marginVertical: 20,
    },
    checkoutButton: {
        backgroundColor: '#007bff',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default CartScreen;
