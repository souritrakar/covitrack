import React from "react";
import { Header as ElementHeader, Icon } from "react-native-elements";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ElementHeader
        containerStyle={{
          backgroundColor: "#3D6DCC",
          justifyContent: "space-around",
          flex: 1,
          width: "100%",
        }}
        leftComponent={<Hamburger onpress={this.props.onpress2} />}
        centerComponent={{ text: "Home", style: { color: "#fff" } }}
      />
    );
  }
}

const Hamburger = (props) => {
  return <Icon name="menu" onpress={props.onpress} />;
};
