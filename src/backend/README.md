# AI Models Platform Backend

This is the backend service for the AI Models Platform, built with FastAPI, PostgreSQL, and various third-party services.

## Features

- User authentication and authorization
- AI models management and discovery
- AI tools catalog
- User-generated tutorials
- Newsletter system
- Subscription management with Stripe
- Email notifications
- Background tasks processing

## Prerequisites

- Python 3.8+
- PostgreSQL
- Redis (for background tasks)
- SMTP server access (for emails)
- Stripe account (for payments)
- Replicate API key
- Hugging Face API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ai-models-platform.git
cd ai-models-platform/src/backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Copy the environment variables file and update it with your values:
```bash
cp .env.example .env
```

5. Set up the database:
```bash
# Create a new PostgreSQL database
createdb ai_models_platform

# The tables will be automatically created when you run the application
```

## Configuration

Update the `.env` file with your configuration:

- Database connection
- JWT secret key
- SMTP server details
- Stripe API keys
- External API keys
- Redis connection
- Other configuration options

## Running the Application

1. Start the development server:
```bash
uvicorn main:app --reload
```

2. The API will be available at `http://localhost:8000`
3. API documentation will be available at:
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- POST `/auth/register` - Register a new user
- POST `/auth/login` - Login and get access token
- GET `/auth/me` - Get current user info

### Models
- GET `/models` - List AI models
- POST `/models` - Create a new model (admin only)
- GET `/models/{id}` - Get model details
- PUT `/models/{id}` - Update a model (admin only)
- DELETE `/models/{id}` - Delete a model (admin only)

### Tools
- GET `/tools` - List AI tools
- POST `/tools` - Create a new tool (admin only)
- GET `/tools/{id}` - Get tool details
- PUT `/tools/{id}` - Update a tool (admin only)
- DELETE `/tools/{id}` - Delete a tool (admin only)

### Tutorials
- GET `/tutorials` - List tutorials
- POST `/tutorials` - Create a new tutorial
- GET `/tutorials/{id}` - Get tutorial details
- PUT `/tutorials/{id}` - Update a tutorial (author only)
- DELETE `/tutorials/{id}` - Delete a tutorial (author only)
- POST `/tutorials/{id}/upvote` - Upvote a tutorial

### Newsletters
- GET `/newsletters` - List newsletters
- POST `/newsletters` - Create a new newsletter (admin only)
- GET `/newsletters/{id}` - Get newsletter details
- POST `/newsletters/{id}/send` - Send a newsletter (admin only)

### Subscriptions
- GET `/subscriptions/my` - Get current subscription
- POST `/subscriptions` - Create a new subscription
- PUT `/subscriptions/my` - Update subscription
- DELETE `/subscriptions/my` - Cancel subscription

## Background Tasks

The application uses Celery for processing background tasks:

- Sending emails
- Processing newsletter campaigns
- Updating model information from external APIs
- Handling webhook events

To start the Celery worker:
```bash
celery -A worker worker --loglevel=info
```

## Testing

Run the test suite:
```bash
pytest
```

## Deployment

1. Set up a production PostgreSQL database
2. Configure environment variables for production
3. Set up a reverse proxy (e.g., Nginx)
4. Use Gunicorn for production:
```bash
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 