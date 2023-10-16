/**
 * Copyright (c) 2020
 *
 * Home Screen
 *
 * @summary Home Screen
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-01 12:20:20 
 * Last modified  : 2020-10-02 11:50:30
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import logo from '../assets/images/logo.png';
import New from '../assets/images/home/new.png';
import bulb from '../assets/images/home/bulb.png';
import search from '../assets/images/home/search.png';
import bina from '../assets/images/home/bina.png';
import star from '../assets/images/home/star.png';
import thumbsUp from '../assets/images/home/thumbsup.png';
import ScreenBackground from '../Components/ScreenBackground';
import LinearGradient from 'react-native-linear-gradient';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height
        }
        this.onLayout = this.onLayout.bind(this);
    }

    //Change the view Dimenssions on changing orientation

    onLayout(e) {
        this.setState({
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        });
    }

    render() {

        //Define Components Dimensions according to the screen size

        let FontSize = 16;
        let IconHeight = 30;
        let btnsheight = this.state.height * 0.097;
        let btnsMarginBottom = 10;
        let btnsLineHeight = 25;
        let btnsLinepadding = 5;
        let IconMargin = 17;
        let IconMarginLeft = 5;
        let bulbIconMarginRight = 22;
        let bulbIconMarginLeft = 10;
        let buttonsWidth = "85%";
        let logoWidth = this.state.width * 0.75;
        let logoMarginBottom = 20;

        //Set tablet Resolution
        if (this.state.width >= 600 && this.state.height >= 600) {
            FontSize = 25;
            IconHeight = 50;
            btnsheight = 100;
            btnsMarginBottom = 18;
            btnsLineHeight = 30;
            btnsLinepadding = 15;
            IconMargin = 30;
            bulbIconMarginRight = 40;
            bulbIconMarginLeft = 25;
            IconMarginLeft = 20;
            buttonsWidth = "70%";
            logoWidth = this.state.width * 0.65;
            logoMarginBottom = 50;
        }


        const { navigation } = this.props;
        const HomeStyle = StyleSheet.create({
            container: {
                flex: 1,
                alignItems: "center"
            },
            logo: {
                width: logoWidth,
                height: undefined,
                aspectRatio: 4,
                marginTop: this.state.height * 0.065,
                marginBottom: logoMarginBottom,
                alignSelf: "center"
            },
            btns: {
                flexDirection: "row",
                width: buttonsWidth,
                minHeight: btnsheight,
                marginHorizontal: 30,
                marginBottom: btnsMarginBottom,
                paddingVertical: 0,
                paddingHorizontal: 20,
                borderColor: "rgba(255, 255, 255, 0.8)",
                borderWidth: 0.1,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                overflow: 'hidden',
                borderBottomWidth: 1.2,
                borderBottomColor: 'rgba(0, 0, 0, 0.4)',
                borderTopColor: "rgba(255, 255, 255, 0.3)",
                borderTopWidth: 1.2,
                alignSelf: "center"
            },
            btnsImg: {
                height: IconHeight,
                width: undefined,
                aspectRatio: 1,
                marginLeft: IconMarginLeft,
                marginRight: IconMargin,
                alignSelf: "center"
            },
            btnImgBulb: {
                height: IconHeight,
                width: undefined,
                aspectRatio: 0.66,
                marginRight: bulbIconMarginRight,
                marginLeft: bulbIconMarginLeft,
                alignSelf: "center"
            },
            btnImgBina: {
                height: IconHeight,
                width: undefined,
                aspectRatio: 1.5,
                marginRight: 5,
                marginLeft: IconMarginLeft - 2,
                alignSelf: "center"
            },
            btnsText: {
                color: '#ffffff',
                fontSize: FontSize,
                textAlignVertical: "center",
                marginLeft: 10,
                marginRight: 10,
                lineHeight: btnsLineHeight,
                width: "80%",
                paddingVertical: btnsLinepadding,
                alignSelf: "center"
            }
        });

        return (
            <ScreenBackground>
                <View
                    onLayout={this.onLayout}
                    style={HomeStyle.container}>
                    <ScrollView
                        style={{
                            flex: 1,
                            width: "100%",
                        }}
                        showsVerticalScrollIndicator={false}>


                        <View style={{
                            alignItems: "center"
                        }}>
                            <Image
                                source={logo}
                                style={HomeStyle.logo}
                            />
                        </View>


                        <TouchableOpacity
                            onPress={() => navigation.navigate("WhatsNew")}
                        >
                            <LinearGradient
                                colors={['rgba(255,255,255,0.14902)', 'rgba(255,255,255,0.30196)']}
                                borderRadius={5}
                                style={HomeStyle.btns}
                            >
                                <Image
                                    source={New}
                                    style={HomeStyle.btnsImg}
                                />
                                <Text style={HomeStyle.btnsText}>What's New</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('AppSolution')}
                        >
                            <LinearGradient
                                colors={['rgba(255,255,255,0.14902)', 'rgba(255,255,255,0.30196)']}
                                borderRadius={5}
                                style={HomeStyle.btns}
                            >
                                <Image
                                    source={bulb}
                                    style={HomeStyle.btnImgBulb}
                                />
                                <Text style={HomeStyle.btnsText}>Find a product by market application</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('FindProduct')}
                        >
                            <LinearGradient
                                colors={['rgba(255,255,255,0.14902)', 'rgba(255,255,255,0.30196)']}
                                borderRadius={5}
                                style={HomeStyle.btns}
                            >
                                <Image
                                    source={search}
                                    style={HomeStyle.btnsImg}
                                />
                                <Text style={HomeStyle.btnsText}>Find a Product</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Search')}
                        >
                            <LinearGradient
                                colors={['rgba(255,255,255,0.14902)', 'rgba(255,255,255,0.30196)']}
                                borderRadius={5}
                                style={HomeStyle.btns}
                            >
                                <Image
                                    source={bina}
                                    style={HomeStyle.btnImgBina}
                                />
                                <Text style={HomeStyle.btnsText}>Product Search</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Favorite") }}
                        >
                            <LinearGradient
                                colors={['rgba(255,255,255,0.14902)', 'rgba(255,255,255,0.30196)']}
                                borderRadius={5}
                                style={HomeStyle.btns}
                            >
                                <Image
                                    source={star}
                                    style={HomeStyle.btnsImg}
                                />
                                <Text style={HomeStyle.btnsText}>Favorites</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Contact") }}
                        >
                            <LinearGradient
                                colors={['rgba(255,255,255,0.14902)', 'rgba(255,255,255,0.30196)']}
                                borderRadius={5}
                                style={HomeStyle.btns}
                            >
                                <Image
                                    source={thumbsUp}
                                    style={HomeStyle.btnsImg}
                                />
                                <Text style={HomeStyle.btnsText}>Contact & Support</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </ScreenBackground>
        );
    }
}