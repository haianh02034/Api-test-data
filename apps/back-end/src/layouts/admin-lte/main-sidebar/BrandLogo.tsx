import { Link } from 'react-router-dom';
import { config } from '@back-end/configs';

const BrandLogo = () => {
  return (
    <Link to="/" className="brand-link navbar-info d-flex align-items-center">
      <img
        src="/assets/logo/fav.png"
        alt={config.siteName}
        className="brand-image img-circle elevation-3 bg-dark ml-0"
        width={25}
        height={25}
      />
      <span className="brand-text font-weight-light">{config.siteName}</span>
    </Link>
  );
};

export default BrandLogo;
