import { Button } from "antd";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import type { IOrganisation } from "../../types";
import { useHttp } from "../../hooks/useHttp";
import Card from "../../components/Card";

const Organisations = () => {
  const [data, setData] = useState<IOrganisation[] | null>(null);
  const { request, loading } = useHttp();
  useEffect(() => {
    request("https://api.yoqubaxmedov.xyz/api/admins/organization/")
      .then((res) => setData(res.data))
      .catch(() => console.log("Somehting went wrong!"));
  }, [request]);
  return (
    <div className="gap-6">
      <div className="flex px-4 items-center justify-between py-3">
        <h1 className="text-[#151D48] font-poppins font-bold">Organisations</h1>
        <Button type="primary">Add Organisation +</Button>
      </div>
      {loading && (
        <div className="flex items-center h-[70vh] justify-center">
          <Loader className="animate-spin text-blue-800" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 px-4 lg:grid-cols-3 gap-4">
        {data &&
          data!.map((item) => (
            <div key={item.id}>
              <Card isAdmin organisation={item} />
            </div>
          ))}
      </div>
    </div>
  );
};
export default Organisations;
