/** @jsx jsx */
// eslint-disable-next-line
import React, { PureComponent } from 'react'
import { css, jsx } from '@emotion/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { cache, queryUserTransactions } from '../../../services/apollo'

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
  width: 450px;
  height: 400px;
`
styles.dialogTitle = {
  textTransform: 'uppercase',
}

function close(setTransferDialogOpen) {
  return () => setTransferDialogOpen(false)
}

const formInitialValues = {
  fromId: '',
  toId: '',
  amount: '',
}

function validateForm(values) {
  const errors = {}
  if (!values.fromId) errors.fromId = 'Required'
  if (!values.toId) errors.toId = 'Required'
  if (!values.amount) errors.amount = 'Required'

  return errors
}

const onSubmit = (setTransferDialogOpen) => async (values, { setSubmitting }) =>{

  const { transactions } = cache.readQuery({
    variables: { user: values.fromId },
    query: queryUserTransactions,
  })
  cache.writeQuery({
    data: { 
      transactions: [
        ...transactions, {
        id: Math.random().toString(36).substr(2, 6),
        user: values.toId,
        ethAmount: values.amount,
        tokenAddress: values.fromId,
        __typename: 'Transaction',
      }]
    },
    query: queryUserTransactions,
  })
  setSubmitting(false)
  toast.success(`Transfer ${values.amount} successfully`)
  setTransferDialogOpen(false)
}

function ETHTransfer(props) {

  return (
    <Dialog open={props.open} onClose={close(props.setTransferDialogOpen)}>
      <Formik
        initialValues={formInitialValues}
        validate={validateForm}
        onSubmit={onSubmit(props.setTransferDialogOpen)}
      >
        {(formik) => (
          <form noValidate onSubmit={formik.handleSubmit} method="POST">
            <div css={styles.dialogContent}>
              <DialogTitle style={styles.dialogTitle}>Transfer</DialogTitle>
              <DialogContent>
                <div css={styles.dialogBody} className="no-scroll">
                  <div css={styles.formWrapper}>
                    <TextField
                      label={'From'}
                      placeholder={'User Id'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                      type="text"
                      name="fromId"
                      margin="normal"
                      error={
                        formik.errors.fromId &&
                        formik.touched.fromId &&
                        !!formik.errors.fromId
                      }
                      helperText={
                        formik.errors.fromId &&
                        formik.touched.fromId &&
                        formik.errors.fromId
                      }
                      fullWidth
                    />
                  </div>
                  <div css={styles.formWrapper}>
                    <TextField
                      label={'To'}
                      placeholder={'User Id'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                      type="text"
                      name="toId"
                      margin="normal"
                      error={
                        formik.errors.toId &&
                        formik.touched.toId &&
                        !!formik.errors.toId
                      }
                      helperText={
                        formik.errors.toId &&
                        formik.touched.toId &&
                        formik.errors.toId
                      }
                      fullWidth
                    />
                  </div>
                  <div css={styles.formWrapper}>
                    <TextField
                      label={'Amount'}
                      placeholder={'ETH'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                      type="text"
                      name="amount"
                      margin="normal"
                      error={
                        formik.errors.amount &&
                        formik.touched.amount &&
                        !!formik.errors.amount
                      }
                      helperText={
                        formik.errors.amount &&
                        formik.touched.amount &&
                        formik.errors.amount
                      }
                      fullWidth
                    />
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={close(props.setTransferDialogOpen)}
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={formik.isSubmitting}
                  type="submit"
                >
                  Send
                </Button>
              </DialogActions>
            </div>
          </form>
        )}
      </Formik>
    </Dialog>
  )
}

ETHTransfer.propTypes = {
  open: PropTypes.bool.isRequired,
  setTransferDialogOpen: PropTypes.func.isRequired
}

export default React.memo(ETHTransfer)
