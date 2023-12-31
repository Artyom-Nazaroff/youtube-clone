import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/vue';
import BaseModal from './BaseModal.vue';
import icons from '../icons';

function renderModal(body = '', footer = '', withCloseButton = false) {
	const options = {
		props: {
			withCloseButton,
		},
		slots: {
			default: body,
			footer,
		},
	};

	return render(BaseModal, options);
}

function assertModalClosed(body) {
	return waitForElementToBeRemoved([
		screen.queryByText(body),
		screen.queryByTestId('base-modal-overlay')
	])
}

test('renders modal with body and footer', () => {
	const body = 'This is modal body';
	const footer = 'This is modal footer';

	renderModal(body, footer);

	screen.getByText(body);
	screen.getByText(footer);
});
test('renders modal with close button', () => {
	const withCloseButton = true
	
	renderModal('', '', withCloseButton)

	expect(screen.getByTestId('base-icon').innerHTML).toBe(icons['x']);
});
test('renders modal without close button', () => {
	const withCloseButton = false
	
	renderModal('', '', withCloseButton)

	expect(screen.queryByTestId('base-icon'));
});
test('closes modal when clicking close button', async () => {
	const body = 'This is modal body';
	const withCloseButton = true
	renderModal(body, '', withCloseButton)

	fireEvent.click(screen.getByTestId('base-modal-close-button'));

	return assertModalClosed(body)

	// await waitFor(() => {
	// 	expect(screen.queryByText(body)).toBeNull();
	// 	expect(screen.queryByTestId('base-modal-overlay')).toBeNull();
	// });
});
test('closes modal when clicking overlay', async () => {
	const body = 'This is modal body';
	renderModal(body);

	fireEvent.click(screen.getByTestId('base-modal-overlay'));

	return assertModalClosed(body)
});
test('closes modal when clicking cancel button in the footer', async () => {
	const body = 'This is modal body';
	const footer = `
	<template #footer="{ close }">
		<button @click="close">Cancel</button>
	</template>
`
	renderModal(body, footer);

	fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

	return assertModalClosed(body)
});
test('closes modal when pressing esc key', async () => {
	const body = 'This is modal body';
	renderModal(body);

	fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Esc' });

	return assertModalClosed(body)
});
