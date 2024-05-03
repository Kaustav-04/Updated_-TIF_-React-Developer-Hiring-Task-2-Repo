import { Button, Flex, Box } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { useData } from "./DataProvider";

interface PropsType {
  updateStep: Dispatch<SetStateAction<number>>;
}

const RequisitionForm: React.FC<PropsType> = (props: PropsType) => {
  const data = useData();

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues: data?.state.requisitionDetails,
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      //  Go to Next Step
      data?.setState((prev) => ({ ...prev, requisitionDetails: values }));
      props.updateStep((prev) => prev + 1);
    },
  });

  console.log(values);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(event) => {
            handleChange(event);
            data?.setState((prev) => ({
              ...prev,
              requisitionDetails: {
                ...prev.requisitionDetails,
                [event.target.name]: event.target.value,
              },
            }));
          }}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(event) => {
            handleChange(event);
            data?.setState((prev) => ({
              ...prev,
              requisitionDetails: {
                ...prev.requisitionDetails,
                [event.target.name]: event.target.value,
              },
            }));
          }}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          dataUpdate={(event: any) => {
            data?.setState((prev) => ({
              ...prev,
              requisitionDetails: {
                ...prev.requisitionDetails,
                [event.name]: event.value,
              },
            }));
          }}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={data?.state.requisitionDetails.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          dataUpdate={(event: any) => {
            data?.setState((prev) => ({
              ...prev,
              requisitionDetails: {
                ...prev.requisitionDetails,
                [event.name]: event.value,
              },
            }));
          }}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={data?.state.requisitionDetails.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionForm;
