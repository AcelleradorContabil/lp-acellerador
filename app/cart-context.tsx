"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  unitPrice: number;
  discountPercent?: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_UNIT_PRICE'; payload: { id: string; unitPrice: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  isOpen: false,
};


// Dados dos robôs com preços padrão
export const robotsData = [
  // DP
  { id: 'esocial', title: 'eSocial', defaultPrice: 2.94, category: 'dp' },
  { id: 'dctf-web', title: 'DCTF WEB', defaultPrice: 2.94, category: 'dp' },
  { id: 'fgts', title: 'FGTS', defaultPrice: 2.10, category: 'dp' },
  { id: 'folha', title: 'FOLHA', defaultPrice: 1.68, category: 'dp' },
  { id: 'rescisao', title: 'RESCISÃO', defaultPrice: 7.56, category: 'dp' },
  { id: 'domestica', title: 'DOMÉSTICA', defaultPrice: 3.50, category: 'dp' },
  // Fiscal
  { id: 'reinf', title: 'REINF', defaultPrice: 2.94, category: 'fiscal' },
  { id: 'mit', title: 'MIT', defaultPrice: 2.94, category: 'fiscal' },
  { id: 'transmissao-dctf', title: 'TRANSMISSÃO DCTF WEB', defaultPrice: 2.94, category: 'fiscal' },
  { id: 'destda', title: 'DESTDA', defaultPrice: 2.94, category: 'fiscal' },
  { id: 'das', title: 'DAS', defaultPrice: 2.10, category: 'fiscal' },
  { id: 'efd', title: 'EFD', defaultPrice: 3.50, category: 'fiscal' },
  { id: 'sped-fiscal', title: 'SPED FISCAL', defaultPrice: 3.50, category: 'fiscal' },
  { id: 'notas-sefaz', title: 'NOTAS SEFAZ', defaultPrice: 2.10, category: 'fiscal' },
  { id: 'notas-prestadas', title: 'NOTAS PRESTADAS', defaultPrice: 2.10, category: 'fiscal' },
  { id: 'notas-tomadas', title: 'NOTAS TOMADAS', defaultPrice: 2.10, category: 'fiscal' },
  { id: 'dec-poa', title: 'DEC POA', defaultPrice: 2.10, category: 'fiscal' },
];

// IDs dos itens que não devem receber desconto
export const excludedDiscountItems: string[] = [];

// Função para calcular desconto progressivo
export function getDiscountPercent(quantity: number): number {
  if (quantity > 500) return 0.5;
  if (quantity > 400) return 0.4;
  if (quantity > 300) return 0.35;
  if (quantity > 200) return 0.30;
  if (quantity > 100) return 0.2;
  return 0;
}

// Dados dos pacotes para validação
export const packagesData = [
  {
    name: "Starter Pack",
    price: 600,
    maxCnpjs: 50,
    description: "Até 50 CNPJs: R$ 600/mês",
  },
  {
    name: "Starter Pack",
    price: 900,
    maxCnpjs: 100,
    description: "Até 100 CNPJs: R$ 900/mês",
  },
  {
    name: "Growth Pack",
    price: 2500,
    maxCnpjs: 300,
    description: "Até 300 CNPJs: R$ 2.500/mês",
  },
  {
    name: "Scale Pack",
    price: 6000,
    maxCnpjs: 500,
    description: "Até 500 CNPJs: R$ 6.000/mês",
  },
];

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      // Calcular desconto ao adicionar novo item
      const discount = excludedDiscountItems.includes(action.payload.id)
        ? 0
        : getDiscountPercent(1);
      const unitPrice = action.payload.price * (1 - discount);
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, quantity: 1, unitPrice, discountPercent: discount },
        ],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.id) {
            const discount = excludedDiscountItems.includes(item.id)
              ? 0
              : getDiscountPercent(action.payload.quantity);
            const unitPrice = item.price * (1 - discount);
            return {
              ...item,
              quantity: action.payload.quantity,
              unitPrice,
              discountPercent: discount,
            };
          }
          return item;
        }),
      };
    }

    case 'UPDATE_UNIT_PRICE':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                unitPrice: action.payload.unitPrice,
                price: action.payload.unitPrice * item.quantity,
              }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateUnitPrice: (id: string, unitPrice: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  checkBetterPlan: (cnpjCount: number) => { shouldSuggest: boolean; suggestedPlan?: any; savings?: number };
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('acellerador-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('acellerador-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const updateUnitPrice = (id: string, unitPrice: number) => {
    dispatch({ type: 'UPDATE_UNIT_PRICE', payload: { id, unitPrice } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const checkBetterPlan = (cnpjCount: number) => {
    const totalPrice = getTotalPrice();

    let suitablePlans = packagesData.filter(plan => cnpjCount <= plan.maxCnpjs);

    if (suitablePlans.length === 0) {
      suitablePlans = [packagesData[packagesData.length - 1]];
    }

    const bestPlan = suitablePlans.reduce((prev, current) =>
      prev.price < current.price ? prev : current
    );

    const savings = totalPrice - bestPlan.price;

    return {
      shouldSuggest: totalPrice > bestPlan.price,
      suggestedPlan: bestPlan,
      savings: savings > 0 ? savings : 0
    };
  };

  const value = {
    state,
    dispatch,
    addItem,
    removeItem,
    updateQuantity,
    updateUnitPrice,
    clearCart,
    toggleCart,
    getTotalPrice,
    getTotalItems,
    checkBetterPlan,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}

