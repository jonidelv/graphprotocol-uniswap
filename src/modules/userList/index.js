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
import Transactions from './components/Transactions'
import Transfer from './components/Transfer'

const styles = {}
styles.tableContainer = css`
  padding: 40px;
  position: relative;
  height: calc(100vh - ${headerHeight}px);
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

function onGamesScroll(users, fetchMore, loading, setLoading) {
  return async (e) => {
    const scroll = e.currentTarget.scrollTop
    const contentHeight = e.currentTarget.scrollHeight
    const visibleHeight = e.currentTarget.offsetHeight
    // Change this to start fetching before reaching the end of the scroll
    const scrollOffset = 500
    if (visibleHeight + scroll > contentHeight - scrollOffset && !loading) {
      try {
        setLoading(true)
        await fetchMore({
          query: queryUsersInfo,
          variables: { skip: users.length },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev.users
            const oldUsers = prev.users
            const newUsers = fetchMoreResult.users
            return {
              users: [...oldUsers, ...newUsers],
            }
          },
        })
      } catch (error) {
        toast.error('Error fetching more games, please try again later')
        console.warn(error)
      } finally {
        setLoading(false)
      }
    }
  }
}

// eslint-disable-next-line react/prop-types
function responseError(error) {
  toast.error(error.message)
  console.warn(error)
  return <div css={styles.errorEl}>Error loading the data, please try again later</div>
}

function openTransferDialog(setTransferDialogOpen) {
  return () => setTransferDialogOpen(true)
}

function UserList() {
  const tableContainerRef = React.useRef(null)
  const [loading, setLoading] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState('')
  const [transferDialogOpen, setTransferDialogOpen] = React.useState(false)

  return (
    <div>
      <Query query={queryUsersInfo}>
        {(response) =>
          response.error ? (
            responseError(response.error)
          ) : (
            <div
              css={styles.tableContainer}
              onScroll={onGamesScroll(response.data && response.data.users, response.fetchMore, loading, setLoading)}
              ref={tableContainerRef}
              className="no-scroll"
            >
              {/* User table */}
              {response.data && response.data.users && (
                <Table users={response.data.users} selectUser={setSelectedUser} />
              )}

              {/* Loading indicator */}
              <div css={styles.progressBarWrapper}>
                {(response.loading || loading) && <CircularProgress color="primary" size={40} thickness={4} />}
              </div>

              {/* Add transaction */}
              <div css={styles.addWrapper}>
                <Fab
                  color="primary"
                  aria-label="Add"
                  style={styles.addButton}
                  onClick={openTransferDialog(setTransferDialogOpen)}
                >
                  <Icon>add</Icon>
                </Fab>
              </div>
            </div>
          )
        }
      </Query>
      <Transactions open={!!selectedUser} setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
      <Transfer open={transferDialogOpen} setTransferDialogOpen={setTransferDialogOpen} />
    </div>
  )
}

export default UserList
