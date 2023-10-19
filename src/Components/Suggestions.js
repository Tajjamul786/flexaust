/**
 * Copyright (c) 2020
 *
 * This file is Optional file to show suggestions while typing into search bar
 *
 * @summary Search suggestions
 * @author Tajjamul <tajzuman786@gmail.com>
 *
 */

import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { ProductContextData } from './ProductContext';

export default class Suggestions extends Component {

    static contextType = ProductContextData;

    render() {

        const { products } = this.context;
        const { navigation, value } = this.props

        let listStyle = StyleSheet.create({
            container: {
                marginHorizontal: 20,
                marginTop: 10
            },
            listItem: {
                marginBottom: 10,
                paddingBottom: 5,
                borderBottomColor: '#ffffff',
                borderBottomWidth: 1
            },
            itemText: {
                fontSize: 18,
                color: '#ffffff',
                textAlignVertical: "center"
            },
            itemIcon: {
                width: 14,
                height: 16,
                alignSelf: "flex-end",
                position: "absolute",
                right: 5,
                top: 5,
                transform: [{ rotate: "180deg" }]
            }
        });

        return (
            <View style={listStyle.container}>
                <ScrollView>
                    {
                        products.map((item, index) => {
                            if (value !== "" && value !== " ") {
                                if (item["Name"] !== undefined && item["Name"].toLowerCase().indexOf(value.toLowerCase()) > -1) {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                navigation.navigate('ProductList', {
                                                    type: "search",
                                                    value: item["Name"],
                                                    mainTitle: "Find a Product"
                                                });
                                            }}
                                        >
                                            <View style={listStyle.listItem}>
                                                <Text style={listStyle.itemText}>{item.Name}</Text>
                                                <Image source={require('../assets/images/icon-back.png')} style={listStyle.itemIcon} />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            }
                        })
                    }


                </ScrollView>
            </View>
        )
    }
}