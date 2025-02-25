from models.database import init_db, engine, Base
from models.models import AIModel, User, Tutorial, Newsletter, Subscription, Tool

def main():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

if __name__ == "__main__":
    main() 