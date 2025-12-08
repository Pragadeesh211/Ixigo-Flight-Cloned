import React,{useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { LeftOutlined,DownOutlined, PlusCircleFilled, EditFilled } from "@ant-design/icons";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration";
import { setDobCheckValue } from "../Redux/Slices/TravellerSlice";
dayjs.extend(duration);

const {Text} = Typography;

const MyTravellers = () =>{
    const navigate = useNavigate();
    const {add,added,dobCheckValue} = useSelector((state) => state.traveller);
    const dispatch = useDispatch();


    
  console.log("todayyyyyy",dobCheckValue)


    return(
        <>
        <div style={{
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
            <div style={{
                 backgroundImage: "linear-gradient(273deg, #ad2e41, #721053)",
                 display:"flex",
                 justifyContent:"center",
                 height:"50px",alignItems:"center"
            }}>
                <LeftOutlined style={{
                    position:"relative",right:325,color:"white",fontSize:"16px",
                    fontWeight:700,cursor:"pointer"
                }} onClick={()=>{
                    navigate("/Account")
                }}/>
                <Text style={{
                    fontSize:"17px",color:"white"
                }}>Travellers</Text>
            </div>
            {!add.length>0?(
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        marginTop: 30,
                    }}
                    >
                    <img
                        src="https://images.ixigo.com/rt-node/mobi/img/trains/noTravellers.png"
                        style={{
                        marginBottom: 20,
                        }}
                    />

                    <Text style={{ fontSize: 16, color: "#717171ff" }}>
                        Sorry, you have no traveller.<br />Please add one!
                    </Text>

                            <div
                            style={{
                            marginTop: 10,
                            background: "#ec5b24",
                            color: "#fff",
                            padding: "12px",
                            borderRadius: 5,
                            textAlign: "center",
                            cursor: "pointer",
                            fontWeight: 400,
                            width:200
                            }}
                        onClick={()=>
                            navigate("/addTraveller")
                        }>
                            ADD TRAVELLERS
                        </div>
                    </div>
            ):(
                <div >
                    <div style={{
                        display:"flex",
                        flexDirection:"row",
                        gap:15,
                        alignItems:"center",
                        borderBottom:"15px solid #4f4f4f14",
                        padding:10,
                        cursor:"pointer",
                        
                    }} onClick={()=>{
                        navigate("/addTraveller")
                    }}>
                        
                            <PlusCircleFilled style={{
                                color:"#ec5b24",fontSize:35}}/>
                            <Text style={{
                                color:"#ec5b24",fontSize:18}}>Add New Traveller</Text>
                        
                    </div>
                    {add.map((item,idx)=>(
                        <div style={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                         padding:10,
                         cursor:"pointer"
                    }} onClick={()=>{
                        navigate("/editTraveller", { state: { index: idx } })
                    }}>
                        <div style={{
                            gap:15,
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center"
                        }}>
                            <img style={{
                                height:"35px",width:"35px",borderRadius:50
                            }} src="https://images.ixigo.com/rt-node/mobi/img/maleIcon.png"/>
                            
                                {add.length === 0 ? null : (
                                <Text style={{ fontSize: 19 }} key={idx}>
                                    {item.firstName} {item.lastName}
                                </Text>
                                )}

                            
                        </div>
                        <div style={{
                            display:"flex",
                            alignItems:"center"
                        }}>
                            <EditFilled style={{
                                color:"grey",fontSize:20
                            }}/>
                        </div>
                    </div>))}
                </div>
            )}
                

                
            </div>
            </div>
        </>
    )
}
export default MyTravellers;