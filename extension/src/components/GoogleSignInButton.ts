/**
 * Makes the button to sign in with google.
 */
export const GoogleSignInButton = (onClickCallback: () => void) => {
  // Make the button
  const gsiButton = document.createElement('div');
  gsiButton.setAttribute('id', 'google-sign-in');
  gsiButton.classList.add('google-sign-in-button');
  gsiButton.onclick = onClickCallback;
  return gsiButton;
};
