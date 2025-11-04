import { Dropdown, Space, type MenuProps } from "antd";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Language = ({ color = "text-white" }: { color?: string }) => {
  const [open, setOpen] = useState(false);
  const items: MenuProps["items"] = [
    { key: "en", label: "En" },
    { key: "uz", label: "Uz" },
  ];
  const { i18n } = useTranslation();
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    i18n.changeLanguage(e.key);
  };
  const handleOpen = (open: boolean) => {
    setOpen(open);
  };
  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [i18n.language],
        onClick: handleMenuClick,
      }}
      trigger={["click"]}
      placement="bottomRight"
      arrow
      onOpenChange={handleOpen}
    >
      <Space className="cursor-pointer transition">
        <div className="flex items-center gap-1/2">
          <span className={`font-poppins text-md ${color}`}>
            {i18n.language === "en" ? "En" : "Uz"}
          </span>
          <ChevronDown
            className={`${color} ${open ? "rotate-[180deg]" : ""}  transition`}
            size={20}
          />
        </div>
      </Space>
    </Dropdown>
  );
};

export default Language;
