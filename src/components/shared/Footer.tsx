import qrCode from "../../assets/qrCode.png";
import google from "../../assets/googlstaff.png"
import appstore from "../../assets/appstore.png"
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container mx-auto max-w-[1170px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  px-4 py-15">
          
          <div className="flex max-sm:items-center flex-col text-white gap-3">
            <h3 className="font-medium text-xl leading-7 font-poppins">
              Support
            </h3>
            <p className="font-normal text-base leading-6 font-inter">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <p className="font-normal text-base leading-6 font-inter">
              edueyes@gmail.com
            </p>
            <p className="font-normal text-base leading-6 font-inter">
              +88015-88888-9999
            </p>
          </div>
          <div className="flex max-sm:items-center flex-col gap-3">
            <h3 className="cursor-pointer font-inter font-extrabold text-xl tracking-tight text-white drop-shadow-sm hover:opacity-90 transition-all">
              Edu Eyes
            </h3>
            <p className="font-medium text-xl leading-7 font-poppins text-white">
              Follow Us
            </p>
            <p className="text-white">Get 10% discount</p>
          </div>
          <div className="text-white flex max-sm:items-center flex-col gap-3">
            <h3 className="font-medium text-xl leading-7 font-poppins">
              Account
            </h3>
            <p className="font-normal text-base leading-6 font-inter">
              My Account
            </p>
            <p className="font-normal text-base leading-6 font-inter">
              Address
            </p>
            <p className="font-normal text-base leading-6 font-inter">
              +88015-88888-9999
            </p>
          </div>
          <div className="flex flex-col max-sm:items-center gap-3 text-white">
            <h3 className="font-medium text-xl leading-7 font-poppins">
              Socials
            </h3>
            <div className="flex gap-3 ">
                <img src={qrCode} alt="QrCode" />
                <div>
                    <div className="flex flex-col gap-3">
                        <img src={google} alt="Google Staff" />
                        <img src={appstore} alt="AppStore" />
                    </div>
                </div>
            </div>
            <div className="flex gap-3 mt-3">
                <BsFacebook/>
                <BsTwitter/>
                <BsInstagram/>
                <BsLinkedin/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
