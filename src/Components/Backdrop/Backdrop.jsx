import { Backdrop as MuiBackdrop } from "@mui/material"; // Оставляем Material UI компонент
import { motion } from "framer-motion";
import "../../style.css";

const CustomBackdrop = ({ children, onClick }) => {
  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default CustomBackdrop;
