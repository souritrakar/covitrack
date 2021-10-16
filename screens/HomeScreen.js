import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import { ActivityIndicator } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Card } from "react-native-elements";
import countrieslist from "../assets/countries";
import { LineChart, YAxis, Grid } from "react-native-svg-charts";
import { StatusBar } from "expo-status-bar";
import Carousel from "react-native-snap-carousel";

export default function HomeScreen({ navigation }) {
  const [activeSeries, setActiveSeries] = useState([]);
  const [recoveriesSeries, setRecoveriesSeries] = useState([]);
  const [deathsSeries, setDeathsSeries] = useState([]);
  const [selectedValue, setSelectedValue] = useState("India");
  const [flag, setFlag] = useState("in");
  const [timeseriesData, setTimeseriesData] = useState([]);
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [daily, setDaily] = useState({
    confirmed: 0,
    recovered: 0,
    deceased: 0,
  });

  const formatNumber = (num) => {
    if (num > 1000000) {
      return (num / 1000000).toFixed(2) + "m";
    } else if (num > 1000) {
      return (num / 1000).toFixed(2) + "k";
    }
    return num;
  };

  useEffect(() => {
    // Total cases by country
    fetch(
      "https://covid-19-report-api.vercel.app/api/v1/cases/latest?iso=" +
        flag.toUpperCase()
    )
      .then((res) => res.json())
      .then((resobj) => {
        setData(resobj.data[0]);
      });

    // Daily cases by country
    fetch(`https://corona.lmao.ninja/v3/covid-19/historical/${flag}?lastdays=2`)
      .then((res) => res.json())
      .then((obj) => {
        let timeline = obj["timeline"];
        let confKeys = Object.keys(timeline["cases"]);
        let confirmed =
          timeline["cases"][confKeys[1]] - timeline["cases"][confKeys[0]];
        let recovered =
          timeline["recovered"][confKeys[1]] -
          timeline["recovered"][confKeys[0]];
        let deceased =
          timeline["deaths"][confKeys[1]] - timeline["deaths"][confKeys[0]];

        setDaily({ confirmed, recovered, deceased });
      });

    // To get the timeseries of the cumulative cases
    fetch(
      "https://covid-19-report-api.vercel.app/api/v1/cases/timeseries?iso=" +
        flag.toUpperCase()
    )
      .then((res) => res.json())
      .then((obj) => {
        let temp = obj.data[0].timeseries;
        let labels = [];
        let conf = [];
        for (let i in temp) {
          conf.push(temp[i].confirmed);
          labels.push(i);
        }
        setTimeseriesData(conf);
        setLoaded(true);
      });

    fetch(
      `https://corona.lmao.ninja/v3/covid-19/historical/${flag}?lastdays=all`
    )
      .then((res) => res.json())
      .then((obj) => {
        let timeline = obj["timeline"];
        let confKeys = Object.keys(timeline["cases"]);
        let confTemp = [];
        let recTemp = [];
        let deadTemp = [];
        for (let i = 1; i < confKeys.length; i++) {
          confTemp.push(
            timeline["cases"][confKeys[i]] - timeline["cases"][confKeys[i - 1]]
          );
          recTemp.push(
            timeline["recovered"][confKeys[i]] -
              timeline["recovered"][confKeys[i - 1]]
          );
          deadTemp.push(
            timeline["deaths"][confKeys[i]] -
              timeline["deaths"][confKeys[i - 1]]
          );
        }
        setActiveSeries(confTemp);
        setRecoveriesSeries(recTemp);
        setDeathsSeries(deadTemp);
      });
  }, [flag]);

  const contentInset = { top: 20, bottom: 20 };

  let _renderItem = ({ item, index }) => {
    let graphName = "";
    switch (index) {
      case 0:
        graphName = "total cases";
        break;
      case 1:
        graphName = "active cases";
        break;
      case 2:
        graphName = "recoveries";
        break;
      case 3:
        graphName = "deaths";
        break;
      default:
        break;
    }

    return (
      <View>
        <View style={{ height: 200, flexDirection: "row", margin: 20 }}>
          <YAxis
            data={item}
            contentInset={contentInset}
            svg={{
              fill: "grey",
              fontSize: 10,
            }}
            formatLabel={(value) => `${value}`}
          />
          <LineChart
            style={{ flex: 1, marginLeft: 16 }}
            data={item}
            svg={{ stroke: "rgb(134, 65, 244)" }}
            contentInset={contentInset}
          >
            <Grid />
          </LineChart>
        </View>
        <Text style={{ textAlign: "center", fontFamily: "NunitoSans_700Bold" }}>
          Graph of {graphName} over time
        </Text>
      </View>
    );
  };

  var imagesource = {
    uri: "https://www.countryflags.io/" + flag + "/shiny/64.png",
  };

  if (!loaded) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Card
          containerStyle={{
            borderColor: "white",
            shadowColor: "white",
            borderBottomColor: "white",
          }}
        >
          <Text
            style={{
              fontFamily: "NunitoSans_700Bold",
              textAlign: "center",
              fontSize: 35,
            }}
          >
            <Image style={{ width: 30, height: 30 }} source={imagesource} />{" "}
            {selectedValue}
          </Text>

          <View style={{ display: "flex", alignItems: "center" }}>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: 150, marginBottom: "2%" }}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue);
                setFlag(countrieslist[itemIndex].code.toLowerCase());
              }}
            >
              {countrieslist.map((country, i) => {
                return (
                  <Picker.Item
                    key={i}
                    label={country.name}
                    value={country.name}
                  />
                );
              })}
            </Picker>
          </View>

          <Text
            style={{
              textAlign: "center",
              fontFamily: "NunitoSans_700Bold",
              fontSize: 25,
            }}
          >
            Daily
          </Text>

          <View style={styles.box}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  fontSize: 15,
                  color: "darkblue",
                }}
              >
                Cases:
              </Text>
              <Text style={{ fontFamily: "NunitoSans_700Bold", fontSize: 20 }}>
                {formatNumber(daily.confirmed)}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  fontSize: 15,
                  color: "green",
                }}
              >
                Recovered:
              </Text>
              <Text style={{ fontFamily: "NunitoSans_700Bold", fontSize: 20 }}>
                {formatNumber(daily.recovered)}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  fontSize: 15,
                  color: "red",
                }}
              >
                Deaths:
              </Text>
              <Text style={{ fontFamily: "NunitoSans_700Bold", fontSize: 20 }}>
                {formatNumber(daily.deceased)}
              </Text>
            </View>
          </View>

          <Text
            style={{
              textAlign: "center",
              fontFamily: "NunitoSans_700Bold",
              fontSize: 25,
            }}
          >
            {"\n"}Total
          </Text>

          <View style={styles.box}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  fontSize: 15,
                  color: "darkblue",
                }}
              >
                Cases:
              </Text>
              <Text style={{ fontFamily: "NunitoSans_700Bold", fontSize: 20 }}>
                {formatNumber(data.confirmed)}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  fontSize: 15,
                  color: "green",
                }}
              >
                Recovered:
              </Text>
              <Text style={{ fontFamily: "NunitoSans_700Bold", fontSize: 20 }}>
                {formatNumber(data.recovered)}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  fontSize: 15,
                  color: "red",
                }}
              >
                {" "}
                Deaths:
              </Text>
              <Text style={{ fontFamily: "NunitoSans_700Bold", fontSize: 20 }}>
                {formatNumber(data.deaths)}
              </Text>
            </View>
          </View>
        </Card>

        {/* <View style={{ height: 200, flexDirection: 'row', margin: 20 }}>
                    <YAxis
                        data={activeSeries}
                        contentInset={contentInset}
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        formatLabel={(value) => `${value}`}
                    />
                    <LineChart
                        style={{ flex: 1, marginLeft: 16 }}
                        data={activeSeries}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={contentInset}
                    >
                        <Grid />
                    </LineChart>
                </View> */}

        <Carousel
          layout={"default"}
          ref={(c) => {
            _carousel = c;
          }}
          data={[timeseriesData, activeSeries, recoveriesSeries, deathsSeries]}
          renderItem={_renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width}
          itemHeight={Dimensions.get("window").height / 4}
        />
        {/* <Text style={{textAlign:"center", fontFamily: "NunitoSans_700Bold"}}>Graph of cases over time</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
