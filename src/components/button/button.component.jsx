import { BaseButton, GoogleSignInButton, InvertedButton, SpinnerButton } from './button.styles';

export const BUTTON_TYPES_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
}

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) => (
    {
        [BUTTON_TYPES_CLASSES.base]: BaseButton,
        [BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,

    }[buttonType]
)

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    const ButtonCustom = getButton(buttonType);
    return (
        <ButtonCustom disabled={isLoading} {...otherProps}>
            {isLoading ? <SpinnerButton /> : children}
        </ButtonCustom>
    );
}

export default Button;