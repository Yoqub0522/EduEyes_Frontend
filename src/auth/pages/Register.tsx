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
      const data = await response.json();
      console.log(data.error);
      if (!response.ok) {
        let errorMessage = "Registration failed!";
        if (data?.error_message) {
          const messages = Object.entries(data.error_message)
            .map(([field, errors]) => {
              return `${(errors as string[]).join(", ")}` || field;
            })
            .join("\n");
          errorMessage = messages || errorMessage;
        } else if (data?.detail) {
          errorMessage = data.detail;
        }
        throw new Error(errorMessage);
      }
      toast.success("You successfully registered!");
      form.resetFields();
      navigate("/auth/login");
    } catch (err: any) {
      console.error("Registration error:", err);
      const message =
        err.message || "Something went wrong! Please try again later.";
      toast.error(message);
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
            <Input
              maxLength={150}
              name="first_name"
              placeholder="Enter your first name"
            />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name">
            <Input maxLength={150} placeholder="Enter your last name" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Username is required" },
              { min: 3, message: "Username must be at least 3 characters" },
            ]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              { required: true, message: "Phone number is required" },
              { pattern: /^[0-9]+$/, message: "Only digits are allowed" },
            ]}
          >
            <Input maxLength={15} placeholder="Enter your phone number" />
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
              {loading ? "Registering..." : "Register"}
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
