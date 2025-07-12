import React from "react";

interface StarRatingProps {
  rating: number; // e.g. 3.5 (out of 5)
}

const StarRating = ({ rating }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <i key={"full-" + i} className="fa-solid fa-star" />
      ))}
      {halfStar && <i className="fa-solid fa-star-half-stroke" />}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={"empty-" + i} className="fa-regular fa-star" />
      ))}
    </div>
  );
};

export default StarRating;
