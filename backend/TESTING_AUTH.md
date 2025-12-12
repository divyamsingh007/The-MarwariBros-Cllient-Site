# 🧪 Authentication Testing Guide

## Quick Test Commands

### 1. Login as Admin

```bash
curl -X POST http://localhost:8080/api/v1/users/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d "{
    \"email\": \"sanketsinghsameer@proton.me\",
    \"password\": \"@1234Asdf\"
  }"
```

**Expected Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "...",
      "firstName": "Sanket",
      "lastName": "Singh",
      "email": "sanketsinghsameer@proton.me",
      "role": "admin"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

### 2. Get Current User (Protected Route)

**Using cookies:**
```bash
curl -X GET http://localhost:8080/api/v1/users/me \
  -b cookies.txt
```

**Using Authorization header:**
```bash
curl -X GET http://localhost:8080/api/v1/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

### 3. Access Admin Dashboard (Admin Only)

```bash
curl -X GET http://localhost:8080/api/v1/admin/dashboard \
  -b cookies.txt
```

### 4. Try to Access Admin Route Without Auth (Should Fail)

```bash
curl -X GET http://localhost:8080/api/v1/admin/dashboard
```

**Expected Response:**
```json
{
  "statusCode": 401,
  "success": false,
  "message": "Unauthorized request - No token provided"
}
```

### 5. Try to Access Admin Route as Customer (Should Fail)

First, register a customer:
```bash
curl -X POST http://localhost:8080/api/v1/users/register \
  -H "Content-Type: application/json" \
  -c customer-cookies.txt \
  -d "{
    \"firstName\": \"Test\",
    \"lastName\": \"Customer\",
    \"email\": \"customer@test.com\",
    \"password\": \"Test1234\",
    \"phone\": \"9876543210\"
  }"
```

Try to access admin route:
```bash
curl -X GET http://localhost:8080/api/v1/admin/dashboard \
  -b customer-cookies.txt
```

**Expected Response:**
```json
{
  "statusCode": 403,
  "success": false,
  "message": "Access denied. Required role: admin. Your role: customer"
}
```

### 6. Refresh Token

```bash
curl -X POST http://localhost:8080/api/v1/users/refresh-token \
  -H "Content-Type: application/json" \
  -d "{
    \"refreshToken\": \"YOUR_REFRESH_TOKEN_HERE\"
  }"
```

### 7. Logout

```bash
curl -X POST http://localhost:8080/api/v1/users/logout \
  -b cookies.txt
```

---

## PowerShell Testing (Windows)

If you're using PowerShell, use these commands instead:

### Login
```powershell
$body = @{
    email = "sanketsinghsameer@proton.me"
    password = "@1234Asdf"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/users/login" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" `
    -SessionVariable session

$data = $response.Content | ConvertFrom-Json
$token = $data.data.accessToken
Write-Host "Access Token: $token"
```

### Get Current User
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:8080/api/v1/users/me" `
    -Method GET `
    -Headers $headers
```

### Get Admin Dashboard
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/v1/admin/dashboard" `
    -Method GET `
    -Headers $headers
```

---

## Postman Collection

### 1. Create Environment Variables
- `BASE_URL`: `http://localhost:8080/api/v1`
- `ACCESS_TOKEN`: (will be auto-set after login)

### 2. Login Request

**POST** `{{BASE_URL}}/users/login`

Body (JSON):
```json
{
  "email": "sanketsinghsameer@proton.me",
  "password": "@1234Asdf"
}
```

Tests (to auto-save token):
```javascript
const response = pm.response.json();
if (response.success) {
    pm.environment.set("ACCESS_TOKEN", response.data.accessToken);
}
```

### 3. Get Current User

**GET** `{{BASE_URL}}/users/me`

Headers:
```
Authorization: Bearer {{ACCESS_TOKEN}}
```

### 4. Get Admin Dashboard

**GET** `{{BASE_URL}}/admin/dashboard`

Headers:
```
Authorization: Bearer {{ACCESS_TOKEN}}
```

---

## Test Scenarios

### ✅ Success Cases

1. **Register new user** → Returns 201 with tokens
2. **Login with correct credentials** → Returns 200 with tokens
3. **Access protected route with valid token** → Returns 200 with data
4. **Admin accesses admin route** → Returns 200 with data
5. **Refresh token with valid refresh token** → Returns new tokens

### ❌ Failure Cases

1. **Access protected route without token** → 401 Unauthorized
2. **Access admin route as customer** → 403 Forbidden
3. **Login with wrong password** → 401 Invalid credentials
4. **Use expired token** → 401 Token expired
5. **Use invalid token** → 401 Invalid token
6. **Refresh with invalid refresh token** → 401 Invalid refresh token

---

## Testing Checklist

- [ ] User can register
- [ ] User can login
- [ ] User receives both access and refresh tokens
- [ ] Tokens are set as HTTP-only cookies
- [ ] User can access their profile (GET /users/me)
- [ ] User cannot access protected routes without token
- [ ] Admin can access admin routes
- [ ] Customer cannot access admin routes
- [ ] User can refresh their access token
- [ ] User can logout (tokens cleared)
- [ ] Invalid tokens are rejected
- [ ] Expired tokens are rejected

---

## Troubleshooting

### Issue: "Unauthorized request - No token provided"
- **Cause**: No token in cookies or Authorization header
- **Solution**: Include token in request or login first

### Issue: "Invalid access token"
- **Cause**: Token is malformed or tampered
- **Solution**: Login again to get a new token

### Issue: "Access token has expired"
- **Cause**: Token lifetime exceeded (1 day)
- **Solution**: Use refresh token to get new access token

### Issue: "Access denied. Required role: admin"
- **Cause**: User doesn't have required role
- **Solution**: Login with admin account

### Issue: "CORS error"
- **Cause**: Frontend and backend on different origins
- **Solution**: Update CORS_ORIGIN in .env file

---

**Ready to test! 🚀**
