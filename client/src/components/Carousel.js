import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import size from '../responsiveStyles';

const quickSearchCards = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        aria-labelledby="title"
        aria-describedby="desc"
        role="img"
        stroke="var(--highlight-color)"
      >
        <title>French Fries</title>
        <desc>A line styled icon from Orion Icon Library.</desc>
        <path
          data-name="layer2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M28 7.4V2h8v29.6m8-19.7V6.1h8V20"
        ></path>
        <path
          data-name="layer2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M38.2 30.9l-1.3-18.5 7.9-.6 1 12.9m-24.7 3.4l3-21.2L32 8l-3.3 23.7m-8-4.1L17.9 8 10 9.1 11.5 20"
        ></path>
        <path
          data-name="layer1"
          d="M8 20h8s3.2 12 16 12 16-12 16-12h8l-8 42H16z"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </svg>
    ),
    name: 'Fries',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        aria-labelledby="title"
        aria-describedby="desc"
        role="img"
        stroke="var(--highlight-color)"
      >
        <title>Pizza</title>
        <desc>A line styled icon from Orion Icon Library.</desc>
        <path
          data-name="layer2"
          d="M28.1 20v-6a24.1 24.1 0 1 0 21.8 13.9l-5.4 2.5m10.3-12.2l5-2.4A24 24 0 0 0 38.1 2l-.8 5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          data-name="layer1"
          d="M10.1 38a18 18 0 1 0 34.3-7.6L28.1 38V20a18 18 0 0 0-18 18z"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <circle
          data-name="layer1"
          cx="21.1"
          cy="35"
          r="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></circle>
        <circle
          data-name="layer1"
          cx="25.1"
          cy="47"
          r="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></circle>
        <circle
          data-name="layer1"
          cx="35.1"
          cy="43"
          r="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></circle>
        <path
          data-name="layer1"
          d="M38.1 7h-.8l-3.2 21 20.7-9.8A18 18 0 0 0 38.1 7z"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </svg>
    ),
    name: 'Pizza',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        aria-labelledby="title"
        aria-describedby="desc"
        role="img"
        stroke="var(--highlight-color)"
      >
        <title>Hamburger</title>
        <desc>A line styled icon from Orion Icon Library.</desc>
        <path
          data-name="layer2"
          d="M58 43v5a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5v-5m0-12v-6a14 14 0 0 1 14-14h24a14 14 0 0 1 14 14v6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <rect
          data-name="layer1"
          x="2"
          y="31"
          width="60"
          height="12"
          rx="5"
          ry="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></rect>
        <circle
          data-name="layer1"
          cx="18"
          cy="19"
          r="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></circle>
        <circle
          data-name="layer1"
          cx="26"
          cy="21"
          r="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></circle>
        <circle
          data-name="layer1"
          cx="32"
          cy="17"
          r="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></circle>
        <circle
          data-name="layer1"
          cx="40"
          cy="21"
          r="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></circle>
        <circle
          data-name="layer1"
          cx="48"
          cy="19"
          r="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></circle>
      </svg>
    ),
    name: 'Burgers',
  },
  {
    icon: (
      <svg
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="title"
        aria-describedby="desc"
        role="img"
        stroke="var(--highlight-color)"
      >
        <title>Taco</title>
        <desc>A line styled icon from Orion Icon Library.</desc>
        <path
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          d="M10 57.567c-7 0-8-6.283-8-14a43.145 43.145 0 0 1 16-34 8.6 8.6 0 0 1 7.309-1.758"
          data-name="layer1"
        ></path>
        <path
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          d="M17.368 52.191c-6.713-.94-5.572-4.972-4.555-6.47 1.9-2.8-1.1-4.156-2.48-6.463s-1.019-4.912 2.307-6.687c2.127-1.135 3.861-2.85 2.309-6.922-1.812-4.758 3.422-4.82 5.051-6.082 2.439-1.891 1.768-3.07 2-7.223s4.75-5.81 8-4.777c0 0 4.378 2 7.795-.3s7.955.444 6.815 4.309"
          data-name="layer2"
        ></path>
        <path
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          d="M12.378 57.206L62 35.567s-2.473-10-5.707-16-9.829-10.455-20.667-6.533-13.557 13.535-14.914 25.072c-1.42 12.053-4 19.461-10.711 19.461"
          data-name="layer1"
        ></path>
      </svg>
    ),
    name: 'Tacos',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        aria-labelledby="title"
        aria-describedby="desc"
        role="img"
        stroke="var(--highlight-color)"
      >
        <title>Meat</title>
        <desc>A line styled icon from Orion Icon Library.</desc>
        <path
          data-name="layer2"
          d="M40 6c-9.6 0-16.2 2-22 10S2 24.9 2 38s13.2 20 26 20 34-5.5 34-26S48.2 6 40 6z"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          data-name="layer1"
          d="M40 14c-8.6 0-13.5 2.3-16 6s-7.9 8-10.5 10.5A10.1 10.1 0 0 0 10 38c0 7.5 6.9 12 18 12s26-3.9 26-18c0-11-5.5-18-14-18z"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <circle
          data-name="layer1"
          cx="40"
          cy="30"
          r="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></circle>
      </svg>
    ),
    name: 'Eggs',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        aria-labelledby="title"
        aria-describedby="desc"
        role="img"
        stroke="var(--highlight-color)"
      >
        <title>Steak</title>
        <desc>A line styled icon from Orion Icon Library.</desc>
        <path
          data-name="layer2"
          d="M2 30v8c0 15.8 7.1 22 26 22s34-12 34-23.3v-12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          data-name="layer2"
          d="M45.8 19.1a2 2 0 0 0-2.7-.9l-14.9 6.5-11.1-6.4a2 2 0 0 0-2.2 3.3l8.7 8.2-1.5 9.5a2 2 0 0 0 1.3 2.5h.6a2 2 0 0 0 1.9-1.4l4.7-10.2 14.3-8.7a2 2 0 0 0 .9-2.4z"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          data-name="layer1"
          d="M12 10c4.2 0 3.8 2 11.8 2C40.6 12 41.4 4 52 4s10 18.6 10 20.7C62 36 46.9 52 28 52S2 43.8 2 28c0-14.2 5.3-18 10-18z"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </svg>
    ),
    name: 'Steak',
  },
  {
    icon: (
      <svg
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="title"
        aria-describedby="desc"
        role="img"
        stroke="var(--highlight-color)"
      >
        <title>Chicken Breast</title>
        <desc>A line styled icon from Orion Icon Library.</desc>
        <path
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          d="M12.983 44.548l-4.234 4.237A4.131 4.131 0 0 0 3.212 54.9c2.143 2.143 2.934 1.471 3.658 2.2 1 1 .426 1.887 2.2 3.66a4.142 4.142 0 0 0 5.857-5.86 4.123 4.123 0 0 0-.334-.25l4.228-4.228"
          data-name="layer2"
        ></path>
        <circle
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          r="1"
          cy="9.97"
          cx="43.999"
          data-name="layer2"
        ></circle>
        <circle
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          r="1"
          cy="11.974"
          cx="35.999"
          data-name="layer2"
        ></circle>
        <circle
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          r="1"
          cy="17.972"
          cx="45.999"
          data-name="layer2"
        ></circle>
        <path
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          d="M55.85 8.175a21 21 0 0 0-29.7 0A21.827 21.827 0 0 0 24.618 9.9c-.1.127-.193.268-.291.4-.332.434-.658.869-.951 1.32-6.2 9.3-6.746 23.059-9.244 25.555l-.709.709a5 5 0 0 0 0 7.072l5.658 5.656a5 5 0 0 0 7.07 0l.709-.709c2.676-2.676 17.549-2.391 27.35-10.547a21.513 21.513 0 0 0 1.641-1.475 21 21 0 0 0-.001-29.706z"
          data-name="layer1"
        ></path>
      </svg>
    ),
    name: 'Chicken',
  },
];

