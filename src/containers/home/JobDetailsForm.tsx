import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import { IFormType, IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider";

interface PropsType {
  updateStep : React.Dispatch<React.SetStateAction<number>>
}

const JobDetailsForm: React.FC<PropsType> = (props : PropsType) => {

  const data = useData()
  const [initialValues, setInitial] = useState<IJobDetails>(data?.state.jobDetails)

  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: initialValues,
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
      }),
      onSubmit: (values) => {
        console.log({ values });
        // Go to next step
        data?.setState((prev) => ({ ...prev, jobDetails: values }));

        props.updateStep((prev) => prev + 1)
      },
      
    });

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(event) => {
            handleChange(event);
            data?.setState((prev) => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                [event.target.name]: event.target.value,
              },
            }))}}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(event) => {
            handleChange(event);
            data?.setState((prev) => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                [event.target.name]: event.target.value,
              },
            }))}}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(event) => {
            handleChange(event);
            data?.setState((prev) => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                [event.target.name]: event.target.value,
              },
            }))}}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button onClick={()  => props.updateStep((prev) => prev - 1)} colorScheme="gray" type="button">
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
