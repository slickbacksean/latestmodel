import stripe
import os
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

def create_stripe_customer(email: str, payment_method_id: str) -> str:
    """
    Create a new customer in Stripe.
    """
    try:
        customer = stripe.Customer.create(
            email=email,
            payment_method=payment_method_id,
            invoice_settings={
                'default_payment_method': payment_method_id
            }
        )
        return customer.id
    except stripe.error.StripeError as e:
        print(f"Error creating Stripe customer: {e}")
        raise

def create_subscription(
    customer_id: str,
    price_id: str
) -> Dict[str, Any]:
    """
    Create a new subscription in Stripe.
    """
    try:
        subscription = stripe.Subscription.create(
            customer=customer_id,
            items=[{'price': price_id}],
            payment_behavior='default_incomplete',
            expand=['latest_invoice.payment_intent']
        )
        return {
            'subscription_id': subscription.id,
            'client_secret': subscription.latest_invoice.payment_intent.client_secret
        }
    except stripe.error.StripeError as e:
        print(f"Error creating subscription: {e}")
        raise

def cancel_subscription(subscription_id: str) -> Dict[str, Any]:
    """
    Cancel a subscription in Stripe.
    """
    try:
        subscription = stripe.Subscription.delete(subscription_id)
        return {
            'subscription_id': subscription.id,
            'status': subscription.status
        }
    except stripe.error.StripeError as e:
        print(f"Error cancelling subscription: {e}")
        raise

def update_subscription(
    subscription_id: str,
    price_id: str
) -> Dict[str, Any]:
    """
    Update a subscription's price in Stripe.
    """
    try:
        subscription = stripe.Subscription.retrieve(subscription_id)
        subscription = stripe.Subscription.modify(
            subscription_id,
            items=[{
                'id': subscription['items']['data'][0].id,
                'price': price_id,
            }]
        )
        return {
            'subscription_id': subscription.id,
            'status': subscription.status
        }
    except stripe.error.StripeError as e:
        print(f"Error updating subscription: {e}")
        raise

def process_payment(
    amount: float,
    payment_method: str,
    currency: str = 'usd'
) -> Dict[str, Any]:
    """
    Process a one-time payment using Stripe.
    """
    try:
        payment_intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),  # Convert to cents
            currency=currency,
            payment_method=payment_method,
            confirm=True
        )
        return {
            'payment_intent_id': payment_intent.id,
            'status': payment_intent.status
        }
    except stripe.error.StripeError as e:
        print(f"Error processing payment: {e}")
        raise

def create_refund(
    payment_intent_id: str,
    amount: float = None
) -> Dict[str, Any]:
    """
    Create a refund for a payment.
    """
    try:
        refund_params = {'payment_intent': payment_intent_id}
        if amount:
            refund_params['amount'] = int(amount * 100)  # Convert to cents
        
        refund = stripe.Refund.create(**refund_params)
        return {
            'refund_id': refund.id,
            'status': refund.status
        }
    except stripe.error.StripeError as e:
        print(f"Error creating refund: {e}")
        raise

def get_subscription_status(subscription_id: str) -> Dict[str, Any]:
    """
    Get the status of a subscription.
    """
    try:
        subscription = stripe.Subscription.retrieve(subscription_id)
        return {
            'subscription_id': subscription.id,
            'status': subscription.status,
            'current_period_end': subscription.current_period_end
        }
    except stripe.error.StripeError as e:
        print(f"Error retrieving subscription status: {e}")
        raise

def handle_webhook_event(payload: Dict[str, Any], sig_header: str) -> Dict[str, Any]:
    """
    Handle Stripe webhook events.
    """
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
        
        # Handle specific event types
        if event.type == 'payment_intent.succeeded':
            payment_intent = event.data.object
            # Handle successful payment
            print(f"Payment succeeded: {payment_intent.id}")
        elif event.type == 'payment_intent.payment_failed':
            payment_intent = event.data.object
            # Handle failed payment
            print(f"Payment failed: {payment_intent.id}")
        elif event.type == 'customer.subscription.deleted':
            subscription = event.data.object
            # Handle subscription cancellation
            print(f"Subscription cancelled: {subscription.id}")
        elif event.type == 'customer.subscription.updated':
            subscription = event.data.object
            # Handle subscription update
            print(f"Subscription updated: {subscription.id}")
        
        return {'status': 'success', 'event_type': event.type}
    except ValueError as e:
        print(f"Invalid payload: {e}")
        raise
    except stripe.error.SignatureVerificationError as e:
        print(f"Invalid signature: {e}")
        raise 