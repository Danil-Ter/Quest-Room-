"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";

interface OrderFormValues {
  name: string;
  phone: string;
  peopleCount: number;
  isLegal: boolean;
}

function OrderForm() {
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleCloseButtonClick = () => {
    setShowForm(false);
  };

  const sendOrderToServer = async (orderData: OrderFormValues) => {
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
      setShowForm(false);
      const data = await response.json();
      console.log("Замовлення успішно відправлено:", data);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  const initialValues: OrderFormValues = {
    name: "",
    phone: "",
    peopleCount: 0,
    isLegal: false,
  };

  const validate = (values: OrderFormValues) => {
    const errors: FormikValues = {};
    if (!values.name) {
      errors.name = "Обов'язкове поле";
    }
    if (!values.phone) {
      errors.phone = "Обов'язкове поле";
    } else if (!/^\+?3?8?(0[5-9][0-9]\d{7})$/.test(values.phone) || values.phone.length !== 10) {
      errors.phone = "Неправильний формат номера телефону";
    }
    if (!values.peopleCount) {
      errors.peopleCount = "Обов'язкове поле";
    } else if (isNaN(values.peopleCount) || values.peopleCount < 2 || values.peopleCount > 8) {
      errors.peopleCount = "Кількість учасників повинна бути від 2 до 8";
    }
    if (!values.isLegal) {
      errors.isLegal = "Необхідно погодитися з умовами";
    }
    return errors;
  };

  return (
    <div>
      <button
        className="mt-10 px-10 py-5 rounded-full bg-orange-500 text-white shadow-md hover:bg-yellow-600 transition-colors duration-300 ease-in-out"
        onClick={handleButtonClick}
      >
        Забронювати
      </button>
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-zinc-900 p-10 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-extrabold text-white">Залишити заявку</h1>
              <button className="text-white" onClick={handleCloseButtonClick}>✕</button>
            </div>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={async (values, { setSubmitting }) => {
                await sendOrderToServer(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 text-white">Ваше ім'я</label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Ім'я"
                      className="block w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-gray-400 bg-transparent"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-1 text-white">Ваш телефон</label>
                    <Field
                      type="tel"
                      name="phone"
                      placeholder="Телефон"
                      className="block w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-gray-400 bg-transparent"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500" />
                  </div>
                  <div>
                    <label htmlFor="peopleCount" className="block mb-1 text-white">Кількість учасників</label>
                    <Field
                      type="number"
                      name="peopleCount"
                      placeholder="Кількість учасників"
                      className="block w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-gray-400 bg-transparent"
                    />
                    <ErrorMessage name="peopleCount" component="div" className="text-red-500" />
                  </div>
                  <div className="flex items-center flex-col">
                    <button
                      type="submit"
                      className="mt-4 px-10 py-5 rounded-full bg-gray-500 text-white shadow-md hover:bg-yellow-600 transition-colors duration-300 ease-in-out"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Відправка..." : "ВІДПРАВИТИ ЗАЯВКУ"}
                    </button>
                    <div className="flex items-start pt-7">
                      <Field type="checkbox" name="isLegal" id="isLegal" className="mt-1 mr-2" />
                      <label htmlFor="isLegal" className="text-white w-96 font-normal text-sm">Я погоджуюся з правилами обробки персональних даних та користувацькою угодою</label>
                    </div>
                    <ErrorMessage name="isLegal" component="div" className="text-red-500" />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderForm;