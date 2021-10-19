import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [taskArray, setTaskArray] = useState<Array<string>>([
    "Home",
    "Work",
    "Sports",
  ]);
  const [task, setTask] = useState("");

  const notion = async () => {
    await fetch("http://raspberrypi:5500/items", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "cors",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  // notion();

  const handleAddTask = (): void => {
    setTaskArray([...taskArray, task]);
    setTask("");
  };

  const completeTask = (index: number): void => {
    const newTaskArray = [...taskArray];
    newTaskArray.splice(index, 1);
    setTaskArray(newTaskArray);
  };

  return (
    <View style={styles.container}>
      {/* Todays Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.sectionItemContainer}>
          {/* Tasks Container */}
          {taskArray.map((item: string, index: number) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task number={index} title={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"New Task..."}
          value={task}
          onChangeText={(text: any): void => setTask(text)}
        />
        <TouchableOpacity onPress={() => (task != "" ? handleAddTask() : "")}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    alignContent: "center",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionItemContainer: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    width: "70%",
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
