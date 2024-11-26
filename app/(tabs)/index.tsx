import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
  Button,
} from "react-native";
import { Text, View } from "@/components/Themed";
import AddPetModal from "@/components/AddPetModal";

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
    
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.petItem} onPress={() => openDetailsModal(item)}>
            <Text style={styles.petText}>{item.name} ({item.gender})</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.noPetsText}>No pets added yet.</Text>}
      />
      <Button title="Add" onPress={() => setModalVisible(true)} />
      <AddPetModal modalVisible={modalVisible} setModalVisible={setModalVisible} setPets={setPets} pets={pets} />
      
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
              <Text style={styles.petDetailsText}>Name: {selectedPet.name}</Text>
              <Text style={styles.petDetailsText}>Gender: {selectedPet.gender}</Text>
              <Button title="Close" onPress={() => setDetailsModalVisible(false)} />
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
});
