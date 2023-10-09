import React from 'react';
import { render, screen } from '@testing-library/react'; // Importa screen
import { expect, test } from 'vitest';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
});
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Resto de tu código de prueba


import MyComponent from '../src/MiComponente'; // Ajusta la ruta según tu estructura de carpetas

test('Renderiza MyComponent correctamente', () => {
  // Renderiza el componente
  render(<MyComponent />);

  // Busca el elemento dentro del componente por su contenido de texto
  const element = screen.getByText('Hola, soy un componente React.');

  // Verifica que el elemento exista
  expect(element).toBeInTheDocument();
});
