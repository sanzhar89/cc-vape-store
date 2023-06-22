import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = props => (
  <ContentLoader
    className="pizza-block"
    speed={3}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#e6e6e6"
    foregroundColor="#d4d4d4"
    {...props}
  >
    <rect x="10" y="1" rx="20" ry="20" width="260" height="260" />
    <rect x="0" y="285" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="334" rx="10" ry="10" width="280" height="85" />
    <rect x="0" y="444" rx="10" ry="10" width="80" height="30" />
    <rect x="130" y="444" rx="10" ry="10" width="150" height="30" />
  </ContentLoader>
);

export default Skeleton;
