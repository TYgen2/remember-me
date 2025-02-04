import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Dimensions, ToastAndroid } from 'react-native';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getScreenWidth = () => {
  return Dimensions.get('window').width;
}

export const showToastWithGravity = (message: string) => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};

