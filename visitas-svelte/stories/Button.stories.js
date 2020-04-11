import { action } from '@storybook/addon-actions';

import Button from './ButtonWrapper.svelte';

export default {
  title: 'Button',
  component: Button,
};

export const basicUsage = () => ({
  Component: Button
});
