import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, FlatList, Modal, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { doc, getDoc, updateDoc, getDocs, collection, addDoc } from "firebase/firestore";
import { auth, db, storage } from '../firebaseConfig';
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


const HomeScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const[firebaseData, setFirebaseData] = useState([]);
    const [filters, setFilters] = useState({
        university: null,
        type: null,
        size: null,
    });



    const defaultImage = require('../assets/default.jpg');

    const[dynamicData, setDynamicData] = useState([]);


    const fetchData = async () => {
        const itemsCollection = collection(db, 'items');
        try {
            const querySnapshot = await getDocs(itemsCollection);
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setDynamicData(items);
        } catch (error) {
            console.error('error fetching data from irebase')
        }
        
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );
          
 

    const dynamicDataFromDatabase = dynamicData.map(item => ({
        id: item.id,
        image: defaultImage,
        name: item.name,
        price: item.price,
        university: item.university,
        type: item.tags[0],
        date: '11/19/2023',
        size: item.size,
        description: item.description,
    }))
    
    const data = [
        { id: '1', image: require('../assets/image1.jpg'), name: 'umich tube top', price: '18', university: 'Michigan Wolverines', type: 'Tops', date: '11/16/2023', size: 'S', description: 'Blue tube top with michgian text'},
        { id: '2', image: require('../assets/image2.jpg'), name: 'michigan long sleeve', price: '22', university: 'Michigan Wolverines', type: 'Tops', date: '11/07/2023', size: 'M', description: 'Grey long sleeve' },
        { id: '3', image: require('../assets/image3.jpg'), name: 'mich leggings', price: '30', university: 'Michigan Wolverines', type: 'Bottoms', date: '11/05/2023', size: 'XS', description: 'Michigan print leggings'},
        { id: '4', image: require('../assets/image4.jpg'), name: 'blue michigan skirt', price: '24', university: 'Michigan Wolverines', type: 'Bottoms', date: '11/04/2023', size: 'L', description: 'Blue michigan tennis skirt with border'},
        { id: '5', image: require('../assets/image5.jpg'), name: 'mich state top', price: '12', university: 'Michigan State Spartans', type: 'Tops', date: '11/02/2023', size: 'S', description: 'Green cropped mich state tee'},
        { id: '6', image: require('../assets/image6.jpg'), name: 'one shoulder top', price: '28', university: 'American University', type: 'Tops', date: '11/01/2023', size: 'XS', description: 'white one shoulder american university top'},
        { id: '7', image: require('../assets/image7.jpeg'), name: 'penn state tee', price: '15', university: 'Penn State', type: 'Tops', date: '10/24/2023', size: 'M', description: 'Mouth blue penn state tee'},
        { id: '8', image: require('../assets/image8.jpg'), name: 'crewneck georgia', price: '32', university: 'Georgia Bulldogs', type: 'Tops', date: '10/23/2023', size: 'L', description: 'Grey Georgia Bulldog hoodie, new'},
        { id: '9', image: require('../assets/image9.jpg'), name: 'mich state leggings', price: '30', university: 'Michigan State Spartans', type: 'Bottoms', date: '10/14/2023', size: 'M', description: 'Michigan state print leggings'},
        { id: '10', image: require('../assets/image10.jpg'), name: 'rutgers split tee', price: '11', university: 'Rutgers', type: 'Tops', date: '10/14/2023', size: 'L', description: 'Half red half black Rutgers tee'},
        // Add more images with captions as needed
    ];

    const combinedData = [...data, ...dynamicDataFromDatabase];

    const handleImagePress = (item) => {
        setSelectedImage(item);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const addToCart = async (item) => {
        try {
            // Create a new object with the necessary properties for the cart
            const cartItem = {
                name: item.name,
                price: item.price,  // Make sure to add the correct property
                // Add other properties as needed
            };
    
            // Add the selected item to the Firebase database under the user's cart collection
            const cartRef = collection(db, `users/${auth.currentUser.uid}/cart`);
            await addDoc(cartRef, cartItem);
    
            console.log("Item added to cart:", cartItem);
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    const filteredData = combinedData.filter(item => {
        return (
            (!filters.university || item.university === filters.university) &&
            (!filters.type || item.type === filters.type) &&
            (!filters.size || item.size === filters.size)
        );
    });



    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleImagePress(item)}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.caption}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                {/* University Filter */}
                <RNPickerSelect
                    placeholder={{ label: 'Select University', value: null }}
                    placeholderTextColor="bba1d2"
                    onValueChange={(value) => setFilters({ ...filters, university: value })}
                    items={[
                        { label: 'Michigan Wolverines', value: 'Michigan Wolverines' },
                        { label: 'Michigan State Spartans', value: 'Michigan State Spartans' },
                        { label: 'American University', value: 'American University' },
                        { label: 'Penn State', value: 'Penn State' },
                        { label: 'Georgia Bulldogs', value: 'Georgia Bulldogs' },
                        { label: 'Rutgers', value: 'Rutgers' },
                        { label: 'University of Pennsylvania', value: 'University of Pennsylvania'},
                    ]}
                    style={styles.pickerSelect}
                    
                />

                {/* Type Filter */}
                <RNPickerSelect
                    placeholder={{ label: 'Select Type', value: null }}
                    onValueChange={(value) => setFilters({ ...filters, type: value })}
                    items={[
                        { label: 'Tops', value: 'Tops' },
                        { label: 'Bottoms', value: 'Bottoms' },
                        // Add more types as needed
                    ]}
                    style={styles.pickerSelect}
                    
                />

                {/* Size Filter */}
                <RNPickerSelect
                    placeholder={{ label: 'Select Size', value: null }}
                    onValueChange={(value) => setFilters({ ...filters, size: value })}
                    items={[
                        { label: 'XS', value: 'XS' },
                        { label: 'S', value: 'S' },
                        { label: 'M', value: 'M' },
                        { label: 'L', value: 'L' },
                        // Add more sizes as needed
                    ]}
                    style={styles.pickerSelect}
                />
        </View>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={2} // Adjust the number of columns as per your design
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={selectedImage !== null}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <Image source={selectedImage?.image} style={styles.modalImage} />
                    <Text style={styles.modalName}>{selectedImage?.name}</Text>
                    <Text style={styles.modalPrice}>${selectedImage?.price}</Text>
                    <Text style={styles.modalUniversity}>{selectedImage?.university}</Text>
                    <Text style={styles.modalType}>{selectedImage?.type}</Text>
                    <Text style={styles.modalDate}>{selectedImage?.date}</Text>
                    <Text style={styles.modalSize}>{selectedImage?.size}</Text>
                    <Text style={styles.modalDescription}>{selectedImage?.description}</Text>
                    <View style={styles.buttonSpacing}></View>
                    <CustomButton title="Add to Cart" onPress={() => addToCart(selectedImage)} color="#2c0e69"/>
                    <View style={styles.buttonSpacing}></View>
                    <CustomButton title="Close" onPress={closeModal} color="#2c0e69"/>
                    </View>
                </View>
            </Modal>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#efeaff'
    },
    imageContainer: {
        flex: 1,
        margin: 8,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
        aspectRatio: 1,
        borderRadius: 8,
    },
    caption: {
        fontSize: 13,
        marginTop: 8,
        fontFamily: 'AvenirNext-Bold',
        color: '#2c0e69',
        alignContent: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#bba1d2', // Background color for the content inside the modal
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    modalImage: {
        width: '80%',
        height: 300,
        aspectRatio: 1,
        borderRadius: 8,
        marginBottom: 10,
    },
    modalName: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold',
        color: '#2c0e69'
    },
    modalPrice: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold',
        color: '#2c0e69'
    },
    modalUniversity: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold',
        color: '#2c0e69'
    },
    modalType: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold',
        color: '#2c0e69'
    },
    modalSize: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold',
        color: '#2c0e69'
    },
    modalDate: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'AvenirNext-Bold',
        color: '#2c0e69'
    },
    modalDescription: {
        fontSize: 14,
        textAlign: 'center',
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
    filterContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pickerSelect: {
        inputIOS: {
            color: '#2c0e69',
            fontFamily: 'AvenirNext-Bold',
            textAlign: 'center', // Center the text horizontally
        },
        inputAndroid: {
            color: '#2c0e69',
            fontFamily: 'AvenirNext-Bold',
            textAlign: 'center', // Center the text horizontally
        },
        placeholder: {
            color: '#bba1d2',
            fontFamily: 'AvenirNext-Bold',
            textAlign: 'center', // Center the text horizontally
        },
    },
});

export default HomeScreen;