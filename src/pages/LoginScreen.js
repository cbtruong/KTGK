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

const LoginScreen = ({ navigation }) => {
  const context = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    if (!isValidEmail(email)) {
      setEmailError('Invalid email format');
      return;
    } else {
      setEmailError('');
    }

    if (!isValidPassword(pass)) {
      setPassError('Password must be at least 6 characters long');
      return;
    } else {
      setPassError('');
    }

    try {
      if (user) {
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, pass);
          console.log('User signed in successfully!');
          context.handleInputEmail(email);
          context.handleInputPass(pass)
          navigation.navigate('Home')
        } else {
          await createUserWithEmailAndPassword(auth, email, pass);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      Alert.alert('Authentication Error', error.message);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (pass) => {
    return pass.length >= 6;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 25, fontWeight: 'bold', fontSize: 30 }}>Login Screen</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        onChangeText={setPass}
        value={pass}
        placeholder="Password"
        secureTextEntry
      />
      {passError ? <Text style={styles.errorText}>{passError}</Text> : null}
      <TouchableOpacity onPress={handleAuthentication} style={styles.btnLogin}>
        <Text>Press Me</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 12 }}>Don't have an account? <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Register')}>
        Sign up
      </Text></Text>
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
  btnLogin: {
    width: 260,
    height: 40,
    backgroundColor: '#7FFFD4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  errorText: {
    color: 'red',
    marginBottom: 10
  }
});

export default LoginScreen;