"use client"

import React from "react";
import { useStore } from "@/app/store";
import Button from "./Button";
import FormComponent from "./FormComponent";
import Modal from "./Modal";

const OrderForm: React.FC = () => {
  const { showForm, setShowForm, sendOrderToServer } = useStore();

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleCloseButtonClick = () => {
    setShowForm(false);
  };

  return (
    <div>
      <Button onClick={handleButtonClick} />
      <Modal show={showForm} onClose={handleCloseButtonClick}>
        <FormComponent
          initialValues={{
            name: "",
            phone: "",
            peopleCount: 0,
            isLegal: false,
          }}
          validate={(values) => {
            const errors: any = {};
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
          }}
          onSubmit={async (values, setSubmitting) => {
            await sendOrderToServer(values);
            setSubmitting(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default OrderForm;
