import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { cardChangeValue, groupChangeValue } from "../../store/game";

export const GroupDeck = () => {
  const dispatch = useDispatch();
  const { groupDeck, selectedCardValue, selectedGroupValue } = useSelector(
    (state) => state.game
  );

  const handleCardChangeValue = (e) => {
    dispatch(cardChangeValue(e));
  };

  const handleGroupChange = (e) => {
    dispatch(groupChangeValue(e));
  };

  const selectedGroup = groupDeck.find(
    (group) => group.name === selectedCardValue
  );

  const available = selectedGroup ? selectedGroup.collection : [];

  return (
    <GroupContainer>
      <CardSelect value={selectedCardValue} onChange={handleCardChangeValue}>
        {groupDeck.map((card, index) => (
          <OptionSelect key={index} value={card.name}>
            {card.name} Cards
          </OptionSelect>
        ))}
      </CardSelect>
      <GroupSelect value={selectedGroupValue} onChange={handleGroupChange}>
        {available.map((group, index) => (
          <OptionSelect key={index} value={group}>
            {group} Groups
          </OptionSelect>
        ))}
      </GroupSelect>
    </GroupContainer>
  );
};

const GroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  @media (max-width: 375px) {
    justify-content: center;
  }
`;

const CardSelect = styled.select`
  background-color: ${({ theme }) => theme.colors.jet_black};
  color: ${({ theme }) => theme.colors.light_grey};
  border: 1px solid white;
  cursor: pointer;
  padding: 0.2em;
  border-radius: 12px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.light_jet_black};
    transition: 0.3s ease;
  }
`;

const GroupSelect = styled.select`
  background-color: ${({ theme }) => theme.colors.jet_black};
  color: ${({ theme }) => theme.colors.light_grey};
  border: 1px solid white;
  cursor: pointer;
  padding: 0.2em;
  border-radius: 12px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.light_jet_black};
    transition: 0.3s ease;
  }
`;
const OptionSelect = styled.option`
  cursor: pointer;
`;
