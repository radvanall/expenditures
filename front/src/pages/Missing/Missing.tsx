import React, { FC } from "react";
import { Navigate } from "react-router-dom";
interface Props {
  address: string;
}
const Missing: FC<Props> = ({ address }) => {
  // return <div>Missing</div>;
  console.log(address);
  return <Navigate to={`/${address}`} />;
};

export default Missing;
