import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import YumLogo from '../images/Yum_Logo.svg';
import {
  faGithub,
  faGithubAlt,
  faLinkedin,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <>
      <FooterSection>
        <Column>
          <Logo>
            <img src={YumLogo} alt="Yum Logo" />
          </Logo>
          <Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
            tenetur? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, minus!
          </Description>
          <Icons>
            <Icon
              initial={{
                color: 'var(--highlight-color)',
                background: 'transparent',
              }}
              whileHover={{
                color: 'white',
                background: 'var(--highlight-color)',
              }}
            >
              <FaIcon icon={faGithubAlt} />
            </Icon>
            <Icon
              initial={{
                color: 'var(--highlight-color)',
                background: 'transparent',
              }}
              whileHover={{
                color: 'white',
                background: 'var(--highlight-color)',
              }}
            >
              <FaIcon icon={faLinkedinIn} />
            </Icon>
          </Icons>
        </Column>
        <Column>
          <Heading>Links</Heading>

          <Link>About Us</Link>
          <Link>Terms of Use</Link>
          <Link>Privacy Policy</Link>
        </Column>
        <Column>
          <Heading>Contact Us</Heading>
          <ContactInfo>1800-123-4567</ContactInfo>
          <ContactInfo>info@yum.com</ContactInfo>
          <Address>
            <span>1600 Pennsylvania Avenue </span>
            <span>N.W. Washington</span>
            <span>DC 20500</span>
          </Address>
        </Column>
      </FooterSection>
    </>
  );
};

const FooterSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5rem 3rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    padding: 1rem 0rem;
  }
`;

const Logo = styled.div`
  width: 8.5rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Description = styled.div`
  max-width: 40ch;
`;

const Icons = styled.ul`
  display: flex;
  justify-content: space-between;
  max-width: 10.5rem;
  color: var(--highlight-color);
  cursor: pointer;
`;

const Icon = styled(motion.li)`
  list-style: none;
  min-height: 4.5rem;
  min-width: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid var(--highlight-color);
`;

const FaIcon = styled(FontAwesomeIcon)`
  font-size: 2.4rem;
  border-radius: 50%;
`;

const Heading = styled.span`
  font-family: var(--header-font);
  font-size: 2.4rem;
  color: #29315d;
  font-weight: bold;
`;

const Link = styled.span`
  list-style: none;
  font-family: var(--text-font);
  font-size: 1.8rem;
`;

const ContactInfo = styled.span`
  font-size: 1.8rem;
  font-family: var(--text-font);
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
  font-family: var(--text-font);
`;

export default Footer;