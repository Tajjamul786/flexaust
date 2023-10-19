/**
 * Copyright (c) 2020
 *
 * This file is used to handle the Products listing cards view 
 *
 * @summary Product Cards
 * @author Tajjamul <tajzuman786@gmail.com>
 *
 */

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';

export default class ProductCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            item: props.item
        }
    }

    render() {

        let CardWidth = Dimensions.get('screen').width * 0.92;
        let headingFontSize = 16;
        let paraFontSize = 12;
        let cardHeight = 120;
        let imageHeight = 100;
        let lineHeight = 16;
        let cardDetailWidth = "65%";
        let CardpaddingRight = 10;
        let NumberOfLines = 3;
        let prodHtmlParaPaddingRight = 10;
        let TitleLineHeight = 22;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {

            const { singleRow } = this.props;
            CardWidth = Dimensions.get('screen').width * 0.47;

            cardDetailWidth = "50%";
            if (singleRow !== undefined && singleRow == true) {
                CardWidth = Dimensions.get('screen').width * 0.42;
            }

            headingFontSize = 20;
            paraFontSize = 16;
            cardHeight = 160;
            imageHeight = 140;
            headinHeight = 80;
            paraHeight = 90;
            lineHeight = 20;
            CardpaddingRight = 12;
            NumberOfLines = 4
            prodHtmlParaPaddingRight = 0;
            TitleLineHeight = 25;
        }

        let cardStyles = StyleSheet.create({
            container: {
                width: CardWidth,
                backgroundColor: "#ffffff",
                marginHorizontal: 5,
                marginVertical: 5,
                flexDirection: "row",
                padding: 10,
                minHeight: cardHeight,
                alignSelf: "flex-start"
            },
            prodImage: {
                width: imageHeight,
                height: imageHeight,
                alignSelf: "center",
                objectFit:'fill'
            },
            cardDetail: {
                marginHorizontal: 15,
                width: cardDetailWidth,
                paddingRight: CardpaddingRight,
                flexDirection: "row",
                flexWrap: "wrap"
            },
            TitleHeading: {
                color: "#164486",
                fontSize: headingFontSize,
                fontWeight: "700",
                paddingRight: prodHtmlParaPaddingRight,
                lineHeight: TitleLineHeight
            },
            prodHtmlPara: {
                fontSize: paraFontSize,
                lineHeight: lineHeight,
                color: "#000000",
                marginTop: 5,
                paddingBottom: 20,
                paddingRight: prodHtmlParaPaddingRight
            }

        });

        const { navigation } = this.props;
        const { item } = this.state;
        let desc = "";
        let detURL = "";
        if (item.Description !== undefined) {
            desc = item.Description.replace(/&lt;/gmi, '<').replace(/&gt;/gmi, '>');
        }
        if (item["Detail URL"] !== undefined) {
            detURL = item["Detail URL"]
        }

        //Filter the description for card from bullets
        //Remove Html Tags from description

        desc = desc.replace(/(\r\n|\n|\r)/gm, "");
        desc = desc.replace('\u2022 ', "");
        desc = desc.replace('\u2022', " ");
        desc = desc.replace(/(<([^>]+)>)/ig, '');
        desc = desc.replace('•', "")
        desc = desc.replace('• ', "")

        return (

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ProdDetail', {
                        detURL: detURL
                    })
                }}
                style={cardStyles.container}
                activeOpacity={1}
            >
                <View style={{
                    height: imageHeight,
                    width: imageHeight,
                    backgroundColor: "#cccccc"
                }}>
                    {
                        item["Image URL"] ?
                        <Image
                            source={{ uri: item["Image URL"] }}
                            style={cardStyles.prodImage}
                        />:
                        <Text style={{fontSize:12,color:"#ffffff92",textAlign:'center',marginTop:40}}>No Image</Text>
                    }
                </View>

                <View style={cardStyles.cardDetail}>
                    <HTMLView value={`<p>${item.Name}</p>`}

                        renderNode={(node, index, siblings, parent, defaultRenderer) => {

                            if (node.name == 'p') {
                                return (
                                    <Text key={index}
                                        numberOfLines={2}
                                        ellipsizeMode={'tail'}
                                        style={cardStyles.TitleHeading}
                                    >{defaultRenderer(node.children, parent)}</Text>
                                )
                            }

                        }
                        }
                    />
                    <HTMLView
                        value={`<p>${desc}</p>`}
                        renderNode={(node, index, siblings, parent, defaultRenderer) => {

                            if (node.name == 'p') {
                                return (
                                    <Text key={index}
                                        numberOfLines={NumberOfLines}
                                        ellipsizeMode={'tail'}
                                        style={cardStyles.prodHtmlPara}
                                    >{defaultRenderer(node.children, parent)}</Text>
                                )
                            }

                        }
                        }
                    />
                </View>

            </TouchableOpacity>

        )
    }
}