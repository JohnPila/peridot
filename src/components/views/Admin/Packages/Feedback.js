import { Rating } from "react-simple-star-rating"
import { useState } from "react"

 function Feedback() {
    const [rating, setRating] = useState(0) // initial rating value
  
    // Catch Rating value
    const handleRating = (rate: number) => {
      setRating(rate)
      // other logic
    }
  
    return (
      <div className='App'>
        <Rating onClick={handleRating} ratingValue={rating} /* Available Props */ />
      </div>
    )
  }
  export default Feedback;