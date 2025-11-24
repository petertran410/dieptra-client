import { CK_CLIENT_USER } from '../utils/const';
import Cookies from 'js-cookie';
import { atom } from 'recoil';

export const userInfoAtom = atom({
  key: 'userInfoAtom',
  default: undefined
});

const LS_CART = 'cart';

export const cartAtom = atom({
  key: 'CART_ATOM',
  default: [],
  effects: [
    ({ onSet, setSelf }) => {
      if (typeof window !== 'undefined') {
        const localCart = localStorage.getItem(LS_CART);
        try {
          if (typeof localCart === 'string') {
            setSelf(JSON.parse(localCart) || []);
          }
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
        }

        onSet((newData) => {
          if (newData && newData.length > 0) {
            localStorage.setItem(LS_CART, JSON.stringify(newData));
          } else {
            localStorage.removeItem(LS_CART);
          }
        });
      }
    }
  ]
});

// Add user atom for easier state management if needed
export const authUserAtom = atom({
  key: 'authUserAtom',
  default: null
});
