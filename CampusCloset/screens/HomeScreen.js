import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, FlatList, Modal, Button} from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    
    const data = [
        { id: '1', image: require('../assets/image1.jpg'), caption: 'umich tube top', price: '18', university: 'Michigan Wolverines', type: 'Top', date: '11/16/2023', size: 'S', description: 'Blue tube top with michgian text'},
        { id: '2', image: require('../assets/image2.jpg'), caption: 'michigan long sleeve', price: '22', university: 'Michigan Wolverines', type: 'Top', date: '11/07/2023', size: 'M', description: 'Grey long sleeve' },
        { id: '3', image: require('../assets/image3.jpg'), caption: 'mich leggings', price: '30', university: 'Michigan Wolverines', type: 'Bottoms', date: '11/05/2023', size: 'XS', description: 'Michigan print leggings'},
        // Add more images with captions as needed
    ];

    const handleImagePress = (item) => {
        setSelectedImage(item);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const addToCart = (item) => {
        console.log("Adding items", item)
    };



    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleImagePress(item)}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.caption}>{item.caption}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
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
                    <Text style={styles.modalCaption}>{selectedImage?.caption}</Text>
                    <Text style={styles.modalPrice}>${selectedImage?.price}</Text>
                    <Text style={styles.modaluniversity}>{selectedImage?.university}</Text>
                    <Text style={styles.modaltype}>{selectedImage?.type}</Text>
                    <Text style={styles.modaldate}>{selectedImage?.date}</Text>
                    <Text style={styles.modalsize}>{selectedImage?.size}</Text>
                    <Text style={styles.modaldescription}>{selectedImage?.description}</Text>
                    <Button title="Add to Cart" onPress={() => addToCart(selectedImage, navigation)} />
                    <Button title="Close" onPress={closeModal} />
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
