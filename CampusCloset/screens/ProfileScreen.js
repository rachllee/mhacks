import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { auth, db, storage } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { launchImageLibrary } from 'react-native-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileScreen = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        profilePic: ''
    });
    const [itemsBought, setItemsBought] = useState([]);
    const [itemsSold, setItemsSold] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [tempName, setTempName] = useState('');
    const [tempEmail, setTempEmail] = useState('');

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserInfo(prevState => ({
                        ...prevState,
                        name: data.name,
                        email: data.email,
                        profilePic: data.profilePic || '',
                    }));
                    setItemsBought(data.itemsBought || []);
                    setItemsSold(data.itemsSold || []);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        getUserInfo();
    }, []);

    const handleEdit = () => {
        setTempName(userInfo.name);
        setTempEmail(userInfo.email);
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                name: tempName,
                email: tempEmail
            });
            setUserInfo({ ...userInfo, name: tempName, email: tempEmail });
            setEditMode(false);
        } catch (error) {
            console.error("Error updating user info:", error);
        }
    };
    
    const renderItem = (items) => {
        return items.map(item => (
            <View key={item.id} style={styles.itemContainer}>
                <Text style={styles.itemInfo}>
                    {item.name} ~ Price: ${item.price} ~ Quantity: {item.quantity}
                </Text>
            </View>
        ));
    };
    

    const handleSelectProfilePic = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.error('ImagePicker Error:', response.errorMessage);
            } else {
                const source = { uri: response.assets[0].uri };
                uploadProfilePic(source.uri);
            }
        });
    };

    const uploadProfilePic = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
        uploadBytes(storageRef, blob).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                setUserInfo(prevState => ({ ...prevState, profilePic: downloadURL }));
                updateDoc(doc(db, "users", auth.currentUser.uid), { profilePic: downloadURL });
            });
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleEdit} style={styles.button}>
                <Text>Edit</Text>
            </TouchableOpacity>
            <Text style={styles.header}>{userInfo.name}</Text>
            <TouchableOpacity onPress={handleSelectProfilePic}>
                <Image
                    source={userInfo.profilePic ? { uri: userInfo.profilePic } : require('../assets/default-profile-pic.png')} 
                    style={styles.profilePic}
                />
            </TouchableOpacity>
            <Text style={styles.email}>email: {userInfo.email}</Text>
            <Text style={styles.info}>Items Bought:</Text>
            {renderItem(itemsBought)}
            <Text style={styles.info}>Items Sold:</Text>
            {renderItem(itemsSold)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 0.2,
    },
    header: {
        fontSize: 40,
        marginBottom: 20,
    },
    email: {
        fontSize: 15,
        marginVertical: 20,
    },
    info: {
        fontSize: 18,
        marginVertical: 10,
    },
    itemContainer: {
        fontSize: 15,
        marginVertical: 2,
    }
});

export default ProfileScreen;
