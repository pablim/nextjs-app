import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Message } from '../'

describe('Reders tests', () => {
	test('Render Message component', () => {
		const { container } = render(<Message />);
		expect(container).toMatchSnapshot();
	});
})
