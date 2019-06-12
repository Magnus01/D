import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";


// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import $ from "jquery";

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";






var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://diggit.eu.auth0.com/oauth/token",
    "method": "POST",
    "headers": {
        "content-type": "application/json"
    },
    "data": "{\"client_id\":\"L1vxfHYBsDFzE5YJr2GAoJvtV2GAnvzY\",\"client_secret\":\"rUOO2bCyCvBIc1uHgIsXb_w3g1OjEPK9oI5BclHREQ01nVkOumw1ULCl8hF4cWop\",\"audience\":\"https://diggit.eu.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}"
}

var settings_getusers = {
    "async": true,
    "crossDomain": true,
    "url": "https://diggit.eu.auth0.com/api/v2/users?per_page=100&page=0&include_totals=true",
    "method": "GET",
    "headers": {
        "authorization": "Bearer \"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5FSXhOVFZHTnpnM1FrSTVSRVU0UkRKRlJUWXdOME5CUWtSQ1FqTkJOams0UWtKRk0wWXhRZyJ9.eyJpc3MiOiJodHRwczovL2RpZ2dpdC5ldS5hdXRoMC5jb20vIiwic3ViIjoiTDF2eGZIWUJzREZ6RTVZSnIyR0FvSnZ0VjJHQW52ellAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGlnZ2l0LmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTQ3OTk3MDgzLCJleHAiOjE1NDgwODM0ODMsImF6cCI6IkwxdnhmSFlCc0RGekU1WUpyMkdBb0p2dFYyR0FudnpZIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.uSxyaAZjQ4wPAupD12Q3wJbfGgL4stA1vxvQPBoYYkFuqlPv-hru8kcDDhPi7KiOY0im-bBaibYHVEmBywartu61U4HP_EkW3S-erRxRaYllGapH-K92LtjJ4lIPSPrEMAd48CgGyojQ6iWtSRclXtsh9l2k0BTtjDCp1w1lj7gjyNa5zdrqx7MUigGJKtp4w3YUUtKgMsJw6sHbaX69vBYWP_rlLphaqgwjQVimx-dT6-X2k-uAuCnaV_5qCKRYNn89e9lafzSmFlzq1WX3_iKBWFD4jxzFNf2kVzs5wbNUvr3YmSFRPAJh5VTaMlIXgw332xWniWhpkXHo15nJhg",
    }
}


// function fetchGroups(url, cb, data) {
//     if(!data) data = [];

//     $.ajax({

//         dataType:'jsonp',
//         method:'get',
//         url:url,
//         success:function(result) {
//             console.log(url + result+' results');
//             console.dir(result);
//             //add to data
//             data.push.apply(data, result.data);
//             if(result.meta.next_link) {
//                 var nextUrl = result.meta.next_link;
//                 fetchGroups(nextUrl, cb, data);
//             } else {

//                 cb(data);
//             }
//         }
//     });

// }

// const  API_KEY   = 'Bearer 2TMZZ4XNWIQBIIYSW2C5';
const  API_KEY   = '2TMZZ4XNWIQBIIYSW2C5';
const  API_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const  API_URL2 = 'https://www.eventbriteapi.com/v3/events/53180953664/orders/expand=attendees/';
// const  API_URL_sales = "https://www.eventbriteapi.com/v3/reports/sales?event_ids=53180953664&start_date=&end_date=&filter_by=&group_by=&period=&date_facet=&timezone=Norway%2FOslo"
const  API_URL_sales = "https://www.eventbriteapi.com/v3/reports/sales?event_ids=53180953664"
const  API_URL_sales2 = "/v3/reports/sales/?event_ids=53180953664&token=2TMZZ4XNWIQBIIYSW2C5"

const  API_URL_sales3 ="https://www.eventbriteapi.com/v3/reports/sales/?event_ids=53180953664&token=2TMZZ4XNWIQBIIYSW2C5"
const  User_Url ="https://diggitapi.com:3030/api/getusers"
var count = 0;

