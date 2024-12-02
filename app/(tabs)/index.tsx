import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text, View } from "@/components/Themed";
import AddPetModal from "@/components/AddPetModal";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabOneScreen() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [pets, setPets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const openDetailsModal = (pet) => {
    setSelectedPet(pet);
    setDetailsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.petItem}
            onPress={() => openDetailsModal(item)}
          >
           
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.petImage} />
            )}
            <Text style={styles.petText}>
              {item.name} </Text>
             
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.noPetsText}>No pets added yet.</Text>
        }
      />
   
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="pluscircleo" size={24} color="white" />
      </TouchableOpacity>
    
      <AddPetModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setPets={setPets}
        pets={pets}
      />

      {selectedPet && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={detailsModalVisible}
          onRequestClose={() => setDetailsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Pet Details</Text>
              {selectedPet.image && (
                <Image
                  source={{ uri: selectedPet.image }}
                  style={styles.detailImage}
                />
              )}
              <Text style={styles.petDetailsText}>
                Name: {selectedPet.name}
              </Text>
              <Text style={styles.petDetailsText}>
                Gender: {selectedPet.gender}
              </Text>
              <Text style={styles.petDetailsText}>
                Type: {selectedPet.type}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setDetailsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  petItem: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    width: "80%",
    alignItems: "center",
  },
  petText: {
    fontSize: 16,
    color: "#333",
  },
  noPetsText: {
    fontSize: 14,
    color: "#888",
    marginVertical: 10,
  },
  petImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    borderRadius: 30
  },
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
  petDetailsText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  detailImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
