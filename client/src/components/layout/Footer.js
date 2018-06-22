import React from 'react'

const Footer = () => {
  const year = new Date().getYear()
  return <div><small>{`Smart Creations. All rights reserved. Copyright ${year + 1900}`}</small></div>
}

export default Footer
