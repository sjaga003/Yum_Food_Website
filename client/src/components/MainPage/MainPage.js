import { AnimateSharedLayout } from 'framer-motion';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Carousel from './Carousel';
import Contact from './Contact';
import CookBookSidebar from '../CookBookSidebar';
import Footer from './Footer';
import Home from './Home';
import HowToSection from './HowToAnimation/HowToSection';
import Nav from '../Nav';
import RecipePreview from './RecipePreview/RecipePreview';
import Welcome from './Welcome';
import styled from 'styled-components';

const MainPage = ({ isCookBookOpen, setIsCookBookOpen, cookBookRef }) => {
  const isMobile = useSelector((state) => state.isMobile);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <MainContainer>
      <Nav
        isCookBookOpen={isCookBookOpen}
        setIsCookBookOpen={setIsCookBookOpen}
      />
      <Home />
      <Welcome />
      <HowToSection />
      <AnimateSharedLayout type="switch">
        {!isMobile && (
          <CookBookSidebar
            key="CookBookSidebar"
            cookBookRef={cookBookRef}
            isCookBookOpen={isCookBookOpen}
            setIsCookBookOpen={setIsCookBookOpen}
          />
        )}

        <RecipePreview
          key="RecipePreview"
          cookBookRef={cookBookRef}
          isCookBookOpen={isCookBookOpen}
          setIsCookBookOpen={setIsCookBookOpen}
        />
      </AnimateSharedLayout>
      <Carousel />
      <Contact />
      <Footer />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
`;

export default MainPage;
