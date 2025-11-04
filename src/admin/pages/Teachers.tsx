import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import type { ITeacherData } from "../../types";
import TeacherCard from "../../components/TeacherCard";
import { Loader2 } from "lucide-react";

const Teachers = () => {
  const { request, loading } = useHttp();
  const [teachers, setTeachers] = useState<null | ITeacherData[]>(null);
  useEffect(() => {
    request("https://api.yoqubaxmedov.xyz/api/admins/teacher/")
      .then((res) => setTeachers(res.data))
      .catch(() => console.log("error"));
  }, []);
  return (
    <>
      <div>
        <h1 className="text-xl font-inter font-semibold">Teachers</h1>
        <div>
          {loading && (
            <div className="flex justify-center h-[70vh] items-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
          <div className="grid grid-cols-4 gap-4">
            {teachers &&
              teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Teachers;
