import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};

const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const DropdownMenu = ({ route, showAnimation, isSidebarOpened, setIsSidebarOpened, icons }) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpened((prevState) => !prevState);
    // Optionally manage the sidebar state here
    setIsSidebarOpened(true);
  };

  useEffect(() => {
    if (!isSidebarOpened) {
      setIsDropdownOpened(false);
    }
  }, [isSidebarOpened]);

  return (
    <>
      <div
        onClick={toggleDropdown}
        className={`flex items-center justify-between h-10 transition-all duration-[0.5s] border-r-4 border-transparent hover:border-[#3549ff] hover:bg-[#2d3359] cursor-pointer ${
          isSidebarOpened ? "px-3" : "pl-5"
        } ${isDropdownOpened ? "" : "mb-3"}`}
      >
        <div className="flex items-center gap-3">
          <img src={route.icon} alt={route.name} className={`${isSidebarOpened ? 'md:w-4' : 'w-5'}`} />
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
        </div>
        {isSidebarOpened && (
          <motion.div
            animate={isDropdownOpened ? { rotate: 90 } : { rotate: 0 }}
          >
            <img src={icons.arrow} alt="" />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isDropdownOpened && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className='mb-3'
          >
            {route.subRoutes.map((subRoute, index) => (
              <motion.div
                key={index}
                variants={menuItemAnimation}
                custom={index}
              >
                <NavLink
                  to={subRoute.path}
                  className={`flex items-center gap-3 h-10 border-b border-white border-r-4 border-r-transparent transition-all duration-[0.5s] border-transparent hover:border-r-[#3549ff] hover:bg-[#2d3359] ${
                    isSidebarOpened ? "pl-10" : "pl-10"
                  }`}
                >
                  <img src={subRoute.icon} alt={subRoute.name} className="w-4" />
                  <AnimatePresence>
                    {isSidebarOpened && (
                      <motion.p
                        variants={showAnimation}
                        className="text-sm whitespace-nowrap"
                      >
                        {subRoute.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DropdownMenu;
