import React, {useRef} from "react";
//import FirebaseConfig from '../../../config/FirebaseConfig';

export default function FeedbackForm(){
  const messageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(messageRef.current.value);
  };
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label> Any Feedback?</label>
        <input type = "text" ref = {messageRef}></input>
        <button type = "submit">Send</button>
      </form>
    </div>
  );
}
