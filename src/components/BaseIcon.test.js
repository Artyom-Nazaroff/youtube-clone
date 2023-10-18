import {render, screen} from '@testing-library/vue'
import BaseIcon from './BaseIcon.vue'
import icons from '../icons'

const existingIconName = Object.keys(icons)[0]
const nonExistingIconName = 'nonExistenIcon'

function renderIcon(name, classes = null) {
	const options = {
		props: {
			name,
			class: classes,
		}
	}

	return render(BaseIcon, options)
}

test('renders icon', () => {
	renderIcon(existingIconName)

	expect(screen.getByTestId('base-icon').innerHTML).toBeTruthy()
})
test('renders non-existen icon', () => {
	renderIcon(nonExistingIconName)

	expect(screen.getByTestId('base-icon').innerHTML).toBeFalsy()
})
test('renders icons with default classes', () => {
	const defaultClasses = 'w-6 h-6'

	renderIcon(existingIconName, defaultClasses)

	expect(screen.getByTestId('base-icon').getAttribute('class')).toBe(defaultClasses)
})
test('renders icons with custom classes', () => {
	const classes = 'w-10 h-10'

	renderIcon(existingIconName, classes)

	expect(screen.getByTestId('base-icon').getAttribute('class')).toBe(classes)
})