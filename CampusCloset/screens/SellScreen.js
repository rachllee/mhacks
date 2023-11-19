import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';


const SellScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);


  const handleSellItem = () => {
    // Implement logic to handle selling item
    // You can use the state variables (name, description, tags) to send data to your backend

    // For now, just navigate back after handling
    navigation.goBack();
  };

  const addTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput)) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  const handleSelectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Set the selected image URI to the state
        setSelectedImage({ uri: response.uri });
      }
    });
  };
  

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleSelectImage}>
            <View style={styles.square}>
            {selectedImage ? (
                <Image source={selectedImage} style={styles.image} />
            ) : ( 
                <Text>Select Image</Text>
            )}
            </View>
      </TouchableOpacity>

      <View style={styles.textFieldsContainer}>
        <Text>Name:</Text>
        <TextInput
          style={styles.textField}
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text>Tags:</Text>
        <TextInput
          style={styles.textField}
          value={tagInput}
          onChangeText={(text) => setTagInput(text)}
          onSubmitEditing={addTag}
        />
      </View>

      <View style={styles.tagsContainer}>
        {tags.map((tag) => (
            <TouchableOpacity
            key={tag}
            style={styles.tag}
            onPress={() => removeTag(tag)}
            >
                <Text>{tag}</Text>
            </TouchableOpacity>
        ))}
      </View>

      <View style={styles.descriptionContainer}>
        <Text>Description:</Text>
        <TextInput
          style={[styles.textField, { height: 100 }]}
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
        />
      </View>

      <Button title="Sell Item" onPress={handleSellItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  square: {
    width: 110,
    height: 110,
    backgroundColor: 'blue', // Change the color as needed
    position: 'absolute',
    top: 40,
    left: 0,
    marginLeft: 20,
  },
  textFieldsContainer: {
    marginLeft: 130, // Adjust the margin as needed
    marginBottom: 20,
    padding: 5,
  },
  descriptionContainer: {
    marginTop: 15,
  },
  textField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    marginTop: 10, 
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 5,
    borderRadius: 10,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#D5BEF3',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  }
});

export default SellScreen;

