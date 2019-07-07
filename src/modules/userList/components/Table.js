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
import ethLogo from '../../../assets/eth.png'

const cellHeadStyles = {
  head: {
    color: theme.palette.secondary.main,
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingRight: 10,
    paddingLeft: 10,
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
    cursor: 'pointer',
  },
}
const BodyCell = withStyles(cellBodyStyles)(TableCell)

function balance(balances) {
  if (balances.length) {
    return balances.reduce((total, currentValue) => {
      const ethBought = BigNumber(currentValue.ethBought)
      const ethDeposited = BigNumber(currentValue.ethDeposited)
      const ethFeesPaid = BigNumber(currentValue.ethFeesPaid)
      const ethSold = BigNumber(currentValue.ethSold)
      const ethWithdrawn = BigNumber(currentValue.ethWithdrawn)
      const plusEth = ethBought.plus(ethDeposited)
      const lessEth = ethFeesPaid.minus(ethSold).minus(ethWithdrawn)
      const transactionTotal = plusEth.minus(lessEth)

      return transactionTotal.plus(total).toString()
    }, 0)
  }

  return 0
}

function UserTable(data) {
  const { users } = data.data
  console.log(users)

  return (
    <Table>
      <TableHead>
        <TableRow>
          <HeadCell>
            <img src={userLogo} alt="user logo" width="20" /> User ID
          </HeadCell>
          <HeadCell>
            <img src={ethLogo} alt="eth logo" width="20" /> ETH Balance
          </HeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow hover key={user.id}>
            <BodyCell>{user.id}</BodyCell>
            <BodyCell>{balance(user.exchangeBalances)}</BodyCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

UserTable.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  data: PropTypes.object.isRequired,
}

export default React.memo(UserTable)
