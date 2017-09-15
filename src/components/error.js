import React from 'react';
import PropTypes from 'prop-types';

function Error(props) {
  return props.message ? (
    <p className="error-message">{props.message}</p>
  ) : null;
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
