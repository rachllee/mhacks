import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

// mock data
const cartItemsMock = [
    { id: '1', name: 'Tailgate T-Shirt', price: 20, quantity: 1 },
    { id: '2', name: 'Vintage College Cap', price: 15, quantity: 1 },
];

const CartScreen = () => {
    const [cartItems, setCartItems] = useState(cartItemsMock);

    const handleRemoveItem = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        // update backend
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCart);
        // update backend
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
