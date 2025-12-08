import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import { Typography,Input,Modal } from "antd";
import { LeftOutlined,DownOutlined } from "@ant-design/icons";
import {
    setName,
    setEmail,
  setOpenDrawer,
  setPhoneNo,
} from "../Redux/Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";

const {Text} =Typography;

const EditProfile = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

  const {
    openDrawer,
    phoneNo,
    name,
    email
  } = useSelector((state) => state.profile);
   const [emailModalOpen, setEmailModalOpen] = useState(false);
   const [phoneModalOpen, setPhoneModalOpen] = useState(false);
   const [tempName, setTempName] = useState(name);
   const [tempEmail, setTempEmail] = useState(email);
   const [tempPhone, setTempPhone] = useState(phoneNo);
   const [noNameError,setNoNameError] = useState(false);
   const [noPhoneError,setNoPhoneError] = useState(false);
   const [noEmailError,setNoEmailError] = useState(false);

   const handleSave = () =>{
    const NAME_REGEX = /^[A-Za-z\s'-]+$/;
    if(tempName ==="" || tempName.length > 27 || !NAME_REGEX.test(tempName)){
      setNoNameError(true)
    }
    else{
              dispatch(setName(tempName))
              dispatch(setEmail(tempEmail))
              dispatch(setPhoneNo(tempPhone))
              navigate("/Account")
    }
   }

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
                    position:"relative",right:335,color:"white",fontSize:"16px",
                    fontWeight:700,cursor:"pointer"
                }} onClick={()=>{
                    navigate("/Account")
                }}/>
                <Text style={{
                    fontSize:"17px",color:"white"
                }}>Profile</Text>
            </div>
            <div style={{
                borderBottom:"1px solid #bbafaf8a",
                height:"83vh"
            }}>

            
            <div style={{
                padding:15,
                
            }}>
                <Text style={{
                    color:"#0000008a",fontSize:"16px"
                }}>Full Name</Text>
                <div
              style={{
                height: "35px",
                borderBottom: noNameError?"1px solid red": "1px solid #bbafaf8a",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                background: "#fff",
              }}
            >
              <Input
                
                variant="borderless"
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  position:"relative",
                  right:10
                }}
                defaultValue={tempName}
                onChange={(e) =>{
                    const newValue = e.target.value
                      if(tempName !== newValue){
                        setNoNameError(false)
                      }
                      setTempName(newValue)
          
                }}
              />
              </div>
              {!noNameError?null:(
              <Text style={{
                position:"relative",fontSize:13,color:"red",top:5
              }}>Name should be 1-26 characters</Text>
            )}
            </div>
            
            <div style={{
                padding:15,
            }}>
                <Text style={{
                    color:"#0000008a",fontSize:"16px"
                }}>Email</Text>
                <div
              style={{
                height: "35px",
                borderBottom: "1px solid #bbafaf8a",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                background: "#fff",
              }}
            >
              <Input
                
                variant="borderless"
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  position:"relative",
                  right:10
                }}
                value={email}
                readOnly
                // onChange={(e) =>{
                //     setEmail(e.target.value)
                // }}
                onClick={()=>setEmailModalOpen(true)}
              />
              
                    <Modal
                footer={null}
                open={emailModalOpen}
                closable
                width={"23%"}
                style={{
                    marginTop:100
                }}
                onCancel={()=>{
                    setEmailModalOpen(false)
                }}
            >
                <div style={{
                    display:"flex",justifyContent:"center"
                }}>
                    <Text style={{
                        fontSize:17,fontWeight:500
                    }}>Email Verification</Text>
                </div>
                <div style={{
                padding:15,
            }}>
                <Text style={{
                    color:"#0000008a",fontSize:"16px"
                }}>Email</Text>
                <div
              style={{
                height: "35px",
                borderBottom: noEmailError?"1px solid red":"1px solid #bbafaf8a",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                background: "#fff",
              }}
            >
              <Input
                
                variant="borderless"
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  position:"relative",
                  right:10
                }}
                
                defaultValue={tempEmail}
                onChange={(e) =>{
                    setTempEmail(e.target.value)
                    setNoEmailError(false)
                }
                }
              />

              </div>
              {!noEmailError?null:(
              <Text style={{
                position:"relative",fontSize:12,color:"red"
              }}>Please enter a valid Email</Text>
            )}
               <div
            style={{
              marginTop: 30,
              background: "#ec5b24",
              color: "#fff",
              padding: "12px",
              borderRadius: 5,
              textAlign: "center",
              cursor: "pointer",
              fontSize:15
            }}
            onClick={()=>{
              const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              if(isValid.test(tempEmail)){
                dispatch(setEmail(tempEmail))
                setEmailModalOpen(false)
              }
              else{
                setNoEmailError(true)
              }
            }}
          >
            UPDATE
          </div>
          <Text type="secondary" style={{
            fontSize:13,
          }}>
            Please note, your ixigo money account will be disabled if you don't verify the account
          </Text>
            </div>
                </Modal>
             
               
              </div>
            </div>
            <div style={{
                padding:15,
            }}>
                <Text style={{
                    color:"#0000008a",fontSize:"16px"
                }}>Mobile Number</Text>
                <div
              style={{
                height: "35px",
                borderBottom: "1px solid #bbafaf8a",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                background: "#fff",gap:10
              }}
              onClick={(e)=>setPhoneModalOpen(true)}
            >
                <Text type="secondary" style={{
                    fontSize:16,width:20
                }}>91</Text>
                <DownOutlined style={{
                    fontSize:13,position:"relative",top:1,color:"grey"
                }}/>
              <Input
                
                variant="borderless"
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  position:"relative",
                  
                }}
                value={phoneNo}
                readOnly
                
              />
              
              </div>
              <Modal
                    footer={null}
                    open={phoneModalOpen}
                    closable
                    width={"23%"}
                    style={{ marginTop: 100 }}
                    onCancel={() => setPhoneModalOpen(false)}
                    
                
            >
                <div style={{
                    display:"flex",justifyContent:"center"
                }} >
                    <div style={{
                        display:"flex",flexDirection:"column",justifyContent:"center",textAlign:"center"
                    }}>
                    <Text style={{
                        fontSize:17,fontWeight:500
                    }}>Update Mobile Number</Text>
                    <br/>
                    <Text type="secondary" style={{
                        position:"relative",bottom:15
                    }}>
                        Please enter your new mobile number
                    </Text>
                    </div>

                </div>
                <div style={{
                padding:15,
            }}>
                <Text style={{
                    color:"#0000008a",fontSize:"16px"
                }}>Mobile Number</Text>
                <div
              style={{
                height: "35px",
                borderBottom: noPhoneError?"1px solid red":"1px solid #bbafaf8a",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                background: "#fff",gap:20
              }}
              
            >
                <Text type="secondary" style={{
                    fontSize:16,width:30
                }}>91</Text>
                <DownOutlined style={{
                    fontSize:13,position:"relative",top:1,color:"grey"
                }}/>
              <Input
                
                variant="borderless"
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  position:"relative",
                  right:15
                }}
                defaultValue={tempPhone}
                onChange={(e) =>{
                    setTempPhone(e.target.value)
                    setNoPhoneError(false)
                }
                }
              />
              </div>
              {!noPhoneError?null:(
              <Text style={{
                position:"relative",fontSize:12,color:"red"
              }}>Please enter a valid phone number</Text>
            )}
               <div
            style={{
              marginTop: 30,
              background: "#ec5b24",
              color: "#fff",
              padding: "12px",
              borderRadius: 5,
              textAlign: "center",
              cursor: "pointer",
              fontSize:15
            }}
            onClick={()=>{
              const isValidStart = /^[6-9]/.test(tempPhone);
              if(tempPhone.length === 10 && isValidStart){
                dispatch(setPhoneNo(tempPhone))
                setPhoneModalOpen(false)
              }
               else{
                setNoPhoneError(true)
               } 
            }}
          >
            UPDATE
          </div>
          {/* <Text type="secondary" style={{
            fontSize:13,
          }}>
           An OTP will be sent to your mobile number for verification
          </Text> */}
            </div>
                </Modal>
            </div>
            </div>
            <div style={{
                display:"flex",justifyContent:"center"
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
              width:"90%"
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

export default EditProfile;