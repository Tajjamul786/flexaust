/**
 * Copyright (c) 2020
 *
 * This files is used to handle favorite products listing cards view
 *
 * @summary Favorite Products Card
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-04 14:12:18 
 * Last modified  : 2020-10-02 11:28:16
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback, Dimensions
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { decodeHtml } from '../Config/CommonFunctions';
import { APIURL } from '../Config/config';

export default class FavoriteCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            item: {}
        }
    }

    componentDidMount() {
        const { item } = this.props;
        this.setState({ item: item })
    }

    render() {

        let conatainerWidth = Dimensions.get('screen').width * 0.92;
        let headingFontSize = 16;
        let paraFontSize = 12;
        let cardHeight = 120;
        let imageHeight = 100;
        let headinHeight = 20;
        let lineHeight = 16;
        let TitleLineHeight = 22;
        let prodHtmlParaPaddingRight = 10;
        let NumberOfLines = 3;
        let cardDetailWidth = "65%";

        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            conatainerWidth = Dimensions.get('screen').width * 0.47;
            headingFontSize = 20;
            paraFontSize = 18;
            cardHeight = 160;
            imageHeight = 140;
            headinHeight = 30;
            lineHeight = 20;
            prodHtmlParaPaddingRight = 0;
            TitleLineHeight = 25;
            NumberOfLines = 4;
            cardDetailWidth = "50%";
        }

        let cardStyles = StyleSheet.create({
            container: {
                width: conatainerWidth,
                backgroundColor: "#ffffff",
                marginHorizontal: 5,
                marginVertical: 5,
                flexDirection: "row",
                padding: 10,
                minHeight: cardHeight

            },
            prodImage: {
                width: imageHeight,
                height: imageHeight,
                aspectRatio: 1,
                alignSelf: "center"
            },
            cardDetail: {
                marginHorizontal: 15,
                width: cardDetailWidth,
                paddingRight: 20
            },
            cardHeading: {
                color: "#164486",
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 5,
                height: 20
            },
            cardText: {
                fontSize: 14,
                color:"#000000",
                lineHeight: 20
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
                color:"#000000",
                marginTop: 5,
                paddingBottom: 20,
                paddingRight: prodHtmlParaPaddingRight
            }
        });


        //Distinguish the product and article

        const { navigation } = this.props;
        const { item } = this.state;
        let desc = "";
        let detURL = "";
        let Name = "";
        let imageUrl = "";
        let itemtype = "";
        let itemDetail = {}
        if (item.type !== undefined) {
            itemtype = item.type;

            if (item.item !== undefined) {
                itemDetail = JSON.parse(item.item)
            }

            if (item.type == "product") {


                if (itemDetail.Description !== undefined) {
                    desc = itemDetail.Description.replace(/&lt;/gmi, '<').replace(/&gt;/gmi, '>');
                }
                if (item.id !== undefined && item.id !== null) {
                    detURL = APIURL + "?data=product&prod_id=" + item.id
                }
                if (itemDetail["Image URL"] !== undefined) {
                    imageUrl = itemDetail["Image URL"]
                }
                if (itemDetail["Name"] !== undefined) {
                    Name = decodeHtml(itemDetail["Name"])
                }
            } else {
                if (itemDetail.Content !== undefined) {
                    desc = itemDetail.Content.replace(/&lt;/gmi, '<').replace(/&gt;/gmi, '>');
                }
                if (itemDetail["Image Thumb URL"] !== undefined) {
                    imageUrl = itemDetail["Image Thumb URL"]
                }
                if (itemDetail["Title"] !== undefined) {
                    Name = decodeHtml(itemDetail["Title"])
                }
            }

        }

        //Remove Html Tags from description

        desc = desc.replace(/(\r\n|\n|\r)/gm, "");
        desc = desc.replace('\u2022 ', "");
        desc = desc.replace('\u2022', " ");
        desc = desc.replace(/(<([^>]+)>)/ig, '');
        desc = desc.replace('•', "")
        desc = desc.replace('• ', "")
        Name = Name.replace(/(\r\n|\n|\r)/gm, "");

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    if (itemtype == "product") {
                        navigation.navigate('ProdDetail', {
                            detURL: detURL
                        })
                    } else if (itemtype == "article") {
                        navigation.navigate('WhatsNewDetail', { item: itemDetail })
                    } else {

                    }
                }}
            >
                <View style={cardStyles.container}>
                    {
                        imageUrl !== "" ?
                            <Image
                                style={cardStyles.prodImage}
                                source={{ uri: imageUrl }}
                            />
                            : <></>
                    }

                    <View style={cardStyles.cardDetail}>
                        <HTMLView value={`<p>${Name}</p>`}
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
                        <HTMLView value={`<p>${desc}</p>`}
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

                </View>
            </TouchableWithoutFeedback>

        )
    }
}