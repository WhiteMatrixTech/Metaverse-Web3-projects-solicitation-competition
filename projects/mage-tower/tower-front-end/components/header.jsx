import styled from "styled-components";
import Link from 'next/link'
// import Image from 'next/image'

const NavBg = styled('div')`
  background:url("./assets/images/topbar.png") no-repeat;
  background-size: 100% 100%;
  width: 13rem;
  height: 0.68rem;
  margin: 0 auto;
  display: flex;
  box-sizing: border-box;
  padding: 0 0.7rem;
  justify-content: space-between;
  z-index: 999;
  font-size: 0.18rem;
   font-family: "GLT-StarrySky";
  a{
    color: #fff;
    text-decoration: none;
  }
`;
const NavText = styled('div')`
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
`;

const MidLogo = styled('div')`
  background:url("./assets/images/logo_bg.png") no-repeat;
  background-size: 100% 100%;
  width: 2.87rem;
  height: 1.74rem;
  flex-shrink: 0;
  padding: 0.13rem 0.38rem 0;
  margin: 0 0.4rem;
  box-sizing: border-box;

`;

const ImgBg = styled('div')`
position: relative;
width: 2rem;
height: 0.83rem;
img{
width: 100%;
}
`

const Header = () => {
    return <NavBg>
        <NavText>
            <Link href="/">
                Home
            </Link>
            <Link href="/mint">
                MINT
            </Link>
            <Link href="/">
                $MANA
            </Link>
            <Link href="/">
                Whitepaper
            </Link>
        </NavText>
        <MidLogo>
            <ImgBg>
                <img src="/assets/images/logo_mini.png"  alt=""/>
            </ImgBg>

        </MidLogo>
        <NavText>
            <Link href="/">
                tower
            </Link>
            <Link href="/">
                news
            </Link>
            <Link href="/">
                about
            </Link>
            <Link href="/game">
                play now !
            </Link>
        </NavText>
    </NavBg>
}

export default Header
