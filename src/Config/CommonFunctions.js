/**
 * Copyright (c) 2020
 *
 * This file is like helping funtion of the application
 *
 * @summary helping functions
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-16 16:10:26 
 * Last modified  : 2020-10-02 11:42:16
 */


//Helping functions

//decode the Html from Raw

export const decodeHtml = value => {
    let decoded = value.replace(/&lt;/gmi, '<').replace(/&gt;/gmi, '>');
    decoded = decoded.replace(/(\r\n|\n|\r)/gm, "");
    return decoded;
}

//Decode the timestamp

export const decodeDate = timestamp => {
    let time = new Date(timestamp * 1000);
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = months[time.getMonth()];
    let date = time.getDate();
    time = month + ' ' + date;
    return time;
}