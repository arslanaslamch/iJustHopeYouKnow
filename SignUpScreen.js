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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';

const SignInScreen = ({navigation}) => {
    
    const [IsSubmit, setIsSubmit] = useState(false);
    const [check_indicator, setShowIndView] = useState(false);

    const [data, setData] = React.useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: '',
        check_firstname: false,
        show_message: true,
        check_lastname: false,
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });
    const firstName = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                firstname: val,
                check_firstname: true,
                show_message: false
            });
        } else {
            setData({
                ...data,
                firstname: val,
                check_firstname: false,
                show_message: true
            });
        }
    }

    const lastName = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                lastname: val,
                check_lastname: true
            });
        } else {
            setData({
                ...data,
                lastname: val,
                check_lastname: false
            });
        }
    }

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }
    useEffect(() => {
        const authentication = async() => {
            axios.post("https://cybrillcodex.com/appcode/signup.php",
                JSON.stringify({
                    ...data,
                    firstName: firstName,
                    lastName: lastName,
                    textInputChange: textInputChange,
                    handlePasswordChange: handlePasswordChange,
                    handleConfirmPasswordChange: handleConfirmPasswordChange,

                })
            )
            .then((response) => {
                setShowIndView(false);
                 if(response.data.ErrorCode == 'ERR-001'){
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
                      confirmButtonTitle: 'OK',
                      confirmButtonColor: '#000',
                      style: 'success',
                      cancellable: true
                    },
                        callback => navigation.navigate('VerificationScreen'));
                }

                setIsSubmit(false);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        if(IsSubmit){
            setShowIndView(true);
            authentication();
        }
    }, [IsSubmit]);
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
          {check_indicator ?
          <View style={styles.indicatorArea}>
            <ActivityIndicator size="large" color="#0b355d" style={styles.indicator} />
          </View>
         : null }
        <View style={styles.header}>
             <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/logos/logo.jpeg')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>First Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your First Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => firstName(val)}
                />
                {data.check_firstname ? 
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
            <Text style={[styles.text_footer, {marginTop: 35}]}>Last Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Last Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => lastName(val)}
                />
                {data.check_lastname ? 
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

            <Text style={[styles.text_footer, {marginTop: 35}]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="envelope"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoComplete="email"
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
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

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.textPrivate}>
                
                <Text style={styles.color_textPrivate}>
                    "By signing up, you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of Service</Text>
                <Text style={styles.color_textPrivate}>{" "}</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}and Privacy Policy"</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => setIsSubmit(true)}
                >
                <LinearGradient
                    colors={['#0b355d', '#002D71']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignInScreen')}
                    style={[styles.signIn, {
                        borderColor: '#0b355d',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#0b355d'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const {height} = Dimensions.get("screen");
const {width} = Dimensions.get("screen");
const height_logo = height * 0.20;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#0b355d'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    logo: {
      width: height_logo,
      height: height_logo
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    alertError: {
        color: 'red',
        marginTop: 10,
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
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    color_textPrivate: {
        color: 'black'
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