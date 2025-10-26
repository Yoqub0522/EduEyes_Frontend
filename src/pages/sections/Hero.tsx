import { motion } from "motion/react";
import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";
const Hero = () => {
  const { t } = useTranslation();
  return (
    <div
      id="Home"
      className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500"
    >
      <div className="container h-screen max-w-[1170px] mx-auto px-2 flex justify-center items-center gap-6 flex-col">
        <motion.div
          initial={{ opacity: 0, rotateX: 45, y: -50 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="md:text-5xl text-4xl font-bold text-white">
            {t("hero.title")}
          </h1>
        </motion.div>
        <motion.h2
          className="font-semibold text-[24px] md:text-[30px] text-center leading-10 tracking-[-2%] text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
        >
          {t("hero.subtitle")}
        </motion.h2>
        <motion.p
          className="leading-8 tracking-[9%] max-w-[600px] text-[14px] md:text-xl text-center font-poppins text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
        >
          {t("hero.description")}
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2, delayChildren: 1.2 },
            },
          }}
        >
          <Flex gap={5} className="!mt-10">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Button
                color="primary"
                type="primary"
                className="w-30 bg-white! text-emerald-500! hover:bg-emerald-50! active:scale-1/2 md:w-40! !text-bold !py-5"
              >
                {t("buttons.button")}
              </Button>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Button
                color="default"
                type="default"
                ghost
                className="!w-30 md:w-40! !py-5"
              >
                {t("buttons.button2")}
              </Button>
            </motion.div>
          </Flex>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
