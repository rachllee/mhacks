import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useFocusEffect } from '@react-navigation/native';

const CustomButton = ({ title, onPress, color }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles.button, { backgroundColor: color }]}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const CustomButton2 = ({ onPress }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={styles.removeItemButtonContainer}
        >
            <Text style={styles.removeItemButtonText}>Remove</Text>
        </TouchableOpacity>
    );
};

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser.uid}/cart`));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCartItems(items);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };
        
    useFocusEffect(
        React.useCallback(() => {
            fetchCartItems();
        }, [])
    );

    const handleRemoveItem = async (itemId) => {
        try {
            await deleteDoc(doc(db, `users/${auth.currentUser.uid}/cart`, itemId));
            const updatedCart = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedCart);
        } catch (error) {
            console.error("Error removing cart item:", error);
        }
    };

    const getTotalPrice = () => {
        return cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <CustomButton2 
                onPress={() => handleRemoveItem(item.id)}
            />
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
            <CustomButton 
                    title="Proceed to Checkout" 
                    //onPress={handleCreateAccount}
                    color="#2c0e69"
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#efeaff'
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
        fontFamily: 'AvenirNext-Bold',
        color: '#2c0e69'
    },
    itemPrice: {
        fontSize: 16,
        fontFamily: 'AvenirNext-Bold',
        color: '#2c0e69'
    },
    removeItemButtonContainer: {
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center',
        width: 80, // Smaller width for the button
    },
    removeItemButtonText: {
        color: 'red',
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold',
    },
    totalPrice: {
        fontSize: 20,
        textAlign: 'right',
        marginVertical: 20,
        fontFamily: 'AvenirNext-Bold',
        color: '#2c0e69'
    },
    buttonContainer: {
        fontFamily: 'AvenirNext-Bold',
        width: '80%',
        justifyContent: 'center',
    },
    button: {
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    buttonText: {
        color: '#efeaff',
        fontSize: 14,
        fontFamily: 'AvenirNext-Bold', 
    },
    buttonSpacing: {
        height: 10
    },
});

export default CartScreen;
