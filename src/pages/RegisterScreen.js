import React, { useContext, useState,useEffect } from 'react';
import { View, Text, Button,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import { ThemeContext } from '../store/ThemeContext';
import { initializeApp } from "@firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "@firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAp7MqU6Zsu9Oze0Ys3C7V8qXf8PE4ZEzE",
	authDomain: "fir-example-4be1a.firebaseapp.com",
	projectId: "fir-example-4be1a",
	storageBucket: "fir-example-4be1a.appspot.com",
	messagingSenderId: "602758993996",
	appId: "1:602758993996:web:c27382b8c6c508e5ea3ce9",
	measurementId: "G-ZZVFNHQMMV",
};

const app = initializeApp(firebaseConfig);

const RegisterScreen = ({ navigation }) => {
  const context=useContext(ThemeContext)
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(false);



  const handleInputEmail = (inputText) => {
    console.log(inputText)
    setEmail(inputText);
  };
  const handleInputPass = (inputText) => {
    setPass(inputText);
  };

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  
  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, pass);
          console.log('User signed in successfully!');
          context.handleInputEmail(email);
          context.handleInputPass(pass)
          navigation.navigate('Home')
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, pass);
          console.log('User created successfully!');
          navigation.navigate('Login')
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Text
      style={{marginBottom:25,fontWeight:'bold',fontSize:30 }}
      >Register Screen </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleInputEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleInputPass}
        value={pass}
        placeholder="Password"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
      />
      <TouchableOpacity onPress={handleAuthentication} style={styles.btnLogin}>
      <Text>Press Me</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12}} >Don't have an account? <Text style={{color:'blue'}}  onPress={() => navigation.navigate('Register')}
    >Sign in</Text></Text>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    width: 260,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  btnLogin:{
    width: 260,
    height: 40,
    backgroundColor:'#7FFFD4',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20
  }
});
export default RegisterScreen;
