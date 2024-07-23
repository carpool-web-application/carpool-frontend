import { useDispatch } from 'react-redux';
import { setConnected } from '../Slice/socketSlice';
import socketConnection from '../Config/socket-config';

export const useManageSocket = () => {
  const dispatch = useDispatch();
  const { socket, connect, disconnect } = socketConnection();

  const establishConnection = () => {
    connect();
    dispatch(setConnected(true));
  };

  const terminateConnection = () => {
    disconnect();
    dispatch(setConnected(false));
  };

  return { establishConnection, terminateConnection };
};
