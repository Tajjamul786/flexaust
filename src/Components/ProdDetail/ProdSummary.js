/**
 * Copyright (c) 2020
 *
 * This files is used by the Product detail screen to show products Detail
 *
 * @summary Product Detail
 * @author Tajjamul <tajzuman786@gmail.com>
 *
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import { decodeHtml } from '../../Config/CommonFunctions';
import HTMLView from 'react-native-htmlview';


export default class ProdSummary extends Component {

    //Format the List with bullets accordingly 

    renderNode(node, index, siblings, parent, defaultRenderer) {

        let paraFontSize = 12;
        let paraLineHeight = 18;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {

            paraFontSize = 20;
        }

        if (node.name == 'li') {
            return (
                <View key={index} style={{ marginTop: -30 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', marginLeft: 20, width: 15 }}>
                            <Text style={{ fontSize: paraFontSize, fontWeight: "700" ,color:"#000000"}}>{'\u2022'}</Text>
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


    render() {

        let headingFontSize = 20;
        let headingMarginTop = -25;
        let separatorheight = 1.5;
        let HeadingMarginBottom = 15;
        let paraFontSize = 12;
        let paraLineHeight = 18;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            headingFontSize = 30;
            headingMarginTop = -30;
            separatorheight = 2;
            HeadingMarginBottom = 20;
            paraFontSize = 20;
            paraLineHeight = 24;
        }

        let detStyle = StyleSheet.create({

            separator: {
                width: '100%',
                height: separatorheight,
                backgroundColor: "#3399cc",
                marginTop: headingMarginTop,
                marginBottom: HeadingMarginBottom
            }

        })

        // Styling for the all HTML View

        let htmlStyle = StyleSheet.create({
            h5: {
                color: '#164486',
                fontSize: headingFontSize,
                lineHeight: 35,
                fontWeight: "700",
            },
            p: {
                fontSize: paraFontSize,
                marginBottom: 10,
                lineHeight: paraLineHeight,
                color:"#000000"
            },
            ul: {
                padding: 10
            },
            li: {
                fontSize: paraFontSize,
                color:"#000000"
            }
        });



        const { name, description } = this.props
        let title = "";
        if (name !== undefined) {
            title = decodeHtml(name);
        }
        let desc = "";

        //filter the description from Html tags not needed
        if (description !== undefined) {
            desc = description.replace(/&lt;/gmi, '<').replace(/&gt;/gmi, '>');
            desc = desc.replace(/<[^>]sup>/g, '').replace(/<sup>/g, '');
            desc = desc.replace(/<[^>]sub>/g, '').replace(/<sub>/g, '');

        }
        desc = desc.replace(/(style=&quot;([^>]+)>)/ig, '>').replace(' >', '>');
        desc = desc.replace(' >', '>');
        desc = desc.replace(/<[^>]span>/g, '').replace(/<span>/g, '');
        desc = desc.replace(/<[^>]p>/g, '').replace(/<p>/g, '');

        return (
            <>
                <HTMLView
                    value={`<h5>${title}</h5>`}
                    stylesheet={htmlStyle}
                />
                <View style={detStyle.separator} ></View>
                <HTMLView
                    value={`<p>${desc}</p>`}
                    stylesheet={htmlStyle}
                    renderNode={(node, index, siblings, parent, defaultRenderer) => {
                        return this.renderNode(node, index, siblings, parent, defaultRenderer)
                    }}
                />
            </>
        )
    }

}