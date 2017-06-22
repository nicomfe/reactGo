import React from 'react'
import PropTypes from 'prop-types'

const Avatar = ({ image }) => {
  return <img style={{ borderRadius: '50%', height: '50px', width: '50px' }} role="presentation" src={image} />
}

Avatar.propTypes = {
  image: PropTypes.string,
}

export default Avatar
