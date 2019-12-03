import styled from 'styled-components';

import Button from '~/components/Button';
import InputWrapper from '~/components/Input';
import SelectWrapper from '~/components/Input/Select';
import TitleContainer from '~/components/TitleContainer';

export const Container = styled.div`
  margin: 30px auto;
  padding: 0 16px;
  max-width: 900px;
`;

export const ContentHeader = styled(TitleContainer)`
  .options {
    display: flex;
    align-items: center;
  }
`;

export const Card = styled.div`
  background: #fff;
  margin-top: 24px;
  padding: 30px;
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 20px;

  div:nth-child(1) {
    grid-column: 1 / 5;
  }
`;

export const Input = styled(InputWrapper)`
  overflow: hidden;
`;

export const Select = styled(SelectWrapper)``;

export const BackButton = styled(Button)`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

export const SaveButton = styled(Button).attrs({
  background: '#ee4d64',
})`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  margin-left: 16px;
`;
