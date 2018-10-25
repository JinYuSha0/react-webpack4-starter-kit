const files = require.context('.', true, /\.js/)
const modules = {}

files.keys().forEach((key) => {
  if (key === './demo.js') {
    return
  }
  modules[key.replace(/(^\.\/|\.js$)/g, '')] = files(key).default
})

export default modules
