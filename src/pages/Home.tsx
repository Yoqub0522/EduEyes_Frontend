import  { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, Flex, Radio } from "antd";
import Card from "../components/Card";
import { useHttp } from "../hooks/useHttp";
import type { RadioChangeEvent } from "antd";
import type { IOrganisation } from "../types";
import { Loader2 } from "lucide-react";
import { useGeolocated } from "react-geolocated";
import Contact from "./Contact";
import Footer from "../components/shared/Footer";
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
  const lat = coords?.latitude || 41.2995;
  const long = coords?.longitude || 69.2401;

  const datatata = {lat, long}
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
        <Header />
        <div className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500">
          <div className="container h-screen max-w-[1170px] mx-auto px-2  flex justify-center items-center gap-6 flex-col">
            <h1 className="text-4xl font-bold text-white">Edu Eyes</h1>
            <h2 className="font-semibold text-[32px] text-center leading-10 tracking-[-2%] text-white">
              The place where you can find usefull information
            </h2>
            <p className="leading-5 tracking-[9%] max-w-[600px] text-center font-poppins text-white">
              We know how large objects will act, but things on a small scale
              just do not act that way.
            </p>
            <Flex gap={5} className="!mt-10">
              <Button
                color="primary"
                type="primary"
                className="w-30 md:w-40! !text-bold !py-5"
              >
                Join Us
              </Button>
              <Button
                color="primary"
                type="primary"
                ghost
                className="!w-30 md:w-40! !py-5"
              >
                Learn More
              </Button>
            </Flex>
          </div>
        </div>
        <div>
          <div className="container max-w-[1170px] mx-auto flex justify-center">
            <Radio.Group
              className="!ml-3"
              size="small"
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
        <Contact/>
        <Footer/>
      </main>
    </>
  );
};
export default Home;
