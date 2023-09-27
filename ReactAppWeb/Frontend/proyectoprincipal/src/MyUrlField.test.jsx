import { expect, test } from 'vitest'
import { render, waitFor } from '@testing-library/react';
import MyUrlField from './MyUrlField'
import { JSDOM } from 'jsdom';

const { window } = new JSDOM();
global.window = window;
global.document = window.document;

test("Grab a record (website) and it turns into a Url", async () => {
  const record = { website: "hildegard.org" };

  const { container } = render(<MyUrlField source="website" record={record} />);

  const linkElement = await waitFor(() =>
      container.querySelector(`a[href="${record.website}"]`)
    );
  console.log(record.website, linkElement, container);
  expect(linkElement).toBeDefined();
  expect(linkElement.tagName).toBe('A');
  expect(linkElement.getAttribute('href')).toBe("hildegard.org");
});
