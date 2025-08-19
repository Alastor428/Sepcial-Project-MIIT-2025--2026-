import React from "react";
import { Modal, VStack, HStack, Text } from "native-base";
import { Buttonpair } from "./cancle_ok_buttons";

type Recipient = {
  name: string;
  userId: string;
};

type TransferConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  recipient: Recipient;
  amount: string;
  onConfirm: () => void;
};

// Mask last 3 digits of userId
const maskId = (id: string) => {
  if (!id) return "";
  return "******" + id.slice(-3);
};

export default function TransferConfirmModal({
  isOpen,
  onClose,
  recipient,
  amount,
  onConfirm,
}: TransferConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      style={{
        justifyContent: "center",
        backgroundColor: "white",
        width: 326,
        height: 348,
        borderRadius: 20,
        borderColor: "rgba(122, 131, 244, 0.5)",
        borderWidth: 2,
        boxShadow: "0px 4px 10px #536FA0",
        shadowOpacity: 0.5,
      }}
    >
      <VStack flex={1} alignItems="center" space={6}>
        <HStack
          space={2}
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginTop: 80,
          }}
        >
          <Text
            fontSize="16px"
            fontWeight="regular"
            color="#7A83F4"
            fontFamily={"inter"}
          >
            Transferred Account:
          </Text>
          <Text
            fontSize="16px"
            fontWeight="regular"
            color="#7A83F4"
            fontFamily={"inter"}
          >
            {recipient.name}
          </Text>
        </HStack>

        <HStack space={2}>
          <Text
            fontSize="16px"
            fontWeight="regular"
            color="#7A83F4"
            fontFamily={"inter"}
          >
            ID:
          </Text>
          <Text
            fontSize="16px"
            fontWeight="regular"
            color="#7A83F4"
            fontFamily={"inter"}
          >
            {maskId(recipient.userId)}
          </Text>
        </HStack>

        <HStack space={2}>
          <Text
            fontSize="16px"
            fontWeight="regular"
            color="#7A83F4"
            fontFamily={"inter"}
          >
            Amount:
          </Text>
          <Text
            fontSize="16px"
            fontWeight="regular"
            color="#7A83F4"
            fontFamily={"inter"}
          >
            {amount ? `${amount} Ks` : "( ---- ) Ks"}
          </Text>
        </HStack>
        <Buttonpair onOkPress={onConfirm} onCancelPress={onClose} />
      </VStack>
    </Modal>
  );
}
