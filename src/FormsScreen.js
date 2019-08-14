import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";

import { putForm } from "./api.js";

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

class FormsScreen extends Component {
  state = {
    name: "",
    subject: "",
    body: "",
    status: null, // null | 'success' | 'error'
  };

  inputSubject = null;
  inputBody = null;

  submit = () => {
    putForm({
      name: this.state.name,
      subject: this.state.subject,
      body: this.state.body,
    })
      .then(res => {
        if (res.status === 201) this.submitSuccess();
        else this.submitError();
      })
      .catch(err => {
        this.submitError();
        console.error(err);
      });
  };

  submitSuccess = () => {
    this.setState({
      name: "",
      subject: "",
      body: "",
      status: "success",
    });

    Alert.alert(
      'Success!',
      'Your message has been submitted'
    );
  };

  submitError = () => {
    this.setState({
      status: "error",
    });

    Alert.alert(
      'Failure',
      'Failed to submit your message',
    );
  };

  render = () => (
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
        value={this.state.name}
        onChangeText={name => this.setState({ name })}
        placeholder="Name (Optional)"
        multiline={false}
        blurOnSubmit={false}
        onSubmitEditing={_ => {
          this.inputSubject.focus();
        }}
      />
      <TextInput
        style={styles.input}
        value={this.state.subject}
        onChangeText={subject => this.setState({ subject })}
        placeholder="Subject"
        multiline={false}
        blurOnSubmit={false}
        onSubmitEditing={_ => {
          this.inputBody.focus();
        }}
        ref={r => {
          this.inputSubject = r;
        }}
      />
      <TextInput
        style={styles.input}
        value={this.state.body}
        onChangeText={body => this.setState({ body })}
        placeholder="Message"
        textAlignVertical="top"
        multiline={true}
        numberOfLines={4}
        ref={r => {
          this.inputBody = r;
        }}
      />

      <Button
        title="Submit"
        style={styles.submitButton}
        onPress={this.submit}
      />
    </ScrollView>
  );
}

export default FormsScreen;
