"use client";

import React, { useState } from "react";
import { X, ShoppingCart, Check, AlertCircle } from "lucide-react";
import { useCart } from "@/app/cart-context";
import type { CartItem } from "@/app/cart-context";
import { useLeadGate } from "@/app/lead-gate-context";

interface PlanSuggestionModalProps {
    isOpen: boolean;
    suggestedPlan: any;
    savings: number;
    onAccept: () => void;
    onDecline: () => void;
}

function PlanSuggestionModal({
    isOpen,
    suggestedPlan,
    savings,
    onAccept,
    onDecline,
}: PlanSuggestionModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Temos um plano perfeito para você!
            </h3>
            <p className="text-gray-600">
                Você pode economizar{" "}
                <span className="font-bold text-green-600">
                R$ {savings.toFixed(2)}
                </span>{" "}
                por mês
            </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6">
            <h4 className="font-bold text-lg text-gray-900 mb-2">
                {suggestedPlan.name}
            </h4>
            <p className="text-gray-700 mb-2">{suggestedPlan.description}</p>
            <div className="text-2xl font-bold text-green-600">
                R$ {suggestedPlan.price.toFixed(2)}/mês
            </div>
            </div>

            <div className="flex gap-3">
            <button
                onClick={onDecline}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
                Continuar com robôs individuais
            </button>
            <button
                onClick={onAccept}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
                Selecionar plano
            </button>
            </div>
        </div>
        </div>
    );
}