var accesstoken = ''
class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            dataUser: [],
            datatime: [],
            count: [],
            access_token: '',
            city: '',
            event: '',
            Bool: false,
            Bool_User: false,
            Bool_Parse: false,
            value: 0,
            ourdatas:  {},
            ourdata3:  {
                labels: [1,2, 3, 4, 5, 6, 7],
                series: [[0, 0, 0, 9, 12, 12, 12]]
            }
        }
    }

    componentDidMount() {
        // this.getSearch('hackathon');
        // this.getUsers();
        $.ajax(settings).done(function (response) {
            // alert(response.access_token)
            accesstoken = response.access_token
            console.log(accesstoken)
            // this.setState({
            //     access_token: response.access_token
            // })

        });

    //    if ( accesstoken.length >0 ) {
        accesstoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5FSXhOVFZHTnpnM1FrSTVSRVU0UkRKRlJUWXdOME5CUWtSQ1FqTkJOams0UWtKRk0wWXhRZyJ9.eyJpc3MiOiJodHRwczovL2RpZ2dpdC5ldS5hdXRoMC5jb20vIiwic3ViIjoiTDF2eGZIWUJzREZ6RTVZSnIyR0FvSnZ0VjJHQW52ellAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGlnZ2l0LmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTU1MzM5NDE5LCJleHAiOjE1NTU0MjU4MTksImF6cCI6IkwxdnhmSFlCc0RGekU1WUpyMkdBb0p2dFYyR0FudnpZIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.p7qu7THxmR--BW8P0bZtJmZiqltsKi4aWK-Hytumq-ThvCKn-XZdvh-Qnc0dnqhAdIAdut_UUNHglkS4_2AFePMXHtSsh5oyB9e6KyOHuntvOKcugeSJ0Scl5j9W9_T0Ne6MXpdPG6TLaNlGUIo56-kwXQJw-i3dUllQvDL5GOXfIQayW0mT2EellmXN49KineI8VXDojlNGO5556XYltRMFl-ZWcP1Nw1Juql74AI9aAgLsplBQ4aGECqaPe9UjlVaAK2_1cHlIsuLkkNULPM2Soidm-RGZfkyJ7pSt2RJW-_xre9-rv-3hzmuX-aT9NB8MpQwfE1hN5cXYosm8Lw";
        this.getUsers(count, accesstoken);
        // this.getNews();
        this.getUsers(count+1,accesstoken);
        this.getUsers(count+2,accesstoken);
        this.getUsers(count+3,accesstoken);
        this.getUsers(count+4,accesstoken);
        // this.fetchGroupsMeetup();
        // $.ajax(settings_getusers).done(function (response) {
    //    }



    }

    // componentWillReceiveProps(nextProps, nextContext) {


    //     if ( accesstoken.length >0 ) {
    //         alert('start')
    //         this.getUsers(count, accesstoken);
    //         this.getNews();
    //         this.getUsers(count+1);
    //         this.getUsers(count+2);
    //         this.getUsers(count+3);
    //         this.fetchGroupsMeetup();
    //         // $.ajax(settings_getusers).done(function (response) {
    //     }



    // }

    // fetchGroupsMeetup(){
    //    let url = "https://api.meetup.com/pro/learncuttingedge/groups?key=6465423068406245784b4770691b3e65&sign=true&photo-host=public&page=20"
    //     fetchGroups(url, function(res) {
    //         console.log("totally done");
    //         console.dir(res);

    //         var s = 0
    //         for(var i=0;i<res.length; i++) {
    //             var group = res[i];
    //             s += parseInt(group.member_count);
    //             // s += "<h2>"+(i+1)+" <a href='"+group.link+"'>"+group.name+"</a></h2>";
    //             // if(group.group_photo && group.group_photo.thumb_link) {
    //             //     s += "<img src=\"" + group.group_photo.thumb_link + "\" align=\"left\">";
    //             // }
    //             // s += "<p>Location: "+group.city + ", " + group.state + " " + group.country + "</p><br clear=\"left\">";
    //         }
    //         // alert(s)


    //     });
    // }
    // fetchMembersMeetup(){
    //    let url = "https://api.meetup.com/2/profiles?offset=0?key=6465423068406245784b4770691b3e65&format=json&group_urlname=meetup-group-sFORrjNo&photo-host=public&order=visited&sig_id=250898887&sig=9444223fcea284107ccc8beb74e06d21b2b9edc0\n"
    //     fetchGroups(url, function(res) {
    //         console.log("totally done");
    //         console.dir(res);
    //         // alert(res)
    //         // var s = 0
    //         // for(var i=0;i<res.length; i++) {
    //         //     var group = res[i];
    //         //     s += parseInt(group.member_count);
    //         //     // s += "<h2>"+(i+1)+" <a href='"+group.link+"'>"+group.name+"</a></h2>";
    //         //     // if(group.group_photo && group.group_photo.thumb_link) {
    //         //     //     s += "<img src=\"" + group.group_photo.thumb_link + "\" align=\"left\">";
    //         //     // }
    //         //     // s += "<p>Location: "+group.city + ", " + group.state + " " + group.country + "</p><br clear=\"left\">";
    //         // }
    //         // alert(s)


    //     });
    // }


    getSearch(category) {

            fetch(API_URL_sales3, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((resJson) => {


                    this.setState({
                        dataSource: resJson
                    })
                    this.setState({
                        Bool: true
                    })
                })
    }


 

    getUsers(pageNumber, accesstoken) {
        // alert(accesstoken)
        let access = "Bearer " + accesstoken;
        fetch(`https://diggit.eu.auth0.com/api/v2/users?per_page=100&page=${pageNumber}&include_totals=true`, {
            method: 'GET',
            headers: {
                "authorization": access,
            }
        })
            .then((res) => res.json())
            .then((resJson) => {
                this.setState({
                    dataUser: this.state.dataUser.concat(resJson.users)
                })
                if (resJson.users ) {
                if (resJson.users.length != 100) {
                this.setState({
                    Bool_User: true
                })
                    this.parseUsers()
                }
                }

            })
        console.log(this.state.dataUser, 'this.state.user');

    }
    parseUsers() {
        var xAxis = []
        var xAxisReal = []
        var yAxis = []
        var myCount = 0
        console.log(this.state.dataUser, 'this.state.dataUser')
        let series =  this.state.dataUser.map((val, i) => {
            var mySubString = val.created_at.substring(5, 7)
            xAxis.push(mySubString);
            if (i != 0) {
                // yAxis.push(mySubString);
                //

                console.log(xAxis[i], 'yAxis-1')
                console.log(xAxis[i-1], 'yAxis[i-2]')

                if (xAxis[i] !== xAxis[i-1]) {

                    xAxisReal.push(mySubString);
                    console.log(xAxisReal, 'xAxisReal')
                    // myCount = 1;
                    yAxis.push(myCount)
                }
                else {
                        //if there is a match
                        //add count ot the array
                    myCount++;

                    yAxis[xAxisReal.length] = myCount;

                    console.log(yAxis, 'yAxis');
                }
            }
            return mySubString

            // return datatimeArray.push(val.created_at)
        });
        let labels =  this.state.dataUser.map((val, i) => {
            var mySubString = val.created_at.substring(5, 7)
            // datatimeArray.push(mySubString)
            return mySubString
            // return datatimeArray.push(val.created_at)
        });




        var sum = yAxis.reduce((a, b) => a + b, 0);
        console.log(sum, 'TOTAL SUM'); // 6
        console.log(series, 'series')
        this.sliceLabels(xAxisReal,[yAxis]    );


    }

    sliceLabels(labels, series) {
        // var labels3 = labels.slice(Math.max(labels.length - 7, 1))
        // let labels = labeltoSlice.slice(0, 6)
        // let serie = seriestoSlice[0].slice(0,6)
        // let series = [serie]

        this.setState({
            ourdatas: {series,labels }
        });


        console.log(this.state.ourdatas, 'ourdatas')
        console.log(this.state.ourdata3, 'ourdata3')
         this.setState({

             Bool_Parse: true
         })

    }



    handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  
  render() {
    const { classes } = this.props;

   var array = []
 
    if (this.state.Bool == true && this.state.Bool_Parse == true && accesstoken.length >0)
    alert('hi')
    // if (  this.state.Bool_Parse == true && accesstoken.length >0)
    {

      array.push(
          <div>
            <GridContainer>
              <GridItem xs={12} sm={6} md={3}>
                  <Card>
                      <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                              <Icon>content_copy</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>Number Users</p>
                          <h3 className={classes.cardTitle}>
                              {this.state.dataUser.length} <small></small>
                          </h3>
                      </CardHeader>
                      <CardFooter stats>
                          <div className={classes.stats}>
                              <Danger>
                                  <Warning />
                              </Danger>
                              <a href="#pablo" onClick={e => e.preventDefault()}>
                                  Tracked from Auth0
                              </a>
                          </div>
                      </CardFooter>
                  </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                  <Card>
                      <CardHeader color="success" stats icon>
                          <CardIcon color="success">
                              <Store />
                          </CardIcon>
                          <p className={classes.cardCategory}>Revenue</p>
                          {/* <h3 className={classes.cardTitle}>{this.state.dataSource.totals.net}NOK</h3> */}
                      </CardHeader>
                      <CardFooter stats>
                          <div className={classes.stats}>
                              <DateRange />
                              Current undisclosed
                          </div>
                      </CardFooter>
                  </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                  <Card>
                      <CardHeader color="danger" stats icon>
                          <CardIcon color="danger">
                              <Icon>info_outline</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>Emails Sent</p>
                          <h3 className={classes.cardTitle}>230</h3>
                      </CardHeader>
                      <CardFooter stats>
                          <div className={classes.stats}>
                              <LocalOffer />
                              Tracked from Mailchimp
                          </div>
                      </CardFooter>
                  </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                  <Card>
                      <CardHeader color="info" stats icon>
                          <CardIcon color="info">
                              <Accessibility />
                          </CardIcon>
                          <p className={classes.cardCategory}>Subscription List</p>
                          <h3 className={classes.cardTitle}>+245</h3>
                      </CardHeader>
                      <CardFooter stats>
                          <div className={classes.stats}>
                              <Update />
                              Tracked from mailchimp
                          </div>
                      </CardFooter>
                  </Card>
              </GridItem>
          </GridContainer>
          <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
        <Card chart>
    <CardHeader color="success">
        <ChartistGraph
        className="ct-chart"
        data={this.state.ourdatas}
        type="Line"
        options={dailySalesChart.options}
        listener={dailySalesChart.animation}
        />
    </CardHeader>
    <CardBody>
    <h4 className={classes.cardTitle}>User Growth</h4>
        <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 10%
                  </span>{" "}
            increase in this month.
        </p>
        </CardBody>
        <CardFooter chart>
            <div className={classes.stats}>
                <AccessTime /> Tracked from Auth0
            </div>
        </CardFooter>
        </Card>
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
        <Card chart>
    <CardHeader color="warning">
        <ChartistGraph
        className="ct-chart"
        data={emailsSubscriptionChart.data}
        type="Bar"
        options={emailsSubscriptionChart.options}
        responsiveOptions={emailsSubscriptionChart.responsiveOptions}
        listener={emailsSubscriptionChart.animation}
        />
    </CardHeader>
    <CardBody>
    <h4 className={classes.cardTitle}>Email Subscriptions</h4>
        <p className={classes.cardCategory}>
            Last Campaign Performance
        </p>
        </CardBody>
        <CardFooter chart>
            <div className={classes.stats}>
                <AccessTime /> tracked from eventbrite
            </div>
        </CardFooter>
        </Card>
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
        <Card chart>
    <CardHeader color="danger">
        <ChartistGraph
        className="ct-chart"
        data={completedTasksChart.data}
        type="Line"
        options={completedTasksChart.options}
        listener={completedTasksChart.animation}
        />
    </CardHeader>
    <CardBody>
    <h4 className={classes.cardTitle}>Bootcamp Page Views</h4>
        <p className={classes.cardCategory}>
            Last Campaign Performance
        </p>
        </CardBody>
        <CardFooter chart>
            <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
            </div>
        </CardFooter>
        </Card>
    </GridItem>
    </GridContainer>
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <CustomTabs
                    title="Major Meetings"
                    headerColor="primary"
                    tabs={[
                        {
                            tabName: "Calendar",
                            tabIcon: BugReport,
                            tabContent: (
                                <Tasks
                                    checkedIndexes={[0, 3]}
                                    tasksIndexes={[0, 1, 2, 3]}
                                    tasks={bugs}
                                />
                            )
                        }
                    ]}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <Card>
                    <CardHeader color="warning">
                        <h4 className={classes.cardTitleWhite}>Bootcamp Students</h4>
                        <p className={classes.cardCategoryWhite}>
                            Tracked from Hubspot
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="warning"
                            tableHead={["ID", "Name", "Salary", "Country"]}
                            tableData={[
                                ["1", "Leila Reid", "$450", "Norway"],
                                ["2", "Halvord Vinger", "$900", "Norway"],
                                ["3", "David Correias", "$900", "Norway"],
                                ["4", "Tomas Pujanauskas", "$450", "Norway"]
                            ]}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
          </div>
      )
    }


    return (
      <div>
          {array}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
