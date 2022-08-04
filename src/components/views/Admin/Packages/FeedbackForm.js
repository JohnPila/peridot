import React, {useState} from "react";
import Button from "../../../common/Button";
import { addFeedback } from "../../../../services/FeedbackService";


export default function FeedbackForm(props){
  const [feedback, setFeedback] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    save();
  };

  const save = async () => {
    try {
         await addFeedback({
          feedback,
        });
      }
     // navigate("/admin/packages");
    catch (error) {
      console.error("Failed to save package.", error);
    } 
  
  };
  // function handleChange(e){
  //   feedback[e.target.id] = e.target.id;
  //   setFeedback({...feedback,feedback});
  // }
  // const saveChange = async() =>{
  //   await addDoc(collection(props.db,"Feedback"),{
  //     message:feedback.message,
  //   }).then(function(res){
  //     alert("success");
  //   }).catch(function(err){
  //     alert("fail");
  //   })

  // }
  
  return(
    <div>
      <form  >
        <label> Any Feedback?</label>
        <input 
         onChange={(e) => setFeedback(e.target.value)}
          id = "message"
          label = "Message"
        >
        </input>
        <Button onClick={handleSubmit}>Send</Button>
      </form>
    </div>
  );
}
