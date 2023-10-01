import {Text,FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import CommentComponent from './commentComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PostComponent = (props) => {

    const {posts} = props
    const [comments, setComments] = useState([]);
    const [AllTotalComments , setAllTotalComments] = useState([])
    const [view , setView] = useState(false);
    const [loading, setLoading] = useState(false);


    const fetchAllComments = async (currentPostId) => {
        if (currentPostId) {
            setLoading(true);
            await axios.get(`https://jsonplaceholder.typicode.com/posts/${currentPostId}/comments`).then(
                (response, err) => {
                    if (err) {
                        setLoading(false)
                        alert('something went wrong')
                    } else {
                        setComments(response.data);
                        setLoading(false);
                    }
                }
            )
        } else {
            console.log('nothing to show')
        }

    };

    const SetViewOfCommentComponent = (postId) => {
        if(view === false){
            fetchAllComments(postId)
            setView(true)
        }else{
            setView(false)
        }
    }
    const fetchingAllTotalComments = async() => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments`)
            setAllTotalComments(response.data)
    }
    useEffect(() => {
        fetchingAllTotalComments();
    },[])

    return(
        
        <View  style = { styles.container}>
            
            <FlatList 
            data={posts}
            renderItem={({ item }) => (
                <TouchableOpacity key={item.id} onPress={() => SetViewOfCommentComponent(item.id)}>
      <View style={styles.card}>
        <Text style={styles.text}>
          <Text style = {styles.Highlight}>POST :---</Text>  {item.body}{'\n'}
          <Text  style = {styles.Highlight}> FIRST_COMMENT :---</Text>
          {AllTotalComments.find((comment) => comment.postId === item.id)?.body}
        </Text>
      </View>
    </TouchableOpacity>
            )}
        />
        {<CommentComponent view = {view} comments = {comments} loading = {loading}/>}
        </View>
        
        
    )
}
const styles = StyleSheet.create({

    container : {
        flex: 1, // Make the container flex to allow justifyContent to work
        justifyContent: 'center', // Apply justifyContent to the contentContainerStyle
        alignItems: 'center',
        width : '100%',
        
    },
  card: {
    justifyContent : 'center',
    height : 200,
    width : '100%',
    borderRadius : 10,
    marginTop : 10,
    backgroundColor: '#F7D8BA',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    padding: 20,
  },
  text : {
    fontWeight : 'bold'
  },
  Highlight : {
    fontSize: 17
  }
})
export default PostComponent;