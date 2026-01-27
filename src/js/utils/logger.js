import createDebug from 'debug'

// if DEBUG is not set, default to show error and info
if (!process.env.DEBUG) {
  createDebug.enable('rcr-tests:error,rcr-tests:info')
}
createDebug.inspectOpts.colors = true

const info = createDebug('rcr-tests:info')
info.color = 2 // green

const error = createDebug('rcr-tests:error')
error.color = 1 // red

const debug = createDebug('rcr-tests:debug')
debug.color = 4 // blue

export default {
  info,
  error,
  debug
}
