// still have dropshadow issue for andriod to fix
import React from "react";
import { Box, Button } from "native-base";

interface NextButtonProps {
  label?: String;
  onPress?: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({
  label = "Next",
  onPress,
}) => {
  return (
    // <Box
    //   shadow={5}
    //   style={{
    //     elevation: 5,
    //     shadowColor: "#000000",
    //   }}
    // >
    <Button
      bg="#7A83F4"
      _pressed={{ bg: "#5F6BD6" }}
      borderRadius={"8"}
      width={"326"}
      height={"44"}
      shadow={5}
      style={{
        elevation: 100,
      }}
      _text={{
        color: "white",
        fontSize: "24px",
        fontWeight: "bold",
        marginTop: "-8px",
        fontFamily: "Inter",
      }}
      onPress={onPress}
    >
      {label}
    </Button>
    // </Box>
  );
};

export default NextButton;
