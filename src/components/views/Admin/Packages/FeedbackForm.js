import { useState } from "react";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "../../../common/Typography";

function FeedbackForm({ handleAdd }) {
    const [text, setText] = useState("");
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMesage] = useState("");
  
    const handleTextChange = (e) => {
      if (text === "") {
        setBtnDisabled(true);
        setMesage(null);
      } else if (text !== "" && text.trim().length <= 10) {
        setMesage("Text must be at least 10  Charecters 😏");
        setBtnDisabled(true);
      } else {
        setMesage(null);
        setBtnDisabled(false);
      }
  
      setText(e.target.value);
      // setText(e.target.value) get value from input
    };
  
    //fun handle submit
    const handleSubmit = (e) => {
      e.preventDefault();
      if (text.trim().length > 10) {
        const newFeedback = {
          text,
          rating,
        };
        handleAdd(newFeedback);
  
      
      
        // setText('')
      }
    };
  
    return (
      <Card>
        <form onSubmit={handleSubmit}>
        <Typography variant="h5">How would you rate your services with us</Typography>
  
          <Rating select={(rating) => setRating(rating)} size = "large" />
  
          <div className="input-group">
            <input 
              onChange={handleTextChange}
              type="text"
              placeholder="write a review"
              value={text}
              variant = "h5"
            />
            <Button type="submit" isDisabled={btnDisabled} version="primary" >
                
              Send
            </Button>
          </div>
          {message && <div className="message">{message}</div>}
        </form>
      </Card>
    );
  }
  
  export default FeedbackForm;