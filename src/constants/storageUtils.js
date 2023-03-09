import AsyncStorage from '@react-native-async-storage/async-storage';

//to store data according to parent
export const saveDataToAsync = async (parentKey, key, value) => {
  try {
    let parentData = null;
    parentData = await getDataFromAsync(parentKey);
    if (parentData) {
      parentData[key] = value;
    } else {
      parentData = {
        [key]: value,
      };
    }
    await AsyncStorage.setItem(parentKey, JSON.stringify(parentData));
  } catch (e) {
    console.log('Error saving data to async storage', e);
  }
};

//to store get data according to parent
export const getDataFromAsync = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.log('Error getting data from async storage', e);
  }
};

//to store clear data according to parent
export const clearParentDataFromAsync = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('Error clearing parent data from async storage', e);
  }
};

//to store clear all data
export const clearDataFromAsync = async () => {
  try {
    await AsyncStorage.multiRemove(Object.keys(storageParentKeys));
  } catch (e) {
    console.log('Error clearing data from async storage', e);
  }
};
