import CheckedCheckboxIcon from '@/assets/icons/CheckedCheckboxIcon';
import UncheckedCheckboxIcon from '@/assets/icons/UncheckedCheckboxIcon';
import { FC } from 'react';
import { Pressable } from 'react-native';

interface CheckboxProps {
  isChecked: boolean;
  checkboxId: string;
  onCheckboxChange: (checkboxId: string) => void;
}

const Checkbox: FC<CheckboxProps> = ({ isChecked, checkboxId, onCheckboxChange }) => {
  return (
    <Pressable
      onPress={() => {
        if (!isChecked) {
          onCheckboxChange(checkboxId);
        } else {
          onCheckboxChange('');
        }
      }}
    >
      {isChecked ? <CheckedCheckboxIcon /> : <UncheckedCheckboxIcon />}
    </Pressable>
  );
};

export default Checkbox;
