import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { auth, db, storage } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { launchImageLibrary } from 'react-native-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const itemsMockBought = [
    { id: '1', name: 'Tailgate T-Shirt', price: 20, quantity: 1 },
    { id: '2', name: 'Vintage College Cap', price: 15, quantity: 1 },
];

const itemsMockSold = [
    { id: '1', name: 'Tailgate T-Shirt', price: 20, quantity: 1 },
    { id: '2', name: 'Vintage College Cap', price: 15, quantity: 1 },
];

const ProfileScreen = () => {
    const [userInfo, setUserInfo] = useState({
        name: 'Netra',
        email: 'netraj@netraj.edu',
        profilePic: ''
    });
    const [itemsBought] = useState(itemsMockBought);
    const [itemsSold] = useState(itemsMockSold);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserInfo(prevState => ({
                        ...prevState,
                        name: userInfo.name,
                        email: userInfo.email,
                        profilePic: userInfo.profilePic || '',
                    }));
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        getUserInfo();
    }, []);
    
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
