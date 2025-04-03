import { TableProps } from "antd";
import {
  Breadcrumb,
  Button,
  Card,
  Flex,
  Input,
  message,
  Table,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import Icon from "../../../components/Icon/Icon";
import {
  useDeleteVendorMutation,
  useLazyGetVendorListQuery,
} from "@/redux/feature/api/vendor";
import Loader from "@/components/Loader";
import { Vendor } from "@/type/vendor";
import { useDataTableFilter } from "@/hooks/useDataTableFilter";
import { handleApiError } from "@/utils/api";

const VendorList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const [fetchVendors, { data: vendorData, isFetching }] =
    useLazyGetVendorListQuery();
  const [deleteVendor, { isLoading: isDeleting }] = useDeleteVendorMutation();

  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(vendorData?.data || []);

  const { search, handleSearch, handleOnSearchChange, handlePaginationChange } =
    useDataTableFilter(
      {
        fetchData: (queryParams) => fetchVendors(queryParams),
      },
    );

  useEffect(() => {
    if (vendorData?.data) {
      setFilteredVendors(vendorData.data);
    }
  }, [vendorData]);

  const showConfirmModal = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    if (selectedVendor) {
      const result = await deleteVendor(selectedVendor.uuid);
      if ("error" in result) {
        handleApiError(result.error);
      } else {
        message.success("Vendor deleted successfully");
        fetchVendors({ page: 1, limit: 10 });
      }
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns: TableProps<Vendor>["columns"] = [
    {
      title: <p className="w-full text-center">#</p>,
      dataIndex: "#",
      width: 80,
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      render: (_, __, index) => index + 1,
    },
    {
      title: t("vendor.name"),
      dataIndex: "name",
      render: (_, record) => (
        <p className="text-sm font-medium">{record?.name}</p>
      ),
    },
    {
      title: t("vendor.logo"),
      dataIndex: "logo",
      render: (_, record) => (
        <img src={record.logo} alt="logo" className="w-10 h-10 rounded-md" />
      ),
    },
    {
      title: t("vendor.is_master"),
      dataIndex: "is_master",
      render: (_, record) => (
        <p className="text-sm font-medium">
          {record.is_master ? "Yes" : "No"}
        </p>
      ),
    },
    {
      title: t("vendor.is_active"),
      dataIndex: "is_active",
      render: (_, record) => (
        <p className="text-sm font-medium">
          {record.is_active ? "Active" : "Inactive"}
        </p>
      ),
    },
    {
      title: t("vendor.created_at"),
      dataIndex: "CreatedAt",
      render: (_, record) =>
        record?.CreatedAt
          ? format(new Date(record?.CreatedAt), "dd MMM yyyy")
          : "-",
    },
    {
      title: t("vendor.updated_at"),
      dataIndex: "UpdatedAt",
      render: (_, record) =>
        record?.UpdatedAt
          ? format(new Date(record?.UpdatedAt), "dd MMM yyyy")
          : "-",
    },
    {
      title: t("vendor.actions"),
      className: "!text-right",
      key: "action",
      render: (record: Vendor) => (
        <Flex gap="small" align="center" justify="end">
          <Button
            color="default"
            variant="filled"
            icon={<Icon name="pencil" />}
            onClick={() => navigate(`/edit-vendor/${record.uuid}`)}
          />
          <Button
            loading={isDeleting && selectedVendor?.uuid === record.uuid}
            color="danger"
            variant="filled"
            icon={<Icon name="trash" />}
            onClick={() => showConfirmModal(record)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Loader isLoading={isFetching}>
      <Breadcrumb
        className="mb-4"
        items={[
          { title: <Link to="/">{t("commonText.home")}</Link> },
          { title: t("vendor.title") },
        ]}
      />
      <Card>
        <div className="mb-6">
          <Typography.Title level={3}>{t("vendor.title")}</Typography.Title>
          <Flex justify="space-between" align="center" className="flex-wrap gap-2">
            <Flex className="gap-2" align="center">
              <Input.Search
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnSearchChange(e.target.value)
                }
                onSearch={handleSearch}
                allowClear
                placeholder="Search"
              />
            </Flex>
            <Flex justify="end" className="gap-4">
              <Button color="primary" variant="filled" onClick={() => navigate("/new-vendor")}>
                <Icon name="plus" /> {t("vendor.addNew")}
              </Button>
            </Flex>
          </Flex>
        </div>

        <Table
          columns={columns}
          dataSource={filteredVendors || []}
          scroll={{ x: 400 }}
          className="rounded-lg"
          pagination={{
            className: "!mb-0 !mt-6",
            total: vendorData?.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          onChange={handlePaginationChange}
        />
        <ConfirmModal
          visible={isModalVisible}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </Card>
    </Loader>
  );
};

export default VendorList;
