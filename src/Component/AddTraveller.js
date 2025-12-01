import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import { Typography,Input,Modal,Radio, Space,ConfigProvider,DatePicker } from "antd";
import {  CloseOutlined } from "@ant-design/icons";
import {addTraveller,setadded} from "../Redux/Slices/TravellerSlice";
import { useDispatch, useSelector } from "react-redux";
import "./AddTraveller.css";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const {Text} =Typography;

const AddTraveller = () =>{
     const navigate = useNavigate();
     const {add,added} = useSelector((state) => state.traveller);
     const dispatch = useDispatch();
     const [openSample,setOpenSample] = useState(false);
     const [firstName,setFirstName] = useState("");
     const [lastName,setLastName] = useState("");
     const [radioValue, setRadioValue] = useState(0);
     const [openDOB,setOpenDOB] = useState(false);
     const monthFormat = 'DD/MM/YYYY';
     const [genderValue,setGenderValue] = useState("Male");
     const [DOBValue,setDOBValue] = useState("");
     const [noFirstError,setNoFirstError] = useState(false);
     const [noLastError,setNoLastError] = useState(false);
     const [noDOBError,setNoDOBError] = useState(false);

     const gender = ["Male","Female"]

     const handleSave = () => {
  if (firstName === "" || firstName.length > 27) {
    setNoFirstError(true);
  }
  else if (lastName === "" || lastName.length === 1 || lastName.length > 27) {
    setNoLastError(true);
    
  }
  else if (DOBValue === "") {
    setNoDOBError(true);
  }
  else{
    const newRecord = {
      key: add.length,
      firstName,
      lastName,
      genderValue,
      DOBValue,
    };
    
    dispatch(addTraveller(newRecord));
    dispatch(setadded(true))
    console.log(newRecord)
    navigate("/myTravellers")
  }
  
};


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
                        <CloseOutlined style={{
                            position:"relative",right:310,color:"white",fontSize:"16px",
                            fontWeight:700,cursor:"pointer"
                        }} onClick={()=>{
                            navigate("/myTravellers")
                        }}/>
                        <Text style={{
                            fontSize:"17px",color:"white",
                        }}>Add Traveller</Text>
                    </div>
                    <div style={{
                        borderBottom:"1px solid #bbafaf8a",
                        height:"83vh"
                    }}>


                        <div style={{
                                        padding:13,
                                        
                                    }}>
                                        <div style={{
                                            background:"#ffe49b",
                                            height:"20px",
                                            display:"flex",
                                            alignItems:"center",
                                            padding:5
                                        }}>
                                            <svg width="18" height="18" viewBox="0 0 18 14" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>Group 4</title><desc>Created with Sketch.</desc><g id="Search/Flight/ixibook" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group-4"><path d="M15.3042727,1 L2.70790909,1 C1.765,1 1,1.78281818 1,2.74354545 L1,11.4613636 C1,12.4220909 1.765,13.2049091 2.70790909,13.2049091 L15.2864545,13.2049091 C16.2294545,13.2049091 16.9944545,12.4220909 16.9944545,11.4613636 L16.9944545,2.74354545 C17.0122727,1.78281818 16.2472727,1 15.3042727,1" id="Fill-1" fill="#AA75CC"></path><path d="M15.3042727,0.925885057 L2.70790909,0.925885057 C1.72433588,0.925885057 0.925885057,1.74159524 0.925885057,2.74354545 L0.925885057,11.4613636 C0.925885057,12.4633138 1.72433588,13.279024 2.70790909,13.279024 L15.2864545,13.279024 C16.270104,13.279024 17.0685695,12.4633288 17.0685695,11.4613636 L17.0685695,2.74354545 C17.0871012,1.74503564 16.2910306,0.925885057 15.3042727,0.925885057 Z M2.70790909,1.07411494 L15.3042727,1.07411494 C16.207753,1.07411494 16.9373649,1.82488013 16.9203523,2.74217111 L16.9203396,11.4613636 C16.9203396,12.3821636 16.1875222,13.1307941 15.2864545,13.1307941 L2.70790909,13.1307941 C1.80691889,13.1307941 1.07411494,12.3821499 1.07411494,11.4613636 L1.07411494,2.74354545 C1.07411494,1.82275922 1.80691889,1.07411494 2.70790909,1.07411494 Z" id="Stroke-3" fill="#8537B7" fill-rule="nonzero"></path><path d="M5.85704545,3.3307 C6.81777273,3.3307 7.58277273,4.11351818 7.58277273,5.09206364 C7.58277273,6.05279091 6.81777273,6.85342727 5.85704545,6.85342727 C4.89631818,6.85342727 4.13122727,6.07060909 4.13122727,5.09206364 C4.13122727,4.11351818 4.91404545,3.3307 5.85704545,3.3307" id="Fill-5" fill="#FFFFFF"></path><path d="M8.61468182,11.7460545 L3.09940909,11.7460545 C2.77913636,11.7460545 2.51222727,11.5147818 2.42331818,11.2123273 C2.61895455,9.14850909 4.07786364,7.52950909 5.85704545,7.52950909 C7.63613636,7.52950909 9.09504545,9.13069091 9.29077273,11.2123273 C9.21959091,11.5147818 8.95277273,11.7460545 8.61468182,11.7460545" id="Fill-7" fill="#FFFFFF"></path><path d="M14.7171364,6.81782727 L9.57540909,6.81782727 C9.25513636,6.81782727 9.00613636,6.55091818 9.00613636,6.23073636 C9.00613636,5.91046364 9.25513636,5.64355455 9.57540909,5.64355455 L14.7171364,5.64355455 C15.0374091,5.64355455 15.2865,5.91046364 15.2865,6.23073636 C15.3042273,6.55091818 15.0374091,6.81782727 14.7171364,6.81782727" id="Fill-9" fill="#FFFFFF"></path><path d="M14.7171364,4.48712727 L9.57540909,4.48712727 C9.25513636,4.48712727 9.00613636,4.22021818 9.00613636,3.90003636 C9.00613636,3.57976364 9.25513636,3.31285455 9.57540909,3.31285455 L14.7171364,3.31285455 C15.0374091,3.31285455 15.2865,3.57976364 15.2865,3.90003636 C15.3042273,4.22021818 15.0374091,4.48712727 14.7171364,4.48712727" id="Fill-11" fill="#FFFFFF"></path></g></g></svg>
                                            <Text style={{
                                                padding:2,fontSize:12,color:"#0000008a"
                                            }}>Enter your name as mentioned on your Passport or Govt. ID proof</Text>
                                        </div>
                                        <br/>
                                        <Text style={{
                                            position:"relative",
                                            bottom:20,color:"#ec5b24",fontSize:13,cursor:"pointer"
                                        }} onClick={()=>{
                                            setOpenSample(true)
                                        }}>View Sample</Text>
                                        <Modal
                                        footer={null}
                                        open={openSample}
                                        closable
                                        width={"50%"}
                                        onCancel={() => setOpenSample(false)}
                                        style={{
                                            marginTop:-50
                                        }}>
                                            <div>
                                                <Text style={{
                                                    fontSize:18,fontWeight:500
                                                }}>
                                                    Sample Passport Image
                                                </Text>
                                                <div style={{
                                                    marginTop:10,display:"flex",alignItems:"center",justifyContent:"center"
                                                }}>
                                                    <img style={{
                                                        width:"90%",
                                                    }} src="https://images.ixigo.com/image/upload/f_auto,w_2292/passport/0e46fedc2452efd41236f159b5d258f9-cxqdl.jpg"/>
                                                </div>
                                                
                                            </div>
                                        </Modal>
                                        <br/>
                                        <div style={{
                                            position:"relative",
                                            bottom:10
                                        }}>
                                        <Text style={{
                                            color:"#0000008a",fontSize:"16px"
                                        }}>First Name</Text>
                                        <div
                                      style={{
                                        height: "35px",
                                        borderBottom: noFirstError?"1px solid red":"1px solid #bbafaf8a",
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "row",
                                        background: "#fff",
                                      }}
                                    >
                                      <Input
                                        placeholder="Enter first name"
                                        variant="borderless"
                                        style={{
                                          fontSize: "17px",
                                          fontWeight: 500,
                                          position:"relative",
                                          right:10,
                                        }}
                                        value={firstName}
                                        onChange={(e) => {
                                          const newValue = e.target.value
                                            if(firstName !== newValue){
                                              setNoFirstError(false)
                                            }
                                            setFirstName(newValue)
                                        }}
                                      />
                                      </div>
                                      </div>
                                       {!noFirstError?null:(
                                      <Text style={{
                                        position:"relative",fontSize:12,color:"red",bottom:10
                                      }}>First name should be 1-26 characters</Text>
                                    )}
                                      <br/>
                                        <div style={{
                                            position:"relative",
                                            bottom:10
                                        }}>
                                        <Text style={{
                                            color:"#0000008a",fontSize:"16px"
                                        }}>Last Name</Text>
                                        <div
                                      style={{
                                        height: "35px",
                                        borderBottom: noLastError?"1px solid red":"1px solid #bbafaf8a",
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "row",
                                        background: "#fff",
                                      }}
                                    >
                                      <Input
                                        placeholder="Enter last name"
                                        variant="borderless"
                                        style={{
                                          fontSize: "17px",
                                          fontWeight: 500,
                                          position:"relative",
                                          right:10,
                                        }}
                                        value={lastName}
                                         onChange={(e) => {
                                          const newValue = e.target.value
                                            if(lastName !== newValue){
                                              setNoLastError(false)
                                            }
                                            setLastName(newValue)
                                        }}
                                      />
                                      </div>
                                      </div>
                                      <br/>
                                      {!noLastError?null:(
                                      <Text style={{
                                        position:"relative",fontSize:12,color:"red",bottom:30
                                      }}>Last name should be 2-26 characters</Text>
                                    )}
                                        <div style={{
                                            position:"relative",
                                            bottom:10
                                        }}>
                                        <Text style={{
                                            coonChangelor:"#0000008a",fontSize:"16px"
                                        }}>Gender</Text>
                                        
                                      <div style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                      }}>
                                        <Radio.Group
                                        value={genderValue}
                                        onChange={(e) => setGenderValue(e.target.value)}>
                                            <Space direction="horizontal">
                                                {gender.map((item,idx)=>(
                                                   <div 
                                                   key={idx}
                                                   style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            padding: "5px 0",
                                            justifyContent: "space-between",
                                            width: 395
                                            }}>
                                            <>
                                                <style>
                                                {`
                                                .custom-radio .ant-radio-inner {
                                                    border: 1px solid #000000ff !important;
                                                    color: #ec5b24
                                                }

                                                .custom-radio.ant-radio-wrapper-checked .ant-radio-inner {
                                                    border: 1px solid #0770e4 !important; /* selected border (blue) */
                                                }
                                                `}
                                                </style>

                                                <ConfigProvider>
                                                <Radio value={item} className="custom-radio" style={{
                                                    fontSize: "14px",
                                                    fontWeight: 400, fontFamily: "Roboto",
                                                }}
                                                    
                                                    >
                                                    {item}
                                                </Radio>
                                                </ConfigProvider>
                                            </>
                                                </div>
                                                ))}
                                            </Space>
                                        
                                        </Radio.Group>
                                      </div>
                                      <br/>
                                        <div style={{
                                            position:"relative",
                                            bottom:10
                                        }} >
                                        <Text style={{
                                            color:"#0000008a",fontSize:"16px"
                                        }}>Date of Birth</Text>
                                        <div
                                      style={{
                                        height: "35px",
                                        borderBottom: noDOBError?"1px solid red":"1px solid #bbafaf8a",
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "row",
                                        background: "#fff",
                                      }}
                                      onClick={(e)=>setOpenDOB(true)}
                                    >
                                      <Input
                                        placeholder="Select Date"
                                        variant="borderless"
                                        style={{
                                          fontSize: "17px",
                                          fontWeight: 500,
                                          position:"relative",
                                          right:10,
                                        }}
                                        readOnly
                                        value={DOBValue}
                                      />
                                      <DatePicker
                                              picker="date"   
                                              value={DOBValue ? dayjs(DOBValue, monthFormat) : null}
                                              format={monthFormat}
                                              onChange={(date) => {
                                                if (date) {
                                                  setDOBValue(date.format(monthFormat));  
                                                  setNoDOBError(false)
                                                } else {
                                                  setDOBValue("");
                                                }
                                              }}
                                              className="hidden-datepicker"
                                            />
                                      </div>
                                      <br/>
                                      {!noDOBError?null:(
                                      <Text style={{
                                        position:"relative",fontSize:12,color:"red",bottom:20
                                      }}>Please select date of birth</Text>
                                    )}
                                      
                                      </div>
                                      
                                      </div>
                                      
                                    </div>
                                    
                    </div>
                    <div style={{
                      display:"flex",
                                        justifyContent:"center"
                    }}>

                    
                                              <div
                                      style={{
                                        marginTop: 10,
                                        background: "#ec5b24",
                                        color: "#fff",
                                        padding: "12px",
                                        borderRadius: 8,
                                        textAlign: "center",
                                        cursor: "pointer",
                                        fontWeight: 500,
                                        width:"90%",
                                        
                                      }}
                                      onClick={()=>{handleSave()}}
                                    >
                                      Save
                                    </div>
                                    </div>
                </div>
            </div>
        </>
    )
}
export default AddTraveller;

