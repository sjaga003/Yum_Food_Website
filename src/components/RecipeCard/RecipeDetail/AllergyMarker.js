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
  margin-bottom: 11px;
  display: flex;
  flex-direction: row;
`;

const AllergyIconContainer = styled(motion.div)`
  width: 30px;
  text-align: center;
`;
const AllergyIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  width: 18px;
`;

const AllergyLabel = styled(motion.span)``;

export default AllergyMarker;
