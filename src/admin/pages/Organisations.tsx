import { Button, Input, Modal, Select, Form, Upload } from "antd";
import { Loader, Plus, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import type { IOrganisation } from "../../types";
import { useHttp } from "../../hooks/useHttp";
import Card from "../../components/Card";
import { toast } from "sonner";
import type { UploadFile } from "antd/es/upload/interface";

const Organisations = () => {
  const [data, setData] = useState<IOrganisation[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { request, loading } = useHttp();
  const [form] = Form.useForm();
  useEffect(() => {
    request("https://api.yoqubaxmedov.xyz/api/admins/organization/")
      .then((res) => setData(res.data))
      .catch(() => console.log("Something went wrong!"));
  }, [request]);
  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("org_type", values.org_type);
      formData.append("address.street_name", values.street_name);
      formData.append("address.lat", values.lat);
      formData.append("address.long", values.long);
      fileList.forEach((item) => {
        if (item.originFileObj) {
          formData.append("images", item.originFileObj as File);
        }
      });

      console.log("FormData entries:");
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      await request(
        "https://api.yoqubaxmedov.xyz/api/admins/organization/",
        "POST",
        formData
      );

      toast.success("Organisation created successfully!");
      setIsOpen(false);
      form.resetFields();
      setFileList([]);
      const res = await request(
        "https://api.yoqubaxmedov.xyz/api/admins/organization/"
      );
      setData(res.data);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="gap-6">
      <div className="flex px-4 items-center justify-between py-3">
        <h1 className="text-[#151D48] font-poppins font-bold text-xl">
          Organisations
        </h1>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={() => setIsOpen(true)}
        >
          Add Organisation
        </Button>
      </div>
      {loading && (
        <div className="flex items-center h-[70vh] justify-center">
          <Loader className="animate-spin text-blue-800" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 px-4 lg:grid-cols-3 gap-4">
        {data &&
          data.map((item) => (
            <div key={item.id}>
              <Card isAdmin organisation={item} />
            </div>
          ))}
      </div>
      <Modal
        title="Add New Organisation"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-3"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Organisation name" />
          </Form.Item>

          <Form.Item
            label="Organisation Type"
            name="org_type"
            rules={[{ required: true, message: "Select organisation type" }]}
          >
            <Select
              placeholder="Select type"
              options={[
                { label: "university", value: "university" },
                { label: "school", value: "school" },
                { label: "private School", value: "private_school" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Street Name"
            name="street_name"
            rules={[{ required: true, message: "Enter street name" }]}
          >
            <Input placeholder="Enter street name" />
          </Form.Item>

          <div className="flex gap-3">
            <Form.Item
              label="Latitude"
              name="lat"
              className="w-1/2"
              rules={[{ required: true, message: "Enter latitude" }]}
            >
              <Input type="number" placeholder="0" />
            </Form.Item>

            <Form.Item
              label="Longitude"
              name="long"
              className="w-1/2"
              rules={[{ required: true, message: "Enter longitude" }]}
            >
              <Input type="number" placeholder="0" />
            </Form.Item>
          </div>
          <Form.Item label="Upload Images">
            <Upload
              multiple
              listType="picture-card"
              beforeUpload={() => false}
              onChange={({ fileList }) => setFileList(fileList)}
              onRemove={(file) =>
                setFileList((prev) => prev.filter((f) => f.uid !== file.uid))
              }
              fileList={fileList}
            >
              <div className="flex flex-col items-center">
                <UploadCloud className="text-blue-500 mb-1" size={20} />
                <span className="text-sm text-gray-600">Upload</span>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Organisations;
