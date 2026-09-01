import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Phone, Globe, Star, Heart, Share2, Clock, AlertCircle, Loader } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import toast from 'react-hot-toast';

const ShelterProfile = () => {
  const { shelterId } = useParams();
  const [shelter, setShelter] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    reviewText: '',
    adoptionExperience: false,
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchShelterDetails();
    fetchShelterPosts();
    fetchShelterReviews();
  }, [shelterId]);

  const fetchShelterDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shelters/${shelterId}`
      );
      setShelter(response.data.shelter);
    } catch (err) {
      console.error('Error fetching shelter:', err);
      setError('Could not load shelter details');
    }
  };

  const fetchShelterPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shelters/${shelterId}/posts`
      );
      setPosts(response.data.posts || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const fetchShelterReviews = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shelters/${shelterId}/reviews`
      );
      setReviews(response.data.reviews || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.reviewText.trim()) {
      toast.error('Please write a review');
      return;
    }

    setSubmittingReview(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shelters/${shelterId}/reviews/create`,
        reviewForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('Review submitted successfully!');
      setReviewForm({ rating: 5, reviewText: '', adoptionExperience: false });
      fetchShelterReviews();
    } catch (err) {
      console.error('Error submitting review:', err);
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error || !shelter) {
    return (
      <>
        <Navbar />
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-xl text-gray-800">{error || 'Shelter not found'}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Cover Image */}
        <div className="h-64 bg-gradient-to-r from-orange-400 to-orange-600 relative overflow-hidden">
          {shelter.coverImage && (
            <img
              src={shelter.coverImage}
              alt={shelter.shelterName}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
          {/* Header Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              {shelter.profileImage && (
                <img
                  src={shelter.profileImage}
                  alt={shelter.shelterName}
                  className="w-32 h-32 rounded-lg object-cover border-4 border-orange-100"
                />
              )}

              {/* Shelter Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                      {shelter.shelterName}
                      {shelter.isVerified && (
                        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">✓ Verified</span>
                      )}
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(shelter.averageRating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {shelter.averageRating} ({shelter.totalReviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button className="p-2 hover:bg-orange-100 rounded-full transition-colors">
                      <Heart className="w-6 h-6 text-orange-500" />
                    </button>
                    <button className="p-2 hover:bg-orange-100 rounded-full transition-colors">
                      <Share2 className="w-6 h-6 text-orange-500" />
                    </button>
                  </div>
                </div>

                {/* Contact & Location */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-gray-600">{shelter.address}</p>
                      <p className="font-semibold text-gray-800">{shelter.city}, {shelter.state}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-gray-600">Contact</p>
                      <a href={`tel:${shelter.phone}`} className="font-semibold text-orange-600">
                        {shelter.phone}
                      </a>
                    </div>
                  </div>
                  {shelter.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="text-gray-600">Website</p>
                        <a href={shelter.website} target="_blank" rel="noopener noreferrer" 
                           className="font-semibold text-orange-600 truncate">
                          Visit Site
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">{shelter.totalAnimalsRescued || 0}</p>
                <p className="text-sm text-gray-600">Rescued</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">{shelter.totalAdoptions || 0}</p>
                <p className="text-sm text-gray-600">Adoptions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">{shelter.availablePets?.length || 0}</p>
                <p className="text-sm text-gray-600">Available Pets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">{shelter.totalReviews || 0}</p>
                <p className="text-sm text-gray-600">Reviews</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 flex">
              {['about', 'animals', 'posts', 'reviews', 'donate'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 font-semibold transition-colors text-center capitalize ${
                    activeTab === tab
                      ? 'border-b-2 border-orange-500 text-orange-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* About Tab */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">About Us</h3>
                    <p className="text-gray-700 mb-4">{shelter.description}</p>
                    {shelter.story && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Our Story</h4>
                        <p className="text-gray-700">{shelter.story}</p>
                      </div>
                    )}
                  </div>

                  {/* Facilities */}
                  {shelter.facilities?.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Facilities & Services</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {shelter.facilities.map((facility) => (
                          <div key={facility} className="bg-orange-50 rounded-lg p-3 text-center">
                            <p className="text-sm font-semibold text-orange-700 capitalize">
                              {facility.replace(/_/g, ' ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Operating Hours */}
                  {shelter.operatingHours && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Operating Hours
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(shelter.operatingHours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="font-semibold text-gray-800 capitalize">{day}</span>
                            <span className="text-gray-600">
                              {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Animals Tab */}
              {activeTab === 'animals' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Available for Adoption</h3>
                  {shelter.availablePets?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {shelter.availablePets.map((pet) => (
                        <div key={pet._id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="h-48 bg-gray-200 flex items-center justify-center">
                            {pet.image ? (
                              <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-gray-500">No Image</span>
                            )}
                          </div>
                          <div className="p-4">
                            <h4 className="font-bold text-gray-800">{pet.name}</h4>
                            <p className="text-sm text-gray-600">{pet.breed}</p>
                            <a href={`/AdoptionProcess/${pet._id}`} 
                               className="inline-block mt-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg">
                              Adopt Now
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-100 rounded-lg">
                      <p className="text-gray-600">No animals available at the moment</p>
                    </div>
                  )}
                </div>
              )}

              {/* Posts Tab */}
              {activeTab === 'posts' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Updates & News</h3>
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <div key={post._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-800">{post.title}</h4>
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full capitalize">
                            {post.category}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{post.content}</p>
                        {post.media?.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                            {post.media.map((media, idx) => (
                              <img key={idx} src={media.url} alt={`Post ${idx}`} 
                                   className="rounded-lg w-full h-32 object-cover" />
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-gray-100 rounded-lg">
                      <p className="text-gray-600">No posts yet</p>
                    </div>
                  )}
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Reviews</h3>

                  {/* Review Form */}
                  <form onSubmit={handleReviewSubmit} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Write a Review</h4>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setReviewForm({ ...reviewForm, rating })}
                            className="p-1 transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                rating <= reviewForm.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review</label>
                      <textarea
                        value={reviewForm.reviewText}
                        onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                        placeholder="Share your experience with this shelter..."
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-orange-500"
                        rows="4"
                      />
                    </div>

                    <div className="mb-3 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="adoptionExp"
                        checked={reviewForm.adoptionExperience}
                        onChange={(e) => setReviewForm({ ...reviewForm, adoptionExperience: e.target.checked })}
                        className="rounded"
                      />
                      <label htmlFor="adoptionExp" className="text-sm text-gray-700">
                        I adopted an animal from this shelter
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h5 className="font-semibold text-gray-800">{review.userName}</h5>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            {review.adoptionExperience && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                Adopted Here
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700">{review.reviewText}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-gray-100 rounded-lg">
                        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Donate Tab */}
              {activeTab === 'donate' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Support This Shelter</h3>
                  <p className="text-gray-700">
                    Help {shelter.shelterName} continue their mission of rescuing and caring for animals.
                  </p>

                  {shelter.donationDetails && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-semibold text-green-900 mb-4">Donation Methods</h4>
                      <div className="space-y-3">
                        {shelter.donationDetails.upiId && (
                          <div className="bg-white p-3 rounded-lg">
                            <p className="text-sm text-gray-600">UPI ID</p>
                            <p className="font-mono text-gray-800">{shelter.donationDetails.upiId}</p>
                          </div>
                        )}
                        {shelter.donationDetails.bankName && (
                          <div className="bg-white p-3 rounded-lg">
                            <p className="text-sm text-gray-600">Bank Account</p>
                            <p className="font-semibold text-gray-800">{shelter.donationDetails.bankName}</p>
                            {shelter.donationDetails.accountNumber && (
                              <p className="text-sm text-gray-600">Account: {shelter.donationDetails.accountNumber}</p>
                            )}
                            {shelter.donationDetails.ifscCode && (
                              <p className="text-sm text-gray-600">IFSC: {shelter.donationDetails.ifscCode}</p>
                            )}
                          </div>
                        )}
                        {shelter.donationDetails.paypalEmail && (
                          <div className="bg-white p-3 rounded-lg">
                            <p className="text-sm text-gray-600">PayPal</p>
                            <p className="font-semibold text-gray-800">{shelter.donationDetails.paypalEmail}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      💡 Every donation helps provide food, medical care, and shelter to rescued animals.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Gallery */}
          {shelter.gallery?.length > 0 && (
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {shelter.gallery.map((media, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    {media.type === 'image' ? (
                      <img src={media.url} alt={media.caption} className="w-full h-40 object-cover" />
                    ) : (
                      <video src={media.url} className="w-full h-40 object-cover" />
                    )}
                    {media.caption && (
                      <div className="bg-gray-100 p-2">
                        <p className="text-sm text-gray-700">{media.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShelterProfile;
