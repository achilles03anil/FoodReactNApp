import React from "react";

import { TouchableOpacity, Image } from "react-native";

import { COLORS } from "../constants";

const IconButton = ({ containerStyle, icon, iconStyle, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...containerStyle }}>
      <Image
        source={icon}
        style={{ width: 30, height: 30, tintColor: COLORS.white, ...iconStyle }}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
