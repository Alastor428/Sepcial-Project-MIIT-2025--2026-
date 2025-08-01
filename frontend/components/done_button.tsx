// still have dropshadow issue for andriod to fix in here too :3
import React from "react";
import { Box, Button } from "native-base";

interface DoneButtonProps {
  label?: String;
  onPress?: () => void;
}

const DoneButton: React.FC<DoneButtonProps> = ({ label = "Done", onPress }) => {
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
      borderRadius={"10"}
      width={"132"}
      height={"44"}
      shadow={5}
      style={{
        elevation: 5,
      }}
      _text={{
        color: "white",
        fontSize: "20px",
        fontWeight: "bold",
        marginTop: "-4px",
        fontFamily: "Inter",
      }}
      onPress={onPress}
    >
      {label}
    </Button>
    // </Box>
  );
};

export default DoneButton;
