/**
 * Copyright (c) 2020
 *
 * Splash Screen
 *
 * @summary Splash Screen
 * @author Tajjamul <tajzuman786@gmail.com>
 *
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import ScreenBackground from '../Components/ScreenBackground';
import logo from '../assets/images/logo.png';
import loader from '../assets/images/loader.gif';
import NetInfo from "@react-native-community/netinfo";
import Home from './Home';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            component: 'splash',
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width
        }
        this.onLayout = this.onLayout.bind(this);
    }

    componentDidMount() {
        // activate the splash screen component
        if (this.state.component == "splash") {

            setTimeout(() => {
                NetInfo.addEventListener(this.handleConnectivityChange);
            }, 5000)
        }

    }

    handleConnectivityChange = state => {

        // change component to the home after splash screen

        if (state.isInternetReachable) {
            this.setState({ component: "home" })
        } else {
            this.setState({ error: true })
        }
    };


    shouldComponentUpdate(prevState, newState) {
        return (this.state.component == "splash" || newState.height !== prevState.height)
    }

    onLayout(e) {
        this.setState({
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
        });
    }

    render() {

        //Define Components Dimensions according to the screen size

        let logoWidth = this.state.width * 0.7;
        let FontSize = 19;
        let WarningPadding = 20;
        let loaderWidth = 80;
        let LogoMargin = Dimensions.get('screen').height * 0.25;
        let LoaderMargin = Dimensions.get('screen').height * 0.1;

        //Set tablet Resolution
        if (this.state.width >= 600 && this.state.height >= 600) {
            FontSize = 25;
            WarningPadding = 30;
            loaderWidth = 120;
            LogoMargin = Dimensions.get('screen').height * 0.25;
            LoaderMargin = Dimensions.get('screen').height * 0.2;
        }

        // Component Style
        const SplashStyle = StyleSheet.create({
            container: {
                flex: 1,
                alignItems: "center",
                backgroundColor:"#000000"
            },
            logo: {
                width: logoWidth,
                height: undefined,
                aspectRatio: 4,
                marginTop: LogoMargin,
                alignSelf: "center"
            },
            warning: {
                color: '#841F27',
                fontSize: FontSize,
                fontWeight: "700",
                paddingHorizontal: WarningPadding,
                textAlign: "center"
            },
            loader: {
                marginTop: LoaderMargin,
                width: loaderWidth,
                height: undefined,
                aspectRatio: 1,
                alignSelf: "center"
            }
        });

        return (
            // Render component conditionally
            <>
                {
                    this.state.component == "splash" ?
                        <ScreenBackground>
                            <View onLayout={this.onLayout}>
                                <Image
                                    source={logo}
                                    style={SplashStyle.logo}
                                />
                                <Image
                                    source={loader}
                                    style={SplashStyle.loader}
                                />
                                {
                                    this.state.error === true ?
                                        <Text style={SplashStyle.warning}>No Internet Connection Is Detected, Please Close the App and Try Again.</Text>

                                        : <></>
                                }
                            </View>
                        </ScreenBackground> :
                        <Home {...this.props} />
                }
            </>

        );
    }

}

export default SplashScreen;