export function Cart() {
    const {
        state,
        toggleCart,
        removeItem,
        updateQuantity,
        updateUnitPrice,
        getTotalPrice,
        getTotalItems,
        checkBetterPlan,
        clearCart,
    } = useCart();

        const { requireLead } = useLeadGate();

        const [editingPrice, setEditingPrice] = useState<string | null>(null);
        const [tempPrice, setTempPrice] = useState<string>("");
        const [cnpjCount, setCnpjCount] = useState<number>(1);
        const [showPlanModal, setShowPlanModal] = useState(false);
        const [planSuggestion, setPlanSuggestion] = useState<any>(null);
        const [quantityInputs, setQuantityInputs] = useState<{
            [id: string]: string;
        }>({});

        const handleEditPrice = (itemId: string, currentPrice: number) => {
            setEditingPrice(itemId);
            setTempPrice(currentPrice.toString());
        };

        const handleSavePrice = (itemId: string) => {
            const newPrice = parseFloat(tempPrice);
            if (!isNaN(newPrice) && newPrice > 0) {
            updateUnitPrice(itemId, newPrice);
            }
            setEditingPrice(null);
            setTempPrice("");
        };

        const handleCancelEdit = () => {
            setEditingPrice(null);
            setTempPrice("");
        };

        const sendOrderToWhatsapp = () => {
            const itemsText = state.items
            .map(
                (item) =>
                `• ${item.title} (Qtd: ${
                    item.quantity
                }) - R$ ${item.unitPrice.toFixed(2)}`
            )
            .join("\n");
            const totalText = `Total: R$ ${getTotalPrice().toFixed(2)}`;
            const message = encodeURIComponent(
            `Olá! Gostaria de finalizar a compra com os seguintes itens:\n${itemsText}\n${totalText}`
            );
            requireLead("cart_checkout", {
            type: "url",
            url: `https://wa.me/5551993437038?text=${message}`,
            });
        };

        const handleCheckout = () => {
            // Encontrar o item com maior valor unitário
            const maxUnitItem = state.items.reduce<CartItem | undefined>((maxItem, item) => {
            if (!maxItem || item.unitPrice > maxItem.unitPrice) {
                return item;
            }
            return maxItem;
            }, undefined);
            if (maxUnitItem) {
            setCnpjCount(maxUnitItem.quantity);
            }
            const planCheck = checkBetterPlan(maxUnitItem ? maxUnitItem.quantity : cnpjCount);

            if (planCheck.shouldSuggest) {
            setPlanSuggestion(planCheck);
            setShowPlanModal(true);
            } else {
            sendOrderToWhatsapp();
            }
        };

        const handleAcceptPlan = () => {
            setShowPlanModal(false);
            const message = encodeURIComponent(
            `Olá! Gostaria de finalizar a compra com o pacote ${planSuggestion?.suggestedPlan.name}`
            );
            clearCart();
            requireLead("cart_plan_accept", {
            type: "url",
            url: `https://wa.me/5551993437038?text=${message}`,
            });
        };

        const handleDeclinePlan = () => {
            setShowPlanModal(false);
            sendOrderToWhatsapp();
        };

        if (!state.isOpen) {
            return (
            <button
                onClick={toggleCart}
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-40"
            >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {getTotalItems()}
                </span>
                )}
            </button>
            );
        }

        return (
            <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={toggleCart}
            />

            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300">
                <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Carrinho</h2>
                    <button
                    onClick={toggleCart}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                    <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {state.items.length === 0 ? (
                    <div className="text-center py-12">
                        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Seu carrinho está vazio</p>
                    </div>
                    ) : (
                    <div className="space-y-4">
                        {state.items.map((item) => (
                        <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">
                                {item.title}
                            </h3>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm text-gray-600">Quantidade:</span>
                            <input
                                type="number"
                                min={0}
                                value={
                                quantityInputs[item.id] !== undefined
                                    ? quantityInputs[item.id]
                                    : item.quantity === 0
                                    ? ""
                                    : String(item.quantity)
                                }
                                onChange={(e) => {
                                const val = e.target.value;
                                setQuantityInputs((prev) => ({
                                    ...prev,
                                    [item.id]: val,
                                }));
                                if (val === "") return;
                                const value = Number(val);
                                updateQuantity(item.id, value);
                                }}
                                className="w-16 px-2 py-1 border rounded text-black text-center"
                            />
                            </div>

                            {/* Price Controls */}
                            <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm text-gray-600">
                                Preço unitário:
                            </span>
                            {editingPrice === item.id ? (
                                <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    step="0.01"
                                    value={tempPrice}
                                    onChange={(e) => setTempPrice(e.target.value)}
                                    className="w-20 px-2 py-1 border rounded text-sm text-black"
                                    autoFocus
                                />
                                <button
                                    onClick={() => handleSavePrice(item.id)}
                                    className="text-green-600 hover:text-green-800 p-1"
                                >
                                    <Check className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                <span className="font-medium text-black">
                                    R$ {item.unitPrice.toFixed(2)}
                                </span>
                                <button
                                    onClick={() =>
                                    handleEditPrice(item.id, item.unitPrice)
                                    }
                                    className="text-blue-600 hover:text-blue-800 p-1"
                                >
                                    {/* <Edit3 className="w-4 h-4" /> */}
                                </button>
                                </div>
                            )}
                            </div>

                            <div className="text-right">
                            <span className="text-lg font-bold text-gray-900">
                                R$ {(item.unitPrice * item.quantity).toFixed(2)}
                            </span>
                            </div>
                        </div>
                        ))}

                        {/* CNPJ Count Input */}
                        {/* <div className="bg-blue-50 rounded-lg p-4 mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantidade de CNPJs:
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={cnpjCount}
                            onChange={(e) =>
                            setCnpjCount(parseInt(e.target.value) || 1)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ex: 50"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Usado para verificar se há planos mais vantajosos
                        </p>
                        </div> */}
                    </div>
                    )}
                </div>

                {/* Footer */}
                {state.items.length > 0 && (
                    <div className="border-t p-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-blue-600">
                        R$ {getTotalPrice().toFixed(2)}
                        </span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Finalizar Compra
                    </button>
                    </div>
                )}
                </div>
            </div>

            <PlanSuggestionModal
                isOpen={showPlanModal}
                suggestedPlan={planSuggestion?.suggestedPlan}
                savings={planSuggestion?.savings || 0}
                onAccept={handleAcceptPlan}
                onDecline={handleDeclinePlan}
            />
            </>
        );
}