import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const RecipeDetailInstruction = ({ instruction, recipe }) => {
  return (
    <RecipeInstruction
      key={`RecipeInstruction-${recipe.key}-${instruction.number}`}
    >
      <InstructionNumber>#{instruction.number}</InstructionNumber>
      <InstructionText>{instruction.step}</InstructionText>
    </RecipeInstruction>
  );
};

const RecipeInstruction = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  padding: 30px;
`;
const InstructionNumber = styled(motion.span)`
  font-weight: 600;
  font-size: 24px;
  color: var(--highlight-color);
  margin-right: 100px;
`;
const InstructionText = styled(motion.span)`
  font-size: 18px;
`;

export default RecipeDetailInstruction;
