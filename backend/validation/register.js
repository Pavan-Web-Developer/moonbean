const validator = require('validator')
const isEmpty = require('./is-empty')


const validateRegisterInput = (data) => {
  const errors = {}

  data.username = !isEmpty(data.username) ? data.username : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.walletAddress = !isEmpty(data.walletAddress) ? data.walletAddress : ''

  if (!validator.isLength(data.username, {
    min: 2,
    max: 50,
  })) {
    errors.username = 'Username should be between 2 and 30 characters'
  }
  if (validator.isEmpty(data.username)) {
    errors.username = 'Username is required'
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }
  if (!validator.isLength(data.password, {
    min: 6,
    max: 30,
  })) {
    errors.password = 'Password should be at least 6 characters'
  }
  if (validator.isEmpty(data.walletAddress)) {
    errors.walletAddress = 'Wallet address is required'
  }
  if (!data.walletAddress.startsWith('0x')) {
    errors.walletAddress = 'Invalid wallet address'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

module.exports = validateRegisterInput
