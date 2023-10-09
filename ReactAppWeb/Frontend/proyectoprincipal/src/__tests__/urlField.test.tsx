// @ts-nocheck
import { render } from "@testing-library/react";
import MyUrlField from "../MyUrlField";

test('Montar componente', async () => {
    render(<MyUrlField source="google.com" />);
})