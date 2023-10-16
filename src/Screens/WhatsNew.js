/**
 * Copyright (c) 2020
 *
 * Whats News lising Screen
 * fetch data from URL
 *
 * @summary Whats New
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-12 16:33:15 
 * Last modified  : 2020-10-02 11:57:16
 */

import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native';
import ScreenBackground from '../Components/ScreenBackground';
import { APIURL } from '../Config/config';
import axios from 'axios';
import Header from '../Components/Header';
import NewCard from '../Components/NewCard';

class WhatsNew extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }

    }

    componentDidMount() {
        //Fetch all the data from flexaust.com for whats new
        const { navigation } = this.props;
        navigation.addListener('focus', () => {
            axios.get(APIURL + '?data=whats-new')
                .then(res => {
                    // console.log(res.data)
                    this.setState({ products: res.data.posts })
                }).catch(err => {
                    alert("What's new content did not load")
                })
        })


    }

    render() {
        const { products } = this.state;
        const newStyle = StyleSheet.create({
            container: {
                flex: 1,
            },
            Grid: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: "center"
            },

        });

        return (
            <ScreenBackground>
                <Header {...this.props} screenTitle="What's New" />
                <ScrollView
                    style={newStyle.container}
                >
                    <View style={newStyle.Grid}>
                        {
                            products.map((item) => {

                                return (
                                    <NewCard {...this.props} key={item["Post ID"]} item={item} />
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </ScreenBackground>
        )
    }

}
export default WhatsNew;