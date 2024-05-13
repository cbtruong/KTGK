import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, StyleSheet } from "react-native";

import HomeScreen from "./src/pages/HomeScreen";
import DetailsScreen from "./src/pages/DetailsScreen";
import LoginScreen from "./src/pages/LoginScreen";
import RegisterScreen from "./src/pages/RegisterScreen";
import { createContext } from "react";
import { ThemeProvider } from "./src/store/ThemeContext";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<ThemeProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Login">
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{ title: "Login Page", headerLeft: null }}
					/>
					<Stack.Screen
						name="Register"
						component={RegisterScreen}
						options={{ title: "Details Page" }}
					/>
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{ title: "Home Page" }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
