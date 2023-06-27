import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Box, Text } from '@chakra-ui/react';
import API from '../Utils/axios';
import { useParams } from 'react-router-dom';
import { fundsData } from '../Utils/staticData';

const Funds = () => {
  const { schemeId } = useParams();
  const [fundData, setFundData] = useState();
  console.log(fundsData);

  const getFundData = async () => {
    try {
      // let res = await API.get(`/mf/data?schemeId=${schemeId}`);
      setFundData(fundsData);
    } catch (error) {
      setFundData(fundsData);
      console.log(error);
    }
  };
  useEffect(() => {
    getFundData();
  }, []);

  return (
    <Box width="90%" margin="auto" display="flex" justifyContent="center">
      <Box>
        <Text>{fundData?.meta?.fund_house}</Text>
        <Text>{fundData?.meta?.scheme_type}</Text>
        <Text>{fundData?.meta?.scheme_category}</Text>
        <Text>{fundData?.meta?.scheme_name}</Text>
        <Text>{fundData?.meta?.scheme_code}</Text>
        <LineChart width={800} height={400} data={fundData?.data}>
          <Line type="monotone" dataKey="nav" stroke="#8884d8" dot={false} />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </Box>
    </Box>
  );
};

export default Funds;
