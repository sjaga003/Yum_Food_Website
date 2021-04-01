import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { loadPreviewRecipes } from '../../../actions/recipeCardsAction';
import size from '../../../styles/responsiveStyles';

const RecipePreviewButton = ({
  name,
  recipes,
  setActiveButton,
  activeButton,
}) => {
  const dispatch = useDispatch();

  return (
    <Button
      name={name}
      active={activeButton === name}
      onClick={() => {
        dispatch(loadPreviewRecipes(recipes));
        setActiveButton(name);
      }}
    >
      {name}
    </Button>
  );
};

const Button = styled.button`
  border: 0;
  padding: 1rem 2rem;
  font-family: var(--text-font);
  font-size: 1.8rem;
  cursor: pointer;
  outline: none;
  background: transparent;
  color: var(--text-color);

  ${({ active }) =>
    active &&
    css`
      background: var(--highlight-color);
      color: white;
    `}

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    flex-grow: 2;
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

export default RecipePreviewButton;
