/** @jsx jsx */
// eslint-disable-next-line
import React from 'react'
import { css, jsx } from '@emotion/core'
import Button from '@material-ui/core/Button'
import { headerHeight, theme, logo, personalPage } from '../../constants'

const openPersonalPage = () => window.open(personalPage, '_blank')
const styles = {}
styles.container = css`
  height: ${headerHeight}px;
  width: 100%;
  padding: 0 40px;
  position: relative;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.palette.primary.dark};
  box-sizing: border-box;
  border-bottom: 4px solid ${theme.palette.primary.main};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
`
styles.logo = css`
  width: 20px;
  margin-left: 5px;
`
styles.clickButton = css`
  border: 0;
  background: transparent;
  height: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;
  cursor: pointer;
`
styles.title = css`
  text-transform: uppercase;
  font-size: 18px;
  color: ${theme.palette.common.white};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
styles.button = {
  color: theme.palette.common.white,
}

function Header() {
  return (
    <header css={styles.container}>
      <button
        onClick={() => {
          document.location.href = '/'
        }}
        css={styles.clickButton}
      >
        <img src={logo} alt="Logo" css={styles.logo} />
      </button>
      <div css={styles.title}>Uniswap Graphprotocol</div>
      <Button style={styles.button} onClick={openPersonalPage}>
        Jonatan del Valle
      </Button>
    </header>
  )
}

export default Header
