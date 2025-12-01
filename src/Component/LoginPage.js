import React,{useState,useEffect,useRef} from "react";
import { CloseOutlined,ArrowLeftOutlined } from "@ant-design/icons";
import { Drawer,Typography,Input,Space,InputNumber } from "antd";
import {
  setOpenDrawer,
  setPhoneNo
} from "../Redux/Slices/ProfileSlice";
import { useSelector,useDispatch } from "react-redux";
import "./PageSelect.css"
 

const {Text} = Typography;


const LoginPage = () =>{

     const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [OTP,setOTP] = useState("")
  const [noError,setNoError] = useState(false)
  const [otpValue,setOtpValue] = useState("")
  const [otpError,setOtpError] = useState(false)

    const refinput1 = useRef(null);
    const refinput2 = useRef(null);
    const refinput3 = useRef(null);
    const refinput4 = useRef(null);
    const refinput5 = useRef(null);
    const refinput6 = useRef(null);
    const refs = [ refinput1, refinput2, refinput3, refinput4, refinput5, refinput6];


  const [pins, setPins] = useState(["", "", "", "", "", ""]);

    const dispatch = useDispatch();
    const [showOTP,setShowOTP] = useState(false)
      const { openDrawer, phoneNo } = useSelector((state) => state.profile);

      useEffect(() => {
  refs[0].current?.focus();   
}, [showOTP]);


      useEffect(() => {
  let timer;

  if (focused) {
    setShowLabel(true)
  } else { 
    if (!value) setShowLabel(false);
  }

  return () => clearTimeout(timer);
}, [focused, value]);

useEffect(()=>{
    if(openDrawer){
        setValue("")
        setShowOTP(false)
        setNoError(false)
    }
    
},[openDrawer])

useEffect(()=>{
    if(OTP && phoneNo !== null){
        setPins(["", "", "", "", "", ""])
    }
    
},[OTP,phoneNo])

const handleContinue = () =>{
  const isValidStart = /^[6-9]/.test(value);
  if(value.length === 10 && isValidStart){
    setShowOTP(true)
    setNoError(false)
    const OTP = (Math.floor(100000 + Math.random() * 900000)).toString()
    setOTP(OTP)
    console.log("OTP",OTP)
  }
  else{
    setNoError(true)
  } 
  
}



const handleChange = (value, index) => {
  
  const newPins = [...pins];
  newPins[index] = value;
  setPins(newPins);
  setOtpValue(newPins.join(""));
  if(newPins !== value){
    setOtpError(false)
  }

 if (value && index < 5) {
    refs[index + 1].current?.input?.removeAttribute("disabled");
    refs[index + 1].current.focus();
    
  }

  
};

const handleKeyDown = (e, index) => {
  if (e.key === "Backspace" && !pins[index] && index > 0) {
    refs[index - 1].current.focus();
  }
};


const handleVerify = () =>{
   if(otpValue === OTP){
    dispatch(setPhoneNo(value))
    dispatch(setOpenDrawer(false))
    setOTP(null)
   }
   else{
    setOtpError(true)
   }
}



    return(
        <div >
           
            <Drawer
          title={null}
          closable={false}
          destroyOnHidden
          placement="right"
          trigger={["click"]}
          arrow
          open={openDrawer}
          onClose={() => dispatch(setOpenDrawer(false))}

          overlayStyle={{
            marginBottom: "10px"
          }}
          maskClosable={true}
          width={"28.5%"}
          style={{
            // padding: "24px",
            background: "#fff",
            // borderRadius: "8px 0 0 8px",
            overflow: "auto",
          }}>
            {!showOTP?(<div>
            <div style={{
                display:"flex",
                alignItems:"end",
                justifyContent:"end"
            }}>
               <CloseOutlined
                        onClick={()=>dispatch(setOpenDrawer(false))}
                        style={{
                          fontSize: 14,
                          cursor: "pointer",
                          marginLeft: 8,
                          
                        }}
                      />
              
            </div>
            <div style={{
                marginTop:140
            }}>
                <Text style={{
                    fontSize:"24px",fontWeight:700
                }}>
                    Log in to ixigo
                </Text>
                <div
              style={{
                height: "45px",
                border:  focused ? (noError?"2px solid red":"2px solid #0770e4") :(noError?"2px solid red":"2px solid #c9c9c9ff"),
                marginTop: 10,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                paddingLeft: "10px",
                paddingRight: "10px",
                background: "#fff",
                position: "relative", 
                marginTop:30
              }}
            >
                <div style={{
                    borderRight:"1px solid #b1adadff",
                    padding:5,
                    
                }}>
                    
                <select
            style={{
                border: "none",
                background: "transparent",
                fontSize: "16px",
                fontWeight: 500,
                outline: "none",
                cursor: "pointer",
                color:"grey"
            }}
            defaultValue="+91"
            >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            </select>
                </div>
              <>
                <style>
                    {`
                    input::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                    `}
                </style>

                <Input
                    
                    variant="borderless"
                    style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    width: 300,
                    MozAppearance: "textfield",
                    }}
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="off"
                    value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            const newValue = e.target.value
            if(value !== newValue){
              setNoError(false)
            }
            setValue(newValue)
          }
            }
                />
                 
    <label
      style={{
        position: "absolute",
        top: focused || value ? "-9px" : "12px",
        left: focused || value ?"10px":"76px",
        fontSize: focused || value ? "12px" : "16px",
        color: focused ? (noError?"red":"#0770e4") : (noError?"red":"#a1a1a1ff"),
        transition: "0.2s ease",
        pointerEvents: "none",
        background: focused || value ?"#fff":null,
        padding: "0 3px",
        fontWeight: 500,
      }}
    >
      Enter Mobile Number
    </label>
  
                </>

              
            </div>
            {!noError?null:(
              <Text style={{
                position:"relative",left:"15px",fontSize:12,color:"red"
              }}>Please enter a valid phone number</Text>
            )}
            
      
      <button
                          type="primary"
                          style={{
                            background: value === "" ? "#f1f1f1" : "#ff7a00",
                            border: "none",
                            borderRadius: 10,
                            height: "45px",
                            width:"100%",
                            marginTop: 30,
                            display: "flex",
                            justifyContent:"center",
                            alignItems: "center",
                            position: "relative", 
                            color:value === ""?"#a09a9aff":"white",
                            fontSize:17,
                            fontWeight:500,
                            cursor:value === ""?null:"pointer"
                          }}
                          onClick={handleContinue}
                          disabled={value === ""}
                        >
                          Continue
                        </button>

                        
    
            </div>
            </div>):(
              <div>
                <div style={{
                  display:"flex",
                  justifyContent:"space-between",
                  alignItems:"center"
                }}>
                  <ArrowLeftOutlined 
                  onClick={()=>{setShowOTP(false)
                    setPins(["", "", "", "", "", ""])
                  }}
                  style={{
                          fontSize: 14,
                          cursor: "pointer",}}/>
                  <CloseOutlined
                        onClick={()=>{dispatch(setOpenDrawer(false))
                          setPins(["", "", "", "", "", ""])
                        }}
                        style={{
                          fontSize: 14,
                          cursor: "pointer",
                          marginLeft: 8,
                          
                        }}
                      />
                </div>
                <Text>{OTP}</Text>
                <div style={{
                  marginTop:200,
                  
                }}
                >
                  <Text style={{
                    fontSize:"24px",fontWeight:700
                }}>
                    Verify Your Mobile Number
                  </Text>
                  <br/>
                  <Text type="secondary" style={{
                    fontSize:"12px",fontWeight:500
                }}>
                    Enter the OTP received via SMS on +91 {value}
                  </Text>
                  
                  <div style={{
                    display:"flex",
                    flexDirection:"row",
                    gap:20,
                    marginTop:30
                  }}>
                    <>
                <style>
                    {`
                    input::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                    `}
                </style>
                    {pins.map((value, i) => (
                      <Input
                        key={i}
                        ref={refs[i]}
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleChange(e.target.value, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="otp-input"
                         disabled={i > 0 && pins[i - 1] === ""}
                         style={{
                          border: otpError?"1px solid red":"1px solid grey"
                         }}
                      />
                    ))}
                    </>
                  </div>
                  {!otpError?null:(
              <Text style={{
                position:"relative",fontSize:13,color:"red",top:5
              }}>Please enter a valid OTP</Text>
            )}
                  <button
                  type="primary"
                  style={{
                    background: pins.some(v => v === "") ? "#f1f1f1" : "#ff7a00",
                    border: "none",
                    borderRadius: 10,
                    height: "45px",
                    width: "100%",
                    marginTop: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    color: pins.some(v => v === "") ? "#a09a9a" : "white",
                    fontSize: 17,
                    fontWeight: 500,
                    cursor: pins.some(v => v === "") ? "default" : "pointer",
                  }}
                  onClick={handleVerify}
                  disabled={pins.some(v => v === "")}
                >
                  Verify
                </button>

                </div>
              </div>
            )}
        </Drawer>
                    
        </div>
        
    )
}
export default LoginPage;

{/* <>
                  <style>
                    {`
                    input::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                        .custom-otp .ant-input-otp-input {
                          border: 1px solid #848794 !important;
                          border-radius: 8px !important;
                          height: 45px !important;
                          width: 5px !important;
                          font-size: 20px !important;
                          text-align: center;
                        }
                        .custom-otp .ant-input:focus {
                          border-color: #0770e4 !important;
                          box-shadow: 0 0 0 2px rgba(7, 112, 228, 0.2);
                        }
                    `}
                </style>
                  <Input.OTP length={6} 
                  type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                    className=".ant-input-otp-input"
                  />
                  </> */}