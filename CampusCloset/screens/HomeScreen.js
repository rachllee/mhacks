import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, FlatList, Modal, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const HomeScreen = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [filters, setFilters] = useState({
        university: null,
        type: null,
        size: null,
    });
    
    const data = [
        { id: '1', image: require('../assets/image1.jpg'), caption: 'umich tube top', price: '18', university: 'Michigan Wolverines', type: 'Tops', date: '11/16/2023', size: 'S', description: 'Blue tube top with michgian text'},
        { id: '2', image: require('../assets/image2.jpg'), caption: 'michigan long sleeve', price: '22', university: 'Michigan Wolverines', type: 'Tops', date: '11/07/2023', size: 'M', description: 'Grey long sleeve' },
        { id: '3', image: require('../assets/image3.jpg'), caption: 'mich leggings', price: '30', university: 'Michigan Wolverines', type: 'Bottoms', date: '11/05/2023', size: 'XS', description: 'Michigan print leggings'},
        { id: '4', image: require('../assets/image4.jpg'), caption: 'blue michigan skirt', price: '24', university: 'Michigan Wolverines', type: 'Bottoms', date: '11/04/2023', size: 'L', description: 'Blue michigan tennis skirt with border'},
        { id: '5', image: require('../assets/image5.jpg'), caption: 'mich state top', price: '12', university: 'Michigan State Spartans', type: 'Tops', date: '11/02/2023', size: 'S', description: 'Green cropped mich state tee'},
        { id: '6', image: require('../assets/image6.jpg'), caption: 'one shoulder top', price: '28', university: 'American University', type: 'Tops', date: '11/01/2023', size: 'XS', description: 'white one shoulder american university top'},
        { id: '7', image: require('../assets/image7.jpeg'), caption: 'penn state tee', price: '15', university: 'Penn State', type: 'Tops', date: '10/24/2023', size: 'M', description: 'Mouth blue penn state tee'},
        { id: '8', image: require('../assets/image8.jpg'), caption: 'crewneck georgia', price: '32', university: 'Georgia Bulldogs', type: 'Tops', date: '10/23/2023', size: 'L', description: 'Grey Georgia Bulldog hoodie, new'},
        { id: '9', image: require('../assets/image9.jpg'), caption: 'mich state leggings', price: '30', university: 'Michigan State Spartans', type: 'Bottoms', date: '10/14/2023', size: 'M', description: 'Michigan state print leggings'},
        { id: '10', image: require('../assets/image10.jpg'), caption: 'rutgers split tee', price: '11', university: 'Rutgers', type: 'Tops', date: '10/14/2023', size: 'L', description: 'Half red half black Rutgers tee'},
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

    const filteredData = data.filter(item => {
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
                <Text style={styles.caption}>{item.caption}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                {/* University Filter */}
                <RNPickerSelect
                    placeholder={{ label: 'Select University', value: null }}
                    onValueChange={(value) => setFilters({ ...filters, university: value })}
                    items={[
                        { label: 'Michigan Wolverines', value: 'Michigan Wolverines' },
                        { label: 'Michigan State Spartans', value: 'Michigan State Spartans' },
                        { label: 'American University', value: 'American University' },
                        { label: 'Penn State', value: 'Penn State' },
                        { label: 'Georgia Bulldogs', value: 'Georgia Bulldogs' },
                        { label: 'Rutgers', value: 'Rutgers' },
                    ]}
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