import { TablePaginationConfig, TableProps } from "antd";
import { Button, Card, Flex, Table, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Icon from "../../../components/Icon/Icon";
import { useLazyGetVendorListQuery } from "../../../redux/feature/api/vendor";
import Loader from "../../../components/Loader/index";
import { Vendor } from "../../../type/vendor";

const VendorList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const [fetchVendors, { data: vendorData, isFetching }] =
    useLazyGetVendorListQuery();

  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    fetchVendors({ page, limit });
  }, [fetchVendors, page, limit]);

  useEffect(() => {
    if (vendorData?.data) {
      setFilteredVendors(vendorData.data);
    }
  }, [vendorData]);

  const isLoading = isFetching && !vendorData;

  const handlePaginationChange = (pagination: TablePaginationConfig) => {
    if (pagination.current && pagination.pageSize) {
      setSearchParams({ page: pagination.current.toString(), limit: pagination.pageSize.toString() });
    }
  };  const columns: TableProps<Vendor>["columns"] = [
    {
      title: <p className="w-full text-center">#</p>,
      dataIndex: "#",
      width: 80,
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => (
        <p className="text-sm font-medium">{record?.name}</p>
      ),
    },
    {
      title: "Active Status",
      dataIndex: "is_active",
      render: (_, record) => (
        <p className="text-sm font-medium">
          {record.is_active ? "Active" : "Inactive"}
        </p>
      ),
    },
    {
      title: "Created At",
      dataIndex: "CreatedAt",
      render: (_, record) =>
        record?.CreatedAt
          ? format(new Date(record?.CreatedAt), "dd MMM yyyy")
          : "-",
    },
    {
      title: "Actions",
      className: "!text-right",
      key: "action",
      render: (record: Vendor) => (
        <Flex gap="small" align="center" justify="start">
          <Button
            color="default"
            variant="filled"
            icon={<Icon name="pencil" />}
            onClick={() => navigate(`/edit-vendor/${record.uuid}`)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Loader isLoading={isLoading}>
      <Card>
        {/* Page Title */}
        <div className="mb-6">
          <Typography.Title level={3}>{t("Vendor's List")}</Typography.Title>
        </div>

        {/* Button Alignment */}
        <Flex justify="end" align="center" className="flex-wrap gap-2 mb-4">
          <Button color="primary" variant="filled" onClick={() => navigate("/new-vendor")}>
            <Icon name="plus" /> {t("vendor.addNew")}
          </Button>
        </Flex>

        {/* Vendor Table */}
        <Table
          columns={columns}
          dataSource={filteredVendors || []}
          scroll={{ x: 400 }}
          className="rounded-lg"
          pagination={{
            className: "!mb-0 !mt-6",
            current: page,
            pageSize: limit,
            total: vendorData?.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          onChange={handlePaginationChange}
        />
      </Card>
    </Loader>
  );
};
export default VendorList;
