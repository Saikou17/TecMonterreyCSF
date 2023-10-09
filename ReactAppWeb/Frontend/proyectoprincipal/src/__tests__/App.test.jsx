import {render,screen} from '@testing-library/react';
import {test} from "vitest";
import App from "../App";

test('Renderiza el componente App correctamente', async () => {
    // Renderiza el componente
    const { getByText } = render(<App />);
  
    // Espera a que se carguen los datos o realice alguna acción necesaria
    // Esto dependerá de cómo está configurado tu dataProvider
  
    // Verifica que un elemento de texto esté presente en el componente renderizado
    await waitFor(() => {
      expect(getByText('users')).toBeInTheDocument(); // Ajusta el texto según tu UI
    });
  
    // Puedes agregar más aserciones según lo necesario para tu prueba
  });