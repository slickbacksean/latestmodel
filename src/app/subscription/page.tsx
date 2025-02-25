"use client";

import styled from 'styled-components';
import { motion } from 'framer-motion';

const SubscriptionContainer = styled.div`
  padding: 2rem;
  color: #fff;
`;

const Header = styled.div`
  margin-bottom: 4rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #fff;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #999;
  max-width: 600px;
  margin: 0 auto;
`;

const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
`;

interface PlanCardProps {
  featured?: boolean;
}

const PlanCard = styled(motion.div)<PlanCardProps>`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  
  ${props => props.featured && `
    border: 2px solid #6b73ff;
    position: relative;
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #6b73ff;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
    }
  `}
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const PlanPrice = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 1rem 0;
  color: #fff;
  
  span {
    font-size: 1rem;
    color: #999;
  }
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  flex-grow: 1;
`;

const PlanFeature = styled.li`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  
  &::before {
    content: '✓';
    color: #6b73ff;
    font-weight: bold;
  }
`;

interface SubscribeButtonProps {
  isPrimary?: boolean;
}

const SubscribeButton = styled.button<SubscribeButtonProps>`
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.isPrimary ? `
    background: #6b73ff;
    color: white;
    &:hover {
      background: #8388ff;
    }
  ` : `
    background: transparent;
    color: #6b73ff;
    border: 2px solid #6b73ff;
    &:hover {
      background: rgba(107, 115, 255, 0.1);
    }
  `}
`;

// Create a wrapper component to handle the DOM props
const SubscribeButtonWrapper = ({ isPrimary, ...props }: SubscribeButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <SubscribeButton isPrimary={isPrimary} {...props} />
);

const plans = [
  {
    name: 'Free',
    price: '0',
    features: [
      'Basic newsletter access',
      'Limited API access',
      'Community forum access',
      'Basic tutorials',
    ],
    featured: false,
  },
  {
    name: 'Pro',
    price: '20',
    features: [
      'Everything in Free',
      'Ad-free experience',
      'Priority support',
      'Synthetic data access',
      'Advanced tutorials',
      'API key with higher limits',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Everything in Pro',
      'Custom API endpoints',
      'Compliance reporting',
      'Dedicated support',
      'Custom integrations',
      'Team management',
    ],
    featured: false,
  },
];

export default function SubscriptionPage() {
  return (
    <SubscriptionContainer>
      <Header>
        <Title>Choose Your Plan</Title>
        <Description>
          Select the perfect plan for your needs. Upgrade or downgrade at any time.
        </Description>
      </Header>

      <PlansContainer>
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            featured={plan.featured}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <PlanName>{plan.name}</PlanName>
            <PlanPrice>
              {plan.price === 'Custom' ? (
                'Custom'
              ) : (
                <>
                  ${plan.price}
                  <span>/month</span>
                </>
              )}
            </PlanPrice>
            <PlanFeatures>
              {plan.features.map((feature, featureIndex) => (
                <PlanFeature key={featureIndex}>{feature}</PlanFeature>
              ))}
            </PlanFeatures>
            <SubscribeButtonWrapper isPrimary={plan.featured}>
              {plan.price === 'Custom' ? 'Contact Sales' : 'Subscribe Now'}
            </SubscribeButtonWrapper>
          </PlanCard>
        ))}
      </PlansContainer>
    </SubscriptionContainer>
  );
} 