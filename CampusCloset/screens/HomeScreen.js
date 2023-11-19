import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, FlatList, Modal, Button } from 'react-native';

const HomeScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const data = [
        { id: '1', image: require('../assets/image1.jpg'), caption: 'umich tube top' },
        { id: '2', image: require('../assets/image2.jpg'), caption: 'michigan long sleeve' },
        { id: '3', image: require('../assets/image3.jpg'), caption: 'mich leggings' },
        // Add more images with captions as needed
    ];

    const handleImagePress = (item) => {
        setSelectedImage(item);
    };

    const closeModal = () => {
        setSelectedImage(null);
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
                    <Image source={selectedImage?.image} style={styles.modalImage} />
                    <Text style={styles.modalCaption}>{selectedImage?.caption}</Text>
                    <Button title="Close" onPress={closeModal} />
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
});

export default HomeScreen;
