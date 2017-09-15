import React from 'react';
import PropTypes from 'prop-types';

function Loader({ loading }) {
  return loading ? <p>Loading…</p> : null;
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loader;
