// frontend/src/components/RatingStars.jsx
import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ onSubmit, existingRating }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit(rating, review);
    setShowForm(false);
    setRating(0);
    setReview('');
  };

  if (existingRating) {
    return (
      <div className="flex items-center">
        <div className="flex">
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              size={20}
              className={star <= existingRating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">Rated</span>
      </div>
    );
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50"
      >
        Rate & Review
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Rate Your Experience</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    className="hidden"
                  />
                  <Star
                    size={32}
                    className="cursor-pointer transition"
                    color={ratingValue <= (hover || rating) ? '#fbbf24' : '#d1d5db'}
                    fill={ratingValue <= (hover || rating) ? '#fbbf24' : 'none'}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this groomer..."
            className="w-full border rounded-lg p-3 mb-4"
            rows="4"
            required
          />
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingStars;