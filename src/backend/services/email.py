import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from typing import List
from dotenv import load_dotenv

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
FROM_EMAIL = os.getenv("FROM_EMAIL")

def send_email(to_email: str, subject: str, html_content: str) -> None:
    """
    Send an email using SMTP.
    """
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = FROM_EMAIL
    msg["To"] = to_email

    html_part = MIMEText(html_content, "html")
    msg.attach(html_part)

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise

def send_newsletter_email(subject: str, content: str) -> None:
    """
    Send a newsletter to all subscribers.
    """
    # In a real application, you would fetch subscribers from the database
    # For now, we'll use a placeholder list
    subscribers = ["subscriber@example.com"]  # Replace with actual subscriber list
    
    for subscriber in subscribers:
        send_email(
            subscriber,
            subject,
            content
        )

def send_subscription_confirmation_email(user_email: str, plan: str) -> None:
    """
    Send a subscription confirmation email.
    """
    subject = "Welcome to Your New AI Models Platform Subscription!"
    content = f"""
    <html>
        <body>
            <h2>Thank you for subscribing!</h2>
            <p>Your {plan} plan subscription has been activated.</p>
            <p>You now have access to all the features included in your plan.</p>
            <p>If you have any questions, please don't hesitate to contact our support team.</p>
        </body>
    </html>
    """
    send_email(user_email, subject, content)

def send_subscription_cancellation_email(user_email: str) -> None:
    """
    Send a subscription cancellation confirmation email.
    """
    subject = "Subscription Cancellation Confirmation"
    content = f"""
    <html>
        <body>
            <h2>Subscription Cancelled</h2>
            <p>Your subscription has been cancelled successfully.</p>
            <p>You will continue to have access until the end of your current billing period.</p>
            <p>We hope to see you again soon!</p>
        </body>
    </html>
    """
    send_email(user_email, subject, content)

def send_password_reset_email(user_email: str, reset_token: str) -> None:
    """
    Send a password reset email.
    """
    reset_url = f"https://your-domain.com/reset-password?token={reset_token}"
    subject = "Password Reset Request"
    content = f"""
    <html>
        <body>
            <h2>Password Reset Request</h2>
            <p>You have requested to reset your password.</p>
            <p>Click the link below to reset your password:</p>
            <p><a href="{reset_url}">Reset Password</a></p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>The link will expire in 1 hour.</p>
        </body>
    </html>
    """
    send_email(user_email, subject, content)

def send_welcome_email(user_email: str) -> None:
    """
    Send a welcome email to new users.
    """
    subject = "Welcome to AI Models Platform!"
    content = f"""
    <html>
        <body>
            <h2>Welcome to AI Models Platform!</h2>
            <p>Thank you for joining our community.</p>
            <p>Here are some things you can do to get started:</p>
            <ul>
                <li>Explore our collection of AI models</li>
                <li>Check out the tutorials</li>
                <li>Subscribe to our newsletter</li>
                <li>Join our community discussions</li>
            </ul>
            <p>If you have any questions, our support team is here to help!</p>
        </body>
    </html>
    """
    send_email(user_email, subject, content) 