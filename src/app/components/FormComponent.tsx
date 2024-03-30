import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface FormProps {
  initialValues: {
    name: string;
    phone: string;
    peopleCount: number;
    isLegal: boolean;
  };
  validate: (values: any) => any;
  onSubmit: (values: any, setSubmitting: any) => Promise<void>;
}

const FormComponent: React.FC<FormProps> = ({
  initialValues,
  validate,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => onSubmit(values, setSubmitting)}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-white">
              Ваше ім'я
            </label>
            <Field
              type="text"
              name="name"
              placeholder="Ім'я"
              className="block w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-gray-400 bg-transparent"
            />
            <ErrorMessage name="name" component="div" className="text-red-500" />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 text-white">
              Ваш телефон
            </label>
            <Field
              type="tel"
              name="phone"
              placeholder="Телефон"
              className="block w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-gray-400 bg-transparent"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500" />
          </div>
          <div>
            <label htmlFor="peopleCount" className="block mb-1 text-white">
              Кількість учасників
            </label>
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
              <label htmlFor="isLegal" className="text-white w-96 font-normal text-sm">
                Я погоджуюся з правилами обробки персональних даних та користувацькою угодою
              </label>
            </div>
            <ErrorMessage name="isLegal" component="div" className="text-red-500" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
