import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import size from '../../../styles/responsiveStyles';

const AllergyMarker = ({ iconName, labelName, external }) => {
  return (
    <AllergyContainer data-testid="allergy-marker-container">
      <AllergyIconContainer data-testid="allergy-marker-icon-container">
        {external ? (
          iconName
        ) : (
          <AllergyIcon data-testid="allergy-marker-icon" icon={iconName} />
        )}
      </AllergyIconContainer>
      <AllergyLabel data-testid="allergy-marker-label">
        {labelName}
      </AllergyLabel>
    </AllergyContainer>
  );
};

const AllergyContainer = styled(motion.div)`
  margin-bottom: 1.1rem;
  display: flex;
  flex-direction: row;
  color: var(--text-color);
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
  @media (${size.xs}) {
  }
`;

const AllergyIconContainer = styled(motion.div)`
  width: 2rem;
  margin-right: 2rem;
  line-height: 1.6;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 1.4rem;
    color: var(--text-color);
  }
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    width: 1.5rem;
    svg {
      width: 1.2rem;
    }
  }
  @media (${size.sm}) {
    margin-right: 1rem;
  }
  @media (${size.xs}) {
  }
`;
const AllergyIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  width: 1.8rem;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    width: 1.2rem;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const AllergyLabel = styled(motion.span)`
  font-size: 1.8rem;
  color: var(--text-color);
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    font-size: 1.6rem;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

export default AllergyMarker;
