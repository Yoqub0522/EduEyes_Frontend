import { Button, Card, Form, Input } from "antd";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext";
interface iLogin {
  email: string;
  password: string;
}
const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const onLogin = async (values: iLogin) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.yoqubaxmedov.xyz/api/users/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`The password or email is incorrect!`);
      }
      const accessToken = data.data.access;
      const refresh = data.data.refresh;
      localStorage.setItem("refresh", refresh);
      login(accessToken);
      toast.success("Successfully logged in!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="lg:w-[46%] px-6 w-full sm:w-[70%] md:w-[60%]">
      <Card title="Login" className=" shadow-lg rounded-xl">
        <Form
          className="w-full"
          title="Login"
          layout="vertical"
          form={form}
          onFinish={onLogin}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input placeholder="email@gmail.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required!" },
              { min: 8, message: "Enter more than 8 letters!" },
            ]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            className="rounded-md"
          >
            Login
          </Button>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/auth/register" className="text-blue-600">
              Sign Up
            </Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
