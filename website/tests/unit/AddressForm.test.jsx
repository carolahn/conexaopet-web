import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddressForm from '../../src/components/AddressForm';
import '@testing-library/jest-dom/extend-expect';


describe('AddressForm', () => {
  const addressList = [
    { id: 1, name: 'Address 1', street: 'Street 1', number: '123', district: 'District 1', city: 'City 1', uf: 'UF 1' },
    { id: 2, name: 'Address 2', street: 'Street 2', number: '456', district: 'District 2', city: 'City 2', uf: 'UF 2' },
  ];

  const setAddress = jest.fn();

  it('should render with initial values', () => {
    const initialValues = {
      name: 'Address 1',
      street: 'Street 1',
      number: '123',
      district: 'District 1',
      city: 'City 1',
      uf: 'UF 1',
    };

    const { getByPlaceholderText } = render(
      <AddressForm addressList={addressList} setAddress={setAddress} initialValues={initialValues} />
    );

    expect(getByPlaceholderText('Local')).toHaveValue('Address 1');
    expect(getByPlaceholderText('Rua')).toHaveValue('Street 1');
    expect(getByPlaceholderText('n°')).toHaveValue('123');
    expect(getByPlaceholderText('Bairro')).toHaveValue('District 1');
    expect(getByPlaceholderText('Cidade')).toHaveValue('City 1');
    expect(getByPlaceholderText('UF')).toHaveValue('UF 1');
  });

  it('should update address data on input change', () => {
    const { getByPlaceholderText } = render(
      <AddressForm addressList={addressList} setAddress={setAddress} initialValues={{}} />
    );

    const nameInput = getByPlaceholderText('Local');
    fireEvent.change(nameInput, { target: { value: 'New Address' } });

    expect(nameInput).toHaveValue('New Address');
  });

  it('should show suggestions when typing at least 3 characters', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddressForm addressList={addressList} setAddress={setAddress} initialValues={{}} />
    );

    const nameInput = getByPlaceholderText('Local');
    fireEvent.change(nameInput, { target: { value: 'Add' } });

    expect(getByText('Address 1')).toBeInTheDocument();
    expect(getByText('Address 2')).toBeInTheDocument();
  });

  it('should select suggestion and update address data', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddressForm addressList={addressList} setAddress={setAddress} initialValues={{}} />
    );

    const nameInput = getByPlaceholderText('Local');
    fireEvent.change(nameInput, { target: { value: 'Add' } });

    fireEvent.click(getByText('Address 1'));

    expect(getByPlaceholderText('Local')).toHaveValue('Address 1');
    expect(getByPlaceholderText('Rua')).toHaveValue('Street 1');
    expect(getByPlaceholderText('n°')).toHaveValue('123');
    expect(getByPlaceholderText('Bairro')).toHaveValue('District 1');
    expect(getByPlaceholderText('Cidade')).toHaveValue('City 1');
    expect(getByPlaceholderText('UF')).toHaveValue('UF 1');
  });
});
