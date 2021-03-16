import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AllergyMarker = ({ iconName, labelName, external }) => {
  return (
    <AllergyContainer>
      <AllergyIconContainer>
        {external ? iconName : <AllergyIcon icon={iconName} />}
      </AllergyIconContainer>
      <AllergyLabel>{labelName}</AllergyLabel>
    </AllergyContainer>
  );
};

const AllergyContainer = styled(motion.div)`
  margin-bottom: 1.1rem;
  display: flex;
  flex-direction: row;
  color: var(--text-color);
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
`;
const AllergyIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  width: 1.8rem;
`;

const AllergyLabel = styled(motion.span)`
  font-size: 1.8rem;
  color: var(--text-color);
`;

export default AllergyMarker;
