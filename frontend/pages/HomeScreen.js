import { StyleSheet,View,Image } from "react-native";
import axios from 'axios'
import { useEffect, useState } from "react";
import PostComponent from "../Components/postComponent";

const HomeScreen = () => {
    const [posts, setposts] = useState([])
    const [loading, setLoading] = useState(false);


    const fetchPosts = async() => {
        try {
            setLoading(true)
            await axios.get('https://jsonplaceholder.typicode.com/posts').then((response,err) => {
               if(err){
                setLoading(false)
                 alert(err);
               }else{
                setLoading(false)
                setposts(response.data)
               }
            })
            
        } catch (err) {
            alert(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    return (<>{loading == true ? <View style={styles.loaderContainer}><Image style={styles.loader} source={require('.././loading.gif')} alt="Loading" /></View>
        :
        <PostComponent posts={posts}  />
    }
    </>
    );
}


const styles = StyleSheet.create({
    loaderContainer: {
        height : 440,
        justifyContent : 'center',
        alignItems : 'center'
     },
     
     loader : {
         width : 50,
         height : 50,
     }
})

export default HomeScreen


