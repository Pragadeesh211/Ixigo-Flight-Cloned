import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  setPhoneNo,
  setOpenDrawer
} from "../Redux/Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Typography,Dropdown,Space } from "antd";

const {Text} = Typography;

const LoginDropdown = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        openDrawer,
        phoneNo,
        name
      } = useSelector((state) => state.profile);
      const [open,setOpen] = useState(false)

      const handleOpen = () =>{
        dispatch(setOpenDrawer(true))
      }

      const makeprofile = () =>{
          return(
              <>
              <div class="menu-container">
          <div class="menu-item profile" onClick={()=>{
            navigate("/Account")
          }}>
            <div class="icon">👤</div>
            <div>
              <div class="title">{name}</div>
              <div class="subtitle">My Profile</div>
            </div>
          </div>
        
          {/* <div class="menu-item">
            <div class="icon">🧳</div>
            <div>
              <div class="title">My Trips</div>
              <div class="subtitle">View & manage bookings</div>
            </div>
          </div>
        
          <div class="menu-item">
            <div class="icon">💳</div>
            <div>
              <div class="title">ixigo money</div>
              <div class="subtitle">Your virtual currency</div>
            </div>
          </div> */}
        
          <div class="menu-item" onClick={()=>{
            navigate("/myTravellers")
          }}>
            <div class="icon">👥</div>
            <div>
              <div class="title">My Travellers</div>
              <div class="subtitle">View all saved travellers</div>
            </div>
          </div>
        
          <div class="menu-item logout" onClick={()=>{
                      dispatch(setPhoneNo(null))
                    }}>
            <div class="icon">↩️</div>
            <div class="title">Log out</div>
          </div>
        </div>
              </>
      
          )
        }

    return(
        <>
            {phoneNo === null?(<div className="right-menu" onClick={handleOpen}>
              <div style={{
                background:"#d9ebff",height:"40px",width:"40px",display:"flex",
                justifyContent:"center",alignItems:"center",borderRadius:50
              }}>
                <img style={{
                  height:"24px",
                  width:"24px"
                }} src="https://images.ixigo.com/image/upload/Header/9fcafc6b32ac191685d067086c6072e3-cyrbh.webp"/>
              </div>
                
                  
                    <Text style={{
                      position:"relative",left:5,fontSize:"16px"
                    }}>Log in / Sign up</Text>
                  
                    
                    
                  </div>):(
                    <Dropdown
                    // trigger={["click"]}
                    placement="bottomLeft"
                    arrow
                    open={open}
                    onOpenChange={(v) => setOpen(v)}
                    popupRender={makeprofile}
                    className="right-menu"
                    onClick={e => e.preventDefault()}
                  >
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <div
                        style={{
                          background: "#d9ebff",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 50,
                        }}
                      >
                        <img
                          style={{ height: "24px", width: "24px" }}
                          src="https://images.ixigo.com/image/upload/Header/9fcafc6b32ac191685d067086c6072e3-cyrbh.webp"
                        />
                      </div>

                      <Text style={{ marginLeft: 8, fontSize: "16px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "inline-block",
                        maxWidth: "100px",
                        whiteSpace: "nowrap",
                       }}>Hey {name}</Text>
                       <Space style={{
                        transition:"all 1 ease"
                       }}>
                          {open?(< UpOutlined/>):(<DownOutlined/>)}
                        </Space>
                    </div>
                  </Dropdown>

                  )}
        </>
    )
}
export default LoginDropdown;