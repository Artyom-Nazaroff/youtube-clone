import {render, screen} from '@testing-library/vue'
import BaseCheckbox from './BaseCheckbox.vue'

test('renders checked base checkbox with label', () => {
	const value = 2
	const label = 'Test Checkbox'
	const options = {
		props: {
			id: 'checkbox',
			value,
			modelValue: [1,value,3],
		},
		slots: {
			default: label,
		}
	}

	render(BaseCheckbox, options)

	expect(screen.getByLabelText(label).checked).toBe(true)

	// screen.debug()
})

test('renders unchecked base checkbox', () => {

	render(BaseCheckbox)
	
	expect(screen.getByRole('checkbox').checked).toBe(false)
})
