import type { ITeacherData } from "../types";
import { Avatar, Rate } from "antd";

interface IProps {
  item: ITeacherData;
  id: string;
}

const CardItem = ({ item, id }: IProps) => {
  const icon = <img src={item.image} alt={item.full_name} />
  console.log(item.rating);

  console.log(item);

  if(!item){
    console.log("No Teacher!");
    
  }
  return (
    <>
      {id === item.organization && item && (
          <div className="flex justify-between items-center rounded cursor-pointer shadow-sm py-2 px-2">
            <div className="flex items-center gap-1">
              <Avatar  icon={icon}/>
          <h1 className="font-poppins font-semibold max-w-[160px] text-[12px]">
            {item.full_name}
          </h1>
            </div>
          <Rate value={item.rating} style={{fontSize: 14}} disabled/>
        </div>
      )}
    </>
  );
};

export default CardItem;




