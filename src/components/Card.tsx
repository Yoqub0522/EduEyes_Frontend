import React, { useState } from "react";
import type { IOrganisation, ITeacherData } from "../types";
import { Button, Carousel, Divider, Modal } from "antd";
import CardItem from "./CardItem";
import { useHttp } from "../hooks/useHttp";
import { Edit, Edit2, Loader2, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
interface IProps {
  organisation: IOrganisation;
  isAdmin?: boolean;
}
const Card = ({ organisation, isAdmin = false }: IProps) => {
  const onChange = (currentSlide: any) => {
    console.log(currentSlide);
  };
  const { request, loading } = useHttp();
  const [open, setIsOpen] = useState(false);
  const [teacherData, setTeacherData] = useState<ITeacherData[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onTeacher = (name: string) => {
    request(
      `https://api.yoqubaxmedov.xyz/api/admins/teacher/?organization=${name}`
    ).then((res) => setTeacherData(res.data));
  };
  const handleTeacher = () => {
    setIsOpen(!open);
    if (!teacherData) {
      onTeacher(organisation.name);
    }
  };
  const onDelete = async () => {
    request(
      `https://api.yoqubaxmedov.xyz/api/admins/organization/${organisation.id}/`,
      "DELETE"
    )
      .then(() => {
        toast.success(`You successfully deleted the ${organisation.name}`);
        setIsModalOpen(false);
        location.reload();
      })
      .catch(() => console.log(organisation.id));
  };
  const { t } = useTranslation();
  return (
    <div className="flex flex-col rounded-md shadow-md">
      <div className="p-3">
        <Carousel autoplay infinite afterChange={onChange}>
          {organisation?.images.map((item) => (
            <div className="h-[230px]">
              <picture>
                <source
                  className="w-10"
                  srcSet={`${
                    item.image === null
                      ? "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ff09sobcsm1ovowm5hlwv.png"
                      : item.image
                  }`}
                  type="image/webp"
                />
                <source
                  className="w-15"
                  srcSet={`${item.image}`}
                  type="image/jpeg"
                />
                <img
                  src={item.image}
                  alt={item.id}
                  loading="lazy"
                  className="w-full h-full object-cover object-bottom rounded"
                />
              </picture>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="py-3 px-3 flex rounded">
        <div>
          <div>
            <h1 className="font-poppins font-semibold text-xl text-gray-800 tracking-tight">
              {organisation?.name}
            </h1>
            <p className="font-poppins font-medium line-clamp text-sm text-gray-600 mt-2">
              The organisation: {organisation?.org_type} {organisation.distance}{" "}
              km
            </p>
          </div>
        </div>
        {isAdmin && (
          <div className="flex gap-2 px-5 py-2">
            <Button>
              <Edit2 size={13} />
            </Button>
            <Button
              onClick={() => setIsModalOpen(!isModalOpen)}
              danger
              type="primary"
            >
              <Trash size={15} />
            </Button>
          </div>
        )}
      </div>
      {!isAdmin && (
        <div onClick={() => handleTeacher()} className="cursor-pointer py-2">
          <Divider className="pb-0!">{t("below")}</Divider>
        </div>
      )}
      {!isAdmin && (
        <div
          className={`  overflow-auto transition-all duration-500 flex flex-col gap-3 px-2 ${
            open ? "max-h-40 mt-3 py-2" : "max-h-0"
          }`}
        >
          {loading && (
            <div className="flex justify-center">
              <Loader2 className="animate-spin" size={40} />
            </div>
          )}
          {teacherData?.map((item) => (
            <CardItem item={item} id={organisation.id} />
          ))}
          {!teacherData?.length && !loading && (
            <p className="text-center pb-2">No Data Found about teacher!</p>
          )}
        </div>
      )}
      {isModalOpen && (
        <Modal
          title={`Deleting the organisation`}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => onDelete()}
          centered
        >
          <div>
            <p>Are you sure to delete the {organisation.name}?</p>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default React.memo(Card);
