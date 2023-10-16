/**
 * Copyright (c) 2020
 *
 * This files is used to handle header of the application 
 *
 * @summary Application header
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-06 14:13:20 
 * Last modified  : 2020-10-02 11:29:18
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Header extends Component {

    render() {
        const { navigation, screenTitle } = this.props;
        const showBackBtn = this.props.showBackBtn == false ? false : true;

        let headerFontSize = 16;
        let menuIconHeight = 20;
        let BackIconwidth = 10;
        let BackIconContanerWidth = 20;
        let MenuIconContanerWidth = 40;
        let textLeftMargin = -45;

        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            headerFontSize = 25;
            menuIconHeight = 25;
            BackIconwidth = 14;
            BackIconContanerWidth = 40;
            MenuIconContanerWidth = 60;
            textLeftMargin = -55;
        }

        const headerStyle = StyleSheet.create({
            container: {
                flex: 1
            },
            header: {
                flexDirection: 'row',
                padding: 10,
                paddingHorizontal: 15,
                },
            headerText: {
                color: '#ffffff',
                alignSelf: "center",
                textAlign: 'center',
                fontSize: headerFontSize,
                flex: 1,
                marginLeft: textLeftMargin
            },
            backbtn: {
                marginLeft: 10,
                height: undefined,
                width: BackIconwidth,
                aspectRatio: 0.55,
                alignSelf: "center"
            }

        });
        return (
            <View style={headerStyle.header} >
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    activeOpacity={1}
                    style={{
                        width: MenuIconContanerWidth,
                        justifyContent: "center",
                        marginTop: 5
                    }}
                >
                    <Image
                        style={{
                            width: undefined,
                            height: menuIconHeight,
                            aspectRatio: 1.31,
                            alignSelf: "center"
                        }}
                        source={require('../assets/images/icon-menu.png')} />
                </TouchableOpacity >
                {
                    (showBackBtn == true) ?
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            activeOpacity={1}
                            style={{
                                width: BackIconContanerWidth,
                                justifyContent: "center",
                                marginTop: 5

                            }}
                        >
                            <Image
                                style={headerStyle.backbtn}
                                source={require('../assets/images/icon-back.png')} />
                        </TouchableOpacity>
                        : <></>
                }

                <View style={{ flex: 1, alignContent: "center" }}>
                    <Text style={headerStyle.headerText}>{screenTitle}</Text>
                </View>

            </View >
        );
    }

}