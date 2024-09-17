import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RatingBox: React.FC = () => {
  const [hoverRating, setHoverRating] = useState(0); // Temporary rating for hover
  const [rating, setRating] = useState(0); // Final confirmed rating
  const maxRating = 5; // Maximum rating (e.g., 5 stars)

  return (
    <div className="flex flex-row items-center gap-4 p-4 border-2 border-black rounded-lg shadow-md">
      {/* Display Rating */}
      <div className="text-xl font-bold">Vote :     </div>

      {/* Voting Stars */}
      <div className="flex items-center gap-2">
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={faStar}
            className={
              (hoverRating || rating) >= star
                ? "text-yellow-500 cursor-pointer"
                : "text-gray-400 cursor-pointer"
            }
            onMouseEnter={() => setHoverRating(star)} // Set hover rating
            onMouseLeave={() => setHoverRating(0)} // Reset hover rating when not hovering
            onClick={() => setRating(star)} // Set final rating on click
            width={30}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingBox;
