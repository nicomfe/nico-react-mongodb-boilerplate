import React from 'react'

const Footer = () => {
  const year = new Date().getYear()
  return <div>{`Smart Creations. All rights reserved. Copyright ${year + 1900}`}</div>
}

export default Footer
