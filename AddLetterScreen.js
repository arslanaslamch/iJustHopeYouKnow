import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    CheckBox,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import TabsNavigation from './sections/TabNavigator';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';

const AddLetter = ({navigation}) => {
    const [IsSubmit, setIsSubmit] = useState(false);
    const [check_indicator, setShowIndView] = useState(false);

    const { colors } = useTheme();
    const [data, setData] = React.useState({
        recipientname: '',
        recipientemail: '',
        recipientmessage: '',
        check_composeMessage: false,
        check_Recivername: false,
        check_ReciverEmail: false,
    });
    const Recivername = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                recipientname: val,
                check_Recivername: true
            });
        } else {
            setData({
                ...data,
                recipientname: val,
                check_Recivername: false
            });
        }
    }
    const ReciverEmail = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                recipientemail: val,
                check_ReciverEmail: true
            });
        } else {
            setData({
                ...data,
                recipientemail: val,
                check_ReciverEmail: false
            });
        }
    }
    const composeMessage = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                recipientmessage: val,
                check_composeMessage: true
            });
        } else {
            setData({
                ...data,
                recipientmessage: val,
                check_composeMessage: false
            });
        }
    }
    useEffect(() => {
        const SaveLetter = async() => {
            axios.post("https://cybrillcodex.com/appcode/composeLetter.php?userid="+global.UsersID,
                JSON.stringify({
                    ...data,
                    Recivername: Recivername,
                    ReciverEmail: ReciverEmail,
                    composeMessage: composeMessage,
                })
            )
            .then((response) => {
                setShowIndView(false);
                if(response.data.ErrorCode == "ERR-001"){
                    SweetAlert.showAlertWithOptions({
                      title: response.data.Heading,
                      subTitle: response.data.Description,
                      confirmButtonTitle: 'OKay',
                      confirmButtonColor: 'red',
                      style: 'error',
                      cancellable: true
                    });
                }else{
                    SweetAlert.showAlertWithOptions({
                      title: response.data.Heading,
                      subTitle: response.data.Description,
                      confirmButtonTitle: 'OKay',
                      confirmButtonColor: 'red',
                      style: 'success',
                      cancellable: true
                    });
                }
                setIsSubmit(false);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        if(IsSubmit){
            setShowIndView(true);
            SaveLetter();
        }
    }, [IsSubmit])
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#0b355d' barStyle="light-content"/>
          {check_indicator ?
          <View style={styles.indicatorArea}>
            <ActivityIndicator size="large" color="white" style={styles.indicator} />
          </View>
         : null }
        <View style={styles.header}>
            <Text style={[styles.headerDetails, styles.bold]}>I Just Hope You Know</Text>
        </View>
        <ScrollView style={styles.addLetter}>
            <Text style={styles.screen_heading}>Compose Letter</Text>
            <Text style={styles.text_footer}>Recipient Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="white"
                    size={20}
                />
                <TextInput 
                    placeholder="Recipient Name"
                    style={styles.textInput}
                    placeholderTextColor = "white"
                    autoCapitalize="none"
                    onChangeText={(val) => Recivername(val)}
                />
                {data.check_Recivername ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            <Text style={[styles.text_footer, {marginTop: 20}]}>Recipient Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="envelope-o"
                    color="white"
                    size={20}
                />
                <TextInput 
                    placeholder="Recipient Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholderTextColor = "white"
                    onChangeText={(val) => ReciverEmail(val)}
                />
                {data.check_ReciverEmail ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            <Text style={[styles.text_footer, {marginTop: 20}]}>Compose Message</Text>
            <View style={styles.action_Message}>
               
                <TextInput 
                    placeholder="Compose Your Letter"
                    style={styles.multiline}
                    autoCapitalize="none"
                    placeholderTextColor = "white"
                    multiline
                    onChangeText={(val) => composeMessage(val)}
                />
                {data.check_composeMessage ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => setIsSubmit(true)}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Save Letter</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
    );
};

export default AddLetter;

const {height} = Dimensions.get("screen");
const {width} = Dimensions.get("screen");
const height_logo = height * 0.20;

const styles = StyleSheet.create({
  container: {
    height: height * 1.5, 
    backgroundColor: '#0b355d'
  },
  bold :{
    fontWeight: '900',
  },
  header: {
      flex: 0.12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
  },
  screen_heading: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDetails: {
      fontSize: 20,
      color: '#0b355d',
  },
  addLetter: {
    padding: 20,

  },
  text_footer: {
    color: 'white',
    fontSize: 16
  },
  action: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'white',
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        borderRadius: 5,
        color: 'white',
    },
  action_Message: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 5,
  },
    multiline: {
      height: 200,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
      flex: 1,
      textAlignVertical: 'top',
      color: 'white',
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: 'white',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    indicator: {
        backgroundColor: "#ababab6e",
        width: 200,
        height: 200,
        borderRadius: 8,
        zIndex: 99,
    },
    indicatorArea: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 99,
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
});