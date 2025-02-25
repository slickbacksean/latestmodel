from celery import Celery
from celery.schedules import crontab
from .email import (
    send_newsletter_email,
    send_subscription_confirmation_email,
    send_subscription_cancellation_email,
    send_welcome_email
)
from .model_scraper import scrape_specific_model, scrape_models

# Create Celery instance
celery = Celery(
    "ai_platform",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

# Configure Celery
celery.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

@celery.task
async def send_newsletter_task(subject: str, content: str) -> None:
    """Send newsletter to all subscribers."""
    send_newsletter_email(subject, content)

@celery.task
async def send_subscription_confirmation_task(user_email: str, plan: str) -> None:
    """Send subscription confirmation email."""
    send_subscription_confirmation_email(user_email, plan)

@celery.task
async def send_subscription_cancellation_task(user_email: str) -> None:
    """Send subscription cancellation email."""
    send_subscription_cancellation_email(user_email)

@celery.task
async def send_welcome_email_task(user_email: str) -> None:
    """Send welcome email to new users."""
    send_welcome_email(user_email)

@celery.task
async def scrape_specific_model_task(model_id: str) -> None:
    """Scrape a specific model."""
    await scrape_specific_model(model_id)

@celery.task
async def scrape_models_task() -> None:
    """Scrape all models."""
    await scrape_models()

# Periodic tasks configuration
@celery.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    # Run model updates daily at 5 AM
    sender.add_periodic_task(
        crontab(hour=5, minute=0),
        scrape_models_task.s(),
        name='update-ai-models-daily'
    ) 