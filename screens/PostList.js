import { firebase } from "../firebase";
import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { initPosts } from "../store/actions/posts";

const PostList = ({ navigation }) => {
  const dispatch = useDispatch();
  const [postsData, setPostsData] = useState();

  const descendDateSort = (arr) => {
    return arr.sort((a, b) => {
      return new Date(b.postDate) - new Date(a.postDate);
    });
  };

  // Request data to firebase
  useEffect(() => {
    const db = getDatabase();
    const reference = ref(db, "/posts");
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      setPostsData(descendDateSort(data));
      dispatch(initPosts(data));
    });
  }, []);

  return (
    <ScrollView style={{ width: "100%" }}>
      {postsData?.map((post) => (
        <TouchableOpacity
          key={post.id}
          onPress={() => navigation.navigate("PostDetail", { id: post.id })}
        >
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{post.title}</ListItem.Title>
              <ListItem.Subtitle>{post.postDate}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default PostList;
