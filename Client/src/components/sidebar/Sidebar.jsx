import React, { useState, useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { icons } from "@/assets/assets";
import { LogOut } from "lucide-react";
import { AuthContext } from "@/context/authContext";


const Sidebar = ({routes}) => {
  const { setShowLogoutAlert } = useContext(AuthContext);

  const [isSidebarOpened, setIsSidebarOpened] = useState(true);

  // Function to handle window resize
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpened(false);
    } else {
      setIsSidebarOpened(true);
    }
  };

  // Add event listener for resize
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showAnimation = {
    hidden: {
      opacity: 0,
      width: 0,
      transition: {
        duration: 0.3,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="flex">
      <motion.div
        animate={{
          width: isSidebarOpened ? "200px" : "65px",
          transition: { duration: 0.5, type: "spring", damping: 10 },
        }}
        className="bg-[#00073d] text-white h-screen overflow-y-auto overflow-x-hidden relative"
      >
        <section
          className={`flex items-center mb-3 px-3 h-[65px] ${
            isSidebarOpened ? "justify-between" : "px-0 pl-5"
          }`}
        >
          <AnimatePresence>
            {isSidebarOpened && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="text-sm md:text-xl whitespace-nowrap"
              >
                EMS
              </motion.h1>
            )}
          </AnimatePresence>
          <img
            src={icons.menuBar}
            alt=""
            className={` cursor-pointer ${isSidebarOpened ? "md:w-6" : "w-6"}`}
            onClick={() => setIsSidebarOpened((prev) => !prev)}
          />
        </section>
        <section>
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <DropdownMenu
                  isSidebarOpened={isSidebarOpened}
                  route={route}
                  showAnimation={showAnimation}
                  setIsSidebarOpened={setIsSidebarOpened}
                  icons={icons}
                  key={index}
                />
              );
            }
            return (
              <NavLink
                to={route.path}
                key={index}
                className={`flex items-center gap-3 mb-3 h-10 transition-all duration-[0.5s] border-r-4 border-transparent hover:border-[#3549ff] hover:bg-[#2d3359] ${
                  isSidebarOpened ? " pl-3" : "pl-5"
                }`}
              >
                <img
                  src={route.icon}
                  alt={route.name}
                  className={`${isSidebarOpened ? "md:w-4" : "w-5"}`}
                />
                <AnimatePresence>
                  {isSidebarOpened && (
                    <motion.p
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="text-xs md:text-sm whitespace-nowrap"
                    >
                      {route.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </section>
        <section className="absolute left-0 bottom-0 w-full">
          <div onClick={() => setShowLogoutAlert(true)} className={`flex items-center gap-3 mb-3 h-10 cursor-pointer transition-all duration-[0.5s] border-r-4 border-transparent hover:border-[#3549ff] hover:bg-[#2d3359] ${
                  isSidebarOpened ? " pl-3" : "pl-5"
                }`}>
            <LogOut className="w-5"/>
            {isSidebarOpened && <p className="text-xs md:text-sm whitespace-nowrap">Logout</p>}
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Sidebar;