const Carousel = () => {
  const [position, setPosition] = useState({
    index: 2,
    direction: 0,
    fromDrag: false,
  });
  const cardRef = useRef();
  const boundsRef = useRef();
  const controls = useAnimation();
  const elementWidth = 250;

  const eucDistance = (x1, y1, x2, y2) => {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.hypot(a, b);
  };

  const generateItemCoords = (cardRef, boundsCenterX, boundsCenterY) => {
    let idx = 0;
    let arr = [];
    for (const item of cardRef.current.children) {
      const card = item.getBoundingClientRect();
      const cardCenterX = card.left + card.width / 2;
      const cardCenterY = card.top + card.height / 2;
      arr.push({
        index: idx,
        distance: eucDistance(
          boundsCenterX,
          boundsCenterY,
          cardCenterX,
          cardCenterY
        ),
      });
      idx++;
    }
    return arr;
  };

  const handleDrag = (event, info) => {
    const bounds = boundsRef.current.getBoundingClientRect();
    const boundsCenterX = bounds.left + bounds.width / 2;
    const boundsCenterY = bounds.top + bounds.height / 2;
    console.log(bounds);

    const itemCoords = generateItemCoords(
      cardRef,
      boundsCenterX,
      boundsCenterY
    );
    const closestValue = itemCoords.reduce((acc, curr) => {
      if (curr.distance < acc.distance) {
        return curr;
      } else {
        return acc;
      }
    }, itemCoords[0]);
    if (position.index !== closestValue.index) {
      setPosition({
        index: closestValue.index,
        direction: closestValue.index > position.index ? 1 : -1,
        fromDrag: true,
      });
    }
    console.log(closestValue);
  };

  useEffect(() => {
    if (!position.fromDrag) {
      if (position.direction > 0) {
        controls.start({
          x: (elementWidth / 2) * 3 - elementWidth * position.index,
          transition: { type: 'tween' },
        });
      } else {
        controls.start({
          x: (elementWidth / 2) * 3 - elementWidth * position.index,
          transition: { type: 'tween' },
        });
      }
    }
  }, [position, controls]);

  return (
    <CarouselContainer>
      <HeadingText>In a rush</HeadingText>
      <SubtitleText>Quicksearch</SubtitleText>
      <ButtonContainer>
        <CarouselButton
          initial={{
            color: 'var(--highlight-color)',
            background: 'transparent',
          }}
          whileHover={{
            color: 'white',
            background: 'var(--highlight-color)',
          }}
          onClick={() => {
            if (position.index <= 0) {
              setPosition({
                index: quickSearchCards.length - 1,
                direction: -1,
                fromDrag: false,
              });
            } else {
              setPosition({
                index: position.index - 1,
                direction: -1,
                fromDrag: false,
              });
            }
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </CarouselButton>
        <CarouselButton
          initial={{
            color: 'var(--highlight-color)',
            background: 'transparent',
          }}
          whileHover={{
            color: 'white',
            background: 'var(--highlight-color)',
          }}
          onClick={(event) => {
            if (position.index > quickSearchCards.length - 2) {
              setPosition({ index: 0, direction: 1, fromDrag: false });
            } else {
              setPosition({
                index: position.index + 1,
                direction: 1,
                fromDrag: false,
              });
            }
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </CarouselButton>
      </ButtonContainer>
      <Bounds id="test" ref={boundsRef}>
        <Container
          ref={cardRef}
          drag="x"
          dragElastic={1}
          onDrag={(event, info) => handleDrag(event, info)}
          //   onDragTransitionEnd={(event, info) => handleDrag(event, info)}
          dragConstraints={{
            left: (elementWidth / 2) * 3 - elementWidth * position.index,
            right: (elementWidth / 2) * 3 - elementWidth * position.index,
          }}
          initial={{}}
          animate={controls}
        >
          {quickSearchCards.map((item, index) => (
            <CarouselDiv
              key={`carouselCard-${item.name}`}
              style={{ background: item }}
              initial={{
                scale: index === position.index ? 1 : 0.7,
                opacity: index === position.index ? 1 : 0.4,
              }}
              animate={{
                scale: index === position.index ? 1 : 0.7,
                opacity: index === position.index ? 1 : 0.4,
              }}
            >
              {index === position.index ? (
                <Link
                  draggable={false}
                  style={{ textDecoration: 'none' }}
                  to={`/search?query=${item.name}`}
                >
                  <CardBackground key={`quickCard-${item.name}`}>
                    {item.icon}
                    <CardText>{item.name}</CardText>
                  </CardBackground>
                </Link>
              ) : (
                <CardBackground key={`quickCard-${item.name}`}>
                  {item.icon}
                  <CardText>{item.name}</CardText>
                </CardBackground>
              )}
            </CarouselDiv>
          ))}
        </Container>
      </Bounds>
    </CarouselContainer>
  );
};

const Bounds = styled(motion.div)`
  overflow: hidden;
  height: 300px;
  width: 1000px;
  display: flex;
  align-self: center;
`;

const CarouselContainer = styled.section`
  margin-bottom: 300px;
  display: flex;
  flex-direction: column;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    padding: 0vh 5vw;
  }
  @media (${size.md}) {
    margin-bottom: 200px;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const Container = styled(motion.div)`
  display: flex;
`;
const CarouselDiv = styled(motion.div)`
  min-width: 250px; //make sure to change element width variable

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
`;

const CarouselButton = styled(motion.button)`
  background: white;
  border: 0;
  color: var(--highlight-color);
  border-radius: 50%;
  border: 2px solid var(--highlight-color);
  width: 3.6rem;
  height: 3.6rem;
  font-size: 2.4rem;
  margin: 0rem 0.5rem;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

const CardBackground = styled(motion.div)`
  height: 25rem;
  width: 20rem;
  background: var(--card-color);

  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 2rem;
  align-items: center;
  justify-content: space-evenly;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  border: 1px #eee solid;

  svg {
    height: 12rem;
    justify-self: center;
  }
`;

const CardText = styled.span`
  justify-self: flex-end;
  font-size: 2.4rem;
  font-weight: 600;
  font-family: var(--header-font);
  color: var(--text-color);
`;

const HeadingText = styled.span`
  font-family: var(--header-font);
  font-variant: small-caps;
  font-weight: 600;
  font-size: 2.8rem;
  color: var(--highlight-color);
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    font-size: 2.4rem;
  }
  @media (${size.xs}) {
  }
`;

const SubtitleText = styled.span`
  font-family: var(--header-font);
  font-size: 3.6rem;
  color: var(--header-color);
  font-weight: 600;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    font-size: 2.8rem;
  }
  @media (${size.xs}) {
  }
`;

export default Carousel;
