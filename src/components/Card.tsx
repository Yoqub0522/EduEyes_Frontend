import { useState } from "react";
import type { IOrganisation, ITeacherData } from "../types";
import { Carousel, Divider } from "antd";
import CardItem from "./CardItem";
import { useHttp } from "../hooks/useHttp";
import { Loader2 } from "lucide-react";
interface IProps {
  organisation: IOrganisation;
}

const Card = ({ organisation }: IProps) => {
  const onChange = (currentSlide: any) => {
    console.log(currentSlide);
    
  };
  const { request, loading, error } = useHttp();
  const [open, setIsOpen] = useState(false);
  const [teacherData, setTeacherData] = useState<ITeacherData[] | null>(null);

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
  console.log(error);
  return (
    <div className="flex flex-col rounded-md shadow-md">
      <div className="p-3">
        <Carousel autoplay infinite afterChange={onChange}>
          {organisation?.images.map((item) => (
            <div className="h-[230px]">
              <picture>
                <source
                  srcSet={`${
                    item.image === null
                      ? "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ff09sobcsm1ovowm5hlwv.png"
                      : item.image
                  }`}
                  type="image/webp"
                />
                <source srcSet={`${item.image}`} type="image/jpeg" />
                <img
                  src={item.image}
                  alt={item.id}
                  loading="lazy"
                  className="w-full h-full object-cover rounded"
                />
              </picture>
            </div>
          ))}
        </Carousel>
      </div>
      <div
        onClick={() => handleTeacher()}
        className="py-3 px-3 rounded cursor-pointer"
      >
        <h1 className="font-poppins font-semibold text-xl text-gray-800 tracking-tight">
          {organisation?.name}
        </h1>

        <p className="font-poppins font-medium text-sm text-gray-600 mt-2">
          The organisation: {organisation?.org_type} ·{" "}
          {organisation.distance_km} km
        </p>
        <Divider className="pb-0!">see below</Divider>
      </div>
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
    </div>
  );
};
export default Card;
