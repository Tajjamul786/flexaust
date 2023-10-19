/**
 * Copyright (c) 2020
 *
 * Whats New Detail
 * Shows the data pass to the screen in the props
 *
 * @summary Whats New
 * @author Tajjamul <tajzuman786@gmail.com>
 *
 */

import React, { Component, createRef } from 'react';
import {
    Alert,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Linking,
    Platform,
    Image
} from 'react-native';
import ScreenBackground from '../Components/ScreenBackground';
import Header from "../Components/Header";
import { decodeHtml, decodeDate } from '../Config/CommonFunctions';
import { WEBURL } from "../Config/config";
import HTMLView from 'react-native-htmlview';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { addProduct, productById, deleteProduct, getRateById, addRating } from '../Config/DataBase';
import Images, { LargeImages } from '../Components/shared/Images';

export default class WhatsNewDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            favorite: false,
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height
        }
        this.scrollRef = createRef();
        this.onLayout = this.onLayout.bind(this)
    }

    componentDidMount() {
        //check and change the component data on changing view
        const { navigation } = this.props;
        navigation.addListener('focus', () => {

            const { item } = this.props.route.params
            this.setState({
                rating: 0,
                favorite: false
            })
            //Scroll to top
            this.scrollRef.current?.scrollTo({
                y: 0,
                x: 0,
                animated: true,
            });
            getRateById(item["Post ID"], "article").then(rate => {
                if (rate) {
                    this.setState({ ...this.state, rating: rate })
                }
            })
            //check if the product is favorite
            productById(item["Post ID"], "article").then(res => {
                if (res) {
                    this.setState({ ...this.state, favorite: true })
                } else {
                    this.setState({ ...this.state, favorite: false })
                }
            }).catch(err => {
                this.setState({ ...this.state, favorite: false })
            })
        })
    }
    // Change View on changing orientation
    onLayout(e) {
        this.setState({
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
        });
    }
    //Open the External link
    async openLink(targeturl) {
        const supported = await Linking.canOpenURL(targeturl.toString());
        if (supported) {
            await Linking.openURL(targeturl.toString())
        } else {
            Alert.alert("Can't Open the URL")
        }

    }
    //Share Function
    async shareItem() {
        const { item } = this.props.route.params

        try {

            let url = "mailto:";

            // Create email link query
            let breakCharacter = Platform.OS == 'ios' ? "<br/><br/>" : "%0A%0A";
            let subject = decodeHtml(item.Title).replace(/<[^>]*>/g, '');
            let body = "Sent from Flexaust App " + breakCharacter + decodeHtml(item["Title"]).replace(/<[^>]*>/g, '') + breakCharacter + "Read more here: " + WEBURL;
            let eql = Platform.OS == 'ios' ? "?p=" : "?p%3D";
            body = body + eql + item["Post ID"];
            body = Platform.OS == 'ios' ? body.replace('&', '%26') : body.replace('&amp;', '%26');
            url = url + "?Content-type=text/html&subject=" + subject + "&body=" + body;

            // check if we can use this link
            const canOpen = await Linking.canOpenURL(url);

            if (!canOpen) {
                throw new Error("Could not share the article");
            }
            return Linking.openURL(url);

        } catch (err) {
            console.log(err)
            Alert.alert(err)
        }


    }

    //Show the rating of the function

    showRating() {
        const { item } = this.props.route.params
        const { rating } = this.state;
        let stars = 5;
        let element = []
        for (let i = 1; i <= stars; i++) {
            if (rating <= stars && i <= rating) {
                element.push(
                    <TouchableWithoutFeedback key={i}
                        onPress={() => {
                            addRating(item["Post ID"], "article", i)
                            this.setState({ rating: i })
                        }}
                    >
                        <Image
                            source={require('../assets/images/detail/icon-star-yellow.png')}
                            style={{
                                height: 20,
                                width: 20,
                                marginRight: 5
                            }}
                        />
                    </TouchableWithoutFeedback>
                )
            } else {
                element.push(
                    <TouchableWithoutFeedback key={i}
                        onPress={() => {
                            addRating(item["Post ID"], "article", i)
                            this.setState({ rating: i })
                        }}
                    >
                        <Image
                            source={require('../assets/images/detail/icon-star-gray.png')} style={{
                                height: 20,
                                width: 20,
                                marginRight: 5
                            }}
                        />
                    </TouchableWithoutFeedback>
                )
            }
        }
        return element
    }



    render() {

        const { item } = this.props.route.params
        const { navigation } = this.props;
        let title = "";
        if (item.Title !== undefined) {
            title = decodeHtml(item.Title)
        }
        let content = "";
        if (item.Content !== undefined) {
            content = decodeHtml(item.Content)
        }
        let time = "";
        if (item["Post Date"] !== undefined) {
            time = decodeDate(item["Post Date"])
        }
        let cat = "";
        if (item.Category !== undefined) {
            cat = item.Category
        }

        //define screen styles
        let newTagFontSize = 12;
        let categoryFontSize = 14;
        let TitleFontSize = 18;
        let StrongFontSize = 16;
        let paraFontSize = 14;
        let paralineHeight = 20;
        if (this.state.width >= 600 && this.state.height >= 600) {
            newTagFontSize = 16;
            categoryFontSize = 20;
            TitleFontSize = 25;
            StrongFontSize = 22;
            paraFontSize = 18;
            paralineHeight = 25;
        }

        let detailStyle = StyleSheet.create({
            container: {
                flex: 1,
                width: "100%",
                paddingTop: 15,
                paddingHorizontal: 15,
                backgroundColor: '#ffffff'
            },
            newTag: {
                backgroundColor: '#0099ff',
                paddingBottom: 1,
                color: '#ffffff',
                position: "absolute",
                zIndex: 9,
                width: 60,
                textAlign: "center",
                fontSize: newTagFontSize,
                top: 0,
                left: 0
            },
            image: {
                width: "100%",
                height: 200,
                objectFit: 'fill',
                alignSelf: "center"
            },
            category: {
                color: '#0099ff',
                fontSize: categoryFontSize,
                marginBottom: 5,
                fontWeight: "700",
                alignSelf: "flex-start",
                marginTop: 10
            },
            date: {
                color: '#666667',
                fontSize: categoryFontSize,
                marginVertical: 5,
                marginVertical: 15
            },
            actionSheet: {
                backgroundColor: '#efefef',
                marginTop: 20,
                paddingVertical: 10
            },
            actionBtns: {
                flexDirection: "row",
                padding: 5,
                paddingVertical: 10,
                marginHorizontal: 10,
                borderBottomColor: "#cccccc",
                borderBottomWidth: 1
            },
            actionBtnsNoBorder: {
                flexDirection: "row",
                padding: 5,
                marginHorizontal: 10
            },
            actionIcon: {
                height: 20,
                width: 20,
                alignSelf: "center",
                marginRight: 12,
            },
            actionIconQ: {
                height: 22,
                width: 25,
                alignSelf: "center",
                marginRight: 5
            }
        })
        let HtmlStyle = StyleSheet.create({
            p: {
                fontSize: paraFontSize,
                textAlign: "left",
                fontWeight: "normal",
                lineHeight: paralineHeight,
                color: '#333333'
            },
            h2: {
                fontSize: StrongFontSize,
                fontWeight: "700",
                color: '#333333'
            },
            strong: {
                fontSize: StrongFontSize,
                fontWeight: "700",
                color: '#333333'
            },
            ul: {
                paddingLeft: 20,
            }
        })
        let headingHtml = StyleSheet.create({
            p: {
                fontSize: TitleFontSize,
                color: '#333333'
            }
        })

        return (
            <ScreenBackground>
                <Header {...this.props} screenTitle={"What's New"} />
                <View
                    onLayout={this.onLayout}
                    style={detailStyle.container}>
                    <ScrollView
                        ref={this.scrollRef}
                    >
                        <Text style={detailStyle.newTag}>NEW</Text>

                        <LargeImages
                            source={item["Image Large URL"]}
                        />
                        <Text style={detailStyle.category}>{cat.toString().toUpperCase()}</Text>

                        <HTMLView value={`<p>${title}</p>`} stylesheet={headingHtml} />
                        <Text style={detailStyle.date}>{time}</Text>
                        <HTMLView
                            onLinkPress={url => {
                                url = url.replace(/['"]+/g, '');
                                navigation.navigate('AppLinks', { PageURL: url });
                                // this.openLink(url)
                            }}
                            value={`${content}`}
                            stylesheet={HtmlStyle}
                            renderNode={(node, index, siblings, parent, defaultRenderer) => {
                                if (node.name == 'li') {
                                    return (
                                        <View key={index} style={{ marginTop: index === 0 ? 10 : 0 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flexDirection: 'column', marginLeft: 20, width: 15 }}>
                                                    <Text style={{ fontSize: paraFontSize, fontWeight: "700", color: "#000000" }}>{'\u2022'}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'column', width: '90%' }}>
                                                    <Text style={{ fontSize: paraFontSize, color: '#333333', color: "#000000" }}>{defaultRenderer(node.children, parent)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                } else if (node.name == 'ul') {
                                    return (
                                        <View key={index} style={{ marginTop: -30, marginBottom: 10 }}>
                                            {defaultRenderer(node.children, parent)}
                                        </View>
                                    );
                                }
                            }}
                        />

                        <View style={detailStyle.actionSheet}>

                            <View style={{
                                flexDirection: "row",
                                padding: 5,
                                marginHorizontal: 10,
                                borderBottomColor: "#cccccc",
                                borderBottomWidth: 1
                            }}>
                                {this.showRating()}
                                <Text
                                    style={{
                                        fontSize: newTagFontSize,
                                        marginLeft: 20,
                                        color: '#666666'
                                    }}
                                >Rate this article</Text>
                            </View>

                            <TouchableWithoutFeedback
                                onPress={() => {
                                    if (!this.state.favorite) {
                                        addProduct(item["Post ID"], "article", JSON.stringify(item)).then(() => {

                                            this.setState({ ...this.state, favorite: true })
                                        }).catch(err => {
                                            Alert.alert('Failed to add please try again')
                                        })
                                    } else {
                                        deleteProduct(item["Post ID"], "article").then(() => {
                                            this.setState({ ...this.state, favorite: false })
                                        }).catch(err => {
                                            Alert.alert('Failed to remove please try again')
                                        })
                                    }
                                }}
                                style={detailStyle.actionBtns}
                            >
                                <Image
                                    source={require('../assets/images/detail/icon-favorites-gray.png')}
                                    style={detailStyle.actionIcon}
                                />
                                <Text
                                    style={{
                                        fontSize: newTagFontSize,
                                        color: '#666666'
                                    }}
                                >{
                                        this.state.favorite == true ?
                                            "Remove from Favorites"
                                            :
                                            "Add to Favorites"
                                    }</Text>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.shareItem()
                                }}
                                style={detailStyle.actionBtnsNoBorder}
                            >
                                <Image
                                    source={require('../assets/images/detail/icon-forward.png')}
                                    style={{ ...detailStyle.actionIcon, height: 15, width: 23 }}
                                />
                                <Text
                                    style={{
                                        fontSize: newTagFontSize,
                                        color: '#666666'
                                    }}
                                >Forward</Text>
                            </TouchableWithoutFeedback>

                        </View>


                    </ScrollView>

                </View>

            </ScreenBackground>
        )
    }

}
