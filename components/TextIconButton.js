import React from "react";

import { TouchableOpacity, Text, Image } from "react-native";

import { COLORS, FONTS } from "../constants";

const TextIconButton = ({
  containerStyle,
  label,
  labelStyle,
  icon,
  iconStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h3,
          ...labelStyle,
        }}
      >
        {label}
        <Image
          source={icon}
          style={{
            marginLeft: 5,
            width: 20,
            height: 20,
            tintColor: COLORS.black,
            ...iconStyle,
          }}
        />
      </Text>
    </TouchableOpacity>
  );
};
export default TextIconButton;
