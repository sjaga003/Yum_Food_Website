import { faGithubAlt, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import YumLogo from '../../images/Yum_Logo.svg';
import size from '../../styles/responsiveStyles';

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
                background: '#F5A11C00',
              }}
              whileHover={{
                color: 'var(--bg-color)',
                background: 'var(--highlight-color)',
              }}
            >
              <FaIcon icon={faGithubAlt} />
            </Icon>
            <Icon
              initial={{
                color: 'var(--highlight-color)',
                background: '#F5A11C00',
              }}
              whileHover={{
                color: 'var(--bg-color)',
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
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    padding: 0 5vw;
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 0;
  }
  @media (${size.xs}) {
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    padding: 0.5rem 0rem;
  }
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    align-items: center;
    width: 100%;
    padding: 3rem 0rem;
  }
  @media (${size.xs}) {
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
  font-family: var(--text-font);
  color: var(--header-color);
  font-size: 1.6rem;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    display: none;
  }
  @media (${size.xs}) {
  }
`;

const Icons = styled.ul`
  display: flex;
  justify-content: space-between;
  max-width: 10.5rem;
  color: var(--highlight-color);
  cursor: pointer;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    width: 100%;
  }
  @media (${size.xs}) {
  }
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
  color: var(--header-color);
  font-weight: bold;
`;

const Link = styled.span`
  list-style: none;
  font-family: var(--text-font);
  color: var(--header-color);
  font-size: 1.8rem;
`;

const ContactInfo = styled.span`
  font-size: 1.8rem;
  font-family: var(--header-color);
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
  font-family: var(--header-color);
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    display: none;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

export default Footer;
