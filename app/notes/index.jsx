import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddNoteModal from "../../components/AddNoteModal";
import NoteList from "../../components/NoteList";
import noteService from "../../services/noteService";
const NoteScreen = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisisble, setModalVisisble] = useState(false);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes();

    if (response.error) {
      setError(response.error);
      Alert.alert("Error", response.error);
    } else {
      setNotes(response.data);
      setError(null);
    }
    setLoading(false);
  };

  //   Add Note
  const addNote = async () => {
    if (newNote.trim() === "") return;

    const response = await noteService.addNote(newNote);

    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes([...notes, response.data]);
    }

    setNewNote(""), setModalVisisble(false);
  };

  // Delete Note
  const deleteNote = async (id) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const response = await noteService.deleteNote(id);
          if (response.error) {
            Alert.alert("Error", response.error);
          } else {
            setNotes(notes.filter((note) => note.$id !== id));
          }
        },
      },
    ]);
  };

  // Update Note

  const updateNote = async (id, newText) => {
    if (!newText.trim()) {
      Alert.alert("Error", "Note text can't be empty!");
      return;
    }

    const response = await noteService.updateNote(id, newText);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === id ? { ...note, text: response.data.text } : note
        )
      );
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <NoteList notes={notes} onEdit={updateNote} onDelete={deleteNote} />
        </>
      )}

      <TouchableOpacity style={styles.addButton}>
        <Text
          onPress={() => setModalVisisble(true)}
          style={styles.addButtonText}
        >
          + Add Note
        </Text>
      </TouchableOpacity>

      {/* New Note Modal */}
      <AddNoteModal
        modalVisible={modalVisisble}
        setModalVisible={setModalVisisble}
        addNote={addNote}
        newNote={newNote}
        setNewNote={setNewNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 16,
  },
});
export default NoteScreen;
