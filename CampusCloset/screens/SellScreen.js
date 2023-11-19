import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Platform, Switch, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import { db, auth } from '../firebaseConfig';
import { arrayUnion, doc, collection, addDoc, updateDoc } from "firebase/firestore";

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
    if (auth.currentUser) {
        const newItem = {
          name: name,
          id: generateUniqueId(),
          price: price, 
          university: university,
          size: selectedSize,
          description: description,
          used: used,
          tags: tags
        }
        await addDoc(collection(db, "items"), newItem);
        addItemToList(newItem);
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDocRef, {
          itemsListed: arrayUnion(newItem.id)
        });
        navigation.goBack();
    } else {
      console.error("Error adding item");
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
        {!image && <Text style={styles.info}>Select Image</Text>}
      </View>
    </TouchableOpacity>

      <View style={styles.textFieldsContainer}>
        <Text style={styles.info}>Name:</Text>
        <TextInput
          style={styles.textField}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor="#bba1d2"
        />

        <Text style={styles.info}>Tags:</Text>
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
        <Text style={styles.info}>Price:</Text>
        <TextInput
          style={styles.textField}
          value={price}
          onChangeText={(text) => setPrice(parseFloat(text))}
          keyboardType='numeric'
        />

        <Text style={styles.info}>University:</Text>
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
        
        <Text style={styles.info}>Used:</Text>
        <Switch
          value={used}
          onValueChange={(value) => setUsed(value)}
        />

        <Text style={styles.info}>Description:</Text>
        <TextInput
          style={[styles.textField, { height: 100 }]}
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
          
        />
      </View>

      <CustomButton title="List Item" onPress={handleSellItem} color="#2c0e69"/>
    </View>

    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#efeaff'
  },
  square: {
    width: 110,
    height: 110,
    top: 15,
    left: 0,
    backgroundColor: '#b098ed',
    marginLeft: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'AvenirNext-Bold'
  },
  textFieldsContainer: {
    marginLeft: 130, // Adjust the margin as needed
    marginBottom: 20,
    padding: 5,
    fontFamily: 'AvenirNext-Bold'
  },
  descriptionContainer: {
    marginTop: 15,
  },
  textField: {
    height: 40,
    borderColor: '#2c0e69',
    color: '#2c0369',
    borderWidth: 1,
    marginBottom: 10,
    fontFamily: 'AvenirNext-Bold'
  },
  tagsContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    marginTop: 10, 
    borderWidth: 1,
    borderColor: '#efeaff',
    padding: 5,
    borderRadius: 10,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#2c0e69',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    fontFamily: 'AvenirNext-Bold'
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#2c0e69',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#2c0e69',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'AvenirNext-Bold'
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
    borderColor: '#2c0e69',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedSizeOption: {
    backgroundColor: '#b098ed',
    borderColor: '#2c0e69',
  },
  sizeText: {
    color: '#2c0e69',
    fontSize: 16,
    fontFamily: 'AvenirNext-Bold'
  },
  buttonContainer: {
    fontFamily: 'AvenirNext-Bold',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
},
button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
},
buttonText: {
    color: '#efeaff',
    fontSize: 16,
    fontFamily: 'AvenirNext-Bold', 
},
buttonSpacing: {
    height: 10
},
info: {
    fontFamily: 'AvenirNext-Bold',
    color: '#2c0e69',
    fontSize: 14
}
});

export default SellScreen;