# 🧪 Shelter Connect - API Testing Guide

This guide provides curl commands and request examples for testing all Shelter Connect endpoints.

---

## 🔐 Authentication Endpoints

### 1. Register a New Shelter
```bash
curl -X POST http://localhost:8001/api/shelters/register \
  -H "Content-Type: application/json" \
  -d '{
    "shelterName": "Happy Paws Animal Shelter",
    "email": "contact@happypaws.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!",
    "phone": "+91-9876543210",
    "address": "123 Pet Avenue, Delhi",
    "city": "Delhi",
    "state": "Delhi",
    "zipCode": "110001",
    "description": "We rescue and provide loving homes for abandoned animals",
    "registrationNumber": "NGO-12345-2024"
  }'
```

**Expected Response:**
```json
{
  "message": "Shelter registered successfully",
  "shelter": {
    "_id": "507f1f77bcf86cd799439011",
    "shelterName": "Happy Paws Animal Shelter",
    "email": "contact@happypaws.com",
    "city": "Delhi",
    "isVerified": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Login to Shelter Account
```bash
curl -X POST http://localhost:8001/api/shelters/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "contact@happypaws.com",
    "password": "SecurePass123!"
  }'
```

**Store the token from response:**
```bash
TOKEN="your_token_here"
```

---

### 3. Get Current Shelter Profile
```bash
curl -X GET http://localhost:8001/api/shelters/profile \
  -H "Authorization: Bearer $TOKEN"
```

---

### 4. Update Shelter Profile
```bash
curl -X PUT http://localhost:8001/api/shelters/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "shelterName": "Happy Paws Animal Shelter",
    "phone": "+91-9876543210",
    "city": "Delhi",
    "state": "Delhi",
    "description": "Updated description",
    "story": "Founded in 2020, we have rescued over 500 animals",
    "website": "https://happypaws.com",
    "foundedYear": 2020
  }'
```

---

### 5. Logout Shelter
```bash
curl -X POST http://localhost:8001/api/shelters/logout
```

---

## 📍 Public Shelter Endpoints

### 1. Get All Verified Shelters (Paginated)
```bash
# Basic request
curl -X GET "http://localhost:8001/api/shelters/list"

# With pagination
curl -X GET "http://localhost:8001/api/shelters/list?page=1&limit=10"

# With search
curl -X GET "http://localhost:8001/api/shelters/list?search=Happy&city=Delhi"

# With sorting
curl -X GET "http://localhost:8001/api/shelters/list?sortBy=createdAt"
```

---

### 2. Get Nearby Shelters (Geospatial)
```bash
# Get shelters within 50km
curl -X GET "http://localhost:8001/api/shelters/nearby?longitude=77.209&latitude=28.6139&distance=50"

# Get shelters within 100km
curl -X GET "http://localhost:8001/api/shelters/nearby?longitude=77.209&latitude=28.6139&distance=100"
```

**Note:** 
- Longitude and latitude must be provided
- Distance is in kilometers
- Returns shelters in ascending order of distance

---

### 3. Get Single Shelter Details
```bash
curl -X GET "http://localhost:8001/api/shelters/507f1f77bcf86cd799439011"
```

---

## 📝 Shelter Posts Endpoints

### 1. Create a Post
```bash
curl -X POST http://localhost:8001/api/shelters/posts/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "5 Dogs Available for Adoption",
    "content": "We have 5 beautiful dogs looking for loving homes. All are vaccinated and ready to join your family!",
    "category": "update",
    "media": [
      {
        "url": "https://example.com/image1.jpg",
        "type": "image"
      },
      {
        "url": "https://example.com/image2.jpg",
        "type": "image"
      }
    ]
  }'
```

**Categories:** `update`, `event`, `success_story`, `appeal`, `news`

---

### 2. Get Shelter Posts
```bash
# Get all posts for a shelter
curl -X GET "http://localhost:8001/api/shelters/507f1f77bcf86cd799439011/posts"

# With pagination
curl -X GET "http://localhost:8001/api/shelters/507f1f77bcf86cd799439011/posts?page=1&limit=5"
```

---

### 3. Delete a Post
```bash
curl -X DELETE http://localhost:8001/api/shelters/posts/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🐾 Available Pets Endpoints

### 1. Add Pet to Shelter
```bash
curl -X POST http://localhost:8001/api/shelters/pets/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "petId": "507f1f77bcf86cd799439013"
  }'
```

---

### 2. Remove Pet from Shelter
```bash
curl -X DELETE "http://localhost:8001/api/shelters/pets/507f1f77bcf86cd799439013" \
  -H "Authorization: Bearer $TOKEN"
```

---

## ⭐ Reviews Endpoints

### 1. Get Shelter Reviews
```bash
# Get all reviews
curl -X GET "http://localhost:8001/api/shelters/507f1f77bcf86cd799439011/reviews"

# With pagination
curl -X GET "http://localhost:8001/api/shelters/507f1f77bcf86cd799439011/reviews?page=1&limit=10"
```

---

### 2. Create a Review
```bash
curl -X POST http://localhost:8001/api/shelters/507f1f77bcf86cd799439011/reviews/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "rating": 5,
    "reviewText": "Amazing experience! The staff was very helpful and my adopted dog is so happy!",
    "adoptionExperience": true
  }'
```

**Rating:** 1-5 (integer)

---

## 📊 Dashboard Endpoints

### 1. Get Dashboard Statistics
```bash
curl -X GET http://localhost:8001/api/shelters/dashboard/stats \
  -H "Authorization: Bearer $TOKEN"
```

