import { Breadcrumb, Button, Card, Flex, Form, Input, message, Select, } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useCreateVendorMutation } from "@/redux/feature/api/vendor";
import { validateRequired } from "@/utils/validation";
import { handleApiError } from "@/utils/api";
import { VendorCreateRequest } from "@/type/vendor";

const CreateVendor = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [createVendor, { isLoading }] = useCreateVendorMutation();

    const onFinish = async (values: {
        vendor_name: string;
        name: string;
        logo?: string;
        email: string;
        password: string;
        package_type: string;
        package_id: string;
        price: string;
        period: string;
        interval: string;
        package_active: string;
        is_trial: string;
        trial_period_in_days: string;
        features: string[];
    }) => {
        const payload: VendorCreateRequest = {
            vendor_name: values.vendor_name,
            name: values.name,
            logo: values.logo || "",
            email: values.email,
            password: values.password,
            packageDetails: {
                package_type: values.package_type,
                package_id: values.package_id,
                price: Number(values.price),
                period: values.period,
                interval: Number(values.interval),
                is_active: values.package_active === "active",
                is_trial: values.is_trial === "yes",
                trial_period_in_days: Number(values.trial_period_in_days),
                features: values.features.map((feature: string) => ({
                    id: feature,
                    value: feature,
                })),
            },
        };

        try {
            const response = await createVendor(payload).unwrap();
            message.success(response?.message || "Vendor created successfully!");
            navigate("/vendors");
        } catch (error) {
            handleApiError(error);
        }
    };    return (        <>            <Breadcrumb style={{ marginBottom: "16px" }}>
                <Breadcrumb.Item>
                    <Link to="/">{t("commonText.home")}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/vendors">{t("vendor.all")}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{t("vendor.createNew")}</Breadcrumb.Item>
            </Breadcrumb>

            <Card
                title={
                    <Flex justify="space-between" align="center">
                        <h2 className="font-medium text-lg">{t("vendor.createNew")}</h2>
                    </Flex>
                }
            >
                <Form layout="vertical" onFinish={onFinish}>
                    <Flex justify="space-between" className="flex-col lg:flex-row gap-8">
                        <Form.Item label="Vendor Name" name="vendor_name" className="w-full lg:w-1/2" rules={[validateRequired()]}>
                            <Input placeholder="Enter vendor name" size="large" />
                        </Form.Item>

                        <Form.Item label="Contact Person" name="name" className="w-full lg:w-1/2" rules={[validateRequired()]}>
                            <Input placeholder="Enter contact name" size="large" />
                        </Form.Item>
                    </Flex>

                    <Flex justify="space-between" className="flex-col lg:flex-row gap-8">
                        <Form.Item label="Email" name="email" className="w-full lg:w-1/2" rules={[validateRequired()]}>
                            <Input type="email" placeholder="Enter email" size="large" />
                        </Form.Item>

                        <Form.Item label="Password" name="password" className="w-full lg:w-1/2" rules={[validateRequired()]}>
                            <Input.Password placeholder="Enter password" size="large" />
                        </Form.Item>
                    </Flex>

                    <Flex justify="space-between" className="flex-col lg:flex-row gap-8">
                        <Form.Item label="Logo URL" name="logo" className="w-full lg:w-1/2">
                            <Input placeholder="Enter logo URL" size="large" />
                        </Form.Item>

                        <Form.Item label="Package Type" name="package_type" className="w-full lg:w-1/2" rules={[validateRequired()]}>
                            <Select placeholder="Select package type" size="large">
                                <Select.Option value="basic">Default</Select.Option>
                                <Select.Option value="premium">Custom</Select.Option>
                            </Select>
                        </Form.Item>
                    </Flex>

                    <Flex justify="space-between" className="flex-col lg:flex-row gap-8">
                        <Form.Item label="Price" name="price" className="w-full lg:w-1/2" rules={[validateRequired()]}>
                            <Input type="number" placeholder="Enter price" size="large" />
                        </Form.Item>

                        <Form.Item label="Trial Period (Days)" name="trial_period_in_days" className="w-full lg:w-1/2">
                            <Input type="number" placeholder="Enter trial period" size="large" />
                        </Form.Item>
                    </Flex>

                    <Flex justify="space-between" className="flex-col lg:flex-row gap-8">
                        <Form.Item label="Active Status" name="is_active" className="w-full lg:w-1/2">
                            <Select placeholder="Select status" size="large">
                                <Select.Option value="active">Active</Select.Option>
                                <Select.Option value="inactive">Inactive</Select.Option>
                            </Select>
                        </Form.Item>

                    </Flex>

                    <Form.Item label="Features" name="features">
                        <Select mode="multiple" placeholder="Select features" size="large">
                            <Select.Option value="feature1">Feature 1</Select.Option>
                            <Select.Option value="feature2">Feature 2</Select.Option>
                            <Select.Option value="feature3">Feature 3</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <div className="flex justify-end space-x-3 mt-5">
                            <Button onClick={() => navigate("/vendors")} className="text-normal px-2 py-1 font-normal">
                                {t("commonText.cancel")}
                            </Button>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                {t("commonText.save")}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
};

export default CreateVendor;
