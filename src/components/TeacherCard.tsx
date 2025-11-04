import type { ITeacherData } from "../types";

interface IProps {
  teacher: ITeacherData;
}

const TeacherCard = ({ teacher }: IProps) => {
  return (
    <div className="h-70 shadow-md rounded-2xl p-3">
      <img
        className="w-full h-45 object-cover rounded-md"
        src={teacher.image}
        alt={teacher.full_name}
      />
      <div className="col-span-9">
        <p className="font-poppins mt-2">{teacher.full_name}</p>
      </div>
    </div>
  );
};

export default TeacherCard;
