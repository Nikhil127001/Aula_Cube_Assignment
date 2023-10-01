import axios from "axios"
import { View, StyleSheet, FlatList, Text, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import React from "react";

const commentComponent = React.memo((props) => {

    const { view, comments , loading } = props
    
    const container = {
        height: 430,
        width: '100%',
        backgroundColor: '#FEC792',
        position: 'fixed',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        display: `${view == false ? 'none' : ''}`
    };
    return (
        <View style={container}>
            {loading === true ? <View style={styles.loaderContainer}><Image style={styles.loader} source={require('.././loading.gif')} alt="Loading" /></View>
                :
                <><View style={styles.textContainer}>
                    <Text style={styles.text} >Comments</Text>
                </View>
                    <ScrollView>
                        {
                            comments.map((item, idx) => (
                                <View key={idx}>
                                    <Text style={styles.comments}>{item.body}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                </>
            }

        </View>
    );
})
{/* <FlatList contentContainerStyle = {styles.container}
data={comments}
renderItem={({ item }) => (
    <View  key = {item.id}>
        <Text style = {styles.comments}>{item.name}</Text>
    </View>
)}
/> */}

const styles = StyleSheet.create({
    list: {
        position: 'absolute',
        top: 300,
    },
    comments: {
        padding: 10,
        paddingLeft: 30,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black'
    },
    container: {
        flex: 1,

    },

    text: {
        fontWeight: 'bold',
        fontSize: 20,
    },

    textContainer: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },

    loaderContainer: {
        height: 440,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loader: {
        width: 50,
        height: 50,
    }
})


export default commentComponent