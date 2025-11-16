import React from "react";
import { Tabs,Row,Col,Card } from "antd";

const { TabPane } = Tabs;

const FlightTabs = () => {

    const tabItems=[
        {
            id:1,
            name:"Popular Flight Routes",
            Destination:[
                {from:"Pune",to:"Kolkata"},
                {from:"Patna",to:"Bengaluru"},
                {from:"Varanasi",to:"Bengaluru"},
                {from:"Jammu",to:"Srinagar"},
                {from:"Hyderabad",to:"Tirupati"},
                {from:"Mumbai",to:"Ayodhya"},
                {from:"Guwahati",to:"Kolkata"},
                {from:"New Delhi",to:"Lucknow"},
                {from:"New Delhi",to:"Darbhanga"},
                {from:"Mumbai",to:"Gorakhpur"},
                {from:"Mumbai",to:"Bagdogra"},
                {from:"Mumbai",to:"Kochi"},
                {from:"New Delhi",to:"Kochi"},
                {from:"Kochi",to:"New Delhi"},
                {from:"Indore",to:"New Delhi"},
                {from:"Jaipur",to:"Mumbai"},
                {from:"Bhubaneswar",to:"Bengaluru"},
                {from:"Bengaluru",to:"Gorakhpur"},
                {from:"Bengaluru",to:"Kochi"},
                {from:"Ahmedabad",to:"Kolkata"},
            ]
        },
        {
            id:2,
            name:"Top Flight Routes",
            topDestination:[
                {from:"Srinagar",to:"Jammu"},
                {from:"Mumbai",to:"Guwahati"},
                {from:"Bengaluru",to:"Dubai"},
                {from:"New Delhi",to:"Raipur"},
                {from:"Hyderabad",to:"Vishakhapatnam"},
                {from:"Bengaluru",to:"Ranchi"},
                {from:"Darbhanga",to:"New Delhi"},
                {from:"Ghaziabad",to:"Bengaluru"},
                {from:"Agartala",to:"Kolkata"},
                {from:"Nagpur",to:"Mumbai"},
                {from:"Mumbai",to:"Bhubaneswar"},
                {from:"Lucknow",to:"New Delhi"},
                {from:"Darbhanga",to:"Mumbai"},
                {from:"Raipur",to:"New Delhi"},
                {from:"New Delhi",to:"Leh"},
                {from:"Port Blair",to:"Kolkata"},
                {from:"Mumbai",to:"Nagpur"},
                {from:"Hyderabad",to:"Varanasi"},
                {from:"Kochi",to:"Bengaluru"},
                {from:"Bengaluru",to:"Chandigarh"},
            ]
        }
    ]

  return (
    <Tabs defaultActiveKey="1" >
      {tabItems.map((item) => (
        <TabPane tab={<span
        style={{
          fontSize:"16px",
          fontWeight:600,
          fontFamily:"Roboto"
        }}>
          {item.name}
        </span>} key={item.id}>
          {item.Destination && (
            <Row gutter={[24, 24]} justify="center" style={{
              rowGap:"12px"
            }}>
              {item.Destination.map((route, index) => (
                <Col key={index} xs={24} sm={20} md={16} lg={4.8} xl={4.8}
                 style={{ flex: "1 1 18%" }}>
                    <Card.Grid style={{
                      fontWeight:500,
                      fontFamily:"Roboto",
                      color:"#4a4848ff",
                      fontSize:"14px"
                    }}>
                   {route.from} to {route.to} Flights
                   </Card.Grid>
                </Col>
              ))}
            </Row>
          )}

          {item.topDestination && (
            <Row gutter={[24, 24]}  style={{
              rowGap:"12px"
            }}>
              {item.topDestination.map((route, index) => (
                <Col key={index} xs={24} sm={20} md={16} lg={4.8} xl={4.8}
                 style={{ flex: "1 1 18%" }}>
                    <Card.Grid style={{
                      fontWeight:500,
                      fontFamily:"Roboto",
                      color:"#4a4848ff",
                      fontSize:"14px"
                    }}>
                   {route.from} to {route.to} Flights
                   </Card.Grid>
                </Col>
              ))}
              
            </Row>
          )}
        </TabPane>
      ))}
    </Tabs>
    
  );
};

export default FlightTabs;
