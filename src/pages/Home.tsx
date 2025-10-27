import { useEffect, useState } from "react";
import { Radio } from "antd";
import Card from "../components/Card";
import { useHttp } from "../hooks/useHttp";
import type { RadioChangeEvent } from "antd";
import type { IOrganisation } from "../types";
import { Loader2 } from "lucide-react";
import { useGeolocated } from "react-geolocated";
import Contact from "./sections/Contact";
import Footer from "../components/shared/Footer";
import Hero from "./sections/Hero";
const Home = () => {
  const { request, loading, error } = useHttp();
  const [size, setSize] = useState("");
  const [data, setData] = useState<IOrganisation[] | null>(null);
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });
  const lat = coords?.latitude || 30;
  const long = coords?.longitude || 40;

  const datatata = { lat, long };
  console.log(datatata);

  useEffect(() => {
    const url = size
      ? `https://api.yoqubaxmedov.xyz/api/admins/organization/?org_type=${size}&lat=${lat}&long=${long}`
      : `https://api.yoqubaxmedov.xyz/api/admins/organization/?lat=${lat}&long=${long}`;
    console.log(url);
    request(url)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [size, request, lat, long]);

  const onChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setSize(value);
  };
  console.log(size);
  return (
    <>
      <main>
        <Hero />
        <div id="About">
          <div className="container max-w-[1170px] mx-auto flex justify-center">
            <Radio.Group
              className="!ml-3"
              size="middle"
              value={size}
              style={{ marginBottom: 16, marginTop: 16 }}
              onChange={onChange}
            >
              <Radio.Button value="">All</Radio.Button>
              <Radio.Button value="private_school">Private School</Radio.Button>
              <Radio.Button value="university">University</Radio.Button>
              <Radio.Button value="school">School</Radio.Button>
            </Radio.Group>
          </div>
          <div className={`transition-opacity duration-300 `}>
            {loading && (
              <div className="flex justify-center items-center h-[400px]">
                <Loader2 className="animate-spin text-blue-500" size={50} />
              </div>
            )}
            {error && (
              <p className="text-center text-red-500 mt-10">
                Oops! Something went wrong. Please try again later.
              </p>
            )}
            {!loading && data && (
              <div className="grid grid-cols-1 px-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mt-10 container mx-auto max-w-[1170px]">
                {data &&
                  data!.map((organisation) => (
                    <div key={organisation.id}>
                      <Card organisation={organisation} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <Contact />
        <Footer />
      </main>
    </>
  );
};
export default Home;
