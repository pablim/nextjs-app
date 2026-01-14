import { screen, render, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Modal.stories';
import '@testing-library/jest-dom';

const { AtacadaoMobile, AtacadaoDesktop, CotabestMobile, CotabestDesktop } = composeStories(stories);

describe('Modal Component', () => {
	describe('Atacadão', () => {
		describe('Mobile', () => {
			test('renders modal', () => {
				const { container } = render(<AtacadaoMobile />);

				expect(container).toMatchSnapshot();
			});
		});

		describe('Desktop', () => {
			test('renders modal', () => {
				const { container } = render(<AtacadaoDesktop />);
				expect(container).toMatchSnapshot();
			});

			test('should open modal when click button', () => {
				render(<AtacadaoDesktop showModal={false} />);

				const button = screen.getByRole('button', { name: 'Show modal' });
				fireEvent.click(button);

				const modalContent = screen.getByText('Hi, im a modal');
				expect(modalContent).toBeInTheDocument();
			});

			test('should not render modal', () => {
				const { container } = render(<AtacadaoDesktop showModal={false} />);
				expect(container.childElementCount).toBe(1);
			});
		});
	});

	describe('Cotabest', () => {
		describe('Mobile', () => {
			test('renders modal', () => {
				const { container } = render(<CotabestMobile />);

				expect(container).toMatchSnapshot();
			});
		});

		describe('Desktop', () => {
			test('renders modal', () => {
				const { container } = render(<CotabestDesktop />);

				expect(container).toMatchSnapshot();
			});
		});
	});
});
