/**
 * Copyright (c) 2020
 *
 * This file is used to handle What's New Cards 
 *
 * @summary What's New Card
 * @author Tajjamul <tajzuman786@gmail.com>
 *
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions
} from 'react-native';
import { decodeHtml, decodeDate } from '../Config/CommonFunctions';
import HTMLView from 'react-native-htmlview';
import Images from './shared/Images';

class NewCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            Item: [],
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height
        }
        this.onLayout = this.onLayout.bind(this)
    }

    componentDidMount() {
        const { item } = this.props;
        this.setState({ Item: item })
    }

    onLayout() {
        this.setState({
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        });
    }

    render() {
        const { navigation } = this.props;
        let time = decodeDate(this.state.Item["Post Date"]);
        //define screen styles
        let cardWidth = "95%";
        let newTagFontSize = 12;
        let categoryFontSize = 14;
        let labelFontSize = 16;
        let footerMinHeight = 120;

        if (this.state.width >= 600 && this.state.height >= 600) {
            cardWidth = "47%";
            newTagFontSize = 18;
            categoryFontSize = 20;
            labelFontSize = 22;
            footerMinHeight = 180;
        }


        let cardStyle = StyleSheet.create({
            card: {
                width: cardWidth,
                marginHorizontal: 10,
                marginVertical: 10,
                alignSelf: "flex-start"
            },
            newTag: {
                backgroundColor: '#0099ff',
                paddingBottom: 1,
                color: '#ffffff',
                position: "absolute",
                zIndex: 9,
                width: 60,
                textAlign: "center",
                fontSize: newTagFontSize
            },
            cardImage: {
                width: "100%",
                height: '100%',
                objectFit: 'fill'
            },
            cardLabel: {
                fontSize: 14
            },
            cardFooter: {
                backgroundColor: '#ffffff',
                padding: 10,
                width: "100%",
                minHeight: footerMinHeight
            },
            category: {
                color: '#0099ff',
                fontSize: categoryFontSize,
                marginBottom: 5,
                fontWeight: "700"
            },
            date: {
                color: '#0099ff',
                fontSize: categoryFontSize,
                marginVertical: 5
            }
        });

        let HtmlStyle = StyleSheet.create({
            p: {
                fontSize: labelFontSize,
                color: "#000000"
            }
        })

        let title = "";
        if (this.state.Item.Title !== undefined) {
            title = decodeHtml(this.state.Item.Title)
        }

        let cat = "";
        if (this.state.Item.Category !== undefined) {
            cat = this.state.Item.Category
        }
        return (
            <TouchableWithoutFeedback
                style={cardStyle.card}
                onPress={() => navigation.navigate('WhatsNewDetail', { item: this.state.Item })}
            >
                <View
                    onLayout={this.onLayout}
                    style={cardStyle.card}>
                    <Text style={cardStyle.newTag}>NEW</Text>
                    <Images
                        source={this.state.Item["Image Thumb URL"]}
                    />
                    <View style={cardStyle.cardFooter}>
                        <Text style={cardStyle.category}>{cat.toString().toUpperCase()}</Text>
                        <HTMLView value={`<p>${title}</p>`} stylesheet={HtmlStyle} />
                        <Text style={cardStyle.date}>{time}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

}

export default NewCard;