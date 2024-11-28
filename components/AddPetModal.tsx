import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
  Text,
  View,
} from "react-native";

export default function AddPetModal({
  modalVisible,
  setModalVisible,
  setPets,
  pets,
}) {
  const [petName, setPetName] = useState("");
  const [selectedGender, setSelectedGender] = useState("select a gender");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectType, setSelectedType] = useState ('select type')

  const gendersOptions = ["female", "male"];
  const animalType = ["dog", "cat", "hamster", "guinea pig", "bird", "reptile", "lizard"];

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  const selectGender = (gender) => {
    setSelectedGender(gender);
    setDropdownVisible(false);
  };

  const selectAnimal = (animal) => {
    setSelectedType(animal);
    setDropdownVisible(false);
  }

  const handleAddPet = () => {
    if (petName && selectedGender !== "select a gender") {
      setPets([
        ...pets,
        { id: Date.now().toString(), name: petName, gender: selectedGender },
      ]);
      setPetName("");
      setSelectedGender("select a gender");
      setSelectedType('select type')
      setModalVisible(false); // Close the modal
    } else {
      alert("Please enter a pet name and select a gender!");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add a Pet</Text>
          <Text style={styles.smallTitle}>Pet name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pet name"
            value={petName}
            onChangeText={setPetName}
          />
          <Text style={styles.smallTitle}>Pet gender</Text>
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={toggleDropdown}
          >
            <Text style={styles.dropdownText}>{selectedGender}</Text>
          </TouchableOpacity>

          {isDropdownVisible && (
            <View style={styles.dropdownList}>
              <FlatList
                data={gendersOptions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => selectGender(item)}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
<View>
  <FlatList>

  </FlatList>
</View>
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleAddPet} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  smallTitle: {
    color: "black",
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  dropdownHeader: {
    width: "100%",
    padding: 15,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownList: {
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});
