import * as Contacts from "expo-contacts";
import React, { useState } from "react";
import { FlatList, Pressable, Text, Modal, View } from "react-native";
import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type ContactPickerProps = {
  onSelect: (phone: string) => void;
};

export default function ContactPicker({ onSelect }: ContactPickerProps) {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [visible, setVisible] = useState(false);

  const openContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      setContacts(data);
      setVisible(true);
    }
  };

  const handleSelect = (phone: string) => {
    onSelect(phone);
    setVisible(false);
  };

  return (
    <>
      {/* Icon button */}
      <Pressable onPress={openContacts}>
        <Icon as={MaterialIcons} name="contacts" size="8" color="#7A83F4" />
      </Pressable>

      {/* Modal contact list */}
      <Modal visible={visible} animationType="slide">
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Select Contact</Text>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const phone = item.phoneNumbers?.[0]?.number;
              if (!phone) return null;
              return (
                <Pressable
                  onPress={() => handleSelect(phone)}
                  style={{ paddingVertical: 12 }}
                >
                  <Text style={{ fontSize: 16 }}>
                    {item.name} - {phone}
                  </Text>
                </Pressable>
              );
            }}
          />
          <Pressable
            onPress={() => setVisible(false)}
            style={{ marginTop: 20 }}
          >
            <Text style={{ color: "red", textAlign: "center" }}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}
