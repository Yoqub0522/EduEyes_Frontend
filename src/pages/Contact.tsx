import { Form, Input, Button } from "antd";
import React from "react";
import OrganisationMap from "../components/OrganisationMap";

const Contact = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  
  return (
    <div className="container max-w-[1170px] mx-auto mt-20 pb-20 px-4">
      <div className="flex flex-col items-center mb-10">
        <h2 className="font-semibold text-4xl leading-[48px] tracking-[0.04em] font-poppins mb-2">
          Contact Us
        </h2>
        <p className="font-normal text-base leading-6 font-poppins text-center max-w-md">
          We'd love to hear from you! Please fill out the form and we will get
          in touch.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-20 md:gap-8">
        <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded">
          <div className="w-full flex justify-center mt-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m20!1m8!1m3!1d4225.5532270333515!2d69.31764810033833!3d41.327526736266364!3m2!1i1024!2i768!4f13.1!4m9!3e2!4m3!3m2!1d41.327463!2d69.3162041!4m3!3m2!1d41.327511699999995!2d69.3161027!5e0!3m2!1sru!2s!4v1761219663337!5m2!1sru!2s"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="bg-white p-8 rounded shadow-md">
          <Form
            layout="vertical"
            name="contact"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[
                { required: true, message: "Please enter your full name!" },
              ]}
            >
              <Input className="rounded-md" placeholder="John Doe" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input className="rounded-md" placeholder="example@mail.com" />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[
                { required: true, message: "Please write your message!" },
              ]}
            >
              <Input.TextArea
                rows={5}
                className="rounded-md !resize-none"
                placeholder="Your message..."
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
