import React, { useContext, useState } from "react";
import {
	ScrollView,
	View,
	Text,
	Button,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { ThemeContext } from '../store/ThemeContext';

const HomeScreen = ({ navigation }) => {
	const context=useContext(ThemeContext);
	const [tasks, setTasks] = useState(["task 1", "task 2"]);
  const [text, setText] = useState('');
  const handleInputChange = (inputText) => {
    setText(inputText);
  };
  const handleAdd = () => {
    if (text.trim() !== "") {
      setTasks([...tasks, text]);
      setText(""); 
    }
  };
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "flex-start",
			}}
		>
			<Text>Email:{context.email}</Text>
			<Text>Pass:{context.pass}</Text>
			<View
				style={{
					display: "flex",
					paddingHorizontal: 20,
					marginTop: 50,
					flexDirection: "row",
					height: 40,
					width: "100%",
				}}
			>
				<TextInput
					style={{
						flex: 3,
						height: "100%",
						borderColor: "gray",
						backgroundColor: "white",
						borderWidth: 0,
						marginBottom: 20,
						paddingHorizontal: 10,
						borderWidth: "0",
					}}
					underlineColorAndroid="transparent"
					placeholder="Email"
          onChangeText={handleInputChange}
          value={text}
				/>
				<TouchableOpacity
					style={{
						flex: 1,
						height: "100%",
						backgroundColor: "#7FFFD4",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginBottom: 20,
					}}
          onPress={handleAdd}
				>
					<Text>Press Me</Text>
				</TouchableOpacity>
			</View>
			<ScrollView
				style={{
					width: "100%",
					paddingHorizontal: 20,
					marginTop: 20,
					paddingBottom: 50,
				}}
			>
				{tasks.map((task, index) => (
					<View style={styles.task_wrapper}>
						<Text>{index +1} . {task}</Text>
					</View>
				))}
			</ScrollView>
		</View>
	);
};
const styles = StyleSheet.create({
	task_wrapper: {
		height: 30,
		width: "100%",
		borderBottomWidth: 1,
		borderColor: "gray",
		marginTop: 10,
	},
});
export default HomeScreen;
