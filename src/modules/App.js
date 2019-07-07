import React, { Fragment, Component, useState, useEffect } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { ToastContainer, toast } from 'react-toastify'
import styled from '@emotion/styled'
import UncaughtApplicationError from './components/UncaughtApplicationError'
import { theme, headerHeight } from '../constants'
import UserList from './userList'
import Header from './components/Header'

const customTheme = createMuiTheme(theme)

class App extends Component {
  state = {
    uncaughtError: false,
  }

  componentDidCatch(error, info) {
    console.log('Uncaught Error: ', error)
    console.log('Error Info: ', info)
    this.setState({ uncaughtError: true })
  }

  render() {
    return this.state.uncaughtError ? (
      <UncaughtApplicationError />
    ) : (
      <Fragment>
        <ToastContainerStyles>
          <ToastContainer
            position={toast.POSITION.BOTTOM_RIGHT}
            pauseOnHover={false}
            closeButton={false}
            autoClose={false}
            closeOnClick
            hideProgressBar
          />
          <DismissAll />
        </ToastContainerStyles>
        <MuiThemeProvider theme={customTheme}>
          <Header />
          <AppPages>
            <UserList />
          </AppPages>
        </MuiThemeProvider>
      </Fragment>
    )
  }
}

const AppPages = styled.section`
  position: relative;
  height: calc(100vh - ${headerHeight}px);
  scrollbar-width: none;
  overflow-y: overlay;
  overflow-x: hidden;

  &::-webkit-scrollbar: {
    width: 0;
  }
`
const ToastContainerStyles = styled.div`
  .dismiss-all {
    position: fixed;
    bottom: 10px;
    right: 21px;
    color: ${theme.palette.common.black};
    z-index: 99999;
    padding: 5px 15px;
    border-radius: 0;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
      0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    font-size: 14px;
    cursor: pointer;
    outline: none;
  }

  .Toastify__toast-container {
    width: unset;
    min-width: 320px;
    max-width: 380px;
    max-height: 100vh;
    padding-top: 35px;
    scrollbar-width: none;
    overflow-y: overlay;
    overflow-x: hidden;
    margin-bottom: 15px;

    &::-webkit-scrollbar: {
      width: 0;
    }

    .Toastify__toast {
      font-size: 14px;
      border-radius: 0;
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);

      &.Toastify__toast--success {
        background: ${theme.palette.primary.main};
      }

      &.Toastify__toast--error {
        background: ${theme.palette.error.main};
      }

      &.Toastify__toast--info {
        background: ${theme.palette.common.blue};
      }
    }
  }
`

function DismissAll() {
  const [numberOfToasts, setNumberOfToasts] = useState(0)
  useEffect(() => {
    toast.onChange((numberOfToastDisplayed) => {
      setNumberOfToasts(numberOfToastDisplayed)
    })
  }, [])

  return numberOfToasts > 1 ? (
    <div
      className="dismiss-all"
      role="button"
      onClick={() => {
        toast.dismiss()
        setNumberOfToasts(0)
      }}
      tabIndex={-1}
    >
      Clear All
    </div>
  ) : null
}

export default App
