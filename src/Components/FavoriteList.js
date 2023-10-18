/**
 * Copyright (c) 2020
 *
 * This files is used to handle favorite products listing 
 *
 * @summary Favorite Products Listing
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-04 14:12:20 
 * Last modified  : 2020-10-02 11:28:18
 */

import React, { Component } from 'react';
import {
    View,
    ScrollView
} from 'react-native';
import FavoriteCard from '../Components/FavoriteCard';
import { listProduct } from '../Config/DataBase';


export default class FavoriteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    componentDidMount() {

        //Check if the product is in favorite

        const { navigation } = this.props

        navigation.addListener('focus', () => {
            listProduct().then(res => {
                this.setState({ data: res })
            })
        })

    }


    render() {

        return (
            <View style={{
                flex: 1
            }}>
                <ScrollView
                    style={{
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "flex-start",
                            marginHorizontal: 10
                        }}
                    >
                        {
                            Object.values(this.state.data).map(item => {
                                return (
                                    <FavoriteCard {...this.props} key={item.id} item={item} />
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}