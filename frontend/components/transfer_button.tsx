// still have dropshadow issue for andriod to fix in here too :3
import React from "react";
import { Box, Button } from "native-base";

interface TransferButtonProps {
  label?: String;
  onPress?: () => void;
}

const TransferButton: React.FC<TransferButtonProps> = ({
  label = "Transfer",
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
      borderRadius={"10"}
      width={"152"}
      height={"44"}
      shadow={5}
      style={{
        elevation: 5,
      }}
      _text={{
        color: "white",
        fontSize: "20px",
        fontWeight: "medium",
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

export default TransferButton;
