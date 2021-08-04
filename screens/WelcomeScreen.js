import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts, NunitoSans_700Bold, NunitoSans_800ExtraBold, NunitoSans_600SemiBold} from "@expo-google-fonts/nunito-sans"
import Onboarding from 'react-native-onboarding-swiper';
import AppLoading from 'expo-app-loading';
import { AsyncStorage } from 'react-native';

const Dots = ({selected}) => {
    let backgroundColor;
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}


export default function WelcomeScreen({navigation}){
  let [fontsLoaded] = useFonts({
    NunitoSans_700Bold,
    NunitoSans_800ExtraBold,
    NunitoSans_600SemiBold

  })

  const Skip = ({...props}) => (
      <TouchableOpacity
          style={{marginHorizontal:10}}
          {...props}
      >
          <Text style={{fontSize:16}}>Skip</Text>
      </TouchableOpacity>
  );
  
  const Next = ({...props}) => (
      <TouchableOpacity
          style={{marginHorizontal:10}}
          {...props}
      >
          <Text style={{fontSize:16}}>Next</Text>
      </TouchableOpacity>
  );
  
  const Done = ({...props}) => (
      <TouchableOpacity
          style={{marginHorizontal:10}}
          {...props}
      >
          <Text style={{fontSize:16}}>Done</Text>
      </TouchableOpacity>
  );
  

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        titleStyles={{fontFamily: 'NunitoSans_700Bold'}}
        subTitleStyles={{fontFamily:"NunitoSans_700Bold"}}
        onSkip={() =>navigation.replace("NavContainer")}
        onDone={() => navigation.replace("NavContainer")}
        pages={[
          {
            backgroundColor: '#b3e6cc',
            image: <Image source={require('../assets/logocovid.png')} />,
          
            title: 'CoviTrack',
            subtitle: 'One-stop COVID-19 information platform',
          },
          {
            backgroundColor: '#d7b8f3',
            image: <Image  source={require('../assets/analytics.png')} />,
            title: 'Get the latest COVID-19 data',
            subtitle: 'Active Cases, Recoveries, Deaths and more',
          },
          {
            backgroundColor: '#f397d6',
            image: <Image source={require('../assets/vaccine.png')} />,
            title: 'Stay safe, get vaccinated',
            subtitle: 'Get the latest vaccine stats',
          },
          {
            backgroundColor: '#f42272',
            image: <Image  source={require('../assets/news.png')} />,
            title: 'Stay updated on the latest headlines',
            subtitle: "Travel bans, guidelines and more",
          },
          {
            backgroundColor: '#fdeb93',
            image: <Image source={require('../assets/together.png')} />,
            title: "Unite against COVID-19",
            subtitle: "We're in this together",
          }
        ]}
      />
    );
  }
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});