/**
 * Makes the button to sign in with google.
 */
export const GoogleSignInButton = (onClickCallback: () => void) => {
  // Make the button
  const gsiButton = document.createElement('div');
  gsiButton.setAttribute('id', 'google-sign-in');
  gsiButton.classList.add('google-sign-in-button');
  // Add event listener for the callback for dynamic creation
  document.body.addEventListener('click', (e) => {
    const eventTarget = e.target as HTMLInputElement;
    if (eventTarget.id === 'google-sign-in') {
      onClickCallback();
    }
  });
  return gsiButton;
};
