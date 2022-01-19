import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";

const CommentCreate = () => {
  return (
    <Card>
      <Input placeholder="Comment" multiline style={styles.input} />
      <Button title="Submit" containerStyle={{ marginHorizontal: 10 }} />
    </Card>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 20,
    paddingHorizontal: 5,
  },
});

export default CommentCreate;
