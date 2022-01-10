import styled from "styled-components";
import Link from "next/link";

const NavBg = styled('div')`
  background: url("./assets/images/button_bg.png") no-repeat left bottom;
  background-size: 14.61rem 0.98rem;
  width: 14.61rem;
  height: 1.2rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const BtnBg = styled('div')`
  width: 3.2rem;
  height: 0.9rem;
  background: url("./assets/images/button.png") no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  font-size: 0.3rem;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
`


const Footer = () => (
    <NavBg>
        <Link href="/game">
        <BtnBg>Play Now</BtnBg>
        </Link>
    </NavBg>
)

export default Footer
