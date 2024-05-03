import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import { useData } from "./DataProvider";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {

  const [stepNum, setStepNum]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(0);
  const data = useData();
  console.log(data?.state)
  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs index={stepNum} isLazy>
          <TabList>
            <CustomTab >Requistion Details</CustomTab>
            <CustomTab isDisabled={stepNum < 1}>Job Details</CustomTab>
            <CustomTab isDisabled={stepNum < 2}>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm  updateStep={setStepNum} />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm updateStep={setStepNum}/>
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm updateStep={setStepNum}/>
              </TabPanel>
            </TabPanels>
            <DisplayCard />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
