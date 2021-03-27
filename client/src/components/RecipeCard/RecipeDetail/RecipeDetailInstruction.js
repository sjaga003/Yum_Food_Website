import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import size from '../../../responsiveStyles';

const RecipeDetailInstruction = ({ instruction, recipe }) => {
  return (
    <RecipeInstruction>
      <InstructionNumber>#{instruction.number}</InstructionNumber>
      <InstructionText>{instruction.step}</InstructionText>
    </RecipeInstruction>
  );
};

const RecipeInstruction = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  padding: 3rem;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    padding: 0;
    padding-bottom: 2rem;
  }
  @media (${size.xs}) {
  }
`;
const InstructionNumber = styled(motion.span)`
  font-size: 2.4rem;
  color: var(--highlight-color);
  margin-right: 6rem;
  font-family: var(--header-font);
  font-weight: 600;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    margin-right: 2rem;
    font-size: 2rem;
  }
  @media (${size.xs}) {
  }
`;
const InstructionText = styled(motion.span)`
  font-size: 1.8rem;
  color: var(--header-color);
  max-width: 60ch;
  width: 100%;
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

export default RecipeDetailInstruction;
