/**
 * Copyright (c) 2020
 *
 * Search Screen
 * fetch the product by the Context API according to the keyword
 *
 * @summary search Screen
 * @author Tajjamul <tajzuman786@gmail.com>
 *
 */

import React, { Component } from 'react';
import {
    TextInput,
    View,
    Image,
    StyleSheet,
    Dimensions, TouchableOpacity, Keyboard
} from 'react-native';
import ScreenBackground from '../Components/ScreenBackground';
import Header from '../Components/Header';

export default class Search extends Component {


    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
        this.submitHandler = this.submitHandler.bind(this)
    }

    changeHandler(value) {
        this.setState({ search: value })
    }

    submitHandler() {
        let { navigation } = this.props;
        if (this.state.search !== "" && this.state.search !== " ") {
            navigation.navigate('ProductList', {
                type: "search",
                value: this.state.search,
                mainTitle: "Find a Product"
            });
        }
        Keyboard.dismiss()
    }

    render() {

        let SearchBoxFontSize = 16;
        let SerachBoxHeight = 30;
        let searchIconHeight = 20;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            SearchBoxFontSize = 20;
            SerachBoxHeight = 40;
            searchIconHeight = 30;
        }

        let searchStyle = StyleSheet.create({
            searchBar: {
                backgroundColor: "#8899c4",
                marginHorizontal: 20,
                borderRadius: 5
            },
            searchBox: {
                padding: 5,
                paddingHorizontal: 10,
                color: "#ffffff",
                fontSize: SearchBoxFontSize,
                height: SerachBoxHeight,
                marginRight: 40,
                borderWidth: 0
            },
            iconBtn: {
                position: "absolute",
                right: 10,
                top: 5
            },
            searchIcon: {
                height: searchIconHeight,
                width: undefined,
                aspectRatio: 1,

            }
        })



        return (
            <ScreenBackground>
                <Header {...this.props} screenTitle="Find a Product" />
                <View style={searchStyle.searchBar}>
                    <TextInput
                        style={searchStyle.searchBox}
                        placeholder="Search..."
                        placeholderTextColor={"#ffffff"}
                        value={this.state.search}
                        onChangeText={(value) => this.changeHandler(value)}
                        underlineColorAndroid='#8899c4'
                        onSubmitEditing={this.submitHandler}

                    />
                    <TouchableOpacity
                        onPress={this.submitHandler}
                        style={searchStyle.iconBtn}
                    >
                        <Image source={require('../assets/images/search-icon.png')} style={searchStyle.searchIcon} />
                    </TouchableOpacity>
                </View>
            </ScreenBackground>
        )
    }
}