/**
 * Copyright (c) 2020
 *
 * Contact Us screen
 *
 * @summary Contact us
 * @author Tajjamul <tajzuman786@gmail.com>
 *
 */



import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Linking,
    Dimensions
} from 'react-native';
import ScreenBackground from '../Components/ScreenBackground';
import Header from '../Components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { WEBURL } from '../Config/config';

export default class Contact extends Component {

    // Open the external Link 
    async openLink(url) {

        //Check if the device is able to handle request

        let support = await Linking.canOpenURL(url);
        if (support) {
            await Linking.openURL(url)
        } else {
            alert('Failed to open Link')
        }
    }

    render() {

        let FontSize = 12;
        let LineHeight = 18;

        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            FontSize = 22;
            LineHeight = 33;
        }
        let contactStyle = StyleSheet.create({
            container: {
                flex: 1,
                paddingHorizontal: 20,
                backgroundColor: '#ffffff'
            },
            heading: {
                fontSize: FontSize,
                fontWeight: "700",
                marginVertical: 10,
                color:"#000000"
            },
            para: {
                fontSize: FontSize,
                lineHeight: LineHeight,
                color: "#000000"
            },
            link: {
                color: "blue",
                textDecorationStyle: "solid",
                textDecorationColor: "blue",
                textDecorationLine: "underline",
                fontSize: FontSize,
                lineHeight: LineHeight
            }
        })
        let { navigation } = this.props

        return (
            <ScreenBackground>
                <Header {...this.props} showBackBtn={false} screenTitle="Contact & Support" />
                <View style={contactStyle.container}>
                    <ScrollView>
                        <Text style={contactStyle.heading}>Contact</Text>
                        <Text style={contactStyle.para}>You can contact us by filling out {" "}
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    navigation.navigate('AppLinks', { PageURL: WEBURL + "contact/contact-us/" });
                                }}>
                                <Text style={contactStyle.link}>from here</Text>
                            </TouchableWithoutFeedback>
                        </Text>
                        <Text style={contactStyle.heading}>Product Support</Text>
                        <Text style={contactStyle.para}>We stand behind our products as do our network of partners and distributors. If you require support or have problems or concerns about a Flexaust product, please submit your support request using the{" "}
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    navigation.navigate('AppLinks', { PageURL: WEBURL + "contact/product-support/" });
                                }}>
                                <Text style={contactStyle.link}>from here</Text>
                            </TouchableWithoutFeedback>
                            {". "}
                            Questions will be addressed within one business day. If you require immediate support please call: (800) 343 – 0428.
                        </Text>
                        <Text style={{ ...contactStyle.para, marginVertical: 10 }}>Please also refer to the following support resources:</Text>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                navigation.navigate('AppLinks', { PageURL: WEBURL + "resources/faqs22/" });
                            }}>
                            <Text style={{ ...contactStyle.link, lineHeight: LineHeight + 7 }}>Flexaust Product FAQs</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                navigation.navigate('AppLinks', { PageURL: WEBURL + "resources/product-guides/" });
                            }}>
                            <Text style={{ ...contactStyle.link, lineHeight: LineHeight + 7 }}>Flexaust Product Guides</Text>
                        </TouchableWithoutFeedback>
                        <Text style={contactStyle.heading}>Sales & Support Team</Text>
                        <Text style={contactStyle.para}>
                            Flexaust's corporate sales, marketing & support team is dedicated to ensuring our products continue to meet and exceed our customers' needs.We also ensure Flexaust products continue to remain the most reliable industrial hose, duct and floor care products in the industry. You can get contact information {" "}
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    navigation.navigate('AppLinks', { PageURL: WEBURL + "contact/flexaust-corporate" });
                                }}>
                                <Text style={contactStyle.link}>here</Text>
                            </TouchableWithoutFeedback>
                        </Text>
                    </ScrollView>
                </View>
            </ScreenBackground>
        )
    }
}