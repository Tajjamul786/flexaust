/**
 * Copyright (c) 2020
 *
 * This files is used by the Product detail screen to show products Specifications
 *
 * @summary Product Specifications
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-03 13:20:10 
 * Last modified  : 2020-10-02 11:27:16
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet, Dimensions
} from 'react-native';
import { decodeHtml } from '../../Config/CommonFunctions';
import HTMLView from 'react-native-htmlview';


export default class ProdSpecs extends Component {

    //map the data 

    mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
            return callback(key, object[key]);
        });
    }

    render() {
        let SectionHeadingFontSize = 18;
        let SectionHeadingAlign = "center";
        let SectionHeadingBorderTopWidth = 2;
        let TableFontSize = 13;
        let BorderRightWidth = 1;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            SectionHeadingFontSize = 22;
            SectionHeadingAlign = "left";
            SectionHeadingBorderTopWidth = 3;
            TableFontSize = 18;
            BorderRightWidth = 3;
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

            leftText: {
                fontSize: TableFontSize,
                width: '45%',
                textAlign: "right",
                padding: 10,


            },
            rightText: {
                fontSize: TableFontSize,
                width: '55%',
                textAlign: "left",
                padding: 10,
                borderLeftColor: "#cbd7e1",
                borderLeftWidth: BorderRightWidth,
            },
            table: {
                borderBottomColor: "#cbd7e1",
                borderBottomWidth: 5,
                marginBottom: 10
            },

        })



        //HTML Styling of the Table 

        let tableHtml = StyleSheet.create({
            p: {
                textAlign: "left",
                fontSize: TableFontSize,
                color: '#164486',
                fontWeight: "700"
            }
        })
        const { product } = this.props

        let isEven = false;
        return (
            <>
                <View style={detStyle.sectionHeader}>
                    <Text style={detStyle.sectionHeading}>PRODUCT SPECS</Text>
                </View>
                <View style={detStyle.table}>
                    {

                        this.mapObject(product["Specs"], function (key, value) {
                            let backColor = "";
                            if (isEven) {
                                backColor = "#e8eff5"
                            } else {
                                backColor = "#f4f7fa"
                            }
                            isEven = !isEven

                            if (key.toLowerCase().indexOf('temperature') > -1) {
                                value = value + "&deg;F"
                            } else if (key.toLowerCase().indexOf('diameter') > -1) {
                                value = value + '"'
                            } else {

                            }

                            return (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        backgroundColor: backColor,
                                        minHeight: 50
                                    }}
                                    key={key}>
                                    <Text style={detStyle.leftText}>{key.toUpperCase()}</Text>
                                    <View style={detStyle.rightText}>


                                        <HTMLView value={`<p>${decodeHtml(value)} </p>`} stylesheet={tableHtml} />

                                    </View>
                                </View>
                            )
                        })

                    }
                </View>
            </>

        )
    }
}