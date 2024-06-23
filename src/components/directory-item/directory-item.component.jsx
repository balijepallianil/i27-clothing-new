import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth.context';
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles';

const DirectoryItem = ({ category }) => {
  const { categoryImageUrl, categoryTitle, categoryRoute } = category;
  const { state: ContextState } = useContext(AuthContext);
  const { isLoggedIn } = ContextState;
  const navigate = useNavigate();

  const onNavigateHandler = () => {
    if (isLoggedIn) {
      navigate(categoryRoute);
    } else {
      navigate('/auth');
    }
  };
  

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={categoryImageUrl} />
      <Body>
        <h2>{categoryTitle}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
