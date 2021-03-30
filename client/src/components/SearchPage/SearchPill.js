import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { loadSearchedRecipes } from '../../actions/recipeCardsAction';
import size from '../../styles/responsiveStyles';

const SearchPill = ({
  setSearchQuery,
  setLastSearch,
  sortSelected,
  queryName,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <PillBody
      onClick={() => {
        dispatch(loadSearchedRecipes(0, queryName, sortSelected));
        setSearchQuery(queryName);
        setLastSearch(queryName);
        history.push({
          pathname: '/search',
          search: `?query=${queryName}`,
          state: {
            update: true,
          },
        });
      }}
    >
      <PillTitle>{queryName}</PillTitle>
    </PillBody>
  );
};

const PillBody = styled.div`
  background: white;
  border-radius: 8px;
  height: 4rem;
  display: flex;
  align-items: center;
  border-left: var(--highlight-color) 25px solid;
  padding: 0rem 2rem;
  margin-right: 3rem;
  color: var(--header-color);
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  transition: border-left 0.2s;
  &:hover {
    border-left: var(--button-hover-color) 25px solid;
  }
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    padding: 0rem 1.5rem;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    display: none;
  }
`;

const PillTitle = styled.span`
  font-size: 1.8rem;
`;

export default SearchPill;
