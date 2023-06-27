import { Box, Button, Link, Text, useToast, Heading } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import API from '../Utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoaderAction } from '../Redux/Loader';

const Categories = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState([]);
  const [fundsData, setFundsData] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const token = sessionStorage.getItem('kafkaPulse');
  const dispatch = useDispatch();
  const getCategories = async () => {
    try {
      let res = await API.get('mf/category');
      if (res?.data) {
        setCategoryData(res?.data);
      }
    } catch (error) {
      const res = [
        {
          name: 'Growth funds',
          id: 0,
        },
        {
          name: 'Tax-saving Funds (ELSS)',
          id: 1,
        },
        {
          name: 'Liquidity-based funds',
          id: 2,
        },
        {
          name: 'Capital protection funds',
          id: 3,
        },
        {
          name: 'Fixed-maturity funds',
          id: 4,
        },
        {
          name: 'Pension Funds',
          id: 5,
        },
      ];

      setCategoryData(res);

      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
    const token = sessionStorage.getItem('kafkaPulse');
    if (token) {
      getRecommendation();
    }
  }, []);
  const getRecommendation = async () => {
    try {
      let res = await API.get('/recommendation');
      setRecommendation(res.data);
    } catch (error) {
      setRecommendation([
        {
          id: 8,
          schemeName:
            'Aditya Birla Sun Life Equity Advantage Fund -Regular - IDCW',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Equity Scheme - Large & Mid Cap Fund',
          fundHouse: 'Aditya Birla Sun Life Mutual Fund',
          schemeCode: 100034,
          assetCategory: 'DEBT_FUNDS',
          investmentGoalCategory: 'LIQUIDITY_BASED_FUNDS',
        },
        {
          id: 9,
          schemeName: 'Birla Sun Life Freedom Fund-Plan A (Dividend)',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Income',
          fundHouse: 'Aditya Birla Sun Life Mutual Fund',
          schemeCode: 100035,
          assetCategory: 'EQUITY_FUNDS',
          investmentGoalCategory: 'LIQUIDITY_BASED_FUNDS',
        },
        {
          id: 25,
          schemeName:
            'Aditya Birla Sun Life Gilt Plus - Liquid Plan - Growth - Regular Plan',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Income',
          fundHouse: 'Aditya Birla Sun Life Mutual Fund',
          schemeCode: 100055,
          assetCategory: 'OTHER_FUNDS',
          investmentGoalCategory: 'LIQUIDITY_BASED_FUNDS',
        },
        {
          id: 31,
          schemeName:
            'Aditya Birla Sun Life Constant Maturity 10 Year Gilt Fund - Growth - Regular Plan',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Income',
          fundHouse: 'Aditya Birla Sun Life Mutual Fund',
          schemeCode: 100061,
          assetCategory: 'HYBRID_FUNDS',
          investmentGoalCategory: 'LIQUIDITY_BASED_FUNDS',
        },
        {
          id: 34,
          schemeName: 'Aditya Birla Sun Life MNC Fund - Growth - Regular Plan',
          schemeType: '360 ONE Mutual Fund',
          schemeCategory: 'Formerly Known as IIFL Mutual Fund',
          fundHouse: 'Aditya Birla Sun Life Mutual Fund',
          schemeCode: 100064,
          assetCategory: 'SOLUTION_ORIENTED_FUNDS',
          investmentGoalCategory: 'LIQUIDITY_BASED_FUNDS',
        },
        {
          id: 53,
          schemeName: 'HDFC Balanced Advantage Fund - Growth Plan',
          schemeType: 'Open Ended Schemes',
          schemeCategory:
            'Hybrid Scheme - Dynamic Asset Allocation or Balanced Advantage',
          fundHouse: 'HDFC Mutual Fund',
          schemeCode: 100119,
          assetCategory: 'OTHER_FUNDS',
          investmentGoalCategory: 'LIQUIDITY_BASED_FUNDS',
        },
        {
          id: 54,
          schemeName: 'HDFC Balanced Advantage Fund - IDCW Plan',
          schemeType: 'Open Ended Schemes',
          schemeCategory:
            'Hybrid Scheme - Dynamic Asset Allocation or Balanced Advantage',
          fundHouse: 'HDFC Mutual Fund',
          schemeCode: 100120,
          assetCategory: 'SOLUTION_ORIENTED_FUNDS',
          investmentGoalCategory: 'LIQUIDITY_BASED_FUNDS',
        },
        {
          id: 58,
          schemeName: 'HDFC Income Fund - Growth Option',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Debt Scheme - Medium to Long Duration Fund',
          fundHouse: 'HDFC Mutual Fund',
          schemeCode: 100124,
          assetCategory: 'EQUITY_FUNDS',
          investmentGoalCategory: 'LIQUIDITY_BASED_FUNDS',
        },
        {
          id: 61,
          schemeName: 'Principal Retail Equity Savings Fund - Growth Option',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Income',
          fundHouse: 'PRINCIPAL Mutual Fund',
          schemeCode: 100151,
          assetCategory: 'SOLUTION_ORIENTED_FUNDS',
          investmentGoalCategory: 'LIQUIDITY_BASED_FUNDS',
        },
        {
          id: 65,
          schemeName: 'Principal Equity Fund-Growth',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Income',
          fundHouse: 'PRINCIPAL Mutual Fund',
          schemeCode: 100155,
          assetCategory: 'OTHER_FUNDS',
          investmentGoalCategory: 'LIQUIDITY_BASED_FUNDS',
        },
      ]);
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      let res = await API.get(
        `mf/under-category?categoryId=${category}&pageNo=1`
      );
      setFundsData(res);
    } catch (error) {
      setFundsData([
        {
          id: 2,
          schemeName:
            'Grindlays Super Saver Income Fund-GSSIF-Quaterly Dividend',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Income',
          fundHouse: 'Standard Chartered Mutual Fund',
          schemeCode: 100028,
          assetCategory: 'SOLUTION_ORIENTED_FUNDS',
          investmentGoalCategory: 'ELSS',
        },
        {
          id: 14,
          schemeName: 'Aditya Birla Sun Life Liquid Fund-Retail (Growth)',
          schemeType: '360 ONE Mutual Fund',
          schemeCategory: 'Formerly Known as IIFL Mutual Fund',
          fundHouse: 'Aditya Birla Sun Life Mutual Fund',
          schemeCode: 100042,
          assetCategory: 'OTHER_FUNDS',
          investmentGoalCategory: 'ELSS',
        },
        {
          id: 20,
          schemeName:
            'Aditya Birla Sun Life Cash Plus-Institutional - Fortnightly Dividend',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Income',
          fundHouse: 'Aditya Birla Sun Life Mutual Fund',
          schemeCode: 100049,
          assetCategory: 'DEBT_FUNDS',
          investmentGoalCategory: 'ELSS',
        },
        {
          id: 27,
          schemeName:
            'Aditya Birla Sun Life Govenment Securities Fund -Regular - Quarterly IDCW',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Debt Scheme - Gilt Fund',
          fundHouse: 'Aditya Birla Sun Life Mutual Fund',
          schemeCode: 100057,
          assetCategory: 'HYBRID_FUNDS',
          investmentGoalCategory: 'ELSS',
        },
        {
          id: 32,
          schemeName:
            'Aditya Birla Sun Life Gilt Plus-Regular Plan (Annual Dividend)',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Debt Scheme - Gilt Fund',
          fundHouse: 'Aditya Birla Sun Life Mutual Fund',
          schemeCode: 100062,
          assetCategory: 'DEBT_FUNDS',
          investmentGoalCategory: 'ELSS',
        },
        {
          id: 35,
          schemeName:
            'Aditya Birla Sun Life India Opportunities Fund - Dividend - Regular Plan',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Income',
          fundHouse: 'Aditya Birla Sun Life Mutual Fund',
          schemeCode: 100065,
          assetCategory: 'SOLUTION_ORIENTED_FUNDS',
          investmentGoalCategory: 'ELSS',
        },
        {
          id: 44,
          schemeName: 'DSP Equity & Bond Fund- Regular Plan - Growth',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Hybrid Scheme - Aggressive Hybrid Fund',
          fundHouse: 'DSP Mutual Fund',
          schemeCode: 100081,
          assetCategory: 'SOLUTION_ORIENTED_FUNDS',
          investmentGoalCategory: 'ELSS',
        },
        {
          id: 46,
          schemeName: 'DSP Government Securities Fund - Regular Plan - Growth',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Debt Scheme - Gilt Fund',
          fundHouse: 'DSP Mutual Fund',
          schemeCode: 100084,
          assetCategory: 'OTHER_FUNDS',
          investmentGoalCategory: 'ELSS',
        },
        {
          id: 48,
          schemeName:
            'DSP Government Securities Fund - Regular Plan - IDCW - Monthly',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Debt Scheme - Gilt Fund',
          fundHouse: 'DSP Mutual Fund',
          schemeCode: 100086,
          assetCategory: 'OTHER_FUNDS',
          investmentGoalCategory: 'ELSS',
        },
        {
          id: 56,
          schemeName: 'HDFC Balanced Fund - Growth Option',
          schemeType: 'Open Ended Schemes',
          schemeCategory: 'Income',
          fundHouse: 'HDFC Mutual Fund',
          schemeCode: 100122,
          assetCategory: 'EQUITY_FUNDS',
          investmentGoalCategory: 'ELSS',
        },
      ]);
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, [category]);

  return (
    <>
      {!token && (
        <Button
          marginLeft="100px"
          colorScheme="green"
          onClick={e => {
            e.preventDefault();
            navigate('/login');
          }}
        >
          Login
        </Button>
      )}
      {token && (
        <Box>
          <Heading size="xl" margin="50px" textAlign="center">
            Recommendations
          </Heading>
          <Box
            display="grid"
            width="80%"
            margin="auto"
            gridTemplateColumns="repeat(4,1fr)"
          >
            {recommendation.map(item => {
              return (
                <Link key={item.id} href={`/mf/data/${item.id}`}>
                  <Box
                    backgroundColor="gray.200"
                    border="1px"
                    borderColor="gray.400"
                    height="100%"
                    borderRadius="10px"
                  >
                    <Heading size="md">{item.schemeName}</Heading>
                    <Text>{item.fundHouse}</Text>
                    <Text>{item.schemeType}</Text>
                    <Text>{item.schemeCategory}</Text>
                    <Text>{item.assetCategory}</Text>
                    <Text>{`Scheme Code - ${item.schemeCode}`}</Text>
                    <Text>{item.investmentGoalCategory}</Text>
                  </Box>
                </Link>
              );
            })}
          </Box>
        </Box>
      )}
      <Heading size="xl" textAlign="center" marginTop="50px">
        Our Services
      </Heading>
      <Box margin="50px auto" display="flex" justifyContent="center">
        {categoryData?.map(item => {
          return (
            <Button
              variant={item.id === category ? 'outline' : 'solid'}
              colorScheme="teal"
              key={item.id}
              margin="10px"
              onClick={() => {
                setCategory(item.id);
              }}
            >
              {item.name}
            </Button>
          );
        })}
      </Box>

      <Box
        display="grid"
        width="80%"
        margin="auto"
        gridTemplateColumns="repeat(4,1fr)"
      >
        {fundsData.map(item => {
          return (
            <Link key={item.id} href={`/mf/data/${item.id}`}>
              <Box
                backgroundColor="gray.200"
                border="1px"
                borderColor="gray.400"
                height="100%"
                borderRadius="10px"
              >
                <Heading size="md">{item.schemeName}</Heading>
                <Text>{item.fundHouse}</Text>
                <Text>{item.schemeType}</Text>
                <Text>{item.schemeCategory}</Text>
                <Text>{item.assetCategory}</Text>
                <Text>{`Scheme Code - ${item.schemeCode}`}</Text>
                <Text>{item.investmentGoalCategory}</Text>
              </Box>
            </Link>
          );
        })}
      </Box>
    </>
  );
};

export default Categories;
