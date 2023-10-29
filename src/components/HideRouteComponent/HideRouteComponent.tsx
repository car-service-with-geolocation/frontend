import { useLocation } from 'react-router-dom';

type THideRouteComponentProps = {
  component: React.FunctionComponent;
  hidePaths: string[];
};

const HideRouteComponent = ({
  component: Component,
  hidePaths,
}: THideRouteComponentProps) => {
  const location = useLocation();

  return hidePaths.includes(location.pathname) ? null : <Component />;
};

export default HideRouteComponent;
