from ..models.models import AIModel

def test_list_models(client, db, test_user):
    # Add some test models
    models = [
        AIModel(
            name="Test Model 1",
            creator="Test Creator",
            category="text-generation",
            description="Test description 1",
            metrics={"speed": "fast", "size": "small"}
        ),
        AIModel(
            name="Test Model 2",
            creator="Test Creator",
            category="image-generation",
            description="Test description 2",
            metrics={"speed": "medium", "size": "large"}
        )
    ]
    for model in models:
        db.add(model)
    db.commit()

    # Get models list
    response = client.get("/models/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["name"] == "Test Model 1"
    assert data[1]["name"] == "Test Model 2"

def test_list_models_with_filters(client, db, test_user):
    # Add test models
    models = [
        AIModel(
            name="Text Model",
            creator="Creator A",
            category="text-generation",
            description="A text model",
            metrics={"speed": "fast"}
        ),
        AIModel(
            name="Image Model",
            creator="Creator B",
            category="image-generation",
            description="An image model",
            metrics={"speed": "medium"}
        )
    ]
    for model in models:
        db.add(model)
    db.commit()

    # Test category filter
    response = client.get("/models/?category=text-generation")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Text Model"

    # Test search filter
    response = client.get("/models/?search=image")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Image Model"

def test_create_model(client, db, superuser_token):
    model_data = {
        "name": "New Model",
        "creator": "Test Creator",
        "category": "text-generation",
        "description": "A new test model",
        "metrics": {"speed": "fast", "size": "small"},
        "access_level": "free"
    }

    response = client.post(
        "/models/",
        json=model_data,
        headers={"Authorization": f"Bearer {superuser_token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == model_data["name"]
    assert data["creator"] == model_data["creator"]

def test_create_model_unauthorized(client, db, test_user):
    # Get regular user token
    login_response = client.post("/auth/login", data={
        "username": "test@example.com",
        "password": "password123"
    })
    token = login_response.json()["access_token"]

    model_data = {
        "name": "New Model",
        "creator": "Test Creator",
        "category": "text-generation",
        "description": "A new test model",
        "metrics": {"speed": "fast"},
        "access_level": "free"
    }

    response = client.post(
        "/models/",
        json=model_data,
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 403

def test_get_model(client, db, test_user):
    # Create a test model
    model = AIModel(
        name="Test Model",
        creator="Test Creator",
        category="text-generation",
        description="Test description",
        metrics={"speed": "fast"}
    )
    db.add(model)
    db.commit()

    response = client.get(f"/models/{model.id}")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Model"
    assert data["creator"] == "Test Creator"

def test_get_nonexistent_model(client, test_user):
    response = client.get("/models/nonexistent-id")
    assert response.status_code == 404 