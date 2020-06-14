import React, { useState, useRef, useCallback } from "react";
import {
  Alert,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";

import { putForm } from "./api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    alignItems: "center",
  },
  titleText: {
    flex: 1,
    marginTop: 25,
    marginBottom: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  subtitleText: {
    flex: 1,
    margin: 15,
    marginTop: 0,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "100",
    color: "grey",
  },
  input: {
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    borderColor: "gray",
    borderBottomWidth: 1,
    alignSelf: "stretch",
  },
  submitButton: {
    alignSelf: "center",
  },
});

type FormsScreenStates = {
  name: string;
  subject: string;
  body: string;
  status: string | null;
};

const FormsScreen = () => {
  let [name, setName] = useState("");
  let [subject, setSubject] = useState("");
  let [body, setBody] = useState("");
  let [status, setStatus] = useState<null | 'success' | 'error'>(null);

  let inputSubject = useRef(null);
  let inputBody = useRef(null);

  let submit = useCallback(() => {
    putForm({name, subject, body})
      .then(_r => {
        setName("");
        setSubject("");
        setBody("");
        setStatus("success");
        Alert.alert("Success!", "Your message has been submitted");
      })
      .catch(e => {
        console.error(e);
        setStatus("error");
        Alert.alert("Failure", "Failed to submit your message");
      });
  }, [name, subject, body])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <Text style={styles.titleText}>We want to hear from you!</Text>
      <Text style={styles.subtitleText}>
        Suggestions, Comments, Ideas, Concerns, Requests, etc.
      </Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={t => setName(t)}
        placeholder="Name (Optional)"
        multiline={false}
        blurOnSubmit={false}
        onSubmitEditing={() => {
          inputSubject.current?.focus();
        }}
      />
      <TextInput
        style={styles.input}
        value={subject}
        onChangeText={t => setSubject(t)}
        placeholder="Subject"
        multiline={false}
        blurOnSubmit={false}
        ref={inputSubject}
        onSubmitEditing={() => {
          inputBody.current?.focus();
        }}
      />
      <TextInput
        style={styles.input}
        value={body}
        onChangeText={t => setBody(t)}
        placeholder="Message"
        textAlignVertical="top"
        multiline={true}
        numberOfLines={4}
        ref={inputBody}
      />

      <Button
        title="Submit"
        onPress={submit}
      />
    </ScrollView>
  );
}

export default FormsScreen;
