import React from "react";
import { Text, StyleSheet, ScrollView, Linking } from "react-native";
import { Card, Button } from "react-native-elements";
import { SearchBar } from "react-native-elements";
import AnimatedLoader from "react-native-animated-loader";

export default function HospitalScreen() {
  React.useEffect(() => {
    fetch("https://api.rootnet.in/covid19-in/hospitals/medical-colleges")
      .then((res) => res.json())
      .then((obj) => {
        setHospitals(obj.data.medicalColleges);
        setLoaded(true);
        setOriginal(obj.data.medicalColleges);
      });
  }, [state]);

  const [hospitals, setHospitals] = React.useState([]);
  const [state, setSearchState] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [original, setOriginal] = React.useState(hospitals);

  // Fuzzy search
  // const searcher = new FuzzySearch(hospitals, ['state', 'name', 'city'], {
  //     caseSensitive: true,
  //   });
  // const result = searcher.search(query);

  if (loaded === false) {
    return (
      <AnimatedLoader
        visible={!loaded ? true : false}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../assets/hospitalload.json")}
        animationStyle={styles.lottie}
        speed={1}
      >
        <Text>Fetching hospitals...</Text>
      </AnimatedLoader>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <SearchBar
          placeholder="Search by state..."
          onChangeText={(search) => {
            setQuery(search);
            console.log(search);
            let queriedHospitals = hospitals.filter((h) => {
              return h.state.toLowerCase() === search.toLowerCase();
            });
            console.log(`hospitals.length: ${hospitals.length}`);
            console.log(`queriedHospitals.length: ${queriedHospitals.length}`);

            if (queriedHospitals.length) {
              console.log(
                `queriedHospitals.length: ${queriedHospitals.length}`
              );
              setHospitals(queriedHospitals);
            } else {
              setHospitals(original);
            }
          }}
          value={query}
        />
        <Text>{"\n"}</Text>
        <Text
          style={{
            fontFamily: "NunitoSans_700Bold",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Verified Medical Care Centres
        </Text>
        <Text>{"\n"}</Text>
        {(query.length === 0 ? original : hospitals).map((hospital, i) => {
          return (
            <Card key={i}>
              <Card.Title
                style={{ fontFamily: "NunitoSans_700Bold" }}
                key={hospital.key}
              >
                {hospital.name}
              </Card.Title>
              <Card.Divider />
              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  textAlign: "center",
                }}
              >
                State: {hospital.state}
              </Text>

              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  textAlign: "center",
                }}
              >
                City: {hospital.city}
              </Text>
              <Card.Divider />
              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  textAlign: "center",
                }}
              >
                Admission Capacity: {hospital.admissionCapacity}
              </Text>
              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  textAlign: "center",
                }}
              >
                Hospital Beds: {hospital.hospitalBeds}
              </Text>
              <Text>{"\n"}</Text>
              <Button
                style={{ backgroundColor: "red" }}
                title="SEARCH"
                onPress={() => {
                  Linking.openURL(
                    "https://www.google.com/search?q=" +
                      hospital.name +
                      "&rlz=1C1CHBD_enIN942IN942&oq=test&aqs=chrome..69i57l2j69i59j0i271j69i60l3j69i61.2448j0j7&sourceid=chrome&ie=UTF-8"
                  );
                }}
              />
            </Card>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
