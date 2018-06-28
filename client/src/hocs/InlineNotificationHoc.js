import React from 'react'

import NotificationText from '../components/notification/NotificationText'

const InlineNotificationHoc = (InnerComponent) => {
  class InlineNotificationWrapper extends React.Component {
    constructor() {
      super()
      this.state = {}
    }

    setNotification = (message, type) => {
      this.setState({ message, type })
    }

    getNotification = () => {
      const { message, type } = this.state
      return <NotificationText message={message} type={type} />
    }

    render() {
      return (<InnerComponent
        getNotification={this.getNotification}
        setNotification={this.setNotification}
        {...this.props}
      />)
    }
  }
  return InlineNotificationWrapper
}

export default InlineNotificationHoc
