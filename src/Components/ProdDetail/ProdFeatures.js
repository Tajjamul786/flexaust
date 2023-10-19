/**
 * Copyright (c) 2020
 *
 * This files is used by the Product detail screen to show the features of products
 *
 * @summary Product Features
 * @author Tajjamul <tajzuman786@gmail.com>
 *
 */

import React, { Component, createRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Linking, Dimensions
} from 'react-native';
import { decodeHtml } from '../../Config/CommonFunctions';
import HTMLView from 'react-native-htmlview';


export default class ProdFeatures extends Component {


    //map the data 

    mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
            return callback(key, object[key]);
        });
    }

    //Format the List with bullets accordingly 

    renderNode(node, index, siblings, parent, defaultRenderer) {

        let paraFontSize = 17;
        let bulletWidth = 15;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            paraFontSize = 22;
            bulletWidth = 20;
        }

        if (node.name == 'li') {
            return (
                <View key={index} style={{ marginTop: -15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', marginLeft: 20, width: bulletWidth }}>
                            <Text style={{ fontSize: paraFontSize, fontWeight: "700",color:"#000000" }}>{'\u2022'}</Text>
                        </View>
                        <View style={{ flexDirection: 'column', width: '90%' }}>
                            <Text style={{ fontSize: paraFontSize,color:"#000000" }}>{defaultRenderer(node.children, parent)}</Text>
                        </View>
                    </View>
                </View>
            );
        } else if (node.name == 'ul') {
            return (
                <View key={index}>
                    {defaultRenderer(node.children, parent)}
                </View>
            );
        }
    }

    //Open the External Links

    async openLink(url) {
        let supported = await Linking.canOpenURL(url)
        if (supported) {
            await Linking.openURL(url)
        } else {
            alert('Failed to open link')
        }
    }


    render() {
        let paraFontSize = 14;
        let headingFontSize = 23;
        let featureHeadingFontSize = 18;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            paraFontSize = 18;
            headingFontSize = 30;
            featureHeadingFontSize = 25;
        }


        let detStyle = StyleSheet.create({

            featureHeading: {
                fontSize: featureHeadingFontSize,
                fontWeight: "700",
                paddingHorizontal: 10,
                marginBottom: 10,
                marginTop: 10,
                color:"#000000"
            },

        })

        // Styling for the all HTML View

        let htmlStyle = StyleSheet.create({
            h5: {
                color: '#164486',
                fontSize: headingFontSize,
                fontWeight: "700",

            },
            p: {
                fontSize: paraFontSize,
                color:'#000000'
            },
            ul: {
                padding: 10
            },
            li: {
                fontSize: paraFontSize,
                color:"#000000"
            }
        });


        let { product } = this.props;

        return (
            <>
                <Text style={detStyle.featureHeading}>FEATURES</Text>
                {
                    product["Features"]["text"] !== undefined ?
                        <View>
                            {
                                <HTMLView
                                    value={decodeHtml(product["Features"]["text"])}
                                    stylesheet={htmlStyle}
                                    renderNode={(node, index, siblings, parent, defaultRenderer) => {
                                        return this.renderNode(node, index, siblings, parent, defaultRenderer)
                                    }}
                                />
                            }
                        </View>
                        :
                        <>
                            {
                                this.mapObject(product["Features"], function (key, value) {
                                    return (
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                paddingHorizontal: 10,
                                                marginBottom: 10
                                            }}
                                            key={key}>
                                            <Text style={{
                                                paddingHorizontal: 10,
                                                fontSize: paraFontSize,
                                                color:"#000000"
                                            }}>{'\u2022' + " " + key.toUpperCase()}: </Text>
                                            <View>
                                                <HTMLView value={`<p>${decodeHtml(value)}</p>`} stylesheet={StyleSheet.create({
                                                    p: {
                                                        fontSize: paraFontSize,
                                                        color:"#000000"
                                                    }
                                                })} />
                                            </View>
                                        </View>
                                    )
                                })

                            }
                        </>
                }
            </>

        )
    }
}