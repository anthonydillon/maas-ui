import { Spinner } from "@canonical/react-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import poolSelectors from "app/store/resourcepool/selectors";
import PoolForm from "../PoolForm";

export const PoolEdit = () => {
  const { id } = useParams();
  const loaded = useSelector(poolSelectors.loaded);
  const loading = useSelector(poolSelectors.loading);
  const pool = useSelector((state) =>
    poolSelectors.getById(state, parseInt(id))
  );

  if (loading) {
    return <Spinner text="Loading..." />;
  }
  if (loaded && !pool) {
    return <h4>Resource pool not found</h4>;
  }
  return <PoolForm pool={pool} />;
};

export default PoolEdit;
