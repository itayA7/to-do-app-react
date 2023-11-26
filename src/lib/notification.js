import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const success=(message)=>toast.success(message);

export const error=(message)=>toast.error(message || "opps, something went wrong ");

export const info=(message)=>toast.info(message);
