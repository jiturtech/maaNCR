import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePicker = ({
  onCancelDate,
  minimumDate,
  pickerType,
  isDatePickerVisible,
  onConfirmDate,
  maximumDate,
}) => {
  return (
    <DateTimePickerModal
      date={new Date()}
      isVisible={isDatePickerVisible}
      mode={pickerType}
      onConfirm={onConfirmDate}
      onCancel={onCancelDate}
      display="spinner"
      minimumDate={minimumDate}
      maximumDate={maximumDate}
    />
  );
};

export default DatePicker;
