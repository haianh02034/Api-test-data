import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastAlert = () => {
  return <ToastContainer limit={3} position="bottom-right" />;
};

export default ToastAlert;
