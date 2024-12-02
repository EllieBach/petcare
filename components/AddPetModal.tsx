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
  Image

} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";


export default function AddPetModal({
  modalVisible,
  setModalVisible,
  setPets,
  pets,
}) {
  const [petName, setPetName] = useState("");
  const [selectedGender, setSelectedGender] = useState("Select a gender");
  const [isGenderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("Select a type");
  const [isTypeDropdownVisible, setTypeDropdownVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
 

  const gendersOptions = ["female", "male"];
  const animalType = [
    "dog",
    "cat",
    "hamster",
    "guinea pig",
    "bird",
    "reptile",
    "lizard",
  ];

  const toggleGenderDropdown = () => setGenderDropdownVisible(!isGenderDropdownVisible);

  const toggleTypeDropdown = () => setTypeDropdownVisible(!isTypeDropdownVisible);

  const selectGender = (gender) => {
    setSelectedGender(gender);
    setGenderDropdownVisible(false);
  };

  const selectAnimal = (animal) => {
    setSelectedType(animal);
    setTypeDropdownVisible(false);
  
  };

  const handleAddPet = () => {
    if (petName && selectedGender !== "Select a gender" && selectedType !== "Select a type") {
      setPets([
        ...pets,
        {
          id: Date.now().toString(),
          name: petName,
          gender: selectedGender,
          type: selectedType,
          image: imageUri,
        },
      ]);
      setPetName("");
      setSelectedGender("Select a gender");
      setSelectedType("Select a type");
      setImageUri(null);
      setModalVisible(false); // Close the modal
    } else {
      alert("Please fill in all fields!");
    }
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
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

          <Text style={styles.smallTitle}>Pet type</Text>
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={toggleTypeDropdown}
          >
            <Text style={styles.dropdownText}>{selectedType}</Text>
          </TouchableOpacity>
          {isTypeDropdownVisible && (
            <View style={styles.dropdownList}>
              <FlatList
                data={animalType}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => selectAnimal(item)}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
             
              />
            </View>
          )}

          {selectedType !== "Select a type" && (
            <>
              <Text style={styles.smallTitle}>Pet gender</Text>
              <TouchableOpacity
                style={styles.dropdownHeader}
                onPress={toggleGenderDropdown}
              >
                <Text style={styles.dropdownText}>{selectedGender}</Text>
              </TouchableOpacity>
              {isGenderDropdownVisible && (
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
            </>
          )}

          <Text style={styles.smallTitle}>Pet image</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>Pick an Image</Text>
          </TouchableOpacity>
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={styles.previewImage}
            />
          )}

    
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
    marginBottom: 10,
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
    maxHeight: 150, // Adjust based on item height (e.g., 50px/item * 3 items)
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
  imagePicker: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerText: {
    fontSize: 16,
    color: "#333",
  },
  previewImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});
