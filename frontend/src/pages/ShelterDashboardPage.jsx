import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LogOut, Plus, Edit2, Trash2, Upload, Eye, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ShelterDashboard = () => {
  const navigate = useNavigate();
  const [shelter, setShelter] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [posts, setPosts] = useState([]);
  const [availablePets, setAvailablePets] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Form states
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({});
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'update',
    media: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('shelterToken');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shelters/dashboard/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStats(response.data.stats);
      setShelter(response.data.shelter);
      setProfileFormData(response.data.shelter);
      
      // Fetch posts and pets
      fetchPosts(response.data.shelter._id);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      if (err.response?.status === 401) {
        navigate('/shelter-login');
      } else {
        toast.error('Failed to load dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async (shelterId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shelters/${shelterId}/posts`
      );
      setPosts(response.data.posts || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('shelterToken');
    localStorage.removeItem('shelterUser');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem('shelterToken');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/shelters/profile`,
        profileFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Profile updated successfully!');
      setEditingProfile(false);
      fetchDashboardData();
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile');
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const token = localStorage.getItem('shelterToken');
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shelters/posts/create`,
        newPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Post created successfully!');
      setNewPost({ title: '', content: '', category: 'update', media: [] });
      fetchPosts(shelter._id);
    } catch (err) {
      console.error('Error creating post:', err);
      toast.error('Failed to create post');
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const token = localStorage.getItem('shelterToken');
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/shelters/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Post deleted successfully!');
        fetchPosts(shelter._id);
      } catch (err) {
        console.error('Error deleting post:', err);
        toast.error('Failed to delete post');
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!shelter) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-xl text-gray-800 mb-4">Please login as a shelter to access this page</p>
          <a href="/shelter-login" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {shelter.profileImage && (
              <img
                src={shelter.profileImage}
                alt={shelter.shelterName}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{shelter.shelterName}</h1>
              <p className="text-sm text-gray-600">{shelter.city}, {shelter.state || 'State'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors hidden md:flex"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2"
            >
              <Menu className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 p-4 space-y-2">
            {['overview', 'profile', 'posts', 'pets', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setShowMobileMenu(false);
                }}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === tab
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Animals Rescued</p>
            <p className="text-3xl font-bold text-orange-500">{stats?.totalAnimalsRescued || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Successful Adoptions</p>
            <p className="text-3xl font-bold text-orange-500">{stats?.totalAdoptions || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Available Animals</p>
            <p className="text-3xl font-bold text-orange-500">{stats?.availablePets || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Average Rating</p>
            <p className="text-3xl font-bold text-orange-500">⭐ {stats?.averageRating || 5}</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="hidden md:flex gap-4 mb-6">
          {['overview', 'profile', 'posts', 'pets', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Shelter Information</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Name:</strong> {shelter.shelterName}</p>
                    <p><strong>Email:</strong> {shelter.email}</p>
                    <p><strong>Phone:</strong> {shelter.phone}</p>
                    <p><strong>City:</strong> {shelter.city}, {shelter.state}</p>
                    <p><strong>Account Type:</strong> <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{stats?.accountType}</span></p>
                    <p><strong>Verification Status:</strong> <span className={`px-2 py-1 rounded ${stats?.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{stats?.verificationStatus}</span></p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>Member Since:</strong> {new Date(stats?.joinDate).toLocaleDateString()}
                  </p>
                  <a href={`/shelter/${shelter._id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg">
                    <Eye className="w-5 h-5" />
                    View Public Profile
                  </a>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Tip</h4>
                <p className="text-blue-800">Keep your profile updated with recent posts, photos, and available animals to increase visibility and attract more adopters!</p>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  <Edit2 className="w-5 h-5" />
                  {editingProfile ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {editingProfile ? (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={profileFormData.shelterName || ''}
                      onChange={(e) => setProfileFormData({ ...profileFormData, shelterName: e.target.value })}
                      placeholder="Shelter Name"
                      className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="text"
                      value={profileFormData.phone || ''}
                      onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })}
                      placeholder="Phone"
                      className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="text"
                      value={profileFormData.city || ''}
                      onChange={(e) => setProfileFormData({ ...profileFormData, city: e.target.value })}
                      placeholder="City"
                      className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="text"
                      value={profileFormData.state || ''}
                      onChange={(e) => setProfileFormData({ ...profileFormData, state: e.target.value })}
                      placeholder="State"
                      className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <textarea
                    value={profileFormData.description || ''}
                    onChange={(e) => setProfileFormData({ ...profileFormData, description: e.target.value })}
                    placeholder="About your shelter"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                    rows="4"
                  />

                  <textarea
                    value={profileFormData.story || ''}
                    onChange={(e) => setProfileFormData({ ...profileFormData, story: e.target.value })}
                    placeholder="Your shelter's story"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                    rows="4"
                  />

                  <input
                    type="url"
                    value={profileFormData.website || ''}
                    onChange={(e) => setProfileFormData({ ...profileFormData, website: e.target.value })}
                    placeholder="Website"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                  />

                  <button
                    type="button"
                    onClick={handleProfileUpdate}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Shelter Name</label>
                      <p className="text-gray-800">{shelter.shelterName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Phone</label>
                      <p className="text-gray-800">{shelter.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">City</label>
                      <p className="text-gray-800">{shelter.city}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">State</label>
                      <p className="text-gray-800">{shelter.state}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">About</label>
                    <p className="text-gray-800">{shelter.description}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Manage Posts</h2>

              {/* Create Post Form */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Post</h3>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="Post Title"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                  />
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Post Content"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                    rows="4"
                  />
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                  >
                    <option value="update">Update</option>
                    <option value="event">Event</option>
                    <option value="success_story">Success Story</option>
                    <option value="appeal">Appeal</option>
                    <option value="news">News</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Create Post
                  </button>
                </form>
              </div>

              {/* Posts List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Your Posts ({posts.length})</h3>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div key={post._id} className="border border-gray-200 rounded-lg p-4 flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-gray-800">{post.title}</h4>
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full capitalize">
                            {post.category}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{post.content.substring(0, 100)}...</p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="ml-4 p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No posts yet. Create your first post!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pets Tab */}
          {activeTab === 'pets' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Manage Available Animals</h2>
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">Pet management coming soon!</p>
                <p className="text-sm text-gray-500">You can add pets from the adoption management section</p>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Reviews & Ratings</h2>
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">Reviews will appear here as users submit them</p>
                <p className="text-sm text-gray-500">Your current rating: {stats?.averageRating} ⭐ ({stats?.totalReviews} reviews)</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterDashboard;
