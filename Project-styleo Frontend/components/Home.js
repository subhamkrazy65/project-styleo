import React, { Component } from 'react';
import { ImageBackground, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import axios from 'axios';
import Form from './Form';
import { Video } from 'expo-av';

const url = 'https://scontent-bom1-2.cdninstagram.com/vp/67dd0194857ec03b7e0647e0205358d7/5DB84F8B/t51.2885-15/e35/30087453_2042320109364749_548429265993990144_n.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com'
const { height } = Dimensions.get("window");

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            seasonname: 'winter',
            figurename: 'slim',
            skinname: 'dark',
            heightname: 'large',
            data: [],
            queryResponse: false
        },
            this.handleSubmit = this.handleSubmit.bind(this)
    }

    seasonHandler = (itemValue, itemIndex) => {
        this.setState({ seasonname: itemValue })
        //console.log(this.state.seasonname)
    }

    figureHandler = (itemValue, itemIndex) => {
        this.setState({ figurename: itemValue })
    }

    skinHandler = (itemValue, itemIndex) => {
        this.setState({ skinname: itemValue })
    }

    heightHandler = (itemValue, itemIndex) => {
        this.setState({ heightname: itemValue })
    }



    handleSubmit() {
        let queryData = this.state
        console.log(queryData)
        axios.post('https://project-styleo2.herokuapp.com/query', queryData)
            .then((res) => {
                this.setState({ data: res.data, queryResponse: true })
                console.log(this.state.queryResponse)
            })
            .catch(err => console.log(err));
    }
    /*<Video
                        source={require('../assets/fashion.mp4')}
                        rate={1.0}
                        volume={1.0}
                        isMuted
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        style={styles.backgroundVideo}
                    />*/

    render() {
        const { queryResponse, data, seasonname, figurename, skinname, heightname } = this.state;
        return (
            <SafeAreaView style={styles.container}>

                <Form
                    SeasonPickerHolder={seasonname}
                    FigurePickerHolder={figurename}
                    SkinPickerHolder={skinname}
                    HeightPickerHolder={heightname}
                    seasonhandler={this.seasonHandler}
                    figurehandler={this.figureHandler}
                    skinhandler={this.skinHandler}
                    heighthandler={this.heightHandler}
                    handleSubmit={this.handleSubmit}
                    data={data}
                    queryResponse={queryResponse}

                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'red'
    },
    backgroundVideo: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    }
})



export default Home;