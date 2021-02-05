import React, { useState, useEffect } from "react";
import "./styles.components/Feedbacks.css";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {displayFeedbacks} from "../actions/userActions";

const Feedbacks = ({match}) => {
  const dispatch = useDispatch();
  const [decision, setDecision] = useState(true);
  const [comment, setComment] = useState("");

  const [response, setResponse] = useState(true);

  const userFeedbacks = useSelector(state => state.userFeedbacks);
  const {loading, feedbacks, error} = userFeedbacks;
  const authLogin = useSelector(state => state.authLogin);
  const {userInfo} = authLogin;

  useEffect(()=>{
    dispatch(displayFeedbacks(match.params.name));
  }, [response, dispatch, match]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Authorization": `Bearer ${userInfo.token}`,
        "Content-Type": "application/json"
      }
    }; 
    try {
      const {data} = await axios.post(`/api/users/feedbacks/${match.params.name}`, {decision, comment}, config);
      setResponse(data);
    } catch(error) {
      setResponse(false);
    }
  }

  return (
    <div id="feedbacks">
      <div className="container">
        {!userInfo ? false : (userInfo.name !== match.params.name) && (
          <div className="feedbacks-input">
          <form onSubmit={submitHandler}>
            <input className="form-input feedbacks-input__comment" type="text" maxLength="150" value={comment} placeholder="Give Feedback" onChange={e => setComment(e.target.value)}/>
            <select name="decision" onChange={e => setDecision(e.target.value)}>
              <option value={true} defaultValue>Positive</option>
              <option value={false}>Negative</option>
            </select>
            <input className="form-input feedbacks-input__submit" type="submit" value="Submit"/>
          </form>
        </div>
        )}

        {response ? "" : <small style={{color: "red"}}>You have already given the feedback</small>}
        <div>
          {loading ? <p>Loading</p> : error ? <h1 className="no-feedbacks">User dont have any feebacks</h1> : (
            <>
            {feedbacks.map((feedback, index) => (
              <div className="feedbacks-card" key={`${feedback.name}${index}`}>
                <p>{feedback.decision ? <i style={{color: "#3fe026"}} className="far fa-smile-beam"></i> : <i style={{color: "red"}} className="far fa-frown"></i>}</p>
                <p>User: <Link to={`/${feedback.name}`}>{feedback.name}</Link></p>
                <p>Comment: {feedback.comment}</p>
              </div>
            ))}

            </>
        )}
        </div>
      </div>
    </div>
  )
}

export default Feedbacks;