import React from "react";
import { Button, HStack } from "native-base";

interface ButtonProps {
  label?: string;
  onPress?: () => void;
}

export const OkButton: React.FC<ButtonProps> = ({ label = "OK", onPress }) => {
  return (
    <Button
      bg="#7A83F4"
      _pressed={{ bg: "#5F6BD6" }}
      borderRadius="10"
      width="80px"
      height="36px"
      shadow={5}
      style={{ elevation: 5 }}
      _text={{
        color: "white",
        fontSize: "16px",
        fontWeight: "regular",
        marginTop: "-4px",
        fontFamily: "Inter",
      }}
      onPress={onPress}
    >
      {label}
    </Button>
  );
};

export const CancleButton: React.FC<ButtonProps> = ({
  label = "Cancel",
  onPress,
}) => {
  return (
    <Button
      bg="#7A83F4"
      _pressed={{ bg: "#5F6BD6" }}
      borderRadius="10"
      width="80px"
      height="36px"
      shadow={5}
      style={{ elevation: 5 }}
      _text={{
        color: "white",
        fontSize: "16px",
        fontWeight: "regular",
        marginTop: "-4px",
        fontFamily: "Inter",
      }}
      onPress={onPress}
    >
      {label}
    </Button>
  );
};

export const Buttonpair: React.FC<{
  onOkPress?: () => void;
  onCancelPress?: () => void;
}> = ({ onOkPress, onCancelPress }) => {
  return (
    <HStack space={88} justifyContent="center">
      <OkButton onPress={onOkPress} />
      <CancleButton onPress={onCancelPress} />
    </HStack>
  );
};
