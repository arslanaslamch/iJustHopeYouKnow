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
const LogoutScreen = ({navigation}) => {
    const [logoutToken, setLogoutToken] = useState(true);
    const LogOut = async() => {
        if(AsyncStorage.removeItem('UserAuthID')){
            setTimeout(function(){
                NativeModules.DevSettings.reload();
            }, 5000);
        }else{
            Alert("Unable To Logout.. Please Try Again");
        }
    }
    useEffect(() => {
        LogOut();
    }, []);
    return(
        <View>
            <StatusBar backgroundColor='#0b355d' barStyle="light-content"/>
            {logoutToken ?
                <View style={styles.Indicator}>
                <ActivityIndicator size="large" />
                <Text style={styles.logOutText}> You are logingout. Please Wait ...</Text>
                </View>
            : null }
        </View>
    );
}
export default LogoutScreen;

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