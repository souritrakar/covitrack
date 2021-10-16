import React from "react";
import AnimatedSplash from "react-native-animated-splash-screen";
import AppWrapper from "./AppWrapper";

export default function App() {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setInterval(function () {
      setLoaded(true);
    }, 5000);
  });

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={loaded}
      logoImage={require("./assets/logocovid.png")}
      backgroundColor={"#262626"}
      logoHeight={150}
      logoWidth={150}
    >
      <AppWrapper />
    </AnimatedSplash>
  );
}
