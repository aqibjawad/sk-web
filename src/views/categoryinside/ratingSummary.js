import React, { useState } from "react";
import "./ratimgSummary.css";

const RatingSummary = ({ reviews }) => {
  const [selectedRating, setSelectedRating] = useState(null);

  const totalReviews = reviews?.length || 0;
  const averageRating = totalReviews > 0
    ? reviews.reduce((acc, review) => acc + review.product, 0) / totalReviews
    : 0;

  // Initialize rating counts
  const ratingCounts = Array(5).fill(0);
  
  // Only try to count ratings if we have reviews
  if (totalReviews > 0) {
    reviews.forEach((review) => {
      const ratingIndex = Math.floor(review.product) - 1;
      if (ratingIndex >= 0 && ratingIndex < 5) {
        ratingCounts[ratingIndex]++;
      }
    });
  }

  const getPercentage = (count) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  return (
    <div className="rating-summary">
      <div className="average-rating">
        <div className="rating-number">
          {isNaN(averageRating) ? "0" : averageRating.toFixed(1)}
          <span className="rating-max">/5</span>
        </div>
        <div className="star-rating">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <svg
                key={index}
                className={`star ${
                  index < Math.floor(averageRating) ? "filled" : ""
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
        </div>
        <div className="total-reviews">{totalReviews} reviews</div>
      </div>

      <div className="rating-bars">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div
            key={rating}
            onClick={() => handleRatingClick(rating)}
            className={`rating-bar-item ${
              selectedRating === rating ? "selected" : ""
            }`}
          >
            <div className="rating-label">
              <span>{rating}</span>
              <svg className="star-small" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${getPercentage(ratingCounts[rating - 1])}%` }}
              ></div>
            </div>
            <div className="rating-count">{ratingCounts[rating - 1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummary;