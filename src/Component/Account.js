import React from "react";
import { Typography } from "antd";
import { RightOutlined,CustomerServiceFilled } from "@ant-design/icons";
import Profile from "../Images/Profile.png"
import {useNavigate} from "react-router-dom";
import {
  setPhoneNo,
} from "../Redux/Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";

const {Text} =Typography;

const Account = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const {
    openDrawer,
    phoneNo,
    name,
    email
  } = useSelector((state) => state.profile);

    
  return (
    <div
      style={{
        backgroundColor: "#4f4f4f14",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          backgroundColor: "#fff",
          overflow: "hidden",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        }}
      >
        {/* Gradient Header */}
        <div
          style={{
            backgroundImage: "linear-gradient(273deg, #ad2e41, #721053)",
            padding: "30px 20px",
            color: "#fff",
            height:"25%",
            display:"flex",
            justifyContent:"space-between",
            
          }}
        >
            
            <div style={{
                marginTop:65,
                cursor:"pointer"
            }} onClick={()=>{
                navigate("/editProfile")
            }}>
                <Text style={{ 
                    fontSize:"30px",color:"white",fontWeight:700
                 }}>{name}</Text>
                 <br/>
                 <Text style={{
                    fontSize:"16px",color:"white",fontWeight:400
                 }}>VIEW PROFILE</Text> <RightOutlined style={{
                    fontSize:"14px"
                 }}/>
            </div>
          <div style={{
                marginTop:50,
                
            }}>
                <img src="https://edge.ixigo.com/img/zeus/ixigoer.png?v=1.0" style={{
                    height:"100px",width:"100px",borderRadius:"50px"
                }}>
                </img>
          </div>
          
        </div>

        {/* Content Section */}
        <div style={{ padding: "20px" }}>
            <div style={{
                cursor:"pointer"
            }} onClick={()=>{
              navigate("/myTravellers")
            }}>
          <img src={Profile} style={{
            height:"30px"
          }}/><img src={Profile} style={{
            height:"23px",position:"relative",right:12,bottom:1
          }}/>
          <Text style={{
            position:"relative",bottom:6,fontSize:"20px"
          }}>Travellers</Text>
          </div>

          <hr style={{ margin: "10px 0", opacity: 0.3 }} />

          <div style={{
            gap:10,
            display:"flex",cursor:"pointer"
          }}>
         <CustomerServiceFilled style={{
            fontSize:"25px",color:"#ec5b24",position:"relative",left:5
         }}/>
          <Text style={{
            position:"relative",fontSize:"20px",left:18
          }}>Customer Service</Text>
          </div>

          <hr style={{ margin: "10px 0", opacity: 0.3 }} />


          <div
            style={{
              marginTop: 30,
              background: "#ec5b24",
              color: "#fff",
              padding: "12px",
              borderRadius: 8,
              textAlign: "center",
              cursor: "pointer",
              fontWeight: 500,
            }}
          onClick={()=>{
            dispatch(setPhoneNo(null))
            navigate("/")
          }}>
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
