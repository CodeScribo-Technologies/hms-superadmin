import { Spin } from "antd";
import { PropsWithChildren, FC } from "react";

type Props = PropsWithChildren<{
  size?: "small" | "default" | "large";
  isLoading: boolean;
}>;

const Loader: FC<Props> = ({ size = "default", children, isLoading }) => (
  <Spin size={size} tip="Loading..." spinning={isLoading}>
    {children}
  </Spin>
);

export default Loader;
