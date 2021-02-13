import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AllergyMarker = ({ iconName, labelName, external }) => {
  return (
    <AllergyContainer>
      <AllergyIconContainer>
        {external ? (
          <img src={iconName} alt={labelName} />
        ) : (
          <AllergyIcon icon={iconName} />
        )}
      </AllergyIconContainer>
      <AllergyLabel>{labelName}</AllergyLabel>
    </AllergyContainer>
  );
};

const AllergyContainer = styled(motion.div)`
  margin-bottom: 1.1rem;
  display: flex;
  flex-direction: row;
`;

const AllergyIconContainer = styled(motion.div)`
  width: 2rem;
  margin-right: 2rem;
  line-height: 1.6;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 1.4rem;
  }
`;
const AllergyIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  width: 1.8rem;
`;

const AllergyLabel = styled(motion.span)`
  font-size: 1.8rem;
`;

export default AllergyMarker;
