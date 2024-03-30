import create from "zustand";

interface Store {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  sendOrderToServer: (orderData: any) => Promise<void>;
}

export const useStore = create<Store>((set) => ({
  showForm: false,
  setShowForm: (show) => set({ showForm: show }),
  sendOrderToServer: async (orderData) => {
    try {
      console.log("Відправляємо дані на сервер:", orderData);
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error("Помилка відправки замовлення");
      }
      set({ showForm: false });
      const data = await response.json();
      console.log("Замовлення успішно відправлено:", data);
    } catch (error) {
      console.error("Помилка:", error);
    }
  },
}));
