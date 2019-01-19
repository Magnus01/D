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
    "url": "https://www.eventbriteapi.com/v3/reports/sales?event_ids=53180953664&event_status=live&start_date=&end_date=&filter_by=&group_by=&period=&date_facet=&timezone=Norway%2FOslo",
    "method": "GET",
    "headers": {
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9,nb-NO;q=0.8,nb;q=0.7,no;q=0.6,nn;q=0.5,ko;q=0.4",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
        "authorization": "Bearer 2TMZZ4XNWIQBIIYSW2C5",
        "cache-control": "no-cache",
        "postman-token": "7c16bc19-be56-08d5-e650-eb19688d8d7f"
    }
}

// const  API_KEY   = 'Bearer 2TMZZ4XNWIQBIIYSW2C5';
const  API_KEY   = '2TMZZ4XNWIQBIIYSW2C5';
const  API_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const  API_URL2 = 'https://www.eventbriteapi.com/v3/events/53180953664/orders/expand=attendees/';
// const  API_URL_sales = "https://www.eventbriteapi.com/v3/reports/sales?event_ids=53180953664&start_date=&end_date=&filter_by=&group_by=&period=&date_facet=&timezone=Norway%2FOslo"
const  API_URL_sales = "https://www.eventbriteapi.com/v3/reports/sales?event_ids=53180953664"
const  API_URL_sales2 = "/v3/reports/sales/?event_ids=53180953664&token=2TMZZ4XNWIQBIIYSW2C5"

const  API_URL_sales3 ="https://www.eventbriteapi.com/v3/reports/sales/?event_ids=53180953664&token=2TMZZ4XNWIQBIIYSW2C5"
const  User_Url ="https://diggitapi.com:3030/api/getusers"


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            dataUser: [],
            city: '',
            event: '',
            Bool: false,
            Bool_User: false,
            value: 0,
            ourdata:  {
                labels: ["1", "2", "3", "4", "5", "6", "7"],
                series: [[0, 0, 0, 9, 12, 12, 12]]
            }
        }
    }
    componentDidMount() {
        this.getSearch('hackathon');
        this.getUsers();
    }

    getSearch(category) {

            fetch(API_URL_sales3, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log(resJson);

                    this.setState({
                        dataSource: resJson
                    })
                    this.setState({
                        Bool: true
                    })
                })
    }

    getUsers() {

        fetch(User_Url, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson);

                this.setState({
                    dataUser: resJson
                })
                this.setState({
                    Bool_User: true
                })
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
    if (this.state.Bool==true) {
      console.log(this.state.dataSource)
    }
   var array = []
    if (this.state.Bool == true)
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
                              293 <small></small>
                          </h3>
                      </CardHeader>
                      <CardFooter stats>
                          <div className={classes.stats}>
                              <Danger>
                                  <Warning />
                              </Danger>
                              <a href="#pablo" onClick={e => e.preventDefault()}>
                                  Get more space
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
                          <h3 className={classes.cardTitle}>{this.state.dataSource.totals.net}NOK</h3>
                      </CardHeader>
                      <CardFooter stats>
                          <div className={classes.stats}>
                              <DateRange />
                              Last 24 Hours
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
                              Tracked from Github
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
                              Just Updated
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
        data={this.state.ourdata}
        type="Line"
        options={dailySalesChart.options}
        listener={dailySalesChart.animation}
        />
    </CardHeader>
    <CardBody>
    <h4 className={classes.cardTitle}>Daily Sales</h4>
        <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
            increase in today sales.
        </p>
        </CardBody>
        <CardFooter chart>
            <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
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
                <AccessTime /> campaign sent 2 days ago
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
                    title="Tasks:"
                    headerColor="primary"
                    tabs={[
                        {
                            tabName: "Bugs",
                            tabIcon: BugReport,
                            tabContent: (
                                <Tasks
                                    checkedIndexes={[0, 3]}
                                    tasksIndexes={[0, 1, 2, 3]}
                                    tasks={bugs}
                                />
                            )
                        },
                        {
                            tabName: "Website",
                            tabIcon: Code,
                            tabContent: (
                                <Tasks
                                    checkedIndexes={[0]}
                                    tasksIndexes={[0, 1]}
                                    tasks={website}
                                />
                            )
                        },
                        {
                            tabName: "Server",
                            tabIcon: Cloud,
                            tabContent: (
                                <Tasks
                                    checkedIndexes={[1]}
                                    tasksIndexes={[0, 1, 2]}
                                    tasks={server}
                                />
                            )
                        }
                    ]}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <Card>
                    <CardHeader color="warning">
                        <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                        <p className={classes.cardCategoryWhite}>
                            New employees on 15th September, 2016
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="warning"
                            tableHead={["ID", "Name", "Salary", "Country"]}
                            tableData={[
                                ["1", "Dakota Rice", "$36,738", "Niger"],
                                ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                                ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                                ["4", "Philip Chaney", "$38,735", "Korea, South"]
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
