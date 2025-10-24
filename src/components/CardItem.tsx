import { useState } from "react";
import type { ITeacherData } from "../types";
import { Avatar, Modal, Rate } from "antd";

interface IProps {
  item: ITeacherData;
  id: string;
}

const CardItem = ({ item, id }: IProps) => {
  const icon = <img src={item.image} alt={item.full_name} />;
  console.log(item.rating);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(item);

  if (!item) {
    console.log("No Teacher!");
  }
  return (
    <>
      {id === item.organization && item && (
        <div
          onClick={showModal}
          className="flex justify-between items-center rounded cursor-pointer shadow-sm py-2 px-2"
        >
          <div className="flex items-center gap-1">
            <Avatar icon={icon} />
            <h1 className="font-poppins font-semibold max-w-[160px] text-[12px]">
              {item.full_name}
            </h1>
          </div>
          <Rate value={item.rating} style={{ fontSize: 14 }} disabled />
        </div>
      )}
      <Modal
        title="Teacher Detailed Info!"
        onCancel={closeModal}
        open={isModalOpen}
        centered
        footer=""
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex justify-center">
            <img
              src={item.image}
              alt={item.full_name}
              className="min-h-[250px] rounded object-cover"
            />
          </div>
          <div className="flex flex-col sm:items-start items-center gap-3">
            <h2 className="font-poppins">{item.full_name}</h2>
            <p className="text-[15px]">Lavozim: {item.username}</p>
            <p className="font-inter">Telefon raqam: {item.phone}</p>
            <div className="flex items-center gap-3">
              <p>Rating:</p>
              <Rate value={item.rating} style={{ fontSize: 14 }} disabled/>
            </div>
            <p>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CardItem;
