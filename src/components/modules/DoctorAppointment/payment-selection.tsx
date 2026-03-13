'use client';

import { useState } from 'react';
import { CreditCard, Clock, AlertCircle } from 'lucide-react';

export type PaymentType = 'now' | 'later';
export type PaymentMethod = 'bkash' | 'ssl' | 'stripe' | null;

interface PaymentSelectionProps {
  appointmentFee: number;
  doctorId: string;
  slotId: string;
  onPaymentSubmit: (data: PaymentData) => void;
  isLoading?: boolean;
}

export interface PaymentData {
  paymentType: PaymentType;
  paymentMethod: PaymentMethod;
  doctorId: string;
  slotId: string;
  amount: number;
  paymentTime?: string;
}

const paymentMethods = [
  {
    id: 'bkash',
    name: 'bKash',
    icon: '📱',
    description: 'Mobile Money',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 'ssl',
    name: 'SSL Commerz',
    icon: '🏦',
    description: 'Payment Gateway',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: '💳',
    description: 'Credit/Debit Card',
    color: 'from-purple-500 to-purple-600',
  },
];

export default function PaymentSelection({
  appointmentFee,
  doctorId,
  slotId,
  onPaymentSubmit,
  isLoading = false,
}: PaymentSelectionProps) {
  const [paymentType, setPaymentType] = useState<PaymentType>('now');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(null);

  const handleSubmit = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // Get local BD time in YYYY-MM-DD HH:MM:SS format
    const getLocalDateTime = (): string => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const paymentData: PaymentData = {
      paymentType,
      paymentMethod: selectedPaymentMethod,
      doctorId,
      slotId,
      amount: appointmentFee,
      paymentTime: paymentType === 'now' ? getLocalDateTime() : undefined,
    };

    onPaymentSubmit(paymentData);
  };

  return (
    <div className="space-y-6">
      {/* Payment Type Selection */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-foreground">Payment Timing</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Pay Now */}
          <button
            onClick={() => setPaymentType('now')}
            className={`relative overflow-hidden rounded-xl p-4 text-left transition-all ${
              paymentType === 'now'
                ? 'border-2 border-accent bg-accent/10'
                : 'border-2 border-border bg-card hover:border-accent/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <CreditCard className="mt-1 shrink-0 text-accent" size={20} />
              <div>
                <p className="font-semibold text-foreground">Pay Now</p>
                <p className="text-xs text-muted-foreground">Complete payment immediately</p>
              </div>
            </div>
          </button>

          {/* Pay Later */}
          <button
            onClick={() => setPaymentType('later')}
            className={`relative overflow-hidden rounded-xl p-4 text-left transition-all ${
              paymentType === 'later'
                ? 'border-2 border-accent bg-accent/10'
                : 'border-2 border-border bg-card hover:border-accent/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <Clock className="mt-1 flex-0 text-accent" size={20} />
              <div>
                <p className="font-semibold text-foreground">Pay Later</p>
                <p className="text-xs text-muted-foreground">Pay within 5 minutes</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Payment Method Selection */}
      {paymentType === 'now' && (
        <div>
          <h3 className="mb-4 text-lg font-bold text-foreground">Select Payment Method</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id as PaymentMethod)}
                className={`group relative overflow-hidden rounded-xl p-4 transition-all ${
                  selectedPaymentMethod === method.id
                    ? `border-2 border-primary bg-linear-to-br ${method.color} text-white shadow-lg`
                    : 'border-2 border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                <div className="relative z-10 space-y-2 text-left">
                  <div className="text-3xl">{method.icon}</div>
                  <div>
                    <p className={`font-bold ${selectedPaymentMethod === method.id ? 'text-white' : 'text-foreground'}`}>
                      {method.name}
                    </p>
                    <p className={`text-xs ${selectedPaymentMethod === method.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {method.description}
                    </p>
                  </div>
                </div>

                {selectedPaymentMethod === method.id && (
                  <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary font-bold">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pay Later Info */}
      {paymentType === 'later' && (
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
          <div className="flex gap-3">
            <AlertCircle className="shrink-0 text-accent" size={20} />
            <div>
              <p className="font-semibold text-foreground">Payment Due in 5 Minutes</p>
              <p className="mt-1 text-sm text-muted-foreground">
                You must complete payment within 5 minutes of booking confirmation. Only doctor ID and slot ID are required for reservation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Amount Summary */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center justify-between">
          <span className="text-foreground font-semibold">Appointment Fee:</span>
          <span className="text-2xl font-bold text-primary">৳{appointmentFee}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || (paymentType === 'now' && !selectedPaymentMethod)}
        className={`w-full rounded-lg py-3 font-bold transition-all ${
          isLoading || (paymentType === 'now' && !selectedPaymentMethod)
            ? 'cursor-not-allowed bg-muted text-muted-foreground'
            : 'bg-linear-to-r from-primary to-accent text-primary-foreground hover:shadow-lg'
        }`}
      >
        {isLoading ? 'Processing...' : paymentType === 'now' ? 'Proceed to Payment' : 'Confirm Appointment'}
      </button>
    </div>
  );
}
