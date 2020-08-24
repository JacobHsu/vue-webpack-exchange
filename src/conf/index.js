import config from '@/../config'

const appName = process.env.APP_NAME

const conf = {
  appName: appName,
  appFullName: config.webTitle[appName]
}

export default conf
