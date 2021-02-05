import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {AUTH_LOGIN_SUCCESS} from "../constants/authConstants";

const ProfileSettings = ({setSelect}) => {
  const dispatch = useDispatch();
  const authLogin = useSelector(state => state.authLogin);
  const {userInfo} = authLogin;

  const [name, setName] = useState(userInfo.name);
  const [image, setImage] = useState({});
  const [bio, setBio] = useState(userInfo.bio);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [editProfileResponse, setEditProfileResponse] = useState("");
  const [warning, setWarning] = useState("");

  const editProfileHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if(image) {
      formData.append('image', image);
    }
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("email", email);
    if(password) {
      if(password !== repeatPassword) {
        setWarning("Password does not match");
        return;
      } else {
        setWarning("");
        formData.append("password", password);
      }
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      const {data} = await axios.put(`api/users/editUser/${userInfo._id}`, formData, config);
      dispatch({type: AUTH_LOGIN_SUCCESS, payload: data});
      localStorage.setItem("userInfo", JSON.stringify(data));
      setEditProfileResponse(true);
    }catch(error) {
      setEditProfileResponse(false);
    }
  }

  return (
    <div id="addproduct">
        <h1>Edit Profile</h1>
        <div className="addproduct-forms">
          <div className="addproduct-form__first">
            <form onSubmit={editProfileHandler} encType="multipart/form-data">
              <h2>Profile Details</h2>
              {editProfileResponse && <small style={{color: "#a4d037"}}>Profile Successfully Updated</small>}
              {warning && <small style={{color: "yellow"}}>Password does not match</small>}
              <label htmlFor="name">Name</label>
              <input className="form-input" placeholder="Name" type="text" minLength="3" value={name} onChange={e => setName(e.target.value)}/>

              <label htmlFor="Image" width="200">Avatar</label>
              <img src={userInfo.avatar} alt={userInfo.name}/>
              <input className="form-input" type="file" name="file" onChange={e => setImage(e.target.files[0])}></input>

              <label htmlFor="description">Bio</label>
              <input className="form-input" type="text" maxLength="100" value={bio} onChange={e => setBio(e.target.value)}/>

              <label htmlFor="email">Email</label>
              <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
              
              <label htmlFor="password">Password</label>
              <input className="form-input" type="password" minLength="6" value={password} onChange={e => setPassword(e.target.value)}/>
              
              <label htmlFor="password">Repeat Password</label>
              <input className="form-input" type="password" minLength="6" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}/>
              
              <button type="submit" className="btn-l">Save Changes</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default ProfileSettings;