import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, FlatList, Modal, Button} from 'react-native';
import { doc, getDoc, updateDoc, getDocs, collection } from "firebase/firestore";
import { launchImageLibrary } from 'react-native-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebaseConfig';


const HomeScreen = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [firebaseData, setFirebaseData] = useState([]);
    
    const fetchDataFromFirebase = async () => {
        // Assuming you have a 'items' collection in your Firebase database
        const itemsCollection = collection(db, 'items');
        
        try {
            const querySnapshot = await getDocs(itemsCollection);
            const items = [];
            
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });

            setFirebaseData(items);
        } catch (error) {
            console.error('Error fetching data from Firebase:', error);
        }
    };

    useEffect(() => {
        fetchDataFromFirebase();
    }, []);


    const handleImagePress = (item) => {
        setSelectedImage(item);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const addToCart = (item) => {
        console.log("Adding items", item)
    };



    const renderItem = (item) => (
        <View key={item.id} style={styles.itemContainer}>
            <Text>Name: {item.name}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Size: {item.size}</Text>
            <Text>University: {item.university}</Text>
            <Text>Used: {item.used ? 'Yes' : 'No'}</Text>
            <Text>ImageURL: {item.image}</Text>
            
        </View>
    );
    

    return (
        
        <View style={styles.container}>
            <FlatList
            data={firebaseData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderItem(item)} // Pass each item to renderItem
            numColumns={2}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
        fontSize: 16,
        marginTop: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white', // Background color for the content inside the modal
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
    modalCaption: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default HomeScreen;
