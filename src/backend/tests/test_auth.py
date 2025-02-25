def test_register(client):
    response = client.post("/auth/register", json={
        "email": "newuser@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "newuser@example.com"
    assert "id" in data

def test_register_duplicate_email(client, test_user):
    response = client.post("/auth/register", json={
        "email": "test@example.com",  # Same email as test_user
        "password": "password123"
    })
    assert response.status_code == 400
    assert "already exists" in response.json()["detail"]

def test_login(client, test_user):
    response = client.post("/auth/login", data={
        "username": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"

def test_login_wrong_password(client, test_user):
    response = client.post("/auth/login", data={
        "username": "test@example.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 400
    assert "Incorrect email or password" in response.json()["detail"]

def test_get_current_user(client, test_user):
    # First login to get the token
    login_response = client.post("/auth/login", data={
        "username": "test@example.com",
        "password": "password123"
    })
    token = login_response.json()["access_token"]
    
    # Then use the token to get current user info
    response = client.get("/auth/me", headers={
        "Authorization": f"Bearer {token}"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"

def test_get_current_user_invalid_token(client):
    response = client.get("/auth/me", headers={
        "Authorization": "Bearer invalid_token"
    })
    assert response.status_code == 401
    assert "Could not validate credentials" in response.json()["detail"] 