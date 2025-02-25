from unittest.mock import patch, MagicMock
from ..services.tasks import (
    send_newsletter_task,
    send_subscription_confirmation_task,
    send_subscription_cancellation_task,
    send_welcome_email_task,
    update_ai_models_task
)

def test_send_newsletter_task():
    with patch('services.email.send_newsletter_email') as mock_send:
        subject = "Test Newsletter"
        content = "Test Content"
        
        send_newsletter_task(subject, content)
        
        mock_send.assert_called_once_with(subject, content)

def test_send_subscription_confirmation_task():
    with patch('services.email.send_subscription_confirmation_email') as mock_send:
        email = "test@example.com"
        plan = "pro"
        
        send_subscription_confirmation_task(email, plan)
        
        mock_send.assert_called_once_with(email, plan)

def test_send_subscription_cancellation_task():
    with patch('services.email.send_subscription_cancellation_email') as mock_send:
        email = "test@example.com"
        
        send_subscription_cancellation_task(email)
        
        mock_send.assert_called_once_with(email)

def test_send_welcome_email_task():
    with patch('services.email.send_welcome_email') as mock_send:
        email = "test@example.com"
        
        send_welcome_email_task(email)
        
        mock_send.assert_called_once_with(email)

def test_update_ai_models_task():
    with patch('services.scraper.scrape_all_models') as mock_scrape:
        update_ai_models_task()
        
        mock_scrape.assert_called_once() 