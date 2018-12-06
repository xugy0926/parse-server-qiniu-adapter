const DEFAULT_QINIU_REGION = 'z0'

function fromEnvironmentOrDefault(options, key, env, defaultValue) {
  options[key] = options[key] || process.env[env] || defaultValue
  return options
}

const optionsFromArguments = function optionsFromArguments(args) {
  let stringOrOptions = args[0]
  let options = {}

  if (typeof stringOrOptions == 'string') {
    stringOrOptions = JSON.parse(stringOrOptions)
  }

  Object.assign(options, stringOrOptions)

  options = fromEnvironmentOrDefault(options, 'accessKey', ' QINIU_ACCESS_KEY', null)
  options = fromEnvironmentOrDefault(options, 'secretKey', 'QINIU_SECRET_KEY', null)
  options = fromEnvironmentOrDefault(options, 'bucket', 'QUNIU_BUCKET', '')
  options = fromEnvironmentOrDefault(options, 'region', 'QUNIU_REGION', DEFAULT_QINIU_REGION)

  return options
}

module.exports = optionsFromArguments
