/**
 * Copyright (c) 2020
 *
 * Favorite Products Screens
 * it shows data from local storage by using Database file
 *
 * @summary Favorite list
 * @author Tajjamul <tajzuman786@gmail.com>
 *
 */

import React, { Component } from 'react';
import Header from '../Components/Header';
import ScreenBackground from '../Components/ScreenBackground';
import FavorteList from '../Components/FavoriteList';


export default class Favorite extends Component {
    render() {
        return (
            <ScreenBackground>
                <Header {...this.props} screenTitle="Favorites" />
                <FavorteList {...this.props} />
            </ScreenBackground>
        )
    }
}