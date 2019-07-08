import React from 'react'
import PropTypes from 'prop-types'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/styles'
import BigNumber from 'bignumber.js'
import { theme } from '../../../constants'
import userLogo from '../../../assets/user.png'
import memoize from 'lodash/memoize'
import ethLogo from '../../../assets/eth.png'
import { queryUserTransactions } from '../../../services/apollo'
import { Query } from 'react-apollo'

const cellHeadStyles = {
  head: {
    color: theme.palette.secondary.main,
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingRight: 10,
    paddingLeft: 10,
    flex: 1,
  },
}
const HeadCell = withStyles(cellHeadStyles)(TableCell)

const cellBodyStyles = {
  body: {
    fontSize: 14,
    color: theme.palette.secondary.main,
    position: 'relative',
    height: 55,
    fontWeight: '500',
    paddingRight: 10,
    paddingLeft: 10,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
}
const BodyCell = withStyles(cellBodyStyles)(TableCell)

const CustomTableRowStyles = {
  root: {
    display: 'flex',
  },
}
const CustomTableRow = withStyles(CustomTableRowStyles)(TableRow)

function balance(balances) {
  if (balances.length) {
    return balances.reduce((total, currentValue) => {
      const ethAmount = BigNumber(currentValue.ethAmount)
      const acumulated = BigNumber(total)

      return ethAmount.plus(acumulated).toString()
    }, 0)
  }

  return 0
}

function selectUser(userId, select) {
  return () => select(userId)
}

const userRow = memoize((user) => ({ user }))

function UserTable(props) {
  return (
    <Table>
      <TableHead>
        <CustomTableRow>
          <HeadCell>
            <img src={userLogo} alt="user logo" width="20" /> User ID
          </HeadCell>
          <HeadCell>
            <img src={ethLogo} alt="ETH logo" width="20" /> ETH Balance
          </HeadCell>
        </CustomTableRow>
      </TableHead>
      <TableBody>
        {props.users.map((user) => (
          <CustomTableRow
            hover
            key={user.id}
            onClick={selectUser(user.id, props.selectUser)}
          >
            <BodyCell>{user.id}</BodyCell>
            <BodyCell>
              <Query query={queryUserTransactions} variables={userRow(user.id)}>
                {(response) =>
                  response.error ? (
                    <div>Error getting the balance</div>
                  ) : (
                    (response.loading && 'Calculating...') ||
                    balance(response.data.transactions)
                  )
                }
              </Query>
            </BodyCell>
          </CustomTableRow>
        ))}
      </TableBody>
    </Table>
  )
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  selectUser: PropTypes.func.isRequired,
}

export default React.memo(UserTable)