**Response includes:**
```json
{
  "message": "Dashboard stats fetched successfully",
  "stats": {
    "totalAnimalsRescued": 250,
    "totalAdoptions": 180,
    "totalPosts": 45,
    "totalReviews": 32,
    "averageRating": 4.8,
    "availablePets": 15,
    "isVerified": false,
    "verificationStatus": "pending",
    "accountType": "free",
    "joinDate": "2024-01-15T10:30:00Z"
  },
  "shelter": {
    "_id": "507f1f77bcf86cd799439011",
    "shelterName": "Happy Paws",
    "profileImage": "...",
    "city": "Delhi",
    "email": "..."
  }
}
```

---

## 📤 Media Upload Endpoint

### Upload Shelter Media
```bash
curl -X POST http://localhost:8001/api/shelters/media/upload \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "mediaUrl": "https://example.com/image.jpg",
    "type": "image",
    "imageType": "profile",
    "caption": "Our shelter"
  }'
```

**Parameters:**
- `mediaUrl`: URL of the image/video
- `type`: "image" or "video"
- `imageType`: "profile" (profile pic), "cover" (cover image), or omit for gallery
- `caption`: Optional description

---

## 🧪 Testing Workflow

### Complete Test Scenario

**Step 1: Register a Shelter**
```bash
# Save the response token
TOKEN=$(curl -s -X POST http://localhost:8001/api/shelters/register \
  -H "Content-Type: application/json" \
  -d '{...}' | jq -r '.token')

echo $TOKEN
```

**Step 2: Update Profile**
```bash
curl -X PUT http://localhost:8001/api/shelters/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{...}'
```

**Step 3: Create Post**
```bash
curl -X POST http://localhost:8001/api/shelters/posts/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{...}'
```

**Step 4: Get Dashboard Stats**
```bash
curl -X GET http://localhost:8001/api/shelters/dashboard/stats \
  -H "Authorization: Bearer $TOKEN"
```

**Step 5: Query from Another User**
```bash
# Get all shelters (public endpoint, no auth needed)
curl -X GET "http://localhost:8001/api/shelters/list"

# Get details of the registered shelter
curl -X GET "http://localhost:8001/api/shelters/{shelter-id}"
```

---

## 🔧 Using Postman

### Setup in Postman

1. **Create Environment Variable**
   - Click "Environment" → "Globals"
   - Add variable: `api_url` = `http://localhost:8001`
   - Add variable: `token` = (leave empty initially)

2. **After Login/Register**
   - Copy token from response
   - Set environment `token` variable to the token

3. **Use in Requests**
   - Base URL: `{{api_url}}/api/shelters/...`
   - Auth header: `Bearer {{token}}`

### Example Postman Collection

```json
{
  "info": {
    "name": "Shelter Connect API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register Shelter",
      "request": {
        "method": "POST",
        "url": "{{api_url}}/api/shelters/register",
        "body": {
          "mode": "raw",
          "raw": "{...}"
        }
      }
    }
  ]
}
```

---

## 🐛 Common Test Errors & Solutions

### Error: "CORS error"
**Solution:** Ensure backend is running and frontend URL is in `allowedOrigins`

### Error: "Invalid token"
**Solution:** 
- Copy token correctly from response
- Ensure token format is correct: `Bearer <token>`
- Token may have expired (regenerate)

### Error: "Shelter not found"
**Solution:** Use correct shelter ID from registration response

### Error: "Geolocation query failed"
**Solution:** 
- Verify `longitude` and `latitude` parameters are numbers
- Check that registered shelters have coordinates in DB

---

## 📊 Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (not authorized for action) |
| 404 | Not Found |
| 500 | Server Error |

---

## 💡 Testing Tips

1. **Use jq for JSON parsing** (if available):
   ```bash
   curl ... | jq '.token'
   ```

2. **Save responses to file**:
   ```bash
   curl ... > response.json
   ```

3. **Use verbose mode for debugging**:
   ```bash
   curl -v ...
   ```

4. **Time API responses**:
   ```bash
   curl -w "@curl-format.txt" ...
   ```

---

## 🔒 Security Testing

### 1. Test Authorization (Should Fail)
```bash
# Without token - should get 401
curl -X GET http://localhost:8001/api/shelters/dashboard/stats

# With invalid token - should get 403
curl -X GET http://localhost:8001/api/shelters/dashboard/stats \
  -H "Authorization: Bearer invalid-token"
```

### 2. Test Ownership (Should Fail)
```bash
# Try to delete post from another shelter's token
# Should get 403 Forbidden
```

### 3. Test Input Validation (Should Fail)
```bash
# Register without required fields - should get 400
curl -X POST http://localhost:8001/api/shelters/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
    # Missing other required fields
  }'
```

---

## ✨ Sample Data for Testing

```javascript
const testShelter = {
  shelterName: "Test Shelter " + Date.now(),
  email: "test" + Date.now() + "@shelter.com",
  password: "TestPassword123!",
  confirmPassword: "TestPassword123!",
  phone: "+91-9999999999",
  address: "123 Test Street",
  city: "Test City",
  state: "Test State",
  zipCode: "123456",
  description: "Test shelter for API testing"
};

const testPost = {
  title: "Test Post - " + new Date().toLocaleString(),
  content: "This is a test post for API testing",
  category: "update",
  media: []
};

const testReview = {
  rating: 5,
  reviewText: "Great shelter! Highly recommend.",
  adoptionExperience: true
};
```

---

**Happy Testing! 🧪**

For issues or questions, check the main implementation guide: `SHELTER_CONNECT_GUIDE.md`
