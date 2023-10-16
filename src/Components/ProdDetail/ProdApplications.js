/**
 * Copyright (c) 2020
 *
 * This files is used by the Product detail screen in the Market Application area
 * This file handles the list of the market applications product 
 *
 * @summary Market application of the product
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-02 03:21:50 
 * Last modified  : 2020-10-02 11:20:56
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class ProdApplications extends Component {


    render() {
        let SectionHeadingFontSize = 18;
        let SectionHeadingAlign = "center";
        let SectionHeadingBorderTopWidth = 2;
        let FontSize = 14;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            SectionHeadingFontSize = 22;
            SectionHeadingAlign = "left";
            SectionHeadingBorderTopWidth = 3;
            FontSize = 18;
        }
        let detStyle = StyleSheet.create({

            sectionHeader: {
                backgroundColor: '#164486',
                borderTopColor: "#00ccff",
                borderTopWidth: SectionHeadingBorderTopWidth,
                padding: 5,
                paddingHorizontal: 10
            },
            sectionHeading: {
                color: '#ffffff',
                fontSize: SectionHeadingFontSize,
                textAlign: SectionHeadingAlign,
                fontWeight: "700"
            },
            textStyle: {
                fontSize: FontSize,
                paddingVertical: 10,
                paddingHorizontal: 7,
                lineHeight: 22
            },

        })




        const { product } = this.props
        let productsApp = product["Market Applications"].join(", ");
        return (
            <>
                <View style={detStyle.sectionHeader}>
                    <Text style={detStyle.sectionHeading}>MARKET APPLICATIONS</Text>
                </View>

                <HTMLView value={`<p>${productsApp}</p>`} renderNode={(node, index, siblings, parent, defaultRenderer) => {

                    if (node.name == 'p') {
                        return (
                            <Text
                                key={index}
                                style={detStyle.textStyle}
                            >{defaultRenderer(node.children, parent)}</Text>
                        )
                    }
                }
                } />

            </>

        )
    }
}