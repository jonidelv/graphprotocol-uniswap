/** @jsx jsx */
// eslint-disable-next-line
import React from 'react'
import { css, jsx } from '@emotion/core'
import Button from '@material-ui/core/Button'
import errorImg from '../../assets/error.png'

const reload = () => window.location.reload()
const styles = {}
styles.container = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`
styles.content = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
styles.text = css`
  font-size: 22px;
  text-align: center;
`
styles.buttonWrapper = css`
  margin-top: 40px;
`

function UncaughtApplicationError() {
  return (
    <div css={styles.container}>
      <div css={styles.content}>
        <img src={errorImg} alt="error-logo" width="200" />
        <div css={styles.text}>OOPS!</div>
        <div css={styles.text}>
          Looks like you are trying to get into something we are still developing...
        </div>
        <div css={styles.buttonWrapper}>
          <Button variant="contained" onClick={reload}>
            restart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UncaughtApplicationError
