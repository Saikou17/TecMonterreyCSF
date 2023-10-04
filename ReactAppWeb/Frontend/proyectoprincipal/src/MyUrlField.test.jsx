import { expect, test } from 'vitest'
import { render, waitFor } from '@testing-library/react';
import MyUrlField from './MyUrlField';
import { JSDOM } from 'jsdom';
import axios from 'axios'; // Importa axios

const { window } = new JSDOM();
global.window = window;
global.document = window.document;

test("Grab a record (website) and it turns into a Url", async () => {
  // Realiza una solicitud a la API para obtener los datos de usuario
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  const users = response.data;
  const record = { website: "hildegard.org" }; // Puedes ajustar esto para obtener el usuario deseado

  const { container } = render(<MyUrlField source="website" record={record} />);

  const linkElement = await waitFor(() =>
    container.querySelector(`a[href="${record.website}"]`)
  );

  expect(linkElement).toBeDefined();
  expect(linkElement.getAttribute('href')).toBe(record.website);
});
