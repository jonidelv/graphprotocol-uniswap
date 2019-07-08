/** @jsx jsx */
// eslint-disable-next-line
import React, { PureComponent } from 'react'
import { css, jsx } from '@emotion/core'
import { Query } from 'react-apollo'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { queryUserTransactions } from '../../../services/apollo'
import CircularProgress from '@material-ui/core/CircularProgress'
import { theme } from '../../../constants'

const styles = {}
styles.dialogContent = css`
  position: relative;
  h6 {
    font-weight: bold;
    margin-bottom: 15px;
  }
  label span {
    font-size: 17px;
  }
`
styles.progressBarWrapper = css`
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 35px;
  position: absolute;
  bottom: 260px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
`
styles.errorEl = css`
  font-size: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  color: ${theme.palette.error.main};
  font-weight: 500;
`
styles.dialogBody = css`
  width: 500px;
  height: 400px;
`
styles.labels = css`
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 0;
  font-weight: 600;
`
styles.texts = css`
  margin: 0;
  color: ${theme.palette.common.grey};
`
styles.divider = css`
  height: 2px;
  margin: 30px 0;
  background-color: ${theme.palette.primary.main};
`
styles.dialogTitle = {
  textTransform: 'uppercase',
}
styles.noTransactions = css`
  font-size: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  color: ${theme.palette.primary.main};
  font-weight: 500;
`

function close(setSelectedUser) {
  return () => setSelectedUser('')
}

// eslint-disable-next-line react/prop-types
function responseError(error) {
  toast.error(error.message)
  console.warn(error)
  return <div css={styles.errorEl}>Error, please try again later</div>
}

function Transactions(props) {
  return (
    <Dialog open={props.open} onClose={close(props.setSelectedUser)}>
      <div css={styles.dialogContent}>
        <DialogTitle style={styles.dialogTitle}>Transactions</DialogTitle>
        <DialogContent>
          <div css={styles.dialogBody} className="no-scroll">
            <Query query={queryUserTransactions} variables={{ user: props.selectedUser }}>
              {(response) =>
                response.error ? (
                  responseError(response.error)
                ) : (
                  <div css={styles.contentContainer}>
                    {response.data &&
                      response.data.transactions &&
                      response.data.transactions.map((transaction, idx) => (
                        <div key={transaction.id}>
                          {idx !== 0 && <div css={styles.divider} />}
                          <div css={styles.labels}>Address</div>
                          <p css={styles.texts}>{transaction.tokenAddress}</p>
                          <div css={styles.labels}>User</div>
                          <p css={styles.texts}>{transaction.user}</p>
                          <div css={styles.labels}>Token</div>
                          <p css={styles.texts}>{transaction.tokenSymbol}</p>
                          <div css={styles.labels}>Amount</div>
                          <p css={styles.texts}>{transaction.ethAmount}</p>
                        </div>
                      ))}

                    {/* No transactions msg */}
                    {response.data.transactions &&
                      !response.data.transactions.length &&
                      props.selectedUser && (
                        <div css={styles.noTransactions}>No transactions for this user</div>
                      )}

                    {/* Loading indicator */}
                    <div css={styles.progressBarWrapper}>
                      {response.loading && props.selectedUser && (
                        <CircularProgress color="primary" size={40} thickness={4} />
                      )}
                    </div>
                  </div>
                )
              }
            </Query>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={close(props.setSelectedUser)} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}

Transactions.propTypes = {
  open: PropTypes.bool.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.string.isRequired,
}

export default Transactions
