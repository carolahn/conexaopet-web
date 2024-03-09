import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewEventForm from './NewEventForm';

afterEach(() => {
  localStorage.removeItem('formData');
  localStorage.removeItem('eventFormData'); 
});

test('altera o valor do textarea', () => {
  render(<NewEventForm />);
  const textarea = screen.getByLabelText('Insira a descrição');
  fireEvent.change(textarea, { target: { value: 'Nova descrição' } });

  expect(textarea.value).toEqual('Nova descrição');
});