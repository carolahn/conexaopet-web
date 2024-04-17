import '@testing-library/jest-dom'; 
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('../../src/assets/images/close.png', () => '');

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ConfirmEventModal from '../../src/components/ConfirmEventModal';

describe('ConfirmEventModal', () => {
  it('renders modal with correct content when confirmed', () => {
    const handleClose = jest.fn();
    const handleConfirm = jest.fn();
    const { getByText } = render(
      <ConfirmEventModal isModalOpen={true} closeModal={handleClose} handleConfirm={handleConfirm} isConfirmed={true} />
    );

    expect(getByText('Desconfirmar evento?')).toBeInTheDocument();
    expect(getByText('Sim')).toBeInTheDocument();
    expect(getByText('Cancelar')).toBeInTheDocument();
  });

  it('renders modal with correct content when not confirmed', () => {
    const handleClose = jest.fn();
    const handleConfirm = jest.fn();
    const { getByText } = render(
      <ConfirmEventModal isModalOpen={true} closeModal={handleClose} handleConfirm={handleConfirm} isConfirmed={false} />
    );

    expect(getByText('Confirmar evento?')).toBeInTheDocument();
    expect(getByText('Sim')).toBeInTheDocument();
    expect(getByText('Cancelar')).toBeInTheDocument();
  });

  it('calls handleConfirm when "Sim" button is clicked', () => {
    const handleClose = jest.fn();
    const handleConfirm = jest.fn();
    const { getByText } = render(
      <ConfirmEventModal isModalOpen={true} closeModal={handleClose} handleConfirm={handleConfirm} isConfirmed={false} />
    );

    fireEvent.click(getByText('Sim'));

    expect(handleConfirm).toHaveBeenCalled();
  });

  it('calls handleClose when "Cancelar" button is clicked', () => {
    const handleClose = jest.fn();
    const handleConfirm = jest.fn();
    const { getByText } = render(
      <ConfirmEventModal isModalOpen={true} closeModal={handleClose} handleConfirm={handleConfirm} isConfirmed={false} />
    );

    fireEvent.click(getByText('Cancelar'));

    expect(handleClose).toHaveBeenCalled();
  });
});
