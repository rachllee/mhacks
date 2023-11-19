import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Platform, Switch, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import { db, auth } from '../firebaseConfig';
import { arrayUnion, doc, collection, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const handleSellItem = async () => {
  if (!auth.currentUser || !image) {
    console.error("User not authenticated or image not selected");
    return;
  }
};

const generateUniqueId = () => {
  return uuidv4();
};

const SellScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [university, setUniversity] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [used, setUsed] = useState('');
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const [itemsListed, setItemsListed] = useState([]);

  const addItemToList = (newItem) => {
    setItemsListed([...itemsListed, newItem]);
  };

  const handleSellItem = async () => {
    if (!auth.currentUser || !image) {
      console.error("User not authenticated or image not selected");
      return;
    }

    const imageId = generateUniqueId(); // Unique ID for the image
    const storage = getStorage();
    const imageRef = storageRef(storage, `images/${imageId}`);
    const imgResponse = await fetch(image);
    const imgBlob = await imgResponse.blob();

    try {
      await uploadBytes(imageRef, imgBlob);
      const imageUrl = await getDownloadURL(imageRef);
  
      // Then, save the item details along with imageUrl to Firestore
      const newItem = {
        name,
        description,
        tags,
        price,
        university,
        size: selectedSize,
        used,
        image: imageUrl, // Save the URL of the uploaded image
        // ... other item details
      };
      await addDoc(collection(db, "items"), newItem);
    } catch (error) {
        console.error("Error saving item:", error);
    }
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
  
  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={styles.container}
    >
    <ScrollView>
        

    <View style={styles.container}>

    <TouchableOpacity onPress={pickImage}>
      <View style={styles.square}>
        {image && <Image source={{ uri: image }} style={styles.square} />}
        {!image && <Text>Select Image</Text>}
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
        <Text>Price:</Text>
        <TextInput
          style={styles.textField}
          value={price}
          onChangeText={(text) => setPrice(parseFloat(text))}
          keyboardType='numeric'
        />

        <Text>University:</Text>
        <TextInput
          style={styles.textField}
          value={university}
          onChangeText={(text) => setUniversity(text)}
        />

        <View style={styles.sizeContainer}>
            {sizes.map(size => (
                <TouchableOpacity
                    key={size}
                    style={[styles.sizeOption, selectedSize === size && styles.selectedSizeOption]}
                    onPress={() => setSelectedSize(size)}
                >
                    <Text style={styles.sizeText}>{size}</Text>
                </TouchableOpacity>
            ))}
        </View>
        
        <Text>Used:</Text>
        <Switch
          value={used}
          onValueChange={(value) => setUsed(value)}
        />

        <Text>Description:</Text>
        <TextInput
          style={[styles.textField, { height: 100 }]}
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
        />
      </View>

      <Button title="List Item" onPress={handleSellItem} />
    </View>

    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  square: {
    width: 110,
    height: 110,
    top: 15,
    left: 0,
    backgroundColor: 'lightgray',
    marginLeft: 0,
    position: 'absolute',
    justifyContent: 'center',
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
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#blue',
  },
  optionText: {
    fontSize: 16,
  },
  image: {
    width: 110,
    height: 110,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedSizeOption: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  sizeText: {
    color: 'black',
    fontSize: 16,
  },
});

export default SellScreen;