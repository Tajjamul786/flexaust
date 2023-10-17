/**
 * Copyright (c) 2020
 *
 * Side Bar
 * Shows the sidebar menu contents
 *
 * @summary Sidebar
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-10 14:30:10 
 * Last modified  : 2020-10-02 11:55:10
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import ScreenBackground from '../Components/ScreenBackground';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';

class SideBar extends Component {

    render() {

        let { navigation } = this.props;

        let FontSize = 16;
        let ItemPaddingVertical = 5;
        let ItemMinHeight = 50;
        let IconHeight = 30;
        let bulbIconMarginLeft = 5;
        let bulbIconMarginRight = 35;
        let menuIconHeight = 20;

        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            FontSize = 22;
            ItemPaddingVertical = 15;
            ItemMinHeight = 70;
            IconHeight = 40;
            bulbIconMarginLeft = 10;
            bulbIconMarginRight = 35;
            menuIconHeight = 25;
        }

        let DrawerStyle = StyleSheet.create({
            container: {
                flex: 1
            },
            menuIcon: {
                marginTop: 15,
                marginHorizontal: 15,
                width: undefined,
                height: menuIconHeight,
                aspectRatio: 1.31,
                marginBottom: 15,
            },
            menuItem: {
                flexDirection: "row",
                marginHorizontal: 20,
                paddingHorizontal: 15,
                paddingVertical: ItemPaddingVertical,
                borderBottomColor: '#ffffff',
                borderBottomWidth: 1,
                textAlignVertical: "center",
                minHeight: ItemMinHeight
            },
            itemImage: {
                height: IconHeight,
                width: undefined,
                aspectRatio: 1,
                marginRight: 30,
                alignSelf: "center"
            },
            itemImageBulb: {
                height: IconHeight,
                width: undefined,
                aspectRatio: 0.66,
                marginLeft: bulbIconMarginLeft,
                marginRight: bulbIconMarginRight,
                alignSelf: "center"
            },
            itemImageBina: {
                height: IconHeight,
                width: undefined,
                aspectRatio: 1.5,
                marginLeft: 0,
                marginRight: 15,
                alignSelf: "center"
            },
            itemtext: {
                color: '#ffffff',
                fontSize: FontSize,
                textAlignVertical: "center",
                width: "80%",
                alignSelf: "center"
            },
            version: {
                color: '#ffffffad',
                alignSelf: "flex-end",
                fontSize: 16,
                margin: 20,
                minHeight: 100
            }
        })

        return (
            <ScreenBackground>
                <View>
                    <TouchableWithoutFeedback

                        onPress={() => navigation.closeDrawer()}

                    >
                        <Image
                            source={require('../assets/images/icon-menu.png')}
                            style={DrawerStyle.menuIcon}
                        />
                    </TouchableWithoutFeedback>
                    <ScrollView>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Home')}
                            style={DrawerStyle.menuItem}>
                            <Image
                                style={DrawerStyle.itemImage}
                                source={require('../assets/images/icon-home.png')} />
                            <Text
                                style={DrawerStyle.itemtext}
                            >Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("WhatsNew")}
                            style={DrawerStyle.menuItem}>
                            <Image
                                style={DrawerStyle.itemImage}
                                source={require('../assets/images/home/new.png')} />
                            <Text
                                style={DrawerStyle.itemtext}
                            >What's New</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AppSolution')}
                            style={DrawerStyle.menuItem}
                        >
                            <Image
                                style={DrawerStyle.itemImageBulb}
                                source={require('../assets/images/home/bulb.png')} />
                            <Text
                                style={DrawerStyle.itemtext}
                            >Find a product by market application</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('FindProduct')}
                            style={DrawerStyle.menuItem}>
                            <Image
                                style={DrawerStyle.itemImage}
                                source={require('../assets/images/home/search.png')} />
                            <Text
                                style={DrawerStyle.itemtext}
                            >Find a Product</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Search')}
                            style={DrawerStyle.menuItem}>
                            <Image
                                style={DrawerStyle.itemImageBina}
                                source={require('../assets/images/home/bina.png')} />
                            <Text
                                style={DrawerStyle.itemtext}
                            >Product Search</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Favorite") }}
                            style={DrawerStyle.menuItem}>
                            <Image
                                style={DrawerStyle.itemImage}
                                source={require('../assets/images/home/star.png')} />
                            <Text
                                style={DrawerStyle.itemtext}
                            >Favorites</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Contact") }}
                            style={DrawerStyle.menuItem}>
                            <Image
                                style={DrawerStyle.itemImage}
                                source={require('../assets/images/home/thumbsup.png')} />
                            <Text
                                style={DrawerStyle.itemtext}
                            >Contact & Support</Text>
                        </TouchableOpacity>
                        <Text style={DrawerStyle.version}>1.1.5</Text>
                    </ScrollView>
                </View>
            </ScreenBackground>

        )
    }

}

export default SideBar;