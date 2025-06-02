// src/app/test-payment/page.js - FOR DEVELOPMENT TESTING ONLY
'use client';

import { useMutateCreatePayment, useQueryPaymentMethods, useMutateVerifyPayment } from '../../services/payment.service';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  Select,
  Alert,
  AlertIcon,
  Code,
  Divider,
  Badge,
  Textarea
} from '@chakra-ui/react';
import { useState } from 'react';

const PaymentTestPage = () => {
  const [testData, setTestData] = useState({
    customerInfo: {
      fullName: 'Nguyễn Văn Test',
      email: 'test@example.com',
      phone: '0123456789',
      address: '123 Test Street, Test City'
    },
    cartItems: [
      {
        productId: 1,
        quantity: 2,
        price: 150000,
        title: 'Test Product 1'
      }
    ],
    paymentMethod: 'sepay_bank',
    amounts: {
      subtotal: 300000,
      shipping: 30000,
      total: 330000
    }
  });

  const [testResults, setTestResults] = useState({});
  const [orderId, setOrderId] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const { mutateAsync: createPayment, isPending: creatingPayment } = useMutateCreatePayment();
  const { mutateAsync: verifyPayment, isPending: verifyingPayment } = useMutateVerifyPayment();
  const { data: paymentMethods, isLoading: loadingMethods } = useQueryPaymentMethods();

  const handleCreateTestPayment = async () => {
    try {
      const result = await createPayment(testData);
      setTestResults((prev) => ({
        ...prev,
        createPayment: result
      }));
      if (result.orderId) {
        setOrderId(result.orderId);
      }
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        createPayment: { error: error.message }
      }));
    }
  };

  const handleVerifyPayment = async () => {
    if (!orderId || !transactionId) {
      alert('Please enter Order ID and Transaction ID');
      return;
    }

    try {
      const result = await verifyPayment({ orderId, transactionId });
      setTestResults((prev) => ({
        ...prev,
        verifyPayment: result
      }));
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        verifyPayment: { error: error.message }
      }));
    }
  };

  const testConnection = async () => {
    try {
      const response = await fetch('/api/payment/test-connection');
      const result = await response.json();
      setTestResults((prev) => ({
        ...prev,
        connection: result
      }));
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        connection: { error: error.message }
      }));
    }
  };

  const checkPaymentStatus = async () => {
    if (!orderId) {
      alert('Please enter Order ID');
      return;
    }

    try {
      const response = await fetch(`/api/payment/status/${orderId}`);
      const result = await response.json();
      setTestResults((prev) => ({
        ...prev,
        paymentStatus: result
      }));
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        paymentStatus: { error: error.message }
      }));
    }
  };

  return (
    <Box p="8" maxW="1200px" mx="auto">
      <VStack spacing="8" align="stretch">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb="4">
            Payment Integration Test Panel
          </Text>
          <Alert status="warning">
            <AlertIcon />
            This page is for development testing only. Remove in production!
          </Alert>
        </Box>

        {/* Test Connection */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb="4">
            1. Test SePay Connection
          </Text>
          <Button colorScheme="blue" onClick={testConnection}>
            Test Connection
          </Button>
          {testResults.connection && (
            <Box mt="4" p="4" bg="gray.50" borderRadius="md">
              <Text fontWeight="medium">Connection Result:</Text>
              <Code display="block" whiteSpace="pre" fontSize="sm" mt="2">
                {JSON.stringify(testResults.connection, null, 2)}
              </Code>
            </Box>
          )}
        </Box>

        <Divider />

        {/* Payment Methods */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb="4">
            2. Available Payment Methods
          </Text>
          {loadingMethods ? (
            <Text>Loading payment methods...</Text>
          ) : (
            <VStack align="stretch" spacing="2">
              {paymentMethods?.methods?.map((method) => (
                <HStack key={method.code} p="3" bg="gray.50" borderRadius="md">
                  <Badge colorScheme={method.enabled ? 'green' : 'red'}>
                    {method.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                  <Text fontWeight="medium">{method.name}</Text>
                  <Text fontSize="sm" color="gray.600">
                    ({method.code})
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {method.type}
                  </Text>
                </HStack>
              ))}
            </VStack>
          )}
        </Box>

        <Divider />

        {/* Create Payment Test */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb="4">
            3. Test Payment Creation
          </Text>

          <VStack spacing="4" align="stretch">
            <Box>
              <Text fontWeight="medium" mb="2">
                Customer Info:
              </Text>
              <HStack spacing="4">
                <Input
                  placeholder="Full Name"
                  value={testData.customerInfo.fullName}
                  onChange={(e) =>
                    setTestData((prev) => ({
                      ...prev,
                      customerInfo: { ...prev.customerInfo, fullName: e.target.value }
                    }))
                  }
                />
                <Input
                  placeholder="Email"
                  value={testData.customerInfo.email}
                  onChange={(e) =>
                    setTestData((prev) => ({
                      ...prev,
                      customerInfo: { ...prev.customerInfo, email: e.target.value }
                    }))
                  }
                />
                <Input
                  placeholder="Phone"
                  value={testData.customerInfo.phone}
                  onChange={(e) =>
                    setTestData((prev) => ({
                      ...prev,
                      customerInfo: { ...prev.customerInfo, phone: e.target.value }
                    }))
                  }
                />
              </HStack>
              <Input
                mt="2"
                placeholder="Address"
                value={testData.customerInfo.address}
                onChange={(e) =>
                  setTestData((prev) => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, address: e.target.value }
                  }))
                }
              />
            </Box>

            <Box>
              <Text fontWeight="medium" mb="2">
                Payment Method:
              </Text>
              <Select
                value={testData.paymentMethod}
                onChange={(e) =>
                  setTestData((prev) => ({
                    ...prev,
                    paymentMethod: e.target.value
                  }))
                }
              >
                <option value="sepay_bank">SePay Bank Transfer</option>
                <option value="sepay_momo">SePay MoMo</option>
                <option value="cod">Cash on Delivery</option>
              </Select>
            </Box>

            <Box>
              <Text fontWeight="medium" mb="2">
                Amounts:
              </Text>
              <HStack spacing="4">
                <Input
                  placeholder="Subtotal"
                  type="number"
                  value={testData.amounts.subtotal}
                  onChange={(e) =>
                    setTestData((prev) => ({
                      ...prev,
                      amounts: {
                        ...prev.amounts,
                        subtotal: parseInt(e.target.value) || 0,
                        total: (parseInt(e.target.value) || 0) + prev.amounts.shipping
                      }
                    }))
                  }
                />
                <Input
                  placeholder="Shipping"
                  type="number"
                  value={testData.amounts.shipping}
                  onChange={(e) =>
                    setTestData((prev) => ({
                      ...prev,
                      amounts: {
                        ...prev.amounts,
                        shipping: parseInt(e.target.value) || 0,
                        total: prev.amounts.subtotal + (parseInt(e.target.value) || 0)
                      }
                    }))
                  }
                />
                <Input placeholder="Total" type="number" value={testData.amounts.total} readOnly />
              </HStack>
            </Box>

            <Button
              colorScheme="green"
              onClick={handleCreateTestPayment}
              isLoading={creatingPayment}
              loadingText="Creating Payment..."
            >
              Create Test Payment
            </Button>

            {testResults.createPayment && (
              <Box p="4" bg="gray.50" borderRadius="md">
                <Text fontWeight="medium">Payment Creation Result:</Text>
                <Code display="block" whiteSpace="pre" fontSize="sm" mt="2">
                  {JSON.stringify(testResults.createPayment, null, 2)}
                </Code>
              </Box>
            )}
          </VStack>
        </Box>

        <Divider />

        {/* Payment Status Check */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb="4">
            4. Check Payment Status
          </Text>
          <VStack spacing="4" align="stretch">
            <Input placeholder="Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
            <Button colorScheme="blue" onClick={checkPaymentStatus}>
              Check Payment Status
            </Button>
            {testResults.paymentStatus && (
              <Box p="4" bg="gray.50" borderRadius="md">
                <Text fontWeight="medium">Payment Status:</Text>
                <Code display="block" whiteSpace="pre" fontSize="sm" mt="2">
                  {JSON.stringify(testResults.paymentStatus, null, 2)}
                </Code>
              </Box>
            )}
          </VStack>
        </Box>

        <Divider />

        {/* Payment Verification */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb="4">
            5. Verify Payment
          </Text>
          <VStack spacing="4" align="stretch">
            <HStack>
              <Input placeholder="Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
              <Input
                placeholder="Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </HStack>
            <Button
              colorScheme="purple"
              onClick={handleVerifyPayment}
              isLoading={verifyingPayment}
              loadingText="Verifying..."
            >
              Verify Payment
            </Button>
            {testResults.verifyPayment && (
              <Box p="4" bg="gray.50" borderRadius="md">
                <Text fontWeight="medium">Verification Result:</Text>
                <Code display="block" whiteSpace="pre" fontSize="sm" mt="2">
                  {JSON.stringify(testResults.verifyPayment, null, 2)}
                </Code>
              </Box>
            )}
          </VStack>
        </Box>

        {/* Test Data Display */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb="4">
            Current Test Data
          </Text>
          <Textarea
            value={JSON.stringify(testData, null, 2)}
            onChange={(e) => {
              try {
                setTestData(JSON.parse(e.target.value));
              } catch (error) {
                // Invalid JSON, ignore
              }
            }}
            rows="15"
            fontFamily="mono"
            fontSize="sm"
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default PaymentTestPage;
