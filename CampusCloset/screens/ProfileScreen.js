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
        itemsBought: 0,
        itemsSold: 0,
        profilePic: '',
    });

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
                        itemsBought: data.itemsBought,
                        itemsSold: data.itemsSold,
                        profilePic: data.profilePic || '',
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
            <TouchableOpacity onPress={handleSelectProfilePic}>
                <Image
<<<<<<< HEAD
                    source={userInfo.profilePic ? { uri: userInfo.profilePic } : require('../assets/icon.png')} 
=======
                    source={userInfo.profilePic ? { uri: userInfo.profilePic } : require('../assets/favicon.png')} 
>>>>>>> 25b58329ab608f22c5ff2647afcd5d54934c2fcb
                    style={styles.profilePic}
                />
            </TouchableOpacity>
            <Text style={styles.header}>Profile</Text>
            <Text style={styles.info}>Name: {userInfo.name}</Text>
            <Text style={styles.info}>Email: {userInfo.email}</Text>
            <Text style={styles.info}>Items Bought: {userInfo.itemsBought}</Text>
            <Text style={styles.info}>Items Sold: {userInfo.itemsSold}</Text>
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
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        marginVertical: 5,
    },
});

export default ProfileScreen;
