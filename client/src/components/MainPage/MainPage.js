import { AnimateSharedLayout } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import Carousel from './Carousel';
import Contact from './Contact';
import CookBookSidebar from '../CookBookSidebar';
import Footer from './Footer';
import Home from './Home';
import HowToSection from './HowToSection';
import Nav from '../Nav';
import RecipePreview from './RecipePreview';
import Welcome from './Welcome';

const MainPage = ({ isCookBookOpen, setIsCookBookOpen, cookBookRef }) => {
  const isMobile = useSelector((state) => state.isMobile);

  return (
    <>
      <Nav
        isCookBookOpen={isCookBookOpen}
        setIsCookBookOpen={setIsCookBookOpen}
      />
      <Home />
      <Welcome />
      <HowToSection />
      <Carousel />
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
      <Contact />
      <Footer />
    </>
  );
};

export default MainPage;
