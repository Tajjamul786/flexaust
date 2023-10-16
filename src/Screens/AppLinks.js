/**
 * Copyright (c) 2020
 *
 * This file handles all the links of the descriptions
 *
 * @summary Applications Links
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-16 16:19:26 
 * Last modified  : 2020-10-02 11:45:16
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
import { WebView } from 'react-native-webview';
import Pdf from 'react-native-pdf';

export default class AppLinks extends Component {

    render() {

        const { navigation } = this.props;
        let { PageURL } = this.props.route.params;
        let fileType = PageURL.slice(PageURL.toLowerCase().length - 4);
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
        return (

            <SafeAreaView style={Style.container}>
                <View style={Style.Header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={Style.ButtonContainer}
                    >
                        <Image
                            style={Style.backbtn}
                            source={require('../assets/images/icon-back.png')} />
                    </TouchableOpacity>
                </View>
                {
                    fileType == ".pdf" ?
                        <Pdf source={{ uri: PageURL }}
                            style={{
                                flex: 1,
                            }}

                        />
                        :
                        <WebView source={{ uri: PageURL }}
                            style={{ flex: 1, padding: 15 }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            useWebKit={true}
                            originWhitelist={["*"]}
                            mixedContentMode='always'
                            renderError={(error) => { }}
                            scrollEnabled={true}
                            scalesPageToFit={true}
                        />
                }


            </SafeAreaView>
        )
    }
}