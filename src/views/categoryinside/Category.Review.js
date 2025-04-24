import React from "react"

const CategoryReviewShow = () => {
    return (
        <section className="border-top py-4">
            <div>

                {reviews && reviews.map((review) => (
                    <div className="review-card mt-4">
                        <div className="review-header">
                            <div className="reviewer-info">
                                {review.image ? (
                                    <img className="profile-image" src={`${process.env.REACT_APP_AWS_URL}${review.image}`} alt={`Profile of ${review.Name}`} />
                                ) : (
                                    <img className="profile-image" src="https://i.stack.imgur.com/SE2cv.jpg" alt={`Profile of ${review.Name}`} />
                                )}
                                <p className="reviewer-name">{review.Name}</p>
                            </div>
                            <ReactStars
                                count={review.product} // Number of stars
                                value={review.product} // Rating value from the backend
                                size={35} // Size of the stars
                                edit={false} // Disable editing
                            />
                        </div>
                        <h3 className="review-title">{review.reviewTitle}</h3>
                        <p className="review-description">{review.description}</p>
                        <p className="review-date">{review.date}</p>
                    </div>
                ))}

            </div> 
        </section>
    )
}

export default CategoryReviewShow