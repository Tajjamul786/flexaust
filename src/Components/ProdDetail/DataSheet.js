/**
 * Copyright (c) 2020
 *
 * This files is used by the What's New and Product detail screen in the action area
 * This file handles the view of pdf datasheet of product 
 *
 * @summary View pdf file of the product
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-02 02:21:56 
 * Last modified  : 2020-10-02 11:19:30
 */

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    SafeAreaView
} from 'react-native';
import Pdf from 'react-native-pdf';

export default class DataSheet extends Component {

    render() {

        const { navigation } = this.props;
        let { PageURL } = this.props.route.params;
        let BackIconContanerWidth = 20;
        let BackIconwidth = 10;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            BackIconContanerWidth = 40;
            BackIconwidth = 14;
        }

        let Style = StyleSheet.create({
            container: {
                flex: 1
            },
            Header: {
                flexDirection: 'row',
                padding: 10,
                paddingHorizontal: 15,
                backgroundColor: '#222222'
            },
            ButtonContainer: {
                width: BackIconContanerWidth,
                justifyContent: "center",
                marginTop: 5
            },
            backbtn: {
                marginLeft: 10,
                height: undefined,
                width: BackIconwidth,
                aspectRatio: 0.55,
                alignSelf: "center"
            }
        })
        console.log(PageURL)
        return (

            <SafeAreaView style={Style.container}>
                <View style={Style.Header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={Style.ButtonContainer}
                    >
                        <Image
                            style={Style.backbtn}
                            source={require('../../assets/images/icon-back.png')} />
                    </TouchableOpacity>
                </View>


                <Pdf
                    trustAllCerts={false}
                    source={{ uri: PageURL }}
                    style={{ flex: 1, padding: 15 }}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                />


            </SafeAreaView>
        )
    }
}