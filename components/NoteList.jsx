import { FlatList } from "react-native";
import NoteItems from "./NoteItem";

const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <NoteItems note={item} onDelete={onDelete} onEdit={onEdit} />
      )}
    />
  );
};

export default NoteList;
