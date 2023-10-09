import { expect, test } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import MyUrlField from './MyUrlField';
import { JSDOM } from 'jsdom';
import axios from 'axios';

// Configura el entorno de JSDOM
const { window } = new JSDOM();
global.window = window;
global.document = window.document;

test("Renderiza un enlace basado en un registro", async () => {
  // Realiza una solicitud a la API para obtener datos de usuarios
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  const users = response.data;
  const record = { website: "hildegard.org" }; // Ajusta esto según tus necesidades

  // Renderiza el componente MyUrlField con el registro proporcionado
  const { container } = render(<MyUrlField source="hildegard.org" record={record} />);
  
  // Agrega un console.log para verificar la existencia del container
  console.log("Container:", container);

  // Espera a que se cargue el enlace en el componente renderizado
  const linkElement = await waitFor(() =>
    container.querySelector(`a[href="${record.website}"]`)
  );

  // Agrega un console.log para verificar la existencia de linkElement
  console.log("Link Element:", linkElement);

  // Verifica que el enlace se haya definido y tenga el atributo href correcto
  expect(linkElement).toBeDefined();
  expect(linkElement.getAttribute('href')).toBe(record.website);
});
