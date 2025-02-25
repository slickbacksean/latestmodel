import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from ..models.database import Base, get_db
from ..main import app

# Create in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite://"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db():
    """
    Create a fresh database for each test.
    """
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client(db):
    """
    Create a test client using the test database.
    """
    def override_get_db():
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()

@pytest.fixture(scope="function")
def test_user(client, db):
    """
    Create a test user.
    """
    user_data = {
        "email": "test@example.com",
        "password": "password123"
    }
    response = client.post("/auth/register", json=user_data)
    assert response.status_code == 200
    return response.json()

@pytest.fixture(scope="function")
def test_superuser(client, db):
    """
    Create a test superuser.
    """
    from ..models.models import User
    from ..utils.auth import get_password_hash
    
    superuser = User(
        email="admin@example.com",
        hashed_password=get_password_hash("admin123"),
        is_superuser=True
    )
    db.add(superuser)
    db.commit()
    db.refresh(superuser)
    return superuser

@pytest.fixture(scope="function")
def superuser_token(client, test_superuser):
    """
    Get authentication token for superuser.
    """
    response = client.post("/auth/login", data={
        "username": test_superuser.email,
        "password": "admin123"
    })
    assert response.status_code == 200
    return response.json()["access_token"] 