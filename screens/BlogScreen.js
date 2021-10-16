import React from "react";
import { Text, View } from "react-native";
import { StyleSheet, ScrollView, Alert, Modal, TextInput } from "react-native";
import { Card } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Input } from "react-native-elements";
import firebase from "firebase";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";

export default class BlogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      text: "",
      isModalVisible: false,
      isModalVisible2: false,
      image: null,
      title: "",
      blogText: "",
      blogTitle: "",
      blogAuthor: "",
      imageURL: "",
    };
  }

  toggleModal = () => {
    if (this.state.isModalVisible === true) {
      this.setState({ isModalVisible: false });
    } else {
      this.setState({ isModalVisible: true });
    }
  };

  postBlog = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    this.setState({ image: result.uri });

    console.log(result.type);
    if (this.state.text.trim().length > 1) {
      if (!result.cancelled) {
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        newdate = year + "/" + month + "/" + day;

        firebase
          .firestore()
          .collection("Blogs")
          .add({
            text: this.state.text,
            image: this.state.image,
            posttime: newdate,
            title: this.state.title,
          })
          .then(() => {
            this.setState({ isModalVisible: false });
          });
      } else {
        Alert.alert("You need to upload image thumbnail to post.");
      }
    } else {
      Alert.alert("Number of text characters is too less.");
    }
  };

  async componentDidMount() {
    // called before render, will automatically be called because it's a life cycle method
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBp6sbiOc-OkbaQLvx5L8HOHPL7Q9rATNU",
        authDomain: "covitrack-b1f78.firebaseapp.com",
        projectId: "covitrack-b1f78",
        storageBucket: "covitrack-b1f78.appspot.com",
        messagingSenderId: "186583766250",
        appId: "1:186583766250:web:c48b9774e43808601ef393",
      });
    } else {
      firebase.app(); // if already initialized, use that one
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    firebase
      .firestore()
      .collection("Blogs")
      .onSnapshot((doc) => {
        var blogs = [];
        doc.forEach((DOC) => {
          blogs.push(DOC.data());
        });
        this.setState({ blogs: blogs });
      });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Modal
          visible={this.state.isModalVisible}
          animationType="slide"
          onRequestClose={() => {
            this.setState({ isModalVisible: false });
          }}
        >
          <View
            style={{ backgroundColor: "#b3e6cc", borderRadius: 50, flex: 1 }}
          >
            <Text
              style={{
                textAlign: "left",
                marginLeft: "10%",
                marginTop: "20%",
                color: "white",
                fontSize: 35,
                fontFamily: "NunitoSans_700Bold",
              }}
            >
              Create post
            </Text>
            <View>
              <Text>{"\n"}</Text>

              <Input
                maxLength={60}
                onChangeText={(title) => {
                  this.setState({ title: title });
                }}
                inputContainerStyle={{ width: "80%", marginLeft: "10%" }}
                inputStyle={{ fontFamily: "NunitoSans_700Bold" }}
                placeholder="Enter title"
              />
              <TextInput
                onChangeText={(text) => {
                  this.setState({ text: text });
                }}
                placeholder="Enter text here"
                multiline={true}
                style={{
                  textAlign: "left",
                  marginLeft: "12%",
                  fontSize: 15,
                  marginRight: "12%",
                  fontFamily: "NunitoSans_700Bold",
                }}
                maxLength={400}
                numberOfLines={4}
              />
              <Text>{"\n"}</Text>
              <AwesomeButtonCartman
                onPress={() => {
                  this.postBlog();
                }}
                height={60}
                width={180}
                style={{ alignSelf: "center" }}
                type="secondary"
              >
                Post anonymously
              </AwesomeButtonCartman>
              {/* <Button onPress={()=>{this.postBlog()}} TouchableComponent={TouchableWithoutFeedback} buttonStyle={{backgroundColor:"coral",  width:"50%", height:"35%", alignSelf:"center", }}  titleStyle={{fontFamily:"NunitoSans_700Bold"}} title="Post anonymously"/> */}
              <Text>{"\n"}</Text>
              <View
                style={{ alignSelf: "center" }}
                onStartShouldSetResponder={() => {
                  this.setState({ isModalVisible: false });
                }}
              >
                <Ionicons name="close-circle-outline" size={50} color="black" />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={this.state.isModalVisible2}
          animationType="slide"
          onRequestClose={() => {
            this.setState({ isModalVisible2: false });
          }}
        >
          <View
            style={{ backgroundColor: "#b3e6cc", borderRadius: 50, flex: 1 }}
          >
            <Text
              style={{
                textAlign: "left",
                marginLeft: "10%",
                marginTop: "20%",
                color: "white",
                fontSize: 25,
                fontFamily: "NunitoSans_700Bold",
              }}
            >
              {this.state.blogTitle}
            </Text>
            <ScrollView>
              <Text>{"\n"}</Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "white",
                  fontFamily: "NunitoSans_700Bold",
                  marginLeft: "10%",
                  marginRight: "10%",
                }}
              >
                {this.state.blogText}
              </Text>
              <Text>{"\n"}</Text>

              {/* <Button onPress={()=>{this.postBlog()}} TouchableComponent={TouchableWithoutFeedback} buttonStyle={{backgroundColor:"coral",  width:"50%", height:"35%", alignSelf:"center", }}  titleStyle={{fontFamily:"NunitoSans_700Bold"}} title="Post anonymously"/> */}
              <Text>{"\n"}</Text>
              <View
                style={{ alignSelf: "center" }}
                onStartShouldSetResponder={() => {
                  this.setState({ isModalVisible2: false });
                }}
              >
                <Ionicons name="close-circle-outline" size={50} color="black" />
              </View>
            </ScrollView>
          </View>
        </Modal>
        <Text>{"\n"}</Text>

        <View
          style={{ alignSelf: "center" }}
          onStartShouldSetResponder={() => {
            this.setState({ isModalVisible: true });
          }}
        >
          <FontAwesome5 name="pen-fancy" size={24} color="black" />
        </View>

        <Text>{"\n"}</Text>
        {this.state.blogs.map((blog, i) => {
          return (
            <Card key={i}>
              <Card.Title style={{ fontFamily: "NunitoSans_700Bold" }}>
                {blog.title}
              </Card.Title>
              <Card.Divider />
              <Card.Image source={{ uri: blog.image }} />
              <Text>{"\n"}</Text>
              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  textAlign: "left",
                  fontSize: 20,
                }}
              >
                Published by Anonymous
              </Text>
              <Card.Divider />

              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  textAlign: "left",
                  fontSize: 20,
                }}
              >
                Time: {blog.posttime}
              </Text>
              <Card.Divider />

              <Text
                style={{ fontFamily: "NunitoSans_700Bold", textAlign: "left" }}
                numberOfLines={1}
              ></Text>
              <AwesomeButtonCartman
                onPress={() => {
                  this.setState({
                    blogText: blog.text,
                    blogTitle: blog.title,
                    isModalVisible2: true,
                  });
                }}
                height={60}
                width={180}
                style={{ alignSelf: "center" }}
                backgroundColor="#f42272"
                type=""
              >
                Read article
              </AwesomeButtonCartman>
              <Text>{"\n"}</Text>
            </Card>
          );
        })}
      </ScrollView>
    );
  }
}
