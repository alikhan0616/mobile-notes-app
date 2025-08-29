import { FlatList } from "react-native";
import NoteItems from "./NoteItem";

const NoteList = ({ notes }) => {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NoteItems note={item} />}
    />
  );
};

export default NoteList;
