import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

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
`;
const InstructionNumber = styled(motion.span)`
  font-weight: 600;
  font-size: 2.4rem;
  color: var(--highlight-color);
  margin-right: 6rem;
`;
const InstructionText = styled(motion.span)`
  font-size: 1.8rem;
`;

export default RecipeDetailInstruction;
