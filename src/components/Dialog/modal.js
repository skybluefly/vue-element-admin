import Dialog from './dialogInstance'
let dialogInstance
function getdialogInstance(props) {
  dialogInstance = dialogInstance || Dialog.newInstance(props)
  return dialogInstance
}

function confirm(options) {
  const instance = getdialogInstance(options)
  if (dialogInstance) dialogInstance = null
  return instance.show(options)
}

Dialog.open = function(props = {}) {
  return confirm(props)
}

export default Dialog

