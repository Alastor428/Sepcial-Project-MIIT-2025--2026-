// still have dropshadow issue for andriod to fix
import React from "react";
import { Box, Button } from "native-base";

interface SignInButtonProps {
  label?: String;
  onPress?: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({
  label = "Sign In",
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
      borderRadius={"20"}
      width={"330"}
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

export default SignInButton;
