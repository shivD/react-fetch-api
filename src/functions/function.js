import React from 'react';

function Image(props) {
    const { fallback, alt, ...rest } = props;
    const handleBrokenImage = (event) => event.target.src = fallback;
    return <img {...rest} alt={alt} onError={handleBrokenImage} />;
  }
  Image.propTypes = {
    fallback: Proptypes.string,
    alt: Proptypes.string,
  };
  Image.defaultProps = {
    alt: 'Default alt for a11y',
    fallback: 'path/to/default/image/or/placeholder'
  };
  export default Image;