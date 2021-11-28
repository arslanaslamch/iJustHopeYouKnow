import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet,
    Dimensions,
    StatusBar,
    Alert,
    Image,
    ActivityIndicator,
    AsyncStorage,
    NativeModules
} from 'react-native';
import axios from "axios";
const DeleteLetter = ({navigation}) => {
    const [logoutToken, setlogoutToken] = useState(true);
    const [data, setData] = useState("");
     const DeleteLetter = async() => {
        
        axios.get("https://cybrillcodex.com/appcode/DeleteLetter.php?letterID="+global.LetterID)
        
        .then((resJson) => { 
            console.log(resJson.data); 
            if(resJson.data.Code == "DEL-001"){
                navigation.navigate("ViewLetter");
            }else{

                alert("Unable To Delete Letter. Please try Again");
                navigation.navigate("ViewLetter");
            }
        })
        .catch(console.error)
    }
    useEffect(() => {
        DeleteLetter();
    })
    return(
        <View>
            <StatusBar backgroundColor='#0b355d' barStyle="light-content"/>
            {logoutToken ?
                <View style={styles.Indicator}>
                <ActivityIndicator size="large" />
                <Text style={styles.logOutText}> Deleting Letter ...! </Text>
                </View>
            : null }
        </View>
    );
}
export default DeleteLetter;

const {height} = Dimensions.get("screen");
const {width} = Dimensions.get("screen");
const height_logo = height * 0.20;

const styles = StyleSheet.create({
    Indicator: {
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#0b355d',
    },
    logOutText: {
        color: 'white',
        fontSize: 10,
        marginTop: 15,
    }
})