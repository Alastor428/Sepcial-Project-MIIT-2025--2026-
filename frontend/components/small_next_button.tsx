// still have dropshadow issue for andriod to fix
import React from "react";
import { Box, Button } from "native-base";

interface SmallNextButtonProps {
  label?: String;
  onPress?: () => void;
}

const SmallNextButton: React.FC<SmallNextButtonProps> = ({
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
      width={"72"}
      height={"36"}
      shadow={5}
      style={{
        elevation: 100,
      }}
      _text={{
        color: "white",
        fontSize: "16px",
        fontWeight: "simibold",
        marginTop: "-5px",
        fontFamily: "Inter",
      }}
      onPress={onPress}
    >
      {label}
    </Button>
    // </Box>
  );
};

export default SmallNextButton;
