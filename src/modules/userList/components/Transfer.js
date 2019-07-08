/** @jsx jsx */
// eslint-disable-next-line
import React, { PureComponent } from 'react'
import { css, jsx } from '@emotion/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

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
styles.dialogBody = css`
  width: 500px;
  height: 400px;
`
styles.dialogTitle = {
  textTransform: 'uppercase',
}

function close(setTransferDialogOpen) {
  return () => setTransferDialogOpen(false)
}

function Transfer(props) {
  return (
    <Dialog open={props.open} onClose={close(props.setTransferDialogOpen)}>
      <div css={styles.dialogContent}>
        <DialogTitle style={styles.dialogTitle}>Transfer</DialogTitle>
        <DialogContent>
          <div css={styles.dialogBody} className="no-scroll" />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={close(props.setTransferDialogOpen)}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}

Transfer.propTypes = {
  open: PropTypes.bool.isRequired,
  setTransferDialogOpen: PropTypes.func.isRequired,
}

export default React.memo(Transfer)
