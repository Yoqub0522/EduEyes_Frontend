import { Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface IUserRegister {
  first_name?: string;
  last_name?: string;
  username?: string;
  phone_number?: string;
  email: string;
  password: string;
}
const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: IUserRegister) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.yoqubaxmedov.xyz/api/users/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      navigate("/auth/login");
      toast.success("You successfully registered!");
    } catch (error) {
      toast.error(`Something went wrong!`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="lg:w-[40%] px-6 w-full sm:w-[70%] md:w-[60%]">
      {loading && <p>loading...</p>}
      <Card title="Register" className="shadow-lg rounded-xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="First Name  ">
            <Input maxLength={150} placeholder="Enter your first name" />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name">
            <Input maxLength={150} placeholder="Enter your last name" />
          </Form.Item>
          <Form.Item label="Username" name="username">
            <Input maxLength={150} placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input maxLength={254} placeholder="example@mail.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { max: 128, message: "Password too long" },
            ]}
          >
            <Input.Password placeholder="........." />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="rounded-md"
            >
              Register
            </Button>
          </Form.Item>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600">
              Log in
            </Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};
export default Register;
