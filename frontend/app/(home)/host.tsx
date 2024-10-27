import CustomText from '@/components/CustomText';
import { FC } from 'react';

interface HostProps {}

const Host: FC<HostProps> = () => {
  return <CustomText style={{ fontSize: 50 }}>Host</CustomText>;
};

export default Host;
