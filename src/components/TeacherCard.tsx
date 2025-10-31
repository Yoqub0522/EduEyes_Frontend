import React from "react";
import type { ITeacherData } from "../types";

interface IProps {
  teacher: ITeacherData;
}

const TeacherCard = ({ teacher }: IProps) => {
  return (
    <div className="shadow-md px-3 h-20 py-4 grid grid-cols-18 ">
      <img
        className="w-full h-15 rounded-md"
        src={teacher.image}
        alt={teacher.full_name}
      />
      <div className="col-span-9">
        <p>{teacher.full_name}</p>
      </div>
    </div>
  );
};

export default TeacherCard;
