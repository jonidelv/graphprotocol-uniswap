/** @jsx jsx */
// eslint-disable-next-line
import React from 'react'
import { css, jsx } from '@emotion/core'
import { Query } from 'react-apollo'
import CircularProgress from '@material-ui/core/CircularProgress'
import { toast } from 'react-toastify'
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'

import { queryUsersInfo } from '../../services/apollo'
import { headerHeight, theme } from '../../constants'
import Table from './components/Table'

const styles = {}
styles.tableContainer = css`
  padding: 40px;
  position: relative;
  height: calc(100vh - ${headerHeight}px);
  overflow: scroll;
`
styles.progressBarWrapper = css`
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 35px;
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
`
styles.addWrapper = css`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 25px;
`
styles.addButton = {
  height: 50,
  width: 50,
}
styles.errorEl = css`
  font-size: 18px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  color: ${theme.palette.primary.main};
`

function onGamesScroll(fetchMore) {
  return (e) => {
    console.log('scrolling')
    const scroll = e.currentTarget.scrollTop
    const contentHeight = e.currentTarget.scrollHeight
    const visibleHeight = e.currentTarget.offsetHeight
    const scrollOffset = 500 // Change this to start fetching before reaching the end of the scroll
  }
}

// eslint-disable-next-line react/prop-types
function responseError(error) {
  toast.error(error.message)
  console.warn(error)
  return <div css={styles.errorEl}>Error loading the data, please try again later</div>
}

function UserList() {
  const tableContainerRef = React.useRef(null)

  return (
    <div>
      <Query query={queryUsersInfo}>
        {(response) =>
          response.error ? (
            responseError(response.error)
          ) : (
            <div css={styles.tableContainer} onScroll={onGamesScroll(response.fetchMore)} ref={tableContainerRef}>
              {/* User table */}
              {!response.loading && <Table data={response.data} />}

              {/* Loading indicator */}
              <div css={styles.progressBarWrapper}>
                {response.loading && <CircularProgress color="primary" size={40} thickness={4} />}
              </div>

              {/* Add a transaction */}
              <div css={styles.addWrapper}>
                <Fab color="primary" aria-label="Add" style={styles.addButton}>
                  <Icon>add</Icon>
                </Fab>
              </div>
            </div>
          )
        }
      </Query>
    </div>
  )
}

export default UserList